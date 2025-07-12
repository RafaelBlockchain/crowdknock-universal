// src/data/repositories/SystemStatusRepository.ts

import { SystemStatusModel } from '@/domain/models/SystemStatusModel';
import { SystemStatusService } from '@/domain/services/SystemStatusService';

export class SystemStatusRepository {
  private service: SystemStatusService;

  constructor() {
    this.service = new SystemStatusService();
  }

  // Obtener el estado actual del sistema desde el backend
  async fetchStatus(): Promise<SystemStatusModel> {
    return await this.service.getStatus();
  }

  // Forzar recarga o verificación (alias de fetch)
  async refreshStatus(): Promise<SystemStatusModel> {
    return await this.fetchStatus();
  }
}
