// Outils côté serveur des Pages Functions de /gestion : authentification,
// accès au dépôt GitHub, lecture et écriture des annonces.
//
// Variables d'environnement (Cloudflare Pages → Settings → Variables and Secrets) :
//   GESTION_PASSWORD  mot de passe de la cliente (secret)
//   GITHUB_TOKEN      jeton « fine-grained » limité à ce dépôt, Contents: Read and write (secret)
//   GITHUB_REPO       « propriétaire/depot », ex. aujeniya29/equi-22
//   GITHUB_BRANCH     facultatif, « main » par défaut
//   GITHUB_API_URL    facultatif, pour les tests locaux contre une fausse API
//
// Ce fichier n'exporte aucun gestionnaire onRequest : il ne crée aucune route.

import { parse, Scalar, stringify } from 'yaml';
import { PHOTO_NAME, SEXES, type Cheval, type ChevalEnregistre, type Sexe } from './shared';

export interface Env {
  GESTION_PASSWORD?: string;
  GITHUB_TOKEN?: string;
  GITHUB_REPO?: string;
  GITHUB_BRANCH?: string;
  GITHUB_API_URL?: string;
}

/** Sous-ensemble de l'EventContext de Cloudflare Pages dont on se sert. */
export interface Ctx {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
  next: () => Promise<Response>;
}

export const CONTENT_DIR = 'src/content/vente';
export const PHOTO_DIR = 'src/assets/images/vente';

export function json(data: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
}

export function erreur(message: string, status = 400): Response {
  return json({ error: message }, status);
}

export function configManquante(env: Env): string | null {
  const manquantes = (['GESTION_PASSWORD', 'GITHUB_TOKEN', 'GITHUB_REPO'] as const).filter((k) => !env[k]);
  return manquantes.length ? `Configuration incomplète : ${manquantes.join(', ')}` : null;
}

// ---------------------------------------------------------------------------
// Authentification
//
// Le cookie contient HMAC(mot de passe, constante) : il n'y a aucune session à
// stocker, et changer le mot de passe déconnecte tous les appareils.
// ---------------------------------------------------------------------------

export const COOKIE = 'equi22_gestion';
const UN_AN = 365 * 24 * 3600;

