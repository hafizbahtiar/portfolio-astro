import { API_BASE_URL } from './config';
import { ApiClient } from './api-client';

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
    const response = await this.post<LoginResponse>('/auth/login', { email, password });
    if (response) {
      // The backend sets access_token and refresh_token as httpOnly cookies.
      // We set session_active on the frontend domain so isAuthenticated() can
      // do a cheap local check without a network roundtrip.
      document.cookie = 'session_active=1; path=/; max-age=604800; SameSite=Lax'
        + (location.protocol === 'https:' ? '; Secure' : '');
    }
    return response;
  }

  async logout(): Promise<boolean> {
    try {
      await this.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      this.clearAuthState();
    }
    return true;
  }

  tryRefresh(): Promise<boolean> {
    return this.refreshAccessToken();
  }
}

export const authService = new AuthService();
