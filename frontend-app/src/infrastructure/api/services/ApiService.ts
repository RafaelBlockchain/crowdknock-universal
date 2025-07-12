import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Preferences } from '@capacitor/preferences';
import { ApiException } from '@/infrastructure/api/helpers/ApiException';
import { ApiConfig } from '@/infrastructure/api/config';

class ApiService {
  private static instance: ApiService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: ApiConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Interceptor de respuesta
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status || 500;
        const message = error.response?.data?.message || 'Error desconocido';
        console.error(`[API Error ${statusCode}]`, message);
        throw new ApiException(statusCode, message);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async getAuthHeaders(auth = true): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (auth) {
      const { value: token } = await Preferences.get({ key: 'access_token' });
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async get<T = any>(endpoint: string, auth = true): Promise<T> {
    const headers = await this.getAuthHeaders(auth);
    const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, { headers });
    return response.data;
  }

  async post<T = any>(endpoint: string, body: any, auth = true): Promise<T> {
    const headers = await this.getAuthHeaders(auth);
    const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, body, { headers });
    return response.data;
  }

  async put<T = any>(endpoint: string, body: any, auth = true): Promise<T> {
    const headers = await this.getAuthHeaders(auth);
    const response: AxiosResponse<T> = await this.axiosInstance.put(endpoint, body, { headers });
    return response.data;
  }

  async delete<T = any>(endpoint: string, auth = true): Promise<T> {
    const headers = await this.getAuthHeaders(auth);
    const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint, { headers });
    return response.data;
  }
}

export const apiService = ApiService.getInstance();
