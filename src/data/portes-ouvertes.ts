/**
 * Données de l'édition courante des portes ouvertes.
 *
 * La page `/portes-ouvertes` est **permanente** : elle est reconduite d'une
 * édition à l'autre plutôt que republiée sous une nouvelle URL. Elle accumule
 * ainsi les liens des agendas locaux (Infolocale, mairie, office de tourisme)
 * et absorbe l'ancienne URL du CMS `Portes-ouvertes-…_fiche_276.html`, toujours
 * servie par Google.
 *
 * Reconduire une édition = modifier ce fichier, rien d'autre.
 */

export interface PortesOuvertesProgramme {
  /** Intitulé repris de l'affiche. */
  titre: string;
  /** Une phrase de description — visible en texte, pas seulement sur l'affiche. */
  detail: string;
}

export interface PortesOuvertesEdition {
  /** Millésime, utilisé dans les titres et l'`@id` du schema. */
  annee: number;
  /** Début de l'événement, heure locale (fuseau Europe/Paris = +02:00 en septembre). */
  debut: string;
  /** Fin de l'événement, même fuseau. */
  fin: string;
  /** Saison d'inscription ouverte ce jour-là. */
  saison: string;
  programme: PortesOuvertesProgramme[];
}

export const edition: PortesOuvertesEdition = {
  annee: 2026,
  debut: '2026-09-12T14:00:00+02:00',
  fin: '2026-09-12T18:00:00+02:00',
  saison: '2026/2027',
  programme: [
    {
      titre: 'Inscriptions',
      detail:
        "Inscriptions aux activités et aux cours pour l'année 2026/2027, sur place et avec l'équipe.",
    },
    {
      titre: 'Balades à poney',
      detail: 'Balades à poney pour les enfants, encadrées par nos monitrices.',
    },
    {
      titre: 'Visite des écuries',
      detail: 'Découverte des coulisses du centre équestre : boxes, carrières, paddocks et chemins.',
    },
    {
      titre: 'Restauration sur place',
      detail: "Restauration et buvette sur le site, tout au long de l'après-midi.",
    },
    {
      titre: 'Spectacles',
      detail: 'Spectacles et démonstrations de nos cavaliers, tous niveaux confondus.',
    },
  ],
};

/** Date de fin sous forme d'objet, pour les comparaisons. */
export const finEdition = new Date(edition.fin);

/**
 * Vrai tant que l'édition n'a pas eu lieu.
 *
 * ⚠️ Évalué **au build**. Le site est statique : sans nouveau déploiement après
 * l'événement, la valeur reste figée à `true`. Les libellés sont donc rédigés
 * pour rester exacts dans les deux cas (dates absolues, jamais « ce samedi »),
 * et le bandeau d'accueil porte en plus un garde-fou côté navigateur.
 */
export const editionAVenir = Date.now() < finEdition.getTime();

const formatterDate = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Paris',
});

const formatterHeure = new Intl.DateTimeFormat('fr-FR', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'Europe/Paris',
});

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « Samedi 12 septembre 2026 » */
export const dateLongue = capitalise(formatterDate.format(new Date(edition.debut)));

/** « samedi 12 septembre 2026 » — forme minuscule, pour l'intérieur d'une phrase. */
export const dateLongueMinuscule = formatterDate.format(new Date(edition.debut));

/**
 * « 12 septembre 2026 » — sans le jour de la semaine, pour les titres où chaque
 * caractère compte (le `<title>` reçoit en plus le suffixe « | Équi 22 »).
 */
export const dateCourte = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Paris',
}).format(new Date(edition.debut));

/**
 * « 14h » plutôt que « 14:00 » : l'affiche et le club parlent en heures pleines.
 * Une heure non ronde reste correcte (« 14:30 » → « 14h30 »).
 */
const enHeuresPleines = (iso: string) => {
  const t = formatterHeure.format(new Date(iso));
  return t.endsWith(':00') ? `${t.slice(0, -3)}h` : t.replace(':', 'h');
};

export const heureDebut = enHeuresPleines(edition.debut);
export const heureFin = enHeuresPleines(edition.fin);

/** « de 14h à 18h » */
export const plageHoraire = `de ${heureDebut} à ${heureFin}`;
