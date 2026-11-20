import type { CollectionEntry } from 'astro:content';

type Horse = CollectionEntry<'vente'>;

// Toutes les photos d'annonces vivent à plat dans src/assets/images/vente/
// (dossier `input` du media de Pages CMS). On les indexe par nom de fichier :
// le CMS écrit « /vente/abc.jpg », une annonce rédigée à la main peut écrire
// « abc.jpg » — les deux désignent le même fichier.
const allVenteImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/vente/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}'
);

const byFilename = new Map<string, () => Promise<{ default: ImageMetadata }>>();
for (const [path, loader] of Object.entries(allVenteImages)) {
  byFilename.set(basename(path), loader);
}

function basename(path: string): string {
  return path.split('/').pop() ?? path;
}

export function hasVentePhoto(ref: string | undefined): boolean {
  return Boolean(ref && byFilename.has(basename(ref)));
}

export async function resolveVentePhoto(
  horse: Horse,
  ref: string | undefined
): Promise<ImageMetadata | undefined> {
  if (!ref) return undefined;
  const loader = byFilename.get(basename(ref));
  if (!loader) {
    // Sans cet avertissement, une annonce dont les photos manquent se construit
    // sans erreur et se publie sans aucune image (ni à l'écran, ni en schema).
    console.warn(
      `[vente] ${horse.id} : photo introuvable « ${ref} » (attendue dans src/assets/images/vente/)`
    );
    return undefined;
  }
  return (await loader()).default;
}

export async function resolveAllVentePhotos(horse: Horse): Promise<ImageMetadata[]> {
  const refs = [horse.data.photoPrincipale, ...(horse.data.photos ?? [])];
  const seen = new Set<string>();
  const images: ImageMetadata[] = [];
  for (const ref of refs) {
    if (!ref || seen.has(basename(ref))) continue;
    seen.add(basename(ref));
    const img = await resolveVentePhoto(horse, ref);
    if (img) images.push(img);
  }
  return images;
}

export const sexeLabels: Record<Horse['data']['sexe'], string> = {
  hongre: 'Hongre',
  jument: 'Jument',
  etalon: 'Étalon',
};

export function ageLabel(anneeNaissance: number): string {
  const age = new Date().getFullYear() - anneeNaissance;
  return age <= 1 ? `${age} an` : `${age} ans`;
}

// « pouliche », « poulain », « jument »… : le mot qu'un acheteur tape.
function nomCommun({ sexe, anneeNaissance }: Horse['data']): { nom: string; feminin: boolean } {
  const jeune = new Date().getFullYear() - anneeNaissance < 4;
  if (sexe === 'jument') return { nom: jeune ? 'pouliche' : 'jument', feminin: true };
  if (sexe === 'etalon') return { nom: jeune ? 'poulain' : 'étalon', feminin: false };
  return { nom: 'hongre', feminin: false };
}

export function seoTitle(horse: Horse): string {
  const { title } = horse.data;
  return horse.data.seoTitle ?? `${title} — ${nomCommun(horse.data).nom} à vendre`;
}

export function seoDescription(horse: Horse): string {
  if (horse.data.seoDescription) return horse.data.seoDescription;
  const { title, race, anneeNaissance, robe, disciplines } = horse.data;
  const { nom, feminin } = nomCommun(horse.data);
  const parts = [`${title}, ${nom} ${race} ${feminin ? 'née' : 'né'} en ${anneeNaissance}`];
  if (robe) parts[0] += `, robe ${robe.toLowerCase()}`;
  parts[0] += '.';
  if (disciplines?.length) parts.push(`${disciplines.join(', ')}.`);
  parts.push("À vendre au centre équestre Equi 22 à Yffiniac, Côtes-d'Armor.");
  return parts.join(' ');
}
