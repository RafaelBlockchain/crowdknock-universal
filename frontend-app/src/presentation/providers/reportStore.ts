// src/presentation/providers/reportStore.ts

import { create } from 'zustand';
import { ReportModel } from '@/domain/models/ReportModel';
import { ReportService } from '@/domain/services/ReportService';

interface ReportState {
  reports: ReportModel[];
  isLoading: boolean;
  error: string | null;
  loadReports: () => Promise<void>;
  submitReport: (report: ReportModel) => Promise<void>;
  getReportsByType: (type: string) => ReportModel[];
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: [],
  isLoading: false,
  error: null,

  loadReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await ReportService.getAllReports();
      set({ reports: data });
    } catch (e) {
      set({ error: 'Error al cargar reportes' });
    } finally {
      set({ isLoading: false });
    }
  },

  submitReport: async (report: ReportModel) => {
    try {
      const created = await ReportService.submitReport(report);
      set({ reports: [created, ...get().reports] });
    } catch (e) {
      set({ error: 'Error al enviar el reporte' });
    }
  },

  getReportsByType: (type: string) => {
    return get().reports.filter((r) => r.contentType === type);
  },
}));
