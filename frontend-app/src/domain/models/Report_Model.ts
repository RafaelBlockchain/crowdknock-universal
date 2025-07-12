// src/domain/models/Report_Model.ts

export interface Report {
  id: string;
  user: string; // alias de 'reportedBy'
  contentId: string;
  contentType: string; // alias de 'type'
  reason: string; // alias de 'message'
  createdAt: Date;
  status: string;
}

export const ReportModelMapper = {
  fromJson(json: any): Report {
    return {
      id: json._id ?? json.id ?? '',
      user: json.reportedBy ?? json.user ?? '',
      contentId: json.contentId ?? '',
      contentType: json.contentType ?? json.type ?? '',
      reason: json.reason ?? json.message ?? '',
      createdAt: json.createdAt ? new Date(json.createdAt) : new Date(),
      status: json.status ?? 'pending',
    };
  },

  toJson(report: Report): any {
    return {
      _id: report.id,
      reportedBy: report.user,
      contentId: report.contentId,
      contentType: report.contentType,
      reason: report.reason,
      createdAt: report.createdAt.toISOString(),
      status: report.status,
    };
  },
};
