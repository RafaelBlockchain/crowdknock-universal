// src/data/repositories/MetricRepository.ts

import { MetricModel } from '@/domain/models/MetricModel';
import { MetricService } from '@/domain/services/MetricService';

export class MetricRepository {
  private service: MetricService;

  constructor() {
    this.service = new MetricService();
  }

  // Obtener todas las métricas del sistema
  async fetchAllMetrics(): Promise<MetricModel[]> {
    return await this.service.getAllMetrics();
  }

  // Obtener una métrica específica por nombre
  async fetchMetricByName(name: string): Promise<MetricModel | null> {
    try {
      const all = await this.service.getAllMetrics();
      return all.find((m) => m.name === name) || null;
    } catch (_) {
      return null;
    }
  }
}
