import { API_BASE_URL } from './config';
import { ApiClient, setSharedAccessToken } from './api-client';


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
      // Set on our domain — the API's Set-Cookie is ignored cross-origin
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
}

export const authService = new AuthService();
