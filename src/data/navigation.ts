export interface NavLink {
  label: string;
  href: string;
}

export const mainMenu: NavLink[] = [
  { label: 'Cours enfants', href: '/cours-enfants' },
  { label: 'Équitation adulte', href: '/equitation-adulte' },
  { label: 'Pension', href: '/pension-chevaux' },
  { label: 'Stages vacances', href: '/stages-vacances' },
  { label: 'Compétitions', href: '/competitions' },
  { label: 'Élevage', href: '/elevage' },
  { label: 'Vente & dépôt-vente', href: '/vente' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];
