import {RootState} from '../../types/store-types/store-types.ts';
import {createSelector} from '@reduxjs/toolkit';

export const selectOffersState = (state: RootState) => state.offers;

export const selectCurrentCity = createSelector(
  selectOffersState,
  (offersState) => offersState.city
);
export const selectAllOffers = createSelector(
  selectOffersState,
  (offersState) => offersState.offers
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
