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

    // Auth state is tracked via a non-httpOnly cookie set by the server.
    // The actual access_token and refresh_token are httpOnly and invisible to JS.
    isAuthenticated(): boolean {
        if (typeof document === 'undefined') return false;
        return document.cookie.split(';').some(c => c.trim() === 'session_active=1');
    }

    // Clears the readable session flag. The server clears the httpOnly tokens on logout.
    clearAuthState(): void {
        if (typeof document !== 'undefined') {
            document.cookie = 'session_active=; Max-Age=0; path=/';
        }
    }

    /**
     * Silently attempt to refresh the access token using the httpOnly refresh_token cookie.
     * The server reads the cookie automatically via credentials: 'include'.
     */
    protected async refreshAccessToken(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                this.clearAuthState();
            }
            return response.ok;
        } catch {
            this.clearAuthState();
            return false;
        }
    }

    protected async request<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
        try {
            const url = `${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                ...options?.headers,
            };

            const response = await fetch(url, {
                ...options,
                headers,
                credentials: 'include', // sends httpOnly cookies automatically
                cache: 'no-store',
            });

            // Token expired — attempt silent refresh then retry once
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
