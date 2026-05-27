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

export class ApiClient {
    protected baseUrl: string;
    private refreshTokenPromise: Promise<boolean> | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
    }

    // session_active is a non-httpOnly cookie the frontend sets on login as a cheap
    // local indicator. The real tokens (access_token, refresh_token) are httpOnly
    // cookies on the API domain, sent automatically by credentials: 'include'.
    isAuthenticated(): boolean {
        if (typeof document === 'undefined') return false;
        return document.cookie.split(';').some(c => c.trim() === 'session_active=1');
    }

    clearAuthState(): void {
        if (typeof document !== 'undefined') {
            document.cookie = 'session_active=; Max-Age=0; path=/';
        }
    }

    // Silently exchange the httpOnly refresh_token cookie for a new access_token cookie.
    protected async refreshAccessToken(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
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

            const response = await fetch(url, {
                ...options,
                headers,
                cache: 'no-store',
                credentials: 'include',
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
