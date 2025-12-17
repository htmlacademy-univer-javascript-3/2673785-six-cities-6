import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferDetailed, Offer } from '../../types/offer-types/offer.ts';
import { Review } from '../../types/offer-types/review.ts';
import { fetchOfferById, fetchNearbyOffers, fetchComments, postComment } from './offer-thunks.ts';

interface CurrentOfferState {
  offer: OfferDetailed | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  loading: boolean;
  error: string | null;
  reviewLoading: boolean;
  reviewError: string | null;
}

const initialState: CurrentOfferState = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  loading: false,
  error: null,
  reviewLoading: false,
  reviewError: null,
};

const offerSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {
    clearCurrentOffer: (state) => {
      state.offer = null;
      state.nearbyOffers = [];
      state.reviews = [];
      state.error = null;
      state.reviewError = null;
    },
    clearCommentError: (state) => {
      state.reviewError = null;
    },
    addComment: (state, action: PayloadAction<Review>) => {
      state.reviews.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfferById.fulfilled, (state, action: PayloadAction<OfferDetailed>) => {
        state.loading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch offer';
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.reviewLoading = true;
        state.reviewError = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviews.unshift(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.reviewLoading = false;
        state.reviewError = action.payload as string || 'Failed to post review';
      });
  },
});

export const { clearCurrentOffer, clearCommentError, addComment } = offerSlice.actions;
export default offerSlice.reducer;
