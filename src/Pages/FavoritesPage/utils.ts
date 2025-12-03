import {CityType, Offer} from '../../types/offerTypes/offer.ts';

export const getFavoritesByCity = (favorites: Offer[]) => {
  const favoritesByCity: Record<CityType, Offer[]> = {
    Paris: [],
    Amsterdam: [],
    Cologne: [],
    Brussels: [],
    Hamburg: [],
    Dusseldorf: [],
  };

  for (let i = 0; i < favorites.length; i++) {
    const favorite = favorites[0];
    favoritesByCity[favorite.city.name].push(favorite);
  }

  return favoritesByCity;
};
