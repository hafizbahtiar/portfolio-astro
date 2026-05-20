import { ApiClient } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: User;
  expiresAt: string;
}

class AuthService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async login(email: string, password: string): Promise<LoginResponse | null> {
    try {
      const response = await this.post<LoginResponse>('/auth/login', { email, password });
      // Cookies (access_token, refresh_token, session_active) are set by the server.
      // isAuthenticated() will return true automatically once session_active cookie is set.
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<boolean> {
    try {
      await this.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      // Clear the readable session flag in case the server call failed
      this.clearAuthState();
    }
    return true;
  }
}

export const authService = new AuthService();
