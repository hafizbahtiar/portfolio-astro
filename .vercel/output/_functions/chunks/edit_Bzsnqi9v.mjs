import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { F as FamilyTreeBuilder } from './FamilyTreeBuilder_CJfIoHA0.mjs';
import { $ as $$AlertToast } from './AlertToast_C6ix7olh.mjs';

const $$Edit = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Edit Family Tree" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold text-white tracking-tight">
Edit Family Tree
</h1> <a href="/admin/family" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
BACK TO LIST
</a> </div> ${renderComponent($$result2, "FamilyTreeBuilder", FamilyTreeBuilder, { "client:load": true, "mode": "edit", "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/admin/family/FamilyTreeBuilder", "client:component-export": "FamilyTreeBuilder" })} </div> ${renderComponent($$result2, "AlertToast", $$AlertToast, { "id": "family-builder-alert" })} ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/family/edit.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/family/edit.astro";
const $$url = "/admin/family/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
