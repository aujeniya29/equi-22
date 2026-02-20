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
  address: '123 Rue de la Prairie',
  city: 'Yffiniac',
  postalCode: '22120',
  phone: '+33 2 96 00 00 00',
  whatsapp: '+33 6 00 00 00 00',
  email: 'contact@equi22.fr',
  openingHours: [
    { days: 'Lundi - Vendredi', hours: '9h00 - 18h00' },
    { days: 'Samedi', hours: '9h00 - 12h00' },
    { days: 'Dimanche', hours: 'Fermé' },
  ],
  gps: {
    latitude: 48.4833,
    longitude: -2.8167,
  },
  social: {
    facebook: 'https://www.facebook.com/equi22',
    instagram: 'https://www.instagram.com/equi22',
  },
  googleReviews: {
    rating: 4.8,
    reviewCount: 32,
    googleBusinessUrl: 'https://g.page/r/PLACEHOLDER/review',
  },
};
