import {Host} from './host.ts';

export type PlaceType = 'Apartment' | 'House' | 'Room' | 'Hotel';

export type Amenity =
  | 'Wi-Fi'
  | 'Heating'
  | 'Kitchen'
  | 'Fridge'
  | 'Coffee machine'
  | 'Air conditioning'
  | 'Washing machine'
  | 'Cabel TV'
  | 'Dishwasher'
  | 'Towels'
  | 'Baby seat'
  | 'Pool'
  | 'Gym';

export interface Offer {
  id: number;
  title: string;
  price: number;
  rating: number;
  isFavorite: boolean;

  shortDescription: string;
  description: string;
  type: PlaceType;
  bedrooms: number;
  maxGuests: number;
  amenities: Amenity[];
  host: Host;
  images: string[];
  city: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isPremium: boolean;

  reviewIds: number[];
}
