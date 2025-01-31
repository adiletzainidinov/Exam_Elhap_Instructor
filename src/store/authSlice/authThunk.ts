import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanse } from '../../config/axiosInstance';
import { NavigateFunction } from 'react-router-dom';
import { isAuthAdi } from './authSlice';

interface SignUpData {
  email: string;
  password: string;
  userName: string;
  photo: string;
}

interface AuthPayload {
  data: SignUpData;
  navigate: NavigateFunction;
}

export const signUp = createAsyncThunk(
  'sign/signup',
  async ({ data, navigate }: AuthPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstanse.post('/auth/sign-up', data);
      navigate('/');
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'sign/signin',
  async (
    {
      data,
      navigate,
    }: {
      data: { email: string; password: string };
      navigate: NavigateFunction;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstanse.post('/auth/sign-in', data);
      navigate('/');
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async ({ navigate }: { navigate: NavigateFunction, },{dispatch}) => {
    try {
      const response = await axiosInstanse.post('/auth/logout');
      dispatch(isAuthAdi())
      navigate('/signIn');
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const forgot = createAsyncThunk(
  'auth/forgot',
  async (
    {
      data,
      navigate,
    }: {
      data: { email: string; frontEndUrl: string };
      navigate: NavigateFunction;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstanse.post('/auth/forgot', data);
      navigate('/reset');
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: ResetPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstanse.patch('/auth/reset-password', data);
      return response.data; 
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk(
  'auth/resetPassword',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstanse.patch('/auth/refresh', data);
      return response.data; 
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
