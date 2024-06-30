import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstanse } from "../../config/axiosInstance";

interface UserProfile {
 profile: {
  id: string;
  userName: string;
  role: string;
  email: string;
  isActive: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
 }
}

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstanse.get<UserProfile>("/auth/user");
      return response.data.profile;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);