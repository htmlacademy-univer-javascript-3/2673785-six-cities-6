import { configureStore } from '@reduxjs/toolkit';
import {createApi} from '../api/api.ts';
import offersSlice from '../features/offersSlice.ts';
import authorizationSlice from '../features/authorizationSlice.ts';
import offerSlice from '../features/offerSlice.ts';

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
