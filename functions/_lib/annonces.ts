// Enregistrement et suppression d'une annonce : un seul commit par action,
// donc un seul déploiement Cloudflare Pages.
// Ce fichier n'exporte aucun gestionnaire onRequest : il ne crée aucune route.

import {
  CONTENT_DIR,
  ecrireFichier,
  GitHub,
  GitHubError,
  lireDepot,
  PHOTO_DIR,
  versCheval,
  type Fichier,
} from './server';
import {
  erreursCheval,
  PHOTO_NAME,
  slugify,
  TEMP_PREFIX,
  type Cheval,
  type ChevalEnregistre,
  type SaveRequest,
} from './shared';

export class ErreurSaisie extends Error {
  constructor(
    message: string,
    public status = 400
  ) {
    super(message);
  }
}

const ESSAIS = 3;

/** Recommence si la branche a avancé entre la lecture et l'écriture. */
async function avecReessai<T>(fn: () => Promise<T>): Promise<T> {
  for (let i = 1; ; i++) {
    try {
      return await fn();
    } catch (e) {
      if (!(e instanceof GitHubError && e.status === 422) || i >= ESSAIS) throw e;
    }
  }
}

function suffixe(): string {
  return crypto.randomUUID().slice(0, 8);
}

function idUnique(titre: string, pris: Set<string>): string {
  const base = slugify(titre);
  let id = base;
  for (let n = 2; pris.has(id); n++) id = `${base}-${n}`;
  return id;
}

function nettoyer(c: Cheval): Cheval {
  const s = (v: unknown) => (typeof v === 'string' ? v : '');
  const l = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []);
  const annee = Number(c.anneeNaissance);
  return {
    title: s(c.title),
    vendu: c.vendu === true,
    prix: s(c.prix),
    race: s(c.race),
    sexe: s(c.sexe) as Cheval['sexe'],
    anneeNaissance: Number.isInteger(annee) ? annee : null,
    robe: s(c.robe),
    taille: s(c.taille),
    categorie: s(c.categorie),
    niveau: s(c.niveau),
    disciplines: l(c.disciplines),
    pere: s(c.pere),
    mere: s(c.mere),
    pereDeMere: s(c.pereDeMere),
    body: s(c.body),
    pointsForts: l(c.pointsForts),
    convientA: s(c.convientA),
    infosComplementaires: s(c.infosComplementaires),
    photos: l(c.photos),
  };
}

/** Photos à supprimer : plus utilisées par aucune annonce, et présentes dans le dépôt. */
function photosOrphelines(retirees: string[], autres: Fichier[], presentes: Set<string>): string[] {
  const utilisees = new Set(autres.flatMap((f) => versCheval(f).photos));
  return retirees.filter((p) => !utilisees.has(p) && presentes.has(p));
}

function description(c: Cheval, avant?: ChevalEnregistre): string {
  if (!avant) return 'ajoutée';
  if (c.vendu && !avant.vendu) return 'marquée vendue';
  if (!c.vendu && avant.vendu) return 'remise en vente';
  return 'modifiée';
}

export async function enregistrer(
  env: ConstructorParameters<typeof GitHub>[0],
  id: string | null,
  req: SaveRequest
): Promise<ChevalEnregistre> {
  const gh = new GitHub(env);
  const saisie = nettoyer(req.cheval ?? ({} as Cheval));
  const nouvelles = new Map(
    (Array.isArray(req.nouvellesPhotos) ? req.nouvellesPhotos : [])
      .filter((p) => typeof p?.temp === 'string' && /^[0-9a-f]{40}$/.test(String(p?.blobSha)))
      .map((p) => [p.temp, p.blobSha])
  );

  const erreurs = Object.values(erreursCheval(saisie));
  if (erreurs.length) throw new ErreurSaisie(erreurs.join(' '));

  return avecReessai(async () => {
    const head = await gh.head();
    const { annonces, photos: presentes } = await lireDepot(gh, head.commitSha);
    const existant = id ? annonces.find((a) => a.id === id) : undefined;
    if (id && !existant) throw new ErreurSaisie("Cette annonce n'existe plus (supprimée entre-temps ?).", 404);

    const idFinal = existant?.id ?? idUnique(saisie.title, new Set(annonces.map((a) => a.id)));

    // Noms définitifs des nouvelles photos, liés au cheval pour s'y retrouver dans le dépôt.
    const ajouts: { path: string; sha: string }[] = [];
    const photos: string[] = [];
    for (const p of saisie.photos) {
      if (p.startsWith(TEMP_PREFIX)) {
        const sha = nouvelles.get(p);
        if (!sha) continue;
        const name = `${idFinal}-${suffixe()}.jpg`;
        ajouts.push({ path: `${PHOTO_DIR}/${name}`, sha });
        photos.push(name);
      } else if (PHOTO_NAME.test(p) && !photos.includes(p)) {
        photos.push(p);
      }
    }
    const cheval: Cheval = { ...saisie, photos };

    const avant = existant ? versCheval(existant) : undefined;
    const retirees = (avant?.photos ?? []).filter((p) => !photos.includes(p));
    const suppressions = photosOrphelines(retirees, annonces.filter((a) => a !== existant), presentes);

    const contenu = ecrireFichier(cheval, existant);
    const inchange = existant && !ajouts.length && !suppressions.length && contenu === ecrireFichier(avant!, existant);
    if (!inchange) {
      await gh.commit(
        head,
        [
          { path: `${CONTENT_DIR}/${idFinal}.md`, content: contenu },
          ...ajouts,
          ...suppressions.map((p) => ({ path: `${PHOTO_DIR}/${p}`, sha: null })),
        ],
        `Annonce « ${cheval.title.trim()} » ${description(cheval, avant)} (via /gestion)`
      );
    }
    return { ...cheval, id: idFinal };
  });
}

export async function supprimer(env: ConstructorParameters<typeof GitHub>[0], id: string): Promise<void> {
  const gh = new GitHub(env);
  await avecReessai(async () => {
    const head = await gh.head();
    const { annonces, photos: presentes } = await lireDepot(gh, head.commitSha);
    const existant = annonces.find((a) => a.id === id);
    if (!existant) return; // déjà supprimée
    const c = versCheval(existant);
    const suppressions = photosOrphelines(c.photos, annonces.filter((a) => a !== existant), presentes);
    await gh.commit(
      head,
      [
        { path: `${CONTENT_DIR}/${id}.md`, sha: null },
        ...suppressions.map((p) => ({ path: `${PHOTO_DIR}/${p}`, sha: null })),
      ],
      `Annonce « ${c.title} » supprimée (via /gestion)`
    );
  });
}
