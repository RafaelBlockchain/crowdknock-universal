// src/data/repositories/ReportRepository.ts

import { ReportModel } from '@/domain/models/ReportModel';
import { ReportService } from '@/domain/services/ReportService';

export class ReportRepository {
  private service: ReportService;

  constructor() {
    this.service = new ReportService();
  }

  // Obtener todos los reportes desde el backend
  async fetchAllReports(): Promise<ReportModel[]> {
    return await this.service.getAllReports();
  }

  // Obtener reportes filtrados por tipo
  async fetchReportsByType(type: string): Promise<ReportModel[]> {
    const all = await this.service.getAllReports();
    return all.filter(r => r.reportType === type);
  }

  // Enviar un nuevo reporte
  async submitReport(report: ReportModel): Promise<ReportModel> {
    return await this.service.submitReport(report);
  }
}
