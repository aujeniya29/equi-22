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
    { days: 'Lundi - Samedi', hours: '8h00 - 20h00' },
    { days: 'Dimanche', hours: 'Fermé' },
  ],
  gps: {
    latitude: 48.4833,
    longitude: -2.8167,
  },
  social: {
    facebook: 'https://www.facebook.com/equi22.centre.equestre.yffiniac/?locale=fr_FR',
    instagram: 'https://www.instagram.com/equi_22/',
  },
  googleReviews: {
    rating: 4.3,
    reviewCount: 200,
    // TODO: Replace with actual Google Business Profile URL once available from client
    googleBusinessUrl: 'https://share.google/dgf0rQXBTQyYYMt4f',
  },
};
