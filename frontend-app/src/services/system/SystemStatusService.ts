// src/services/system/SystemStatusService.ts

import { parseSystemStatus, SystemStatus } from '@/models/system/SystemStatus';
import { API_BASE_URL, getJwtToken } from '@/config/env';

export class SystemStatusService {
  static async fetchStatus(): Promise<SystemStatus> {
    const token = await getJwtToken(); // Función que obtiene tu JWT (puede usar SecureStorage o AsyncStorage)

    const response = await fetch(`${API_BASE_URL}/system/status`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener estado del sistema');
    }

    const data = await response.json();
    return parseSystemStatus(data);
  }
}
