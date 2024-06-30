import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { forgot, signIn, signUp, refresh } from './authThunk';

export interface UserInfo {
  name?: string;
  number?: string;
  email?: string;
  password?: string;
  isAuth: boolean;
  token?: string;
  message: string | null;
  accessToken: string;
  accessTokenExpiration: string;
  refreshToken: string;
}

interface AuthState {
  userInfo: UserInfo;
}

const initialState: AuthState = {
  userInfo: {
    name: '',
    number: '',
    email: '',
    password: '',
    isAuth: false,
    token: '',
    message: null,
    accessToken: '',
    accessTokenExpiration: '',
    refreshToken: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuthAdi: (state) => {
      state.userInfo.isAuth = !state.userInfo.isAuth;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.userInfo.isAuth = true;
        state.userInfo.accessToken = action.payload.accessToken;
        state.userInfo.accessTokenExpiration =
          action.payload.accessTokenExpiration;
        state.userInfo.refreshToken = action.payload.refreshToken;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.userInfo.isAuth = true;
        state.userInfo.accessToken = action.payload.accessToken;
        state.userInfo.accessTokenExpiration =
          action.payload.accessTokenExpiration;
        state.userInfo.refreshToken = action.payload.refreshToken;
      })
      .addCase(forgot.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.userInfo.isAuth = true;
      })
      .addCase(refresh.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.userInfo.isAuth = true;
        state.userInfo.accessToken = action.payload.accessToken;
        state.userInfo.accessTokenExpiration =
          action.payload.accessTokenExpiration;
        state.userInfo.refreshToken = action.payload.refreshToken;
      });
  },
});

export const { isAuthAdi } = authSlice.actions;
