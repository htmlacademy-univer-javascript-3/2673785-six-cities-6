import { configureStore } from '@reduxjs/toolkit';
import {createApi} from '../api/api.ts';
import offersSlice from '../features/offers-slice.ts';
import authorizationSlice from '../features/authorization-slice.ts';
import offerSlice from '../features/offer-slice.ts';

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
