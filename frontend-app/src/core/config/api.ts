// frontend-app/src/core/config/api.ts

import axios from 'axios';
import { getItem } from '../utils/storage';
import { Env } from './env';

export const api = axios.create({
  baseURL: Env.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function setAuthToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearAuthToken() {
  delete api.defaults.headers.common['Authorization'];
}

// Optional: Auto attach token from AsyncStorage if needed
api.interceptors.request.use(async (config) => {
  const token = await getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
