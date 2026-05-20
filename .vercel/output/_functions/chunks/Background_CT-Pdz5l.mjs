import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { T as createRenderInstruction, a3 as addAttribute, Q as renderTemplate, bi as renderHead, C as renderSlot, z as maybeRenderHead } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/node_modules/astro/components/ClientRouter.astro", void 0);

const $$CoreLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CoreLayout;
  const {
    title = "Hafiz Bahtiar - Flutter Developer",
    description = "Portfolio of Hafiz Bahtiar, a Flutter Developer specializing in mobile apps and backend systems.",
    class: className = ""
  } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-ugthecfy> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width">${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-ugthecfy": true })}<link rel="apple-touch-icon" sizes="57x57" href="/favicons/favicon-57x57.png"><link rel="apple-touch-icon" sizes="60x60" href="/favicons/favicon-60x60.png"><link rel="apple-touch-icon" sizes="72x72" href="/favicons/favicon-72x72.png"><link rel="apple-touch-icon" sizes="76x76" href="/favicons/favicon-76x76.png"><link rel="apple-touch-icon" sizes="114x114" href="/favicons/favicon-114x114.png"><link rel="apple-touch-icon" sizes="120x120" href="/favicons/favicon-120x120.png"><link rel="apple-touch-icon" sizes="144x144" href="/favicons/favicon-144x144.png"><link rel="apple-touch-icon" sizes="152x152" href="/favicons/favicon-152x152.png"><link rel="apple-touch-icon" sizes="180x180" href="/favicons/favicon-180x180.png"><link rel="icon" type="image/png" sizes="192x192" href="/favicons/favicon-192x192.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"><link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"><link rel="manifest" href="/manifest.json"><meta name="msapplication-TileColor" content="#ffffff"><meta name="msapplication-TileImage" content="/favicons/favicon-144x144.png"><meta name="theme-color" content="#ffffff"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/layouts/CoreLayout.astro?astro&type=script&index=0&lang.ts")}${renderHead()}</head> <body${addAttribute(`flex flex-col min-h-screen ${className}`, "class")} data-astro-cid-ugthecfy> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/layouts/CoreLayout.astro", void 0);

const $$Background = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="tech-background" class="fixed inset-0 z-[-1] overflow-hidden bg-gray-950"> <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div> <canvas id="particles-canvas" class="absolute inset-0 w-full h-full opacity-40"></canvas> <!-- Custom Cursor Glow --> <!-- <div
    id="cursor-glow"
    class="fixed w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 z-0 hidden md:block"
  >
  </div> --> </div> ${renderScript($$result, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Background.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/layout/Background.astro", void 0);

export { $$CoreLayout as $, $$Background as a, renderScript as r };
