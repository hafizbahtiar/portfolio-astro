import { API_BASE_URL } from './config';
import { ApiClient } from './api-client';


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
