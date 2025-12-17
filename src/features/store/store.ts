import { configureStore } from '@reduxjs/toolkit';
import {createApi} from '../../api/api.ts';
import offersSlice from '../offers/offers-slice.ts';
import authorizationSlice from '../auth/authorization-slice.ts';
import offerSlice from '../offer/offer-slice.ts';

export const api = createApi();

export const appStore = configureStore({
  reducer: {
    offers: offersSlice,
    authorization: authorizationSlice,
    offer: offerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api},
      }
    })
});
