import { ApiClient, setSharedAccessToken } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresAt: string;
}

class AuthService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async login(email: string, password: string): Promise<LoginResponse | null> {
    const response = await this.post<LoginResponse>('/auth/login', { email, password });
    if (response?.token) {
      setSharedAccessToken(response.token);
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
}

export const authService = new AuthService();
