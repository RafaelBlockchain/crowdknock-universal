// src/domain/models/ReportModel.ts

export interface Report {
  id: number;
  userName: string;
  type: string;
  createdAt: Date;
  status: string;
}

export const ReportModelMapper = {
  fromJson(json: any): Report {
    return {
      id: json.id,
      userName: json.userName ?? 'Desconocido',
      type: json.type,
      createdAt: new Date(json.createdAt),
      status: json.status,
    };
  },

  toJson(report: Report): any {
    return {
      id: report.id,
      userName: report.userName,
      type: report.type,
      createdAt: report.createdAt.toISOString(),
      status: report.status,
    };
  },
};
