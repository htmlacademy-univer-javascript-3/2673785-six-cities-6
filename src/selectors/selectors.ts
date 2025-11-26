import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../types/storeTypes/storeTypes.ts';

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
