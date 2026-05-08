export interface Document {
  nom: string;
  fichier: string;
}

export interface DocumentCategory {
  slug: string;
  titre: string;
  documents: Document[];
}

export const documentCategories: DocumentCategory[] = [
  {
    slug: 'reglement-interieur',
    titre: 'Règlement intérieur',
    documents: [
      { nom: 'Règlement intérieur du centre équestre', fichier: 'reglement_interieur.pdf' },
    ],
  },
  {
    slug: 'inscription',
    titre: 'Inscription',
    documents: [
      { nom: 'Fiche d\'inscription', fichier: 'fiche_inscription.pdf' },
    ],
  },
  {
    slug: 'pension',
    titre: 'Pension',
    documents: [
      { nom: 'Contrat de pension 2026', fichier: 'contrat de pension2026.pdf' },
    ],
  },
  {
    slug: 'tiers-pension',
    titre: 'Tiers de pension',
    documents: [
      { nom: 'Tiers de pension – chevaux de club', fichier: 'tier de pension chevaux de club.pdf' },
    ],
  },
  {
    slug: 'demi-pension',
    titre: 'Demi-pension',
    documents: [
      { nom: 'Convention de demi-pension propriétaire 2026', fichier: 'CONVENTION DE DEMI PENSION PROPRIO2026.pdf' },
      { nom: 'Demi-pension – chevaux de club 2026', fichier: 'demi pension chevaux de club2026.pdf' },
    ],
  },
  {
    slug: 'saillie',
    titre: 'Saillie',
    documents: [
      { nom: 'Contrat de saillie – Edgard', fichier: 'contrat de saillie edgard.pdf' },
      { nom: 'Contrat de saillie – Flashy', fichier: 'contrat saillie flashy.pdf' },
      { nom: 'Contrat de saillie – Graham', fichier: 'contrat saillie graham.pdf' },
    ],
  },
  {
    slug: 'depot-vente',
    titre: 'Dépôt-vente',
    documents: [
      { nom: 'Contrat de dépôt-vente 2026', fichier: 'depot vente 2026.pdf' },
    ],
  },
];

export function getCategoriesBySlug(slugs: string[]): DocumentCategory[] {
  return slugs
    .map(slug => documentCategories.find(cat => cat.slug === slug))
    .filter((cat): cat is DocumentCategory => cat !== undefined);
}
