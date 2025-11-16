import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../reducers/reducers.ts';

export const appStore = configureStore({
  reducer: appReducer
});
