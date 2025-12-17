import {CityType} from '../types/offerTypes/offer.ts';
import {SortType} from '../components/Offers/utils.ts';

export const CITIES: CityType[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const CITY_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  'Paris': { lat: 48.85661, lng: 2.351499, zoom: 10 },
  'Amsterdam': { lat: 52.3740300, lng: 4.8896900, zoom: 10 },
  'Cologne': { lat: 50.938361, lng: 6.959974, zoom: 10 },
  'Brussels': { lat: 50.846557, lng: 4.351697, zoom: 10 },
  'Hamburg': { lat: 53.550341, lng: 10.000654, zoom: 10 },
  'Dusseldorf': { lat: 51.227741, lng: 6.773456, zoom: 10 },
};

export const SORT_TYPES: SortType[] = ['popular', 'priceLowToHigh', 'priceHighToLow', 'topRatedFirst'];
