import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, a3 as addAttribute } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { s as systemService } from './system_BUS6c0FG.mjs';

const $$System = createComponent(async ($$result, $$props, $$slots) => {
  const logs = await systemService.getLogs();
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "System Logs" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold text-white tracking-tight">System Logs</h1> <button class="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-mono text-sm transition-colors border border-gray-700 flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path> </svg>
REFRESH
</button> </div> <div class="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-left text-sm text-gray-400"> <thead class="bg-gray-900/50 text-gray-200 uppercase font-mono text-xs"> <tr> <th scope="col" class="px-6 py-4">Timestamp</th> <th scope="col" class="px-6 py-4">Level</th> <th scope="col" class="px-6 py-4">Source</th> <th scope="col" class="px-6 py-4">Message</th> </tr> </thead> <tbody class="divide-y divide-gray-700"> ${logs.map((log) => renderTemplate`<tr class="hover:bg-gray-700/30 transition-colors"> <td class="px-6 py-4 font-mono text-xs text-gray-500"> ${new Date(log.timestamp).toLocaleString()} </td> <td class="px-6 py-4"> <span${addAttribute(`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.level === "error" ? "bg-red-900/30 text-red-400 border border-red-900" : log.level === "warning" ? "bg-yellow-900/30 text-yellow-400 border border-yellow-900" : "bg-green-900/30 text-green-400 border border-green-900"}`, "class")}> ${log.level.toUpperCase()} </span> </td> <td class="px-6 py-4 text-white">${log.source}</td> <td class="px-6 py-4 text-gray-300">${log.message}</td> </tr>`)} </tbody> </table> </div> ${logs.length === 0 && renderTemplate`<div class="p-8 text-center text-gray-500">No logs found.</div>`} </div> </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/system.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/system.astro";
const $$url = "/admin/system";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$System,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
