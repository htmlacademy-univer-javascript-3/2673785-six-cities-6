import {RootState} from '../../types/store-types/store-types.ts';
import {createSelector} from '@reduxjs/toolkit';

export const selectAuthorizationState = (state: RootState) => state.authorization;

export const selectAuthorizationStatus = createSelector(
  selectAuthorizationState,
  (authorizationState) => authorizationState.authorizationStatus
);

export const selectUser = createSelector(
  selectAuthorizationState,
  (authorizationState) => authorizationState.user
);

export const selectAuthorizationLoading = createSelector(
  selectAuthorizationState,
  (authorizationState) => authorizationState.isLoading
);

export const selectAuthorizationError = createSelector(
  selectAuthorizationState,
  (authorizationState) => authorizationState.error
);
