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
