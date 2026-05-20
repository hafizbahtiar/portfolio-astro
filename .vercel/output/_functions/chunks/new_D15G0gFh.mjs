import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';
import { $ as $$BlogPostForm } from './BlogPostForm_3MdT-ibq.mjs';
import { $ as $$AlertToast } from './AlertToast_C6ix7olh.mjs';

const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" }
  ];
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "New Blog Post" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <h1 class="text-3xl font-bold text-white tracking-tight">
New Blog Post
</h1> <a href="/admin/blog" class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
BACK TO LIST
</a> </div> <form id="blog-form" class="space-y-8"> ${renderComponent($$result2, "BlogPostForm", $$BlogPostForm, { "submitLabel": "CREATE POST", "statusOptions": statusOptions, "statusValue": "draft" })} </form> </div> ${renderComponent($$result2, "AlertToast", $$AlertToast, { "id": "blog-alert" })} ` })} ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/blog/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/blog/new.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/blog/new.astro";
const $$url = "/admin/blog/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
