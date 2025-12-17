import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AppDispatch, RootState, ExtraArgument } from '../../types/store-types/store-types.ts';

export interface AuthorizationData {
  email: string;
  password: string;
}

export interface UserData {
  email: string;
  avatarUrl: string;
  token: string;
}

interface ServerError {
  message?: string;
}

export const login = createAsyncThunk<
  { email: string; avatarUrl: string },
  AuthorizationData,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: ExtraArgument;
    rejectValue: string;
  }
>('auth/login', async (authorizationData, { extra, rejectWithValue }) => {
  try {
    const { api } = extra;
    const response = await api.post<UserData>('/login', authorizationData);

    localStorage.setItem('six-cities-token', response.data.token);

    return {
      email: response.data.email,
      avatarUrl: response.data.avatarUrl,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const axiosError = error as AxiosError<ServerError>;

      if (axiosError.response?.data?.message) {
        return rejectWithValue(axiosError.response.data.message);
      }
      if (axiosError.response?.status === 400) {
        return rejectWithValue('Invalid email or password format');
      }
    }

    return rejectWithValue('Login failed. Please try again.');
  }
});

export const checkAuthorization = createAsyncThunk<
  { email: string; avatarUrl: string },
  void,
  { dispatch: AppDispatch; state: RootState; extra: ExtraArgument }
>('auth/checkAuth', async (_, { extra }) => {
  const { api } = extra;
  const response = await api.get<UserData>('/login');
  return {
    email: response.data.email,
    avatarUrl: response.data.avatarUrl,
  };
});
