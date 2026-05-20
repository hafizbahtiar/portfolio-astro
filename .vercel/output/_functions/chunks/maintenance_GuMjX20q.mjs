import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';

const $$Maintenance = createComponent(($$result, $$props, $$slots) => {
  const settings = {
    maintenanceMode: false
  };
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Maintenance Mode" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <div class="flex items-center gap-4"> <a href="/admin/settings/security" class="text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> </a> <h1 class="text-3xl font-bold text-white tracking-tight">
Maintenance Mode
</h1> </div> <button id="save-maintenance-btn" class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path> </svg>
SAVE CHANGES
</button> </div> <div class="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 max-w-2xl"> <div class="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700"> <div> <h4 class="text-white font-medium">Enable Maintenance Mode</h4> <p class="text-sm text-gray-400 mt-1">
Temporarily disable public access to the site. Only admins will be
            able to access the dashboard.
</p> </div> <label class="relative inline-flex items-center cursor-pointer"> <input type="checkbox" id="settings-maintenance-mode" name="maintenanceMode" class="sr-only peer"${addAttribute(settings.maintenanceMode, "checked")}> <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div> </label> </div> </div> </div> ` })} ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/security/maintenance.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/security/maintenance.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/security/maintenance.astro";
const $$url = "/admin/settings/security/maintenance";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Maintenance,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
