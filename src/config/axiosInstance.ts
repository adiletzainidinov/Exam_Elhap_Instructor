import axios from 'axios';
import { store } from '../store/store';

export const axiosInstanse = axios.create({
  baseURL: 'https://api-peakspace.elcho.dev/api/v1',
});

axiosInstanse.interceptors.request.use(
  function (config) {
    const { accessToken } = store.getState().auth.userInfo;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstanse.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
