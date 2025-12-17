import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkAuthorization, login } from './authorization-thunks.ts';

export type AuthorizationStatus = 'AUTH' | 'NO_AUTH' | 'UNKNOWN';

interface AuthorizationState {
  authorizationStatus: AuthorizationStatus;
  user: {
    email: string;
    avatarUrl: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthorizationState = {
  authorizationStatus: 'UNKNOWN',
  user: null,
  isLoading: false,
  error: null,
};

const authorizationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<{ email: string; avatarUrl: string }>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.authorizationStatus = 'NO_AUTH';
      state.user = null;
      localStorage.removeItem('six-cities-token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = 'AUTH';
        state.user = action.payload;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.isLoading = false;
        state.authorizationStatus = 'NO_AUTH';
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authorizationStatus = 'AUTH';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout, clearError } = authorizationSlice.actions;
export default authorizationSlice.reducer;
