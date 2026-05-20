import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { Q as renderTemplate, z as maybeRenderHead, C as renderSlot } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$PublicLayout } from './PublicLayout_C3C4g7py.mjs';
import { j as jomDapur, a as jdManagement, i as invois, $ as $$ProjectCard } from './invois_D-XRm9Oh.mjs';
import { g as getProjects } from './projects_CfuewUuE.mjs';

const $$ProjectLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProjectLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-main py-24 md:py-32 min-h-screen"> ${renderSlot($$result2, $$slots["default"])} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/layouts/ProjectLayout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
  const localImageMap = /* @__PURE__ */ new Map([
    ["/images/projects/jom-dapur.jpg", jomDapur],
    ["/images/projects/jd-management.png", jdManagement],
    ["/images/projects/invois/invois.png", invois]
  ]);
  const eagerCount = 3;
  const resolvedProjects = projects.map((project) => ({
    ...project,
    imageUrl: localImageMap.get(project.imageUrl) ?? project.imageUrl
  }));
  return renderTemplate`${renderComponent($$result, "ProjectLayout", $$ProjectLayout, { "title": "Projects - Hafiz Bahtiar", "description": "Explore my portfolio of projects ranging from mobile apps to web applications." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-12 md:mb-16 animate-fade-in"> <!-- Breadcrumb / Path --> <div class="flex items-center gap-2 text-sm font-mono text-cyan-400 mb-6 bg-gray-900/50 w-fit px-4 py-2 rounded-lg border border-gray-800"> <span class="text-gray-500">root</span> <span class="text-gray-600">/</span> <span class="text-cyan-400 font-bold">projects</span> <span class="animate-pulse">_</span> </div> <div class="flex flex-col md:flex-row md:items-end justify-between gap-6"> <div class="max-w-2xl"> <h1 class="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"> <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
Shipped
</span>
Code.
</h1> <p class="text-gray-400 text-lg leading-relaxed border-l-2 border-gray-800 pl-6">
A collection of <span class="text-cyan-400 font-mono">deployed applications</span>,
<span class="text-purple-400 font-mono">open-source libraries</span>,
          and
<span class="text-green-400 font-mono">experimental prototypes</span>.
</p> </div> <!-- Optional: Stat or decorative element --> <div class="hidden md:block text-right font-mono text-xs text-gray-500"> <div>total_count: ${projects.length}</div> <div>status: <span class="text-green-500">active</span></div> </div> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> ${resolvedProjects.map((project, index) => renderTemplate`<div> ${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "title": project.title, "description": project.description, "imageUrl": project.imageUrl, "imageVariant": project.imageVariant, "imageLoading": index < eagerCount ? "eager" : "lazy", "imageFetchPriority": index < eagerCount ? "high" : "low", "tags": project.tags || [], "link": `/projects/${project.slug}` })} </div>`)} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/projects/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/projects/index.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
