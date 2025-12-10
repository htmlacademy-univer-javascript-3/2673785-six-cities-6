import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../types/storeTypes/storeTypes.ts';

// Авторизация
export const selectAuthorizationState = (state: RootState) => state.authorization;

export const selectAuthorizationStatus = createSelector(
  selectAuthorizationState,
  (authorizationState) => authorizationState.authorizationStatus
);

export const selectUser = createSelector(
  selectAuthorizationState,
  (authorizationState) => authorizationState.user
);

export const selectAuthorizationLoading = createSelector(
  selectAuthorizationState,
  (authorizationState) => authorizationState.isLoading
);

export const selectAuthorizationError = createSelector(
  selectAuthorizationState,
  (authorizationState) => authorizationState.error
);


// Предложения
export const selectOffersState = (state: RootState) => state.offers;

export const selectCurrentCity = createSelector(
  selectOffersState,
  (offersState) => offersState.city
);
export const selectAllOffers = createSelector(
  selectOffersState,
  (offersState) => offersState.offers
);

export const selectCurrentOffer = createSelector(
  selectOffersState,
  (offersState) => offersState.selectedOffer
);

export const selectOfferById = () => createSelector(
  selectAllOffers,
  (_: RootState, id: string | undefined) => id,
  (offers, id) => offers.find((offer) => offer.id === id)
);

export const selectOffersLoading = createSelector(
  selectOffersState,
  (offersState) => offersState.isLoading
);

export const selectOffersError = createSelector(
  selectOffersState,
  (offersState) => offersState.error
);

export const selectOffersByCurrentCity = createSelector(
  [selectAllOffers, selectCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const selectOffersCountByCurrentCity = createSelector(
  selectOffersByCurrentCity,
  (offers) => offers.length
);


// Избранное
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
