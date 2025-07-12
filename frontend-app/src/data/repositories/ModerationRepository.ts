// src/data/repositories/ModerationRepository.ts

import { ModerationReport } from '@/domain/models/ModerationReport';
import { AuthService } from '@/domain/services/AuthService';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export class ModerationRepository {
  // Obtener reportes con filtros opcionales por tipo o estado
  async getReports(type?: string, status?: string): Promise<ModerationReport[]> {
    const token = await AuthService.getToken();

    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (status) params.append('status', status);

    const response = await fetch(`${API_URL}/api/moderation?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al cargar los reportes de moderación');

    const data = await response.json();
    return data.map((json: any) => ModerationReport.fromJson(json));
  }

  // Resolver un reporte
  async resolveReport(reportId: string, resolutionNote: string): Promise<void> {
    const token = await AuthService.getToken();

    const response = await fetch(`${API_URL}/api/moderation/${reportId}/resolve`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ note: resolutionNote }),
    });

    if (!response.ok) throw new Error('Error al resolver el reporte');
  }

  // Rechazar un reporte
  async rejectReport(reportId: string, reason: string): Promise<void> {
    const token = await AuthService.getToken();

    const response = await fetch(`${API_URL}/api/moderation/${reportId}/reject`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) throw new Error('Error al rechazar el reporte');
  }

  // Eliminar contenido reportado
  async deleteReportedContent(contentId: string): Promise<void> {
    const token = await AuthService.getToken();

    const response = await fetch(`${API_URL}/api/content/${contentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar el contenido');
  }
}
