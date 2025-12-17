import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, ExtraArgument, RootState} from '../types/store-types/store-types.ts';
import {Offer} from '../types/offer-types/offer.ts';

export const fetchOffers = createAsyncThunk<Offer[], void, { dispatch: AppDispatch; state: RootState; extra: ExtraArgument }>(
  'offers/fetchOffers', async (_, {extra}) => {
    const {api} = extra;
    const response = await api.get<Offer[]>('/offers');
    return response.data;
  }
);

export const login = createAsyncThunk<string, { email: string; password: string }, { extra: ExtraArgument }>(
  'user/login', async (credentials, {extra}) => {
    const {api} = extra;
    const response = await api.post<{ token: string }>('/login', credentials);
    const token = response.data.token;

    localStorage.setItem('six-cities-token', token);

    return token;
  }
);
