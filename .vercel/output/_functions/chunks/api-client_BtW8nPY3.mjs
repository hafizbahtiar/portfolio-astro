class ApiError extends Error {
  status;
  data;
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}
class ApiClient {
  baseUrl;
  refreshTokenPromise = null;
  constructor(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }
  // Auth state is tracked via a non-httpOnly cookie set by the server.
  // The actual access_token and refresh_token are httpOnly and invisible to JS.
  isAuthenticated() {
    if (typeof document === "undefined") return false;
    return document.cookie.split(";").some((c) => c.trim() === "session_active=1");
  }
  // Clears the readable session flag. The server clears the httpOnly tokens on logout.
  clearAuthState() {
    if (typeof document !== "undefined") {
      document.cookie = "session_active=; Max-Age=0; path=/";
    }
  }
  /**
   * Silently attempt to refresh the access token using the httpOnly refresh_token cookie.
   * The server reads the cookie automatically via credentials: 'include'.
   */
  async refreshAccessToken() {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
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
  async request(endpoint, options) {
    try {
      const url = `${this.baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
      const headers = {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        ...options?.headers
      };
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
        // sends httpOnly cookies automatically
        cache: "no-store"
      });
      if (response.status === 401 && !endpoint.includes("/auth/login") && !endpoint.includes("/auth/refresh")) {
        if (!this.refreshTokenPromise) {
          this.refreshTokenPromise = this.refreshAccessToken().finally(() => {
            this.refreshTokenPromise = null;
          });
        }
        const refreshed = await this.refreshTokenPromise;
        if (refreshed) {
          return this.request(endpoint, options);
        }
        this.clearAuthState();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return null;
      }
      if (!response.ok) {
        if (response.status === 404) return null;
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.message || `API Error: ${response.status} ${response.statusText}`;
        throw new ApiError(errorMessage, response.status, errorData);
      }
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
      throw new ApiError(data.message || data.error || "Unknown API Error", response.status, data);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error(`Request failed for ${endpoint}: ${message}`);
      throw error;
    }
  }
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }
  async post(endpoint, body) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });
  }
  async put(endpoint, body) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  }
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export { ApiClient as A };
