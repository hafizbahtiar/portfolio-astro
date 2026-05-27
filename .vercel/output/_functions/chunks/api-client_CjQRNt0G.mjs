import { c as createComponent } from './astro-component_BCrB7690.mjs';
import 'piccolore';
import { q as createRenderInstruction, c as addAttribute, b as renderTemplate, r as renderComponent, v as renderHead, e as renderSlot, m as maybeRenderHead } from './entrypoint_DePlxNSC.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/node_modules/astro/components/ClientRouter.astro", void 0);

const $$CoreLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CoreLayout;
  const {
    title = "Hafiz Bahtiar - Flutter Developer",
    description = "Portfolio of Hafiz Bahtiar, a Flutter Developer specializing in mobile apps and backend systems.",
    class: className = ""
  } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-ugthecfy> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width">${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-ugthecfy": true })}<link rel="apple-touch-icon" sizes="57x57" href="/favicons/favicon-57x57.png"><link rel="apple-touch-icon" sizes="60x60" href="/favicons/favicon-60x60.png"><link rel="apple-touch-icon" sizes="72x72" href="/favicons/favicon-72x72.png"><link rel="apple-touch-icon" sizes="76x76" href="/favicons/favicon-76x76.png"><link rel="apple-touch-icon" sizes="114x114" href="/favicons/favicon-114x114.png"><link rel="apple-touch-icon" sizes="120x120" href="/favicons/favicon-120x120.png"><link rel="apple-touch-icon" sizes="144x144" href="/favicons/favicon-144x144.png"><link rel="apple-touch-icon" sizes="152x152" href="/favicons/favicon-152x152.png"><link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-180x180.png"><link rel="icon" type="image/png" sizes="192x192" href="/favicons/favicon-192x192.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"><link rel="manifest" href="/manifest.json"><meta name="msapplication-TileColor" content="#ffffff"><meta name="msapplication-TileImage" content="/favicons/favicon-144x144.png"><meta name="theme-color" content="#ffffff"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/layouts/CoreLayout.astro?astro&type=script&index=0&lang.ts")}${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/layouts/CoreLayout.astro?astro&type=script&index=1&lang.ts")}${renderHead()}</head> <body${addAttribute(`flex flex-col min-h-screen ${className}`, "class")} data-astro-cid-ugthecfy> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/layouts/CoreLayout.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Navbar;
  const links = [
    { text: "Projects", href: "/projects", reload: false },
    { text: "Skills", href: "/#skills", reload: true },
    { text: "Contact", href: "/#contact", reload: true }
  ];
  return renderTemplate`${maybeRenderHead()}<nav id="main-nav" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5" data-astro-cid-jp2pq5zm> <div id="nav-container" class="container-main flex items-center justify-between transition-all duration-300" data-astro-cid-jp2pq5zm> <a href="/" data-astro-reload class="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors" data-astro-cid-jp2pq5zm>
Hafiz.dev
</a> <div class="flex items-center gap-1" data-astro-cid-jp2pq5zm> <!-- Desktop nav links --> <div class="hidden md:flex items-center gap-1" id="navbar-default" data-astro-cid-jp2pq5zm> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(link.reload ? true : void 0, "data-astro-reload")} class="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all" data-astro-cid-jp2pq5zm> ${link.text} </a>`)} </div> <!-- Theme toggle --> <button id="theme-toggle" type="button" aria-label="Toggle theme" class="theme-toggle-btn p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" data-astro-cid-jp2pq5zm> <!-- Sun icon — shown in dark mode --> <svg id="theme-sun" class="hidden w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-jp2pq5zm> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" data-astro-cid-jp2pq5zm></path> </svg> <!-- Moon icon — shown in light mode --> <svg id="theme-moon" class="block w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-jp2pq5zm> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-astro-cid-jp2pq5zm></path> </svg> </button> <!-- Hamburger (mobile) --> <button id="navbar-toggle" type="button" class="inline-flex items-center p-2 w-9 h-9 justify-center text-slate-500 dark:text-slate-400 rounded-lg md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-controls="navbar-default" aria-expanded="false" data-astro-cid-jp2pq5zm> <span class="sr-only" data-astro-cid-jp2pq5zm>Open main menu</span> <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-astro-cid-jp2pq5zm> <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-jp2pq5zm></path> </svg> </button> </div> </div> <!-- Mobile menu --> <div id="mobile-menu" class="hidden md:hidden mx-4 mt-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/97 dark:bg-slate-900/97 backdrop-blur-xl overflow-hidden" data-astro-cid-jp2pq5zm> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(link.reload ? true : void 0, "data-astro-reload")} class="block px-4 py-3 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" data-astro-cid-jp2pq5zm> ${link.text} </a>`)} </div> </nav>  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Footer;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const links = [
    { text: "About", href: "/#about" },
    { text: "Projects", href: "/projects" },
    { text: "Blog", href: "/blog" },
    { text: "Contact", href: "/#contact" }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-slate-200/60 dark:border-slate-700/60"> <div class="container-main py-12"> <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"> <div> <a href="/" class="text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
Hafiz.dev
</a> <p class="mt-1 text-sm text-slate-400 dark:text-slate-500">
Full-stack engineer · Open to opportunities
</p> </div> <nav class="flex flex-wrap gap-x-6 gap-y-2"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="text-sm text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"> ${link.text} </a>`)} </nav> </div> <div class="mt-8 pt-8 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-500"> <span>© ${currentYear} Hafiz Bahtiar. All rights reserved.</span> <span>Built with Astro + Cloudflare</span> </div> </div> </footer>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Footer.astro", void 0);

const $$Background = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="bg-base" class="fixed inset-0 z-[-1]" data-astro-cid-nexh5ixr> <!-- Subtle dot grid (adapts to theme) --> <div class="absolute inset-0 bg-[radial-gradient(#94a3b820_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px]" data-astro-cid-nexh5ixr></div> <!-- Soft blue ambient glow --> <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[45vh] bg-blue-400/8 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" data-astro-cid-nexh5ixr></div> </div>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Background.astro", void 0);

const $$PublicLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PublicLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "CoreLayout", $$CoreLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Background", $$Background, {})} ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="flex-grow pt-20"> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/layouts/PublicLayout.astro", void 0);

const API_BASE_URL = "http://localhost:8787/api/v1";

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
  // session_active is a non-httpOnly cookie the frontend sets on login as a cheap
  // local indicator. The real tokens (access_token, refresh_token) are httpOnly
  // cookies on the API domain, sent automatically by credentials: 'include'.
  isAuthenticated() {
    if (typeof document === "undefined") return false;
    return document.cookie.split(";").some((c) => c.trim() === "session_active=1");
  }
  clearAuthState() {
    if (typeof document !== "undefined") {
      document.cookie = "session_active=; Max-Age=0; path=/";
    }
  }
  // Silently exchange the httpOnly refresh_token cookie for a new access_token cookie.
  async refreshAccessToken() {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
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
  async request(endpoint, options) {
    try {
      const url = `${this.baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
      const headers = {
        "Content-Type": "application/json",
        ...options?.headers
      };
      const response = await fetch(url, {
        ...options,
        headers,
        cache: "no-store",
        credentials: "include"
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

export { $$PublicLayout as $, ApiClient as A, API_BASE_URL as a, renderScript as r };
