import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript } from './Background_CT-Pdz5l.mjs';
import { $ as $$PrivateLayout } from './PrivateLayout_yHcVqe7w.mjs';

const $$Password = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "PrivateLayout", $$PrivateLayout, { "title": "Change Password" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-6"> <div class="flex justify-between items-center"> <div class="flex items-center gap-4"> <a href="/admin/settings/security" class="text-gray-400 hover:text-white transition-colors"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> </a> <h1 class="text-3xl font-bold text-white tracking-tight">
Change Password
</h1> </div> </div> <div class="bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-xl p-6 max-w-xl"> <form id="security-settings-form" class="space-y-6"> <div class="space-y-2"> <label for="settings-current-password" class="block text-sm font-medium text-gray-400">
Current Password
</label> <input type="password" id="settings-current-password" name="currentPassword" placeholder="••••••••" class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"> </div> <div class="space-y-2"> <label for="settings-new-password" class="block text-sm font-medium text-gray-400">
New Password
</label> <input type="password" id="settings-new-password" name="newPassword" placeholder="••••••••" class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"> </div> <div class="space-y-2"> <label for="settings-confirm-password" class="block text-sm font-medium text-gray-400">
Confirm New Password
</label> <input type="password" id="settings-confirm-password" name="confirmPassword" placeholder="••••••••" class="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"> </div> <button type="button" id="update-password-btn" class="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-2 px-4 rounded-lg transition-colors border border-transparent shadow-lg shadow-cyan-900/20">
Update Password
</button> </form> </div> </div> ` })} ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/security/password.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/security/password.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/admin/settings/security/password.astro";
const $$url = "/admin/settings/security/password";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Password,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
