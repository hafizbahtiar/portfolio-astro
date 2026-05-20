import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { $ as $$ExperienceForm } from './ExperienceForm_C9MdfydP.mjs';
import { $ as $$AlertToast } from './AlertToast_C6ix7olh.mjs';

const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Edit Experience" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold text-white tracking-tight">
Edit Experience
</h1> <a href="/admin/experiences" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
BACK TO LIST
</a> </div> <div id="loading-state" class="text-center py-12"> <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500 mb-4"></div> <p class="text-gray-400">Loading experience data...</p> </div> <form id="experience-form" class="space-y-8 hidden"> ${renderComponent($$result2, "ExperienceForm", $$ExperienceForm, { "submitLabel": "UPDATE EXPERIENCE" })} </form> </div> ${renderComponent($$result2, "AlertToast", $$AlertToast, { "id": "experience-alert" })} ` })} ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/experiences/edit.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/experiences/edit.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/experiences/edit.astro";
const $$url = "/admin/experiences/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
