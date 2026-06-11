import type { MiddlewareHandler } from "astro";

/**
 * Security headers for SSR-generated HTML documents.
 *
 * `public/_headers` covers static + prerendered responses, but with
 * `output: "server"` the on-demand HTML documents (login, admin, etc.) are
 * produced by the Worker and do not pass through the static-asset header layer.
 * This middleware guarantees the same headers land on those responses.
 *
 * KEEP THE Content-Security-Policy VALUE IN SYNC WITH public/_headers.
 */
const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // static.cloudflareinsights.com (script) + cloudflareinsights.com
    // (beacon POST): Cloudflare Web Analytics is auto-injected by Cloudflare,
    // so the CSP must allow it or analytics silently fails.
    // www.google.com + www.gstatic.com (script/connect) and frame-src
    // www.google.com: Google reCAPTCHA on /login and contact.
    "script-src 'self' 'unsafe-inline' blob: https://static.cloudflareinsights.com https://www.google.com https://www.gstatic.com",
    "frame-src 'self' https://www.google.com",
    "worker-src 'self' blob:",
    // In dev the API runs on localhost:8787 — without this, the CSP silently
    // blocks every admin fetch during local development.
    `connect-src 'self' https://api.hafizbahtiar.com https://cloudflareinsights.com https://www.google.com https://www.gstatic.com https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com${
      import.meta.env.DEV ? " http://localhost:8787" : ""
    }`,
  ].join("; "),
};

export const onRequest: MiddlewareHandler = async (_context, next) => {
  const response = await next();

  // Only decorate HTML documents — never JSON/asset responses the Worker emits.
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      response.headers.set(name, value);
    }
  }

  return response;
};
