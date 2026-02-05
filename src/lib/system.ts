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

  // NOTE: There is no backend endpoint for system logs yet.
  // I will create a mock implementation that returns some realistic data.
  // In a real scenario, we would have a 'logs' table or service.

  async getLogs(): Promise<SystemLog[]> {
    // Mock data
    return [
      {
        id: '1',
        level: 'info',
        message: 'System started successfully',
        timestamp: new Date().toISOString(),
        source: 'System'
      },
      {
        id: '2',
        level: 'warning',
        message: 'High memory usage detected',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        source: 'Monitor'
      },
      {
        id: '3',
        level: 'info',
        message: 'User logged in',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        source: 'Auth'
      },
      {
        id: '4',
        level: 'error',
        message: 'Failed to connect to external API',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        source: 'Integration'
      }
    ];
  }
}

export const systemService = new SystemService();
