// src/domain/models/SystemStatusModel.ts

export interface SystemStatusModel {
  apiOnline: boolean;
  lastCheck: Date;
  activeUsers: number;
  pendingReports: number;
  totalChallenges: number;
  totalContentItems: number;
}

export const SystemStatusModelMapper = {
  fromJson(json: any): SystemStatusModel {
    return {
      apiOnline: json.apiOnline ?? false,
      lastCheck: json.lastCheck ? new Date(json.lastCheck) : new Date(),
      activeUsers: json.activeUsers ?? 0,
      pendingReports: json.pendingReports ?? 0,
      totalChallenges: json.totalChallenges ?? 0,
      totalContentItems: json.totalContentItems ?? 0,
    };
  },

  toJson(status: SystemStatusModel): any {
    return {
      apiOnline: status.apiOnline,
      lastCheck: status.lastCheck.toISOString(),
      activeUsers: status.activeUsers,
      pendingReports: status.pendingReports,
      totalChallenges: status.totalChallenges,
      totalContentItems: status.totalContentItems,
    };
  }
};
