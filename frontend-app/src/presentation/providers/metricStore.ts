// src/presentation/providers/metricStore.ts

import { create } from 'zustand';
import { MetricModel } from '@/domain/models/MetricModel';
import { MetricService } from '@/domain/services/MetricService';

interface MetricState {
  metrics: MetricModel[];
  isLoading: boolean;
  error: string | null;
  loadMetrics: () => Promise<void>;
  getMetricByName: (name: string) => MetricModel | undefined;
}

export const useMetricStore = create<MetricState>((set, get) => ({
  metrics: [],
  isLoading: false,
  error: null,

  loadMetrics: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await MetricService.getAllMetrics();
      set({ metrics: data });
    } catch (e) {
      set({ error: 'Error al cargar métricas' });
    } finally {
      set({ isLoading: false });
    }
  },

  getMetricByName: (name) => {
    return get().metrics.find((m) => m.name === name);
  },
}));
