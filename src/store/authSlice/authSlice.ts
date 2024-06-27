import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { forgot, signIn, signUp } from './authThunk';

export interface UserInfo {
  name?: string;
  number?: string;
  email?: string;
  password?: string;
  isAuth: boolean;
  token?: string;
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
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.userInfo.isAuth = true; 
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.userInfo.isAuth = true; 
      })
      .addCase(forgot.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.userInfo = action.payload;
        state.userInfo.isAuth = true;
      });
  },
});

//
//
