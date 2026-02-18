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
    protected accessToken: string | null = null;
    protected refreshToken: string | null = null;
    protected isRefreshing = false;
    protected failedQueue: Array<{
        resolve: (value: unknown) => void;
        reject: (reason?: any) => void;
    }> = [];

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash if present

        // Load tokens from storage if available (client-side only)
        if (typeof window !== 'undefined') {
            this.accessToken = localStorage.getItem('access_token');
            this.refreshToken = localStorage.getItem('refresh_token');
        }
    }

    setTokens(accessToken: string, refreshToken: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
        }
    }

    clearTokens() {
        this.accessToken = null;
        this.refreshToken = null;

        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    }

    getAccessToken(): string | null {
        return this.accessToken;
    }

    /**
     * Process the queue of failed requests
     */
    protected processQueue(error: any, token: string | null = null) {
        this.failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });
        this.failedQueue = [];
    }

    /**
     * Attempt to refresh the access token
     */
    protected async refreshAccessToken(): Promise<string | null> {
        if (!this.refreshToken) return null;

        try {
            const url = `${this.baseUrl}/auth/refresh`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: this.refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Refresh failed');
            }

            const data = await response.json();
            if (data.success && data.data?.token) {
                const newAccessToken = data.data.token;
                // If the backend returns a new refresh token, update it too
                const newRefreshToken = data.data.refreshToken || this.refreshToken;

                this.setTokens(newAccessToken, newRefreshToken);
                return newAccessToken;
            }

            return null;
        } catch (error) {
            this.clearTokens();
            return null;
        }
    }

    /**
     * Helper to handle fetch requests
     */
    protected async request<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
        try {
            const url = `${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

            // Attach Authorization header if token exists
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                ...options?.headers,
            };

            if (this.accessToken) {
                (headers as any)['Authorization'] = `Bearer ${this.accessToken}`;
            }

            const response = await fetch(url, {
                ...options,
                headers,
            });

            // Handle 401 Unauthorized (Token Expired)
            if (response.status === 401 && this.refreshToken && !endpoint.includes('/auth/login')) {
                if (this.isRefreshing) {
                    return new Promise((resolve, reject) => {
                        this.failedQueue.push({ resolve, reject });
                    }).then(() => {
                        return this.request<T>(endpoint, options);
                    });
                }

                this.isRefreshing = true;
                const newToken = await this.refreshAccessToken();
                this.isRefreshing = false;

                if (newToken) {
                    this.processQueue(null, newToken);
                    // Retry original request
                    return this.request<T>(endpoint, options);
                } else {
                    this.processQueue(new Error('Failed to refresh token'));
                    this.clearTokens();
                    // Optional: Redirect to login
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';
                    }
                    return null;
                }
            }

            if (!response.ok) {
                // Handle 404 specifically if needed, or just throw
                if (response.status === 404) return null;
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.error || errorData.message || `API Error: ${response.status} ${response.statusText}`;
                throw new ApiError(errorMessage, response.status, errorData);
            }

            const data: ApiResponse<T> = await response.json();

            if (data.success) {
                return data.data;
            }

            console.error(`API returned failure: ${data.message || data.error}`);
            throw new ApiError(data.message || data.error || 'Unknown API Error', response.status, data);

        } catch (error) {
            console.error(`Request failed for ${endpoint}:`, error);
            // Re-throw so the UI can show the error
            throw error;
        }
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string): Promise<T | null> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string, body: any): Promise<T | null> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string, body: any): Promise<T | null> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string): Promise<T | null> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}
