// src/models/system/SystemStatus.ts

export interface SystemStatus {
  apiStatus: string;
  dbStatus: string;
  version: string;
  lastUpdated: Date;
  serverUptime: number;
  activeUsers: number;
  systemLoad: number[];
  memoryUsage: number;
  lastDowntime: string;
}

export function parseSystemStatus(json: any): SystemStatus {
  return {
    apiStatus: json.apiStatus ?? 'desconocido',
    dbStatus: json.dbStatus ?? 'desconocido',
    version: json.version ?? 'N/A',
    lastUpdated: new Date(json.lastUpdated),
    serverUptime: typeof json.serverUptime === 'number' ? json.serverUptime : 0,
    activeUsers: typeof json.activeUsers === 'number' ? json.activeUsers : 0,
    systemLoad: Array.isArray(json.systemLoad)
      ? json.systemLoad.map((e: any) => Number(e))
      : [],
    memoryUsage: typeof json.memoryUsage === 'number' ? json.memoryUsage : 0,
    lastDowntime: json.lastDowntime ?? '',
  };
}
