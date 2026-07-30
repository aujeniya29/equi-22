export interface SocialLinks {
  facebook: string;
  instagram: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface GpsCoordinates {
  latitude: number;
  longitude: number;
}

export interface GoogleReviews {
  rating: number;
  reviewCount: number;
  googleBusinessUrl: string;
}

export interface BusinessInfo {
  name: string;
  legalForm: string;
  siret: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: OpeningHours[];
  gps: GpsCoordinates;
  social: SocialLinks;
  googleReviews: GoogleReviews;
}

export const business: BusinessInfo = {
  name: 'Équi 22',
  // TODO: Replace with actual legal form and SIRET once provided by client
  legalForm: 'Entreprise individuelle',
  siret: '52509937000021',
  address: 'Route de la Barre',
  city: 'Yffiniac',
  postalCode: '22120',
  phone: '+33 6 22 16 64 52',
  whatsapp: '+33 6 22 16 64 52',
  email: 'equi22.yffiniac@gmail.com',
  openingHours: [
    { days: 'Lundi - Vendredi', hours: '8h00 - 20h00' },
    { days: 'Samedi', hours: '8h00 - 20h00' },
    { days: 'Dimanche', hours: 'Fermé' },
  ],
  // Position exacte du centre (hameau du Ruset, Route de la Barre), fournie par
  // le client et vérifiée par géocodage inverse. Les valeurs précédentes
  // (48.4833 / -2.8167) étaient le centre-bourg d'Yffiniac, à ~8,8 km à l'ouest.
  // 6 décimales ≈ 11 cm : inutile d'aller au-delà.
  gps: {
    latitude: 48.463969,
    longitude: -2.70077,
  },
  social: {
    facebook: 'https://www.facebook.com/equi22.centre.equestre.yffiniac/?locale=fr_FR',
    instagram: 'https://www.instagram.com/equi_22/',
  },
  googleReviews: {
    rating: 4.3,
    reviewCount: 213,
    // TODO: Replace with actual Google Business Profile URL once available from client
    googleBusinessUrl: 'https://share.google/dgf0rQXBTQyYYMt4f',
  },
};

// Itinéraire Google Maps basé sur les coordonnées exactes plutôt que sur
// l'adresse : « Route de la Barre » est une route de campagne sans numéro, dont
// le géocodage ne mène qu'aux environs. Les coordonnées mènent à l'entrée.
// Lien simple (nouvel onglet) plutôt qu'une iframe Google Maps : le site est
// sans cookie ni bandeau de consentement, une iframe casserait cette propriété.
export const mapsDirectionsUrl =
  `https://www.google.com/maps/dir/?api=1&destination=${business.gps.latitude},${business.gps.longitude}`;
