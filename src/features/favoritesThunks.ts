import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, ExtraArgument, RootState } from '../types/storeTypes/storeTypes.ts';
import { Offer } from '../types/offerTypes/offer.ts';

export const fetchFavorites = createAsyncThunk<
  Offer[],
  void,
  { dispatch: AppDispatch; state: RootState; extra: ExtraArgument }
>('favorites/fetchFavorites', async (_, { extra }) => {
  const { api } = extra;
  const response = await api.get<Offer[]>('/favorite');
  return response.data;
});

export const toggleFavorite = createAsyncThunk<
  { offerId: string; isFavorite: boolean; offer: Offer },
  { offerId: string; isFavorite: boolean },
  { dispatch: AppDispatch; state: RootState; extra: ExtraArgument; rejectValue: string }
>('favorites/toggleFavorite', async ({ offerId, isFavorite }, { extra, rejectWithValue }) => {
  try {
    const { api } = extra;
    const status = isFavorite ? 0 : 1;
    const response = await api.post<Offer>(`/favorite/${offerId}/${status}`);

    return {
      offerId,
      isFavorite: !isFavorite,
      offer: response.data
    };
  } catch (error: unknown) {
    return rejectWithValue('Failed to toggle favorite');
  }
});
