export interface City {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export interface Offer {
  id: number;
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
