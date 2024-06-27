import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice/authSlice';
import { userSlice } from './userSlice/userSlice';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [userSlice.name]: userSlice.reducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
