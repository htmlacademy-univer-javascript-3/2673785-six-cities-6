import {createSelector} from '@reduxjs/toolkit';
import {selectOffersState} from '../offers/offersSelectors.ts';

export const selectFavorites = createSelector(
  selectOffersState,
  (offersState) => offersState.favorites || []
);

export const selectFavoritesByCity = createSelector(
  selectFavorites,
  (favorites) => {
    if (!favorites || favorites.length === 0) {
      return {};
    }

    return favorites.reduce<Record<string, typeof favorites>>((acc, offer) => {
      const city = offer.city.name;
      if (!acc[city]) {
        acc[city] = [];
      }
      acc[city].push(offer);
      return acc;
    }, {});
  }
);

export const selectFavoritesCount = createSelector(
  selectFavorites,
  (favorites) => favorites.length
);

export const selectFavoritesLoading = createSelector(
  selectOffersState,
  (offersState) => offersState.favoritesLoading
);

export const selectFavoritesError = createSelector(
  selectOffersState,
  (offersState) => offersState.favoritesError
);
