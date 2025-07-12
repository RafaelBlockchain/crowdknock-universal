// src/repositories/DashboardRepository.ts

import { AuthService } from '../services/AuthService';
import { API_BASE_URL } from '../config/env';

export class DashboardRepository {
  static async fetchDashboardStats(): Promise<Record<string, any>> {
    try {
      const token = await AuthService.getToken();

      const response = await fetch(`${API_BASE_URL}/api/dashboard`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar estadísticas del dashboard');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
