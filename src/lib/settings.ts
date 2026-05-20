import { ApiClient } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export interface Settings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  contactEmail: string;
}

class SettingsService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  // Calls the dedicated password endpoint which verifies currentPassword via bcrypt
  async updatePassword(currentPassword: string, newPassword: string) {
    return this.put('/owner/profile/password', { currentPassword, newPassword });
  }
}

export const settingsService = new SettingsService();
