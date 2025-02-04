import axios, { AxiosInstance } from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const reqResApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

reqResApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);
