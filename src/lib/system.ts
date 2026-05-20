import { ApiClient } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  source: string;
}

class SystemService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getLogs(): Promise<SystemLog[]> {
    return (await this.get<SystemLog[]>('/owner/system/logs').catch(() => null)) ?? [];
  }
}

export const systemService = new SystemService();
