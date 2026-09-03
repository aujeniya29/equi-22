export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

export type DesktopMenuItem = NavLink | NavGroup;

export const desktopMenu: DesktopMenuItem[] = [
  {
    label: 'Nos services',
    items: [
      { label: 'Cours enfants', href: '/cours-enfants' },
      { label: 'Équitation adulte', href: '/equitation-adulte' },
      { label: 'Stages vacances', href: '/stages-vacances' },
      { label: 'Compétitions', href: '/competitions' },
      { label: 'Mountain Trail & Éthologie', href: '/mountain-trail-ethologie' },
      { label: 'Balades', href: '/balades' },
      { label: 'Scolaires & groupes', href: '/sorties-scolaires' },
    ],
  },
  {
    label: 'Pensions',
    items: [
      { label: 'Pension propriétaires', href: '/pension-chevaux' },
      { label: 'Demi & Tiers-pension', href: '/pension-equides-club' },
    ],
  },
  { label: 'Élevage', href: '/elevage' },
  { label: 'Vente & dépôt-vente', href: '/vente' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'À propos', href: '/a-propos' },
];

export const mainMenu: NavLink[] = [
  // Présent au pied de page et dans le menu mobile, pas dans la barre desktop :
  // la page `/portes-ouvertes` est permanente et ne doit pas rester orpheline
  // une fois le bandeau d'accueil retiré, sans pour autant occuper une place
  // dans la navigation principale hors saison.
  { label: 'Portes ouvertes', href: '/portes-ouvertes' },
  { label: 'Cours enfants', href: '/cours-enfants' },
  { label: 'Équitation adulte', href: '/equitation-adulte' },
  { label: 'Pension propriétaires', href: '/pension-chevaux' },
  { label: 'Demi & Tiers-pension', href: '/pension-equides-club' },
  { label: 'Stages vacances', href: '/stages-vacances' },
  { label: 'Compétitions', href: '/competitions' },
  { label: 'Mountain Trail & Éthologie', href: '/mountain-trail-ethologie' },
  { label: 'Élevage', href: '/elevage' },
  { label: 'Vente & dépôt-vente', href: '/vente' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];