async function jeton(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode('equi22-gestion-v1'));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function egal(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function motDePasseValide(env: Env, saisi: string): Promise<boolean> {
  // Comparaison de deux HMAC de même longueur : pas de fuite par la durée.
  return egal(await jeton(saisi), await jeton(env.GESTION_PASSWORD ?? ''));
}

export async function cookieConnexion(env: Env): Promise<string> {
  return `${COOKIE}=${await jeton(env.GESTION_PASSWORD!)}; Path=/gestion; Max-Age=${UN_AN}; HttpOnly; Secure; SameSite=Strict`;
}

export const cookieDeconnexion = `${COOKIE}=; Path=/gestion; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;

export async function estConnecte(request: Request, env: Env): Promise<boolean> {
  if (!env.GESTION_PASSWORD) return false;
  const cookies = request.headers.get('Cookie') ?? '';
  const valeur = cookies
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  return Boolean(valeur) && egal(valeur!, await jeton(env.GESTION_PASSWORD));
}

// ---------------------------------------------------------------------------
// GitHub
// ---------------------------------------------------------------------------

export class GitHubError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export class GitHub {
  private api: string;
  private base: string;
  readonly branch: string;

  constructor(private env: Env) {
    this.api = env.GITHUB_API_URL || 'https://api.github.com';
    this.base = `${this.api}/repos/${env.GITHUB_REPO}`;
    this.branch = env.GITHUB_BRANCH || 'main';
  }

  async raw(path: string, init: RequestInit = {}): Promise<Response> {
    const res = await fetch(`${this.base}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'equi22-gestion',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
        ...init.headers,
      },
    });
    return res;
  }

  async call<T>(path: string, init: RequestInit = {}): Promise<T> {
    const res = await this.raw(path, init);
    if (!res.ok) {
      const texte = await res.text();
      throw new GitHubError(res.status, `GitHub ${init.method ?? 'GET'} ${path} → ${res.status} ${texte.slice(0, 300)}`);
    }
    return (await res.json()) as T;
  }

  async head(): Promise<{ commitSha: string; treeSha: string }> {
    const ref = await this.call<{ object: { sha: string } }>(`/git/ref/heads/${this.branch}`);
    const commit = await this.call<{ tree: { sha: string } }>(`/git/commits/${ref.object.sha}`);
    return { commitSha: ref.object.sha, treeSha: commit.tree.sha };
  }

  /**
   * Annonces et noms des photos à un commit donné, en une seule requête GraphQL
   * (le plan gratuit limite chaque appel de fonction à 50 sous-requêtes, et les
   * annonces vendues restent en ligne : leur nombre ne fait que croître).
   */
  async contenu(commitSha: string): Promise<{ annonces: { name: string; text: string }[]; photos: string[] }> {
    const [owner, name] = (this.env.GITHUB_REPO ?? '').split('/');
    type Entry = { name: string; type: string; object?: { text?: string | null } | null };
    type Tree = { entries?: Entry[] } | null;
    const res = await fetch(`${this.api}/graphql`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'equi22-gestion',
      },
      body: JSON.stringify({
        query: `query($owner: String!, $name: String!, $md: String!, $ph: String!) {
          repository(owner: $owner, name: $name) {
            md: object(expression: $md) { ... on Tree { entries { name type object { ... on Blob { text } } } } }
            ph: object(expression: $ph) { ... on Tree { entries { name type } } }
          }
        }`,
        variables: { owner, name, md: `${commitSha}:${CONTENT_DIR}`, ph: `${commitSha}:${PHOTO_DIR}` },
      }),
    });
    const body = (await res.json().catch(() => null)) as
      | { data?: { repository?: { md: Tree; ph: Tree } }; errors?: unknown }
      | null;
    if (!res.ok || !body?.data?.repository) {
      throw new GitHubError(res.status === 200 ? 500 : res.status, `GitHub GraphQL → ${res.status} ${JSON.stringify(body?.errors ?? '').slice(0, 300)}`);
    }
    const { md, ph } = body.data.repository;
    return {
      annonces: (md?.entries ?? [])
        .filter((e) => e.type === 'blob' && e.name.endsWith('.md') && typeof e.object?.text === 'string')
        .map((e) => ({ name: e.name, text: e.object!.text! })),
      photos: (ph?.entries ?? []).filter((e) => e.type === 'blob').map((e) => e.name),
    };
  }

  /**
   * Crée un commit à partir de `parent` et y fait pointer la branche. Échoue
   * (GitHubError 422) si la branche a avancé entre-temps : l'appelant recommence.
   */
  async commit(
    parent: { commitSha: string; treeSha: string },
    entries: { path: string; content?: string; sha?: string | null }[],
    message: string
  ): Promise<string> {
    const tree = await this.call<{ sha: string }>('/git/trees', {
      method: 'POST',
      body: JSON.stringify({
        base_tree: parent.treeSha,
        tree: entries.map((e) => ({ path: e.path, mode: '100644', type: 'blob', ...('content' in e ? { content: e.content } : { sha: e.sha }) })),
      }),
    });
    const commit = await this.call<{ sha: string }>('/git/commits', {
      method: 'POST',
      body: JSON.stringify({ message, tree: tree.sha, parents: [parent.commitSha] }),
    });
    await this.call(`/git/refs/heads/${this.branch}`, {
      method: 'PATCH',
      body: JSON.stringify({ sha: commit.sha, force: false }),
    });
    return commit.sha;
  }
}

// ---------------------------------------------------------------------------
// Annonces (fichiers Markdown à frontmatter YAML)
// ---------------------------------------------------------------------------

export interface Fichier {
  id: string;
  /** Frontmatter complet : conserve les champs que l'interface ne gère pas (seoTitle, ogImage…). */
  data: Record<string, unknown>;
  body: string;
}

