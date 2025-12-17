import {Host} from './host.ts';

export type CityType =
  | 'Paris'
  | 'Amsterdam'
  | 'Cologne'
  | 'Brussels'
  | 'Hamburg'
  | 'Dusseldorf';

export interface City {
  name: CityType;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export interface Offer {
  id: string;
  title: string;
  price: number;
  rating: number;
  isFavorite: boolean;
  type: string;
  previewImage: string;
  city: City;
  location: {
    latitude: number;
    longitude: number;
  };
  isPremium: boolean;
}

export interface OfferDetailed extends Offer {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}
