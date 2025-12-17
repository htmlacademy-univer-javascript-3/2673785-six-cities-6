import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferDetailed, Offer } from '../types/offerTypes/offer.ts';
import { Comment } from '../types/offerTypes/comment.ts';
import { fetchOfferById, fetchNearbyOffers, fetchComments, postComment } from './offerThunks.ts';

interface CurrentOfferState {
  offer: OfferDetailed | null;
  nearbyOffers: Offer[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
  commentLoading: boolean;
  commentError: string | null;
}

const initialState: CurrentOfferState = {
  offer: null,
  nearbyOffers: [],
  comments: [],
  loading: false,
  error: null,
  commentLoading: false,
  commentError: null,
};

const offerSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {
    clearCurrentOffer: (state) => {
      state.offer = null;
      state.nearbyOffers = [];
      state.comments = [];
      state.error = null;
      state.commentError = null;
    },
    clearCommentError: (state) => {
      state.commentError = null;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload);
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
        state.comments = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.commentLoading = true;
        state.commentError = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.comments.unshift(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentError = action.payload as string || 'Failed to post comment';
      });
  },
});

export const { clearCurrentOffer, clearCommentError, addComment } = offerSlice.actions;
export default offerSlice.reducer;
