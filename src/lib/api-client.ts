export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
    field?: string;
}

export class ApiError extends Error {
    status?: number;
    data?: any;

    constructor(message: string, status?: number, data?: any) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

// Module-level token — shared across all ApiClient instances, cleared on page refresh.
// Kept in memory (not localStorage, not a readable cookie) so it is not accessible to
// third-party scripts injected into the page.
let _accessToken: string | null = null;

export const setSharedAccessToken = (token: string | null): void => {
    _accessToken = token;
};

export const getSharedAccessToken = (): string | null => _accessToken;

export class ApiClient {
    protected baseUrl: string;
    private refreshTokenPromise: Promise<boolean> | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
    }

    // session_active is a non-httpOnly cookie the server sets alongside the real tokens.
    // It lets JS know a session exists without exposing the actual token value.
    isAuthenticated(): boolean {
        if (typeof document === 'undefined') return false;
        return _accessToken !== null || document.cookie.split(';').some(c => c.trim() === 'session_active=1');
    }

    clearAuthState(): void {
        _accessToken = null;
        if (typeof document !== 'undefined') {
            document.cookie = 'session_active=; Max-Age=0; path=/';
        }
    }

    // Silently exchange the httpOnly refresh_token cookie for a new access token.
    // credentials: 'include' is only needed here — not on every request.
    protected async refreshAccessToken(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const json = await response.json().catch(() => ({}));
                if (json?.data?.token) {
                    _accessToken = json.data.token;
                }
                return true;
            }
            this.clearAuthState();
            return false;
        } catch {
            this.clearAuthState();
            return false;
        }
    }

    protected async request<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
        try {
            const url = `${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...(options?.headers as Record<string, string>),
            };

            // Attach token via header — works cross-origin without needing credentials: include
            if (_accessToken) {
                headers['Authorization'] = `Bearer ${_accessToken}`;
            }

            const response = await fetch(url, {
                ...options,
                headers,
                cache: 'no-store',
            });

            // Token expired — attempt silent refresh via the httpOnly cookie, then retry once
            if (response.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/refresh')) {
                if (!this.refreshTokenPromise) {
                    this.refreshTokenPromise = this.refreshAccessToken().finally(() => {
                        this.refreshTokenPromise = null;
                    });
                }

                const refreshed = await this.refreshTokenPromise;

                if (refreshed) {
                    return this.request<T>(endpoint, options);
                }

                this.clearAuthState();
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return null;
            }

            if (!response.ok) {
                if (response.status === 404) return null;
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || errorData.message || `API Error: ${response.status} ${response.statusText}`;
                throw new ApiError(errorMessage, response.status, errorData);
            }

            const data: ApiResponse<T> = await response.json();

            if (data.success) {
                return data.data;
            }

            throw new ApiError(data.message || data.error || 'Unknown API Error', response.status, data);

        } catch (error) {
            if (error instanceof ApiError) throw error;
            const message = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Request failed for ${endpoint}: ${message}`);
            throw error;
        }
    }

    async get<T>(endpoint: string): Promise<T | null> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, body: any): Promise<T | null> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    async put<T>(endpoint: string, body: any): Promise<T | null> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    async delete<T>(endpoint: string): Promise<T | null> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}
