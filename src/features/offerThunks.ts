import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, ExtraArgument, RootState} from '../types/storeTypes/storeTypes.ts';
import {OfferDetailed, Offer} from '../types/offerTypes/offer.ts';
import {Comment, CommentData} from '../types/offerTypes/comment.ts';
import {AxiosError} from 'axios';

export const fetchOfferById = createAsyncThunk<
  OfferDetailed,
  string,
  { dispatch: AppDispatch; state: RootState; extra: ExtraArgument }
>('currentOffer/fetchOfferById', async (offerId, {extra, rejectWithValue}) => {
  try {
    const {api} = extra;
    const response = await api.get<OfferDetailed>(`/offers/${offerId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return rejectWithValue('Offer not found');
    }
    return rejectWithValue('Failed to fetch offer');
  }
});

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  { dispatch: AppDispatch; state: RootState; extra: ExtraArgument }
>('currentOffer/fetchNearbyOffers', async (offerId, {extra}) => {
  const {api} = extra;
  const response = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
  return response.data;
});

export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  { dispatch: AppDispatch; state: RootState; extra: ExtraArgument }
>('currentOffer/fetchComments', async (offerId, {extra}) => {
  const {api} = extra;
  const response = await api.get<Comment[]>(`/comments/${offerId}`);
  return response.data;
});

export const postComment = createAsyncThunk<
  Comment,
  { offerId: string; commentData: CommentData },
  { dispatch: AppDispatch; state: RootState; extra: ExtraArgument; rejectValue: string }
>('currentOffer/postComment', async ({offerId, commentData}, {extra, rejectWithValue}) => {
  try {
    const {api} = extra;
    const response = await api.post<Comment>(`/comments/${offerId}`, commentData);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue('Failed to post comment');
  }
});
