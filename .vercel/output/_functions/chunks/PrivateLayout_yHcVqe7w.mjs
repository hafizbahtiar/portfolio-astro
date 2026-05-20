import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { z as maybeRenderHead, a3 as addAttribute, Q as renderTemplate, F as Fragment, C as renderSlot } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript, $ as $$CoreLayout, a as $$Background } from './Background_CT-Pdz5l.mjs';
import 'clsx';

const $$AdminSidebar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminSidebar;
  const links = [
    {
      text: "Dashboard",
      href: "/admin",
      icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    },
    {
      text: "Projects",
      href: "/admin/projects",
      icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    },
    {
      text: "Experiences",
      href: "/admin/experiences",
      icon: "M6 7V4a2 2 0 012-2h8a2 2 0 012 2v3m-1 0H7m11 0a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2m2-3h8"
    },
    {
      text: "Family",
      href: "/admin/family",
      icon: "M17 20h5V18a4 4 0 00-5-3.87M9 20H2V18a4 4 0 015-3.87m10-7a3 3 0 11-6 0 3 3 0 016 0zM13 7a3 3 0 11-6 0 3 3 0 016 0zM7 7a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
      text: "Blog",
      href: "/admin/blog",
      icon: "M7 8h10M7 12h10M7 16h6M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
    },
    {
      text: "Policies",
      href: "/admin/policies",
      icon: "M7 7h10m-10 4h10m-10 4h10m-10 4h6"
    },
    {
      text: "Contacts",
      href: "/admin/contact",
      icon: "M4 6h16M4 12h16M4 18h7"
    },
    {
      text: "System Logs",
      href: "/admin/system",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    },
    {
      text: "Settings",
      href: "/admin/settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
      text: "Profile",
      href: "/admin/profile",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<aside id="admin-sidebar" class="fixed inset-y-0 left-0 z-40 w-64 bg-gray-900/80 backdrop-blur-xl border-r border-white/10 transform -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out is-open" data-astro-cid-upom7in7> <div class="h-full flex flex-col" data-astro-cid-upom7in7> <!-- Header --> <div class="p-6 border-b border-white/10 flex items-center justify-between" data-astro-cid-upom7in7> <h1 class="sidebar-title text-xl font-bold text-white tracking-wider" aria-label="Admin Core" data-astro-cid-upom7in7>
ADMIN<span class="text-cyan-400" data-astro-cid-upom7in7>.CORE</span> </h1> <button id="close-sidebar" class="md:hidden text-gray-400 hover:text-white" data-astro-cid-upom7in7> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-upom7in7> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-upom7in7></path> </svg> </button> </div> <!-- Navigation --> <nav class="flex-grow p-4 space-y-2 overflow-y-auto" data-astro-cid-upom7in7> ${links.map((link) => {
    const isActive = currentPath === link.href || link.href !== "/admin" && currentPath.startsWith(link.href);
    return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(link.text, "aria-label")}${addAttribute([
      "nav-item flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
      isActive ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
    ], "class:list")} data-astro-cid-upom7in7> <svg xmlns="http://www.w3.org/2000/svg"${addAttribute([
      "nav-icon h-5 w-5",
      isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-white"
    ], "class:list")} fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-upom7in7> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${addAttribute(link.icon, "d")} data-astro-cid-upom7in7></path> </svg> <span class="nav-label font-medium" data-astro-cid-upom7in7>${link.text}</span> </a>`;
  })} </nav> <!-- User Profile Footer --> <div class="p-4 border-t border-white/10 bg-gray-900/50" data-astro-cid-upom7in7> <div class="space-y-3" data-astro-cid-upom7in7> <div class="flex items-center space-x-3 px-2" data-astro-cid-upom7in7> <div class="relative" data-astro-cid-upom7in7> <div class="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm" data-astro-cid-upom7in7>
HB
</div> <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" data-astro-cid-upom7in7></div> </div> <div class="user-meta flex-grow min-w-0" data-astro-cid-upom7in7> <div class="text-white font-medium truncate" data-astro-cid-upom7in7>Hafiz Bahtiar</div> <div class="text-gray-500 text-xs truncate" data-astro-cid-upom7in7>Super Admin</div> </div> </div> <button id="logout-btn" class="logout-btn w-full inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-white transition-colors" type="button" data-astro-cid-upom7in7> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-upom7in7> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" data-astro-cid-upom7in7></path> </svg> <span class="logout-label" data-astro-cid-upom7in7>Logout</span> </button> </div> </div> </div> </aside>  <!-- Overlay for mobile --> <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 hidden opacity-0 transition-opacity duration-300 md:hidden" data-astro-cid-upom7in7></div> <div id="logout-modal" class="fixed inset-0 z-50 hidden" aria-labelledby="logout-modal-title" role="dialog" aria-modal="true" data-astro-cid-upom7in7> <div class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity opacity-0" id="logout-backdrop" data-astro-cid-upom7in7></div> <div class="fixed inset-0 z-10 overflow-y-auto" data-astro-cid-upom7in7> <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" data-astro-cid-upom7in7> <div class="relative transform overflow-hidden rounded-lg bg-gray-900 border border-red-500/30 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" id="logout-panel" data-astro-cid-upom7in7> <div class="bg-gray-800/50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4" data-astro-cid-upom7in7> <div class="sm:flex sm:items-start" data-astro-cid-upom7in7> <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10" data-astro-cid-upom7in7> <svg class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-astro-cid-upom7in7> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3.75h.007v.008H12v-.008z" data-astro-cid-upom7in7></path> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M6 6.75V5.25a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 5.25v1.5" data-astro-cid-upom7in7></path> </svg> </div> <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left" data-astro-cid-upom7in7> <h3 class="text-base font-semibold leading-6 text-white" id="logout-modal-title" data-astro-cid-upom7in7>
Log out
</h3> <div class="mt-2" data-astro-cid-upom7in7> <p class="text-sm text-gray-300" data-astro-cid-upom7in7>
Are you sure you want to log out? You'll need to sign in again
                  to access the admin panel.
</p> </div> </div> </div> </div> <div class="bg-gray-900/50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2" data-astro-cid-upom7in7> <button type="button" id="logout-confirm-btn" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto transition-colors" data-astro-cid-upom7in7>
Log out
</button> <button type="button" id="logout-cancel-btn" class="mt-3 inline-flex w-full justify-center rounded-md bg-transparent border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-gray-800 sm:mt-0 sm:w-auto transition-colors" data-astro-cid-upom7in7>
Cancel
</button> </div> </div> </div> </div> </div> ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/admin/AdminSidebar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/admin/AdminSidebar.astro", void 0);

const $$AdminNavbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminNavbar;
  const currentPath = Astro2.url.pathname;
  const paths = currentPath.split("/").filter(Boolean);
  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    let label = path.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    if (path === "admin") label = "Admin";
    if (path === "contact") label = "Contacts";
    return {
      label,
      href,
      isLast: index === paths.length - 1
    };
  });
  if (paths.length === 1 && paths[0] === "admin") {
    breadcrumbs[0].isLast = false;
    breadcrumbs.push({ label: "Dashboard", href: "", isLast: true });
  }
  return renderTemplate`${maybeRenderHead()}<header class="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-gray-900/30 backdrop-blur-md sticky top-0 z-20" data-astro-cid-5jvltcof> <div class="flex items-center gap-3" data-astro-cid-5jvltcof> <div class="flex items-center gap-2" data-astro-cid-5jvltcof> <button id="toggle-sidebar" class="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Toggle sidebar" type="button" data-astro-cid-5jvltcof> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-5jvltcof> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-5jvltcof></path> </svg> </button> <button id="minimize-sidebar" class="hidden md:inline-flex text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors" aria-label="Minimize sidebar" type="button" data-astro-cid-5jvltcof> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-5jvltcof> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-5jvltcof></path> </svg> </button> </div> <div class="hidden sm:flex items-center text-sm text-gray-400 gap-2" data-astro-cid-5jvltcof> ${breadcrumbs.map((crumb, index) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-5jvltcof": true }, { "default": ($$result2) => renderTemplate`${index > 0 && renderTemplate`<span class="text-gray-600" data-astro-cid-5jvltcof>/</span>`}${crumb.isLast ? renderTemplate`<span class="text-gray-200" data-astro-cid-5jvltcof>${crumb.label}</span>` : renderTemplate`<a${addAttribute(crumb.href, "href")} class="text-cyan-400 hover:text-cyan-300 transition-colors" data-astro-cid-5jvltcof> ${crumb.label} </a>`}` })}`)} </div> </div> <div class="flex items-center space-x-4 ml-auto" data-astro-cid-5jvltcof> <!-- Notifications --> <button class="relative p-2 text-gray-400 hover:text-white transition-colors group" data-astro-cid-5jvltcof> <div class="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" data-astro-cid-5jvltcof></div> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-5jvltcof> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" data-astro-cid-5jvltcof></path> </svg> </button> <!-- Settings Quick Link --> <a href="/admin/settings" class="p-2 text-gray-400 hover:text-white transition-colors hover:rotate-90 duration-300" aria-label="Settings" data-astro-cid-5jvltcof> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-5jvltcof> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-5jvltcof></path> </svg> </a> </div> </header>  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/admin/AdminNavbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/admin/AdminNavbar.astro", void 0);

const $$UnsavedChangesModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="unsaved-changes-modal" class="fixed inset-0 z-50 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true"> <!-- Backdrop --> <div class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity opacity-0" id="modal-backdrop"></div> <div class="fixed inset-0 z-10 overflow-y-auto"> <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"> <!-- Modal Panel --> <div class="relative transform overflow-hidden rounded-lg bg-gray-900 border border-cyan-500/30 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" id="modal-panel"> <div class="bg-gray-800/50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4"> <div class="sm:flex sm:items-start"> <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-900/30 sm:mx-0 sm:h-10 sm:w-10"> <svg class="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path> </svg> </div> <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"> <h3 class="text-base font-semibold leading-6 text-white" id="modal-title">
Unsaved Changes
</h3> <div class="mt-2"> <p class="text-sm text-gray-300">
You have unsaved changes. Are you sure you want to leave? Your
                  changes will be lost.
</p> </div> </div> </div> </div> <div class="bg-gray-900/50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2"> <button type="button" id="modal-confirm-btn" class="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto transition-colors">
Leave Page
</button> <button type="button" id="modal-cancel-btn" class="mt-3 inline-flex w-full justify-center rounded-md bg-transparent border border-gray-600 px-3 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-gray-800 sm:mt-0 sm:w-auto transition-colors">
Stay
</button> </div> </div> </div> </div> </div> ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/UnsavedChangesModal.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/UnsavedChangesModal.astro", void 0);

const $$ConfirmModal = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="confirm-modal" class="fixed inset-0 z-50 hidden" aria-labelledby="confirm-modal-title" role="dialog" aria-modal="true"> <div class="fixed inset-0 bg-gray-950/80 backdrop-blur-sm transition-opacity opacity-0" id="confirm-modal-backdrop"></div> <div class="fixed inset-0 z-10 overflow-y-auto"> <div class="flex min-h-full items-center justify-center p-4"> <div class="relative transform overflow-hidden rounded-xl bg-gray-900 border text-left shadow-xl transition-all w-full max-w-md opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" id="confirm-modal-panel"> <div class="px-4 py-4 sm:px-5"> <div class="flex items-start gap-3"> <div id="confirm-modal-icon" class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/10"> <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path> </svg> </div> <div class="text-left"> <h3 class="text-base font-semibold leading-6 text-white" id="confirm-modal-title">
Confirm Action
</h3> <p class="mt-1.5 text-sm text-gray-300/90 leading-relaxed" id="confirm-modal-message">
Are you sure you want to continue?
</p> </div> </div> </div> <div class="px-4 py-3 sm:px-5 border-t border-white/5 flex flex-col-reverse sm:flex-row-reverse gap-2"> <button type="button" id="confirm-modal-confirm-btn" class="inline-flex w-full justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm sm:ml-2 sm:w-auto transition-all">
Confirm
</button> <button type="button" id="confirm-modal-cancel-btn" class="inline-flex w-full justify-center rounded-lg bg-gray-900/40 border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-gray-800/60 hover:text-white sm:w-auto transition-all">
Cancel
</button> </div> </div> </div> </div> ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/ConfirmModal.astro?astro&type=script&index=0&lang.ts")} </div>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/ConfirmModal.astro", void 0);

const $$PrivateLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PrivateLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "CoreLayout", $$CoreLayout, { "title": title, "description": description, "data-astro-cid-usd32lcb": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Background", $$Background, { "data-astro-cid-usd32lcb": true })} ${maybeRenderHead()}<div class="flex min-h-screen relative z-10" data-astro-cid-usd32lcb> <!-- Sidebar --> ${renderComponent($$result2, "AdminSidebar", $$AdminSidebar, { "data-astro-cid-usd32lcb": true })} <!-- Main content --> <main class="admin-main flex-grow flex flex-col min-w-0 transition-all duration-300" data-astro-cid-usd32lcb> <!-- Topbar --> ${renderComponent($$result2, "AdminNavbar", $$AdminNavbar, { "data-astro-cid-usd32lcb": true })} <div class="flex-grow p-6 overflow-y-auto" data-astro-cid-usd32lcb> ${renderSlot($$result2, $$slots["default"])} </div> </main> ${renderComponent($$result2, "UnsavedChangesModal", $$UnsavedChangesModal, { "data-astro-cid-usd32lcb": true })} ${renderComponent($$result2, "ConfirmModal", $$ConfirmModal, { "data-astro-cid-usd32lcb": true })} </div> ` })}  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/layouts/PrivateLayout.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/layouts/PrivateLayout.astro", void 0);

export { $$PrivateLayout as $ };
