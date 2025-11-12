import { createSelector } from '@reduxjs/toolkit';
import {RootState} from '../types/storeTypes/storeTypes.ts';

export const selectCurrentCity = (state: RootState) => state.city;
export const selectAllOffers = (state: RootState) => state.offers;

export const selectOffersByCurrentCity = createSelector(
  [selectAllOffers, selectCurrentCity],
  (offers, city) => offers.filter((offer) => offer.city === city)
);

export const selectOffersCountByCurrentCity = createSelector(
  selectOffersByCurrentCity,
  (offers) => offers.length
);
