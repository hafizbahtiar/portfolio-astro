import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { z as maybeRenderHead, a3 as addAttribute, Q as renderTemplate, C as renderSlot } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { r as renderScript, $ as $$CoreLayout, a as $$Background } from './Background_CT-Pdz5l.mjs';
import 'clsx';

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const links = [
    { text: "About", href: "/#about" },
    { text: "Projects", href: "/projects" },
    { text: "Skills", href: "/#skills" },
    { text: "Contact", href: "/#contact" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav id="main-nav" class="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-6 border-b border-transparent" data-astro-cid-jp2pq5zm> <div class="container-main flex flex-wrap items-center justify-between px-4 transition-all duration-300" id="nav-container" data-astro-cid-jp2pq5zm> <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse group" data-astro-cid-jp2pq5zm> <span class="self-center text-2xl font-bold whitespace-nowrap heading-gradient group-hover:scale-105 transition-transform" data-astro-cid-jp2pq5zm>
Hafiz.dev
</span> </a> <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-colors" aria-controls="navbar-default" aria-expanded="false" id="navbar-toggle" data-astro-cid-jp2pq5zm> <span class="sr-only" data-astro-cid-jp2pq5zm>Open main menu</span> <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14" data-astro-cid-jp2pq5zm> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" data-astro-cid-jp2pq5zm></path> </svg> </button> <div class="hidden w-full md:block md:w-auto absolute md:relative top-full left-0 bg-gray-900/95 backdrop-blur-xl md:bg-transparent border-b md:border-none border-gray-800 shadow-lg md:shadow-none mt-4 md:mt-0 rounded-2xl md:rounded-none overflow-hidden md:overflow-visible transition-all" id="navbar-default" data-astro-cid-jp2pq5zm> <ul class="font-medium flex flex-col p-4 md:p-0 border border-gray-800/50 md:border-0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:bg-transparent" data-astro-cid-jp2pq5zm> ${links.map((link) => renderTemplate`<li data-astro-cid-jp2pq5zm> <a${addAttribute(link.href, "href")} class="block py-2 px-3 text-gray-300 rounded hover:bg-white/10 md:hover:bg-transparent md:border-0 md:hover:text-cyan-400 md:p-0 transition-colors duration-200" data-astro-cid-jp2pq5zm> ${link.text} </a> </li>`)} </ul> </div> </div> </nav>  ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="mt-20 border-t border-gray-800 bg-gray-950/50 backdrop-blur-sm"> <div class="w-full container-main p-4 md:py-8"> <div class="sm:flex sm:items-center sm:justify-between"> <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"> <span class="self-center text-2xl font-bold whitespace-nowrap heading-gradient">Hafiz.dev</span> </a> <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0"> <li> <a href="#about" class="hover:text-cyan-400 hover:underline me-4 md:me-6 transition-colors">About</a> </li> <li> <a href="#projects" class="hover:text-cyan-400 hover:underline me-4 md:me-6 transition-colors">Projects</a> </li> <li> <a href="#contact" class="hover:text-cyan-400 hover:underline transition-colors">Contact</a> </li> </ul> </div> <hr class="my-6 border-gray-800 sm:mx-auto lg:my-8"> <span class="block text-sm text-gray-500 sm:text-center">© ${currentYear} <a href="/" class="hover:underline hover:text-cyan-400 transition-colors">Hafiz Bahtiar</a>. All Rights Reserved.</span> </div> </footer>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Footer.astro", void 0);

const $$PublicLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PublicLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "CoreLayout", $$CoreLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Background", $$Background, {})} ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="flex-grow pt-20"> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/layouts/PublicLayout.astro", void 0);

export { $$PublicLayout as $ };
