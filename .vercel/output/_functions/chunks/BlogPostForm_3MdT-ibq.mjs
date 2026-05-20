import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { z as maybeRenderHead, a3 as addAttribute, Q as renderTemplate } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$TechDropdown } from './TechDropdown_BhtHHuS5.mjs';
import { T as TextEditor } from './TextEditor_DzcJYdss.mjs';

const $$BlogPostForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BlogPostForm;
  const {
    submitLabel,
    submitButtonId = "submit-btn",
    statusOptions,
    statusValue
  } = Astro2.props;
  const cardClass = "bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6";
  const titleClass = "text-lg font-bold text-white mb-6 border-b border-gray-700 pb-4";
  const labelClass = "block text-sm font-medium text-gray-400";
  const inputClass = "w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all";
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-8"> <div class="space-y-8"> <div${addAttribute(cardClass, "class")}> <h3${addAttribute(titleClass, "class")}>Core Content</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="blog-title">Title</label> <input id="blog-title" type="text" name="title" required${addAttribute(inputClass, "class")}> </div> <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="blog-slug">Slug</label> <input id="blog-slug" type="text" name="slug"${addAttribute(inputClass, "class")}> </div> <div class="space-y-2 md:col-span-2"> <label${addAttribute(labelClass, "class")} for="blog-excerpt">Excerpt</label> <textarea id="blog-excerpt" name="excerpt" rows="3" required${addAttribute(`${inputClass} resize-none`, "class")}></textarea> </div> <div class="space-y-2 md:col-span-2"> <label${addAttribute(labelClass, "class")} for="blog-hero">Hero Statement</label> <textarea id="blog-hero" name="heroText" rows="2"${addAttribute(`${inputClass} resize-none`, "class")}></textarea> </div> <div class="space-y-2 md:col-span-2"> <label${addAttribute(labelClass, "class")} for="blog-body">Body Content</label> ${renderComponent($$result, "TextEditor", TextEditor, { "id": "blog-body", "name": "bodyContent", "content": "", "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TextEditor", "client:component-export": "TextEditor" })} </div> </div> </div> </div> <div class="space-y-8"> <div${addAttribute(cardClass, "class")}> <h3${addAttribute(titleClass, "class")}>Publish Settings</h3> <div class="grid grid-cols-1 gap-6"> <div class="space-y-2"> ${renderComponent($$result, "TechDropdown", $$TechDropdown, { "label": "Status", "name": "status", "options": statusOptions, "placeholder": "Select Status", "value": statusValue })} </div> <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="blog-published-date">
Published Date
</label> <input id="blog-published-date" type="date" name="publishedDate"${addAttribute(inputClass, "class")}> </div> <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="blog-category">Category</label> <input id="blog-category" type="text" name="category"${addAttribute(inputClass, "class")}> </div> <div class="space-y-2"> <label${addAttribute(labelClass, "class")} for="blog-tags">Tags (comma separated)</label> <input id="blog-tags" type="text" name="tags"${addAttribute(inputClass, "class")}> </div> <div class="space-y-2 flex items-center pt-2"> <label class="relative inline-flex items-center cursor-pointer"> <input type="checkbox" name="isFeatured" class="sr-only peer"> <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div> <span class="ml-3 text-sm font-medium text-gray-400">Featured Post</span> </label> </div> </div> </div> </div> </div> <div class="flex justify-end pt-4"> <button type="submit"${addAttribute(submitButtonId, "id")} class="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2"> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> </svg> ${submitLabel} </button> </div>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/admin/blog/BlogPostForm.astro", void 0);

export { $$BlogPostForm as $ };
