// src/presentation/providers/systemStatusStore.ts

import { create } from 'zustand';
import { SystemStatusModel } from '@/domain/models/SystemStatusModel';
import { SystemStatusService } from '@/domain/services/SystemStatusService';

interface SystemStatusState {
  status: SystemStatusModel | null;
  isLoading: boolean;
  error: string | null;
  loadSystemStatus: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useSystemStatusStore = create<SystemStatusState>((set) => ({
  status: null,
  isLoading: false,
  error: null,

  loadSystemStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await SystemStatusService.getStatus();
      set({ status: data });
    } catch (e) {
      set({
        error: 'Error al obtener el estado del sistema',
        status: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  refresh: async () => {
    await useSystemStatusStore.getState().loadSystemStatus();
  },
}));
