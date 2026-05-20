import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { z as maybeRenderHead, a3 as addAttribute, Q as renderTemplate } from './params-and-props_BAr2ixHn.mjs';
import 'clsx';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';

const $$TechDropdown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TechDropdown;
  const {
    label,
    name,
    options,
    placeholder = "Select option",
    value = "",
    class: className = "",
    id: inputId = `${name}-input`
  } = Astro2.props;
  const triggerId = `${name}-trigger`;
  const labelId = `${name}-label`;
  const menuId = `${name}-menu`;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`tech-dropdown-container space-y-2 ${className}`, "class")}${addAttribute(name, "data-name")} data-astro-cid-foqdbe6f> <label${addAttribute(labelId, "id")} class="block text-sm font-medium text-gray-400 font-mono tracking-wide"${addAttribute(triggerId, "for")} data-astro-cid-foqdbe6f> ${`// ${label}`} </label> <div class="relative" data-astro-cid-foqdbe6f> <input${addAttribute(inputId, "id")} type="hidden"${addAttribute(name, "name")}${addAttribute(value, "value")} class="dropdown-input" data-astro-cid-foqdbe6f> <button${addAttribute(triggerId, "id")}${addAttribute(labelId, "aria-labelledby")} aria-haspopup="listbox" aria-expanded="false" type="button" class="dropdown-trigger w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-left text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all flex justify-between items-center group hover:border-cyan-500/50" data-astro-cid-foqdbe6f> <span class="selected-text font-mono text-sm text-gray-300 group-hover:text-cyan-400 transition-colors truncate" data-astro-cid-foqdbe6f> ${options.find((opt) => opt.value === value)?.label || placeholder} </span> <div class="flex items-center text-gray-500 group-hover:text-cyan-500 transition-colors" data-astro-cid-foqdbe6f> <span class="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity font-mono hidden sm:inline-block" data-astro-cid-foqdbe6f>[SELECT]</span> <svg class="w-4 h-4 transform transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-foqdbe6f> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-foqdbe6f></path> </svg> </div> </button> <div${addAttribute(menuId, "id")} class="dropdown-menu hidden absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl transform origin-top transition-all duration-200" data-astro-cid-foqdbe6f> <ul class="max-h-60 overflow-y-auto py-1 custom-scrollbar" role="listbox"${addAttribute(labelId, "aria-labelledby")} data-astro-cid-foqdbe6f> ${options.map((option) => renderTemplate`<li data-astro-cid-foqdbe6f> <button type="button" role="option" class="dropdown-item w-full text-left px-4 py-2 text-sm font-mono text-gray-300 hover:bg-cyan-900/20 hover:text-cyan-400 transition-colors flex items-center justify-between group"${addAttribute(option.value, "data-value")} data-astro-cid-foqdbe6f> <span data-astro-cid-foqdbe6f>${option.label}</span> <span class="opacity-0 group-hover:opacity-100 text-cyan-500 font-bold" data-astro-cid-foqdbe6f>
_
</span> </button> </li>`)} </ul> </div> </div> </div>  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TechDropdown.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/ui/TechDropdown.astro", void 0);

export { $$TechDropdown as $ };
