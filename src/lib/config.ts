const PRODUCTION_BROWSER_API_URL = "https://api.hafizbahtiar.com/api/v1";
const PRERENDER_API_URL = "https://hono-workers.hafizbahtiar98.workers.dev/api/v1";

export const API_BASE_URL =
    import.meta.env.PUBLIC_API_URL ||
    (typeof window === "undefined" ? PRERENDER_API_URL : PRODUCTION_BROWSER_API_URL);