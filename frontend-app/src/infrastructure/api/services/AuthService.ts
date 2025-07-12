import { Preferences } from '@capacitor/preferences';
import axios from 'axios';
import { ApiConfig } from '@/infrastructure/api/config';
import { apiService } from './ApiService';

export class AuthService {
  private static baseUrl = ApiConfig.baseUrl;

  // ===========================
  // 🔐 Register
  // ===========================
  static async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<boolean> {
    try {
      const response = await apiService.post('/auth/register', {
        name,
        email,
        password,
      });
      return response?.statusCode === 201 || true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  }

  // ===========================
  // 🔐 Login
  // ===========================
  static async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/login`, {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      const token = response.data.token;
      if (token) {
        await Preferences.set({ key: 'auth_token', value: token });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  // ===========================
  // 🚪 Logout
  // ===========================
  static async logout(): Promise<void> {
    await Preferences.remove({ key: 'auth_token' });
  }

  // ===========================
  // 📥 Get Token
  // ===========================
  static async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'auth_token' });
    return value ?? null;
  }

  // ===========================
  // ✅ Is Logged In
  // ===========================
  static async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  // ===========================
  // 🔄 Reset Password
  // ===========================
  static async resetPassword({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/reset-password`, {
        token,
        password: newPassword,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      return response.status === 200;
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error('Error al restablecer contraseña');
    }
  }
}
