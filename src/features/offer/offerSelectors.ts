import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../types/store-types/store-types.ts';

export const selectCurrentOfferState = (state: RootState) => state.offer;

export const selectCurrentOffer = createSelector(
  selectCurrentOfferState,
  (state) => state.offer
);

export const selectNearbyOffers = createSelector(
  selectCurrentOfferState,
  (state) => state.nearbyOffers
);

export const selectComments = createSelector(
  selectCurrentOfferState,
  (state) => state.reviews
);

export const selectCurrentOfferLoading = createSelector(
  selectCurrentOfferState,
  (state) => state.loading
);

export const selectCurrentOfferError = createSelector(
  selectCurrentOfferState,
  (state) => state.error
);

export const selectCommentLoading = createSelector(
  selectCurrentOfferState,
  (state) => state.reviewLoading
);

export const selectCommentError = createSelector(
  selectCurrentOfferState,
  (state) => state.reviewError
);

export const selectSortedComments = createSelector(
  selectComments,
  (comments) => [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
);
