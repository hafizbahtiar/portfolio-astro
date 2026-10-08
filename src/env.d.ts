interface Window {
  setupDropdowns?: () => void;
}

// Cloudflare runtime env (wrangler.jsonc). Only what the app uses.
declare module "cloudflare:workers" {
  export const env: {
    /** Service binding to the hono-workers API Worker (absent in some local setups). */
    API?: { fetch(input: string | Request | URL, init?: RequestInit): Promise<Response> };
  };
}