export function lireFichier(id: string, texte: string): Fichier {
  const m = texte.replace(/^﻿/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { id, data: {}, body: texte.trim() };
  const data = (parse(m[1]) ?? {}) as Record<string, unknown>;
  return { id, data, body: m[2].trim() };
}

const str = (v: unknown): string => (v === null || v === undefined ? '' : String(v).trim());
const liste = (v: unknown): string[] =>
  (Array.isArray(v) ? v : v ? [v] : []).map(str).filter(Boolean);
const nomPhoto = (ref: string) => ref.split('/').pop() ?? ref;

export function versCheval(f: Fichier): ChevalEnregistre {
  const d = f.data;
  const vendu = typeof d.vendu === 'string' ? ['oui', 'true'].includes(d.vendu.trim().toLowerCase()) : Boolean(d.vendu);
  const annee = Number(d.anneeNaissance);
  const photos = [str(d.photoPrincipale), ...liste(d.photos)].filter(Boolean).map(nomPhoto);
  return {
    id: f.id,
    title: str(d.title),
    vendu,
    prix: str(d.prix),
    race: str(d.race),
    sexe: SEXES.includes(d.sexe as Sexe) ? (d.sexe as Sexe) : '',
    anneeNaissance: Number.isInteger(annee) && annee > 0 ? annee : null,
    robe: str(d.robe),
    taille: str(d.taille),
    categorie: str(d.categorie),
    niveau: str(d.niveau),
    disciplines: liste(d.disciplines),
    pere: str(d.pere),
    mere: str(d.mere),
    pereDeMere: str(d.pereDeMere),
    body: f.body,
    pointsForts: liste(d.pointsForts),
    convientA: str(d.convientA),
    infosComplementaires: str(d.infosComplementaires),
    photos: [...new Set(photos)],
  };
}

/** Champs gérés par l'interface, dans l'ordre où ils sont écrits. */
const CHAMPS_GERES = [
  'title', 'race', 'anneeNaissance', 'sexe', 'robe', 'taille', 'categorie', 'niveau',
  'disciplines', 'prix', 'photoPrincipale', 'photos', 'vendu', 'pere', 'mere', 'pereDeMere',
  'pointsForts', 'convientA', 'infosComplementaires',
];

/** Écrit le fichier d'une annonce en conservant les champs non gérés de `existant`. */
export function ecrireFichier(c: Cheval, existant?: Fichier): string {
  const propre = (s: string) => s.replace(/\r\n/g, '\n').trim();
  const photos = c.photos.filter((p) => PHOTO_NAME.test(p));
  const gere: Record<string, unknown> = {
    title: propre(c.title),
    race: propre(c.race),
    anneeNaissance: c.anneeNaissance,
    sexe: c.sexe,
    robe: propre(c.robe),
    taille: propre(c.taille),
    categorie: propre(c.categorie),
    niveau: propre(c.niveau),
    disciplines: c.disciplines.map(propre).filter(Boolean),
    prix: propre(c.prix),
    // Même forme que Pages CMS (« /vente/<nom> »), qui reste utilisable en secours.
    photoPrincipale: photos[0] ? `/vente/${photos[0]}` : '',
    photos: photos.slice(1).map((p) => `/vente/${p}`),
    vendu: c.vendu ? 'Oui' : 'Non',
    pere: propre(c.pere),
    mere: propre(c.mere),
    pereDeMere: propre(c.pereDeMere),
    pointsForts: c.pointsForts.map(propre).filter(Boolean),
    convientA: propre(c.convientA),
    infosComplementaires: propre(c.infosComplementaires),
  };

  const data: Record<string, unknown> = {};
  for (const k of CHAMPS_GERES) {
    const v = gere[k];
    if (v === '' || v === null || (Array.isArray(v) && v.length === 0)) continue;
    data[k] = v;
  }
  for (const [k, v] of Object.entries(existant?.data ?? {})) {
    if (!CHAMPS_GERES.includes(k)) data[k] = v;
  }
  // Texte sur plusieurs lignes en bloc « |- », comme Pages CMS : lisible dans le dépôt.
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === 'string' && v.includes('\n')) {
      const s = new Scalar(v);
      s.type = 'BLOCK_LITERAL';
      data[k] = s;
    }
  }

  const yaml = stringify(data, { lineWidth: 0, defaultStringType: 'QUOTE_DOUBLE', defaultKeyType: 'PLAIN' });
  const body = propre(c.body);
  return `---\n${yaml}---\n${body ? `\n${body}\n` : ''}`;
}

/** Toutes les annonces et photos de la branche, à un commit donné. */
export async function lireDepot(gh: GitHub, commitSha: string): Promise<{ annonces: Fichier[]; photos: Set<string> }> {
  const { annonces, photos } = await gh.contenu(commitSha);
  return {
    annonces: annonces.map((a) => lireFichier(a.name.slice(0, -3), a.text)),
    photos: new Set(photos),
  };
}
