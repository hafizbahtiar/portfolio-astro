import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';

const $$General = createComponent(($$result, $$props, $$slots) => {
  const settings = {
    siteName: "Hafiz Bahtiar",
    siteDescription: "Full Stack Developer Portfolio"};
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "General Settings" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <div class="flex items-center gap-4"> <a href="/admin/settings" class="text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> </a> <h1 class="text-3xl font-bold text-white tracking-tight">
General Settings
</h1> </div> <button id="save-settings-btn" class="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg font-mono text-sm transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path> </svg>
SAVE CHANGES
</button> </div> <div class="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 max-w-2xl"> <form id="general-settings-form" class="space-y-6"> <div class="space-y-2"> <label for="settings-site-name" class="block text-sm font-medium text-gray-400">
Site Name
</label> <input type="text" id="settings-site-name" name="siteName"${addAttribute(settings.siteName, "value")} class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"> </div> <div class="space-y-2"> <label for="settings-site-description" class="block text-sm font-medium text-gray-400">
Site Description
</label> <textarea id="settings-site-description" name="siteDescription" rows="3" class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all resize-none">${settings.siteDescription}</textarea> </div> </form> </div> </div> ` })} ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/general.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/general.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/general.astro";
const $$url = "/admin/settings/general";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$General,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
