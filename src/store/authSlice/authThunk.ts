import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanse } from '../../config/axiosInstance';
import { NavigateFunction } from 'react-router-dom';

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
export const forgot = createAsyncThunk(
  'auth/forgot',
  async (
    {
      data,
      navigate,
    }: {
      data: { email: string; photo: string };
      navigate: NavigateFunction;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstanse.post('/auth/forgot', data);
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
