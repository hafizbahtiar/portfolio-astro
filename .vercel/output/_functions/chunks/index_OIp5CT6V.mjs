import { c as createComponent } from './astro-component_BCrB7690.mjs';
import 'piccolore';
import { m as maybeRenderHead, c as addAttribute, d as renderTransition, r as renderComponent, b as renderTemplate } from './entrypoint_DePlxNSC.mjs';
import { c as getProjects, $ as $$ProjectLayout, j as jomDapur, b as jdManagement, i as invois } from './invois_B07trsXQ.mjs';
import { $ as $$Image } from './_astro_assets_CWw_eLxF.mjs';

const $$ProjectCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProjectCard;
  const {
    title,
    description,
    imageUrl,
    imageVariant = "banner",
    imageLoading = "lazy",
    imageFetchPriority = "low",
    tags,
    link = "#"
  } = Astro2.props;
  const isStringImage = typeof imageUrl === "string";
  const isRemoteImage = isStringImage && imageUrl.startsWith("http");
  const imageWidth = imageVariant === "logo" ? 80 : 640;
  const imageHeight = imageVariant === "logo" ? 80 : 192;
  const slug = link.split("/").pop() || title.toLowerCase().replace(/\s+/g, "-");
  return renderTemplate`${maybeRenderHead()}<div class="group relative h-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 flex flex-col"> <!-- Image Area --> <div class="relative h-32 sm:h-44 bg-slate-50 dark:bg-slate-700 overflow-hidden"${addAttribute(renderTransition($$result, "o3ckebmw", "", `project-image-${slug}`), "data-astro-transition-scope")}> ${imageUrl ? renderTemplate`<div${addAttribute(`absolute inset-0 ${imageVariant === "logo" ? "flex items-center justify-center p-10" : ""}`, "class")}> ${imageVariant === "logo" ? !isStringImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": title, "width": imageWidth, "height": imageHeight, "loading": imageLoading, "decoding": "async", "fetchpriority": imageFetchPriority, "class": "w-20 h-20 object-contain" })}` : isRemoteImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": title, "width": imageWidth, "height": imageHeight, "loading": imageLoading, "decoding": "async", "fetchpriority": imageFetchPriority, "class": "w-20 h-20 object-contain" })}` : renderTemplate`<img${addAttribute(imageUrl, "src")}${addAttribute(title, "alt")}${addAttribute(imageWidth, "width")}${addAttribute(imageHeight, "height")}${addAttribute(imageLoading, "loading")} decoding="async"${addAttribute(imageFetchPriority, "fetchpriority")} class="w-20 h-20 object-contain">` : !isStringImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": title, "width": imageWidth, "height": imageHeight, "loading": imageLoading, "decoding": "async", "fetchpriority": imageFetchPriority, "class": `w-full h-full group-hover:scale-105 transition-transform duration-300 ${imageVariant === "width-banner" ? "object-contain p-4" : "object-cover"}` })}` : isRemoteImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": title, "width": imageWidth, "height": imageHeight, "loading": imageLoading, "decoding": "async", "fetchpriority": imageFetchPriority, "class": `w-full h-full group-hover:scale-105 transition-transform duration-300 ${imageVariant === "width-banner" ? "object-contain p-4" : "object-cover"}` })}` : renderTemplate`<img${addAttribute(imageUrl, "src")}${addAttribute(title, "alt")}${addAttribute(imageWidth, "width")}${addAttribute(imageHeight, "height")}${addAttribute(imageLoading, "loading")} decoding="async"${addAttribute(imageFetchPriority, "fetchpriority")}${addAttribute(`w-full h-full group-hover:scale-105 transition-transform duration-300 ${imageVariant === "width-banner" ? "object-contain p-4" : "object-cover"}`, "class")}>`} </div>` : renderTemplate`<div class="absolute inset-0 flex items-center justify-center"> <svg class="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </div>`} </div> <!-- Content --> <div class="p-3 sm:p-5 flex flex-col flex-grow"> <div class="flex items-start justify-between gap-2 mb-2"> <h3 class="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug"${addAttribute(renderTransition($$result, "5jwablar", "", `project-title-${slug}`), "data-astro-transition-scope")}> ${title} </h3> <svg class="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10"></path> </svg> </div> <p class="text-slate-400 dark:text-slate-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow"> ${description} </p> <div class="flex flex-wrap gap-1.5 mt-auto"> ${tags.slice(0, 4).map((tag) => renderTemplate`<span class="px-2 py-0.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded"> ${tag} </span>`)} ${tags.length > 4 && renderTemplate`<span class="px-2 py-0.5 text-xs text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded">
+${tags.length - 4} </span>`} </div> <a${addAttribute(link, "href")} class="absolute inset-0 z-10"${addAttribute(`View ${title}`, "aria-label")}></a> </div> </div>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/project/ProjectCard.astro", "self");

const prerender = false;
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
  return renderTemplate`${renderComponent($$result, "ProjectLayout", $$ProjectLayout, { "title": "Projects - Hafiz Bahtiar", "description": "Explore my portfolio of projects ranging from mobile apps to web applications." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-12 md:mb-16"> <h1 class="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-100 tracking-tight">
Projects
</h1> <p class="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
A selection of applications and tools I've built - from mobile apps to
      backend services.
</p> ${projects.length > 0 && renderTemplate`<p class="text-slate-600 dark:text-slate-400 text-sm mt-3"> ${projects.length} projects
</p>`} </div> <div class="grid grid-cols-2 gap-5"> ${resolvedProjects.map((project, index) => renderTemplate`<div> ${renderComponent($$result2, "ProjectCard", $$ProjectCard, { "title": project.title, "description": project.description, "imageUrl": project.imageUrl, "imageVariant": project.imageVariant, "imageLoading": index < eagerCount ? "eager" : "lazy", "imageFetchPriority": index < eagerCount ? "high" : "low", "tags": project.tags || [], "link": `/projects/${project.slug}` })} </div>`)} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/pages/projects/index.astro", void 0);

const $$file = "/Users/hafiz/Developments/portfolio-astro/src/pages/projects/index.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
