import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { T as TextEditor } from './TextEditor_DzcJYdss.mjs';
import { $ as $$TechDropdown } from './TechDropdown_BhtHHuS5.mjs';

const $$New = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "New Policy" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex flex-wrap justify-between items-center gap-4"> <h1 class="text-3xl font-bold text-white tracking-tight">
New Privacy Policy
</h1> <a href="/admin/policies" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
BACK TO LIST
</a> </div> <div id="loading-state" class="text-center py-12 text-gray-400">
Loading projects...
</div> <form id="policy-form" class="space-y-6 hidden"> ${renderComponent($$result2, "TechDropdown", $$TechDropdown, { "label": "Project", "name": "projectId", "options": [], "placeholder": "Select project" })} <div class="space-y-4"> <div class="flex flex-wrap gap-2" role="tablist"> <button type="button" id="policy-tab-privacy" role="tab" aria-selected="true" aria-controls="policy-panel-privacy" data-tab="privacy" class="px-4 py-2 text-sm font-mono rounded-lg border transition-colors text-white border-cyan-500/60 bg-cyan-500/10">
Privacy Policy
</button> <button type="button" id="policy-tab-terms" role="tab" aria-selected="false" aria-controls="policy-panel-terms" data-tab="terms" class="px-4 py-2 text-sm font-mono rounded-lg border transition-colors text-gray-400 border-gray-800 hover:text-white hover:border-cyan-500/40">
Terms &amp; Conditions
</button> </div> <div id="policy-panel-privacy" role="tabpanel" aria-labelledby="policy-tab-privacy" data-tab-panel="privacy"> <label class="space-y-2 block"> <span class="text-sm font-mono text-gray-300">Privacy Policy</span> ${renderComponent($$result2, "TextEditor", TextEditor, { "name": "privacyPolicy", "content": "", "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TextEditor", "client:component-export": "TextEditor" })} </label> </div> <div id="policy-panel-terms" role="tabpanel" aria-labelledby="policy-tab-terms" data-tab-panel="terms" class="hidden"> <label class="space-y-2 block"> <span class="text-sm font-mono text-gray-300">Terms &amp; Conditions</span> ${renderComponent($$result2, "TextEditor", TextEditor, { "name": "termsAndConditions", "content": "", "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TextEditor", "client:component-export": "TextEditor" })} </label> </div> </div> <button id="submit-btn" type="submit" class="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-mono text-sm transition-colors">
SAVE POLICY
</button> </form> </div> ` })} ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/policies/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/policies/new.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/policies/new.astro";
const $$url = "/admin/policies/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
