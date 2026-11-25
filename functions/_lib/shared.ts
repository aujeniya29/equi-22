// Types et règles partagés entre les Pages Functions (/gestion/api/*) et
// l'interface de gestion (src/pages/gestion.astro). Ce fichier n'exporte aucun
// gestionnaire onRequest : il ne crée donc aucune route.

export const SEXES = ['jument', 'etalon', 'hongre'] as const;
export type Sexe = (typeof SEXES)[number];

export const DISCIPLINES = [
  'CSO',
  'Dressage',
  'CCE',
  'Hunter',
  'Loisir',
  'Endurance',
  'Attelage',
  'Western',
  'Pony-games',
  'Équitation de travail',
  'Élevage',
] as const;

/** Une annonce telle que l'interface la manipule. */
export interface Cheval {
  title: string;
  vendu: boolean;
  prix: string;
  race: string;
  sexe: Sexe | '';
  anneeNaissance: number | null;
  robe: string;
  taille: string;
  categorie: string;
  niveau: string;
  disciplines: string[];
  pere: string;
  mere: string;
  pereDeMere: string;
  /** Présentation (corps Markdown du fichier). */
  body: string;
  pointsForts: string[];
  convientA: string;
  infosComplementaires: string;
  /**
   * Noms de fichier des photos, dans l'ordre d'affichage : la première est la
   * photo principale. Seul le nom compte (src/utils/vente.ts).
   */
  photos: string[];
}

export interface ChevalEnregistre extends Cheval {
  /** Nom du fichier sans « .md » = adresse de la page (/vente/<id>). */
  id: string;
}

/**
 * Photo envoyée au préalable via POST /gestion/api/photo. Dans `cheval.photos`,
 * elle figure sous son nom provisoire `temp` (« nouvelle:… ») ; le serveur lui
 * donne son nom définitif à l'enregistrement.
 */
export interface NouvellePhoto {
  temp: string;
  blobSha: string;
}

export const TEMP_PREFIX = 'nouvelle:';

export interface SaveRequest {
  cheval: Cheval;
  nouvellesPhotos: NouvellePhoto[];
}

/** Ce que la validation exige (aligné sur src/content.config.ts). */
export function erreursCheval(c: Cheval): Partial<Record<keyof Cheval, string>> {
  const e: Partial<Record<keyof Cheval, string>> = {};
  const annee = new Date().getFullYear();
  if (!c.title.trim()) e.title = 'Indiquez le nom du cheval.';
  if (!c.prix.trim()) e.prix = 'Indiquez le prix.';
  if (!c.race.trim()) e.race = 'Indiquez la race.';
  if (!SEXES.includes(c.sexe as Sexe)) e.sexe = 'Choisissez le sexe.';
  if (!c.anneeNaissance || c.anneeNaissance < 1990 || c.anneeNaissance > annee + 1)
    e.anneeNaissance = `Indiquez une année entre 1990 et ${annee + 1}.`;
  return e;
}

export function slugify(text: string): string {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60)
      .replace(/-+$/, '') || 'cheval'
  );
}

export const PHOTO_NAME = /^[a-z0-9][a-z0-9-]*\.(jpe?g|png|webp)$/i;
