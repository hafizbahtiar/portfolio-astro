import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { $ as $$ProjectForm } from './ProjectForm_BcKVYAW6.mjs';

const $$Edit = createComponent(async ($$result, $$props, $$slots) => {
  const typeOptions = [
    { value: "personal", label: "Personal" },
    { value: "business", label: "Business" },
    { value: "work", label: "Work" }
  ];
  const statusOptions = [
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "In Progress" },
    { value: "maintained", label: "Maintained" }
  ];
  const imageVariantOptions = [
    { value: "banner", label: "Banner (Default)" },
    { value: "logo", label: "Logo" },
    { value: "width-banner", label: "Full Width Banner" }
  ];
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Edit Project" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold text-white tracking-tight">Edit Project</h1> <a href="/admin/projects" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
BACK TO LIST
</a> </div> <div id="loading-state" class="text-center py-12"> <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500 mb-4"></div> <p class="text-gray-400">Loading project data...</p> </div> <form id="project-form" class="space-y-8 hidden"> <input type="hidden" name="id"> ${renderComponent($$result2, "ProjectForm", $$ProjectForm, { "submitLabel": "UPDATE PROJECT", "typeOptions": typeOptions, "statusOptions": statusOptions, "imageVariantOptions": imageVariantOptions })} </form> </div> ` })} ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/projects/edit.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/projects/edit.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/projects/edit.astro";
const $$url = "/admin/projects/edit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Edit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
