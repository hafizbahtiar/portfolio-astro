import { c as createComponent } from './astro-component_C_vTQzQh.mjs';
import 'piccolore';
import { z as maybeRenderHead, a3 as addAttribute, bj as renderTransition, Q as renderTemplate } from './params-and-props_BAr2ixHn.mjs';
import { r as renderComponent } from './entrypoint_CvaHJfhV.mjs';
import { $ as $$Image } from './_astro_assets_BHKqNLH9.mjs';

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
  return renderTemplate`${maybeRenderHead()}<div class="group relative h-full bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-300 flex flex-col"> <!-- Top Bar / Window Controls --> <div class="flex items-center justify-between px-4 py-3 bg-gray-900/60 border-b border-gray-800 group-hover:bg-gray-900/80 transition-colors"> <div class="flex items-center gap-2"> <div class="flex gap-1.5"> <div class="w-2.5 h-2.5 rounded-full bg-gray-700 group-hover:bg-red-500/80 transition-colors"></div> <div class="w-2.5 h-2.5 rounded-full bg-gray-700 group-hover:bg-yellow-500/80 transition-colors"></div> <div class="w-2.5 h-2.5 rounded-full bg-gray-700 group-hover:bg-green-500/80 transition-colors"></div> </div> </div> <div class="text-xs font-mono text-gray-500 group-hover:text-cyan-400/80 transition-colors"> ${link.split("/").pop() || "project"} </div> </div> <!-- Image/Preview Area --> <div class="relative h-48 bg-gray-950/50 overflow-hidden border-b border-gray-800/50"${addAttribute(renderTransition($$result, "xb3fewgb", "", `project-image-${slug}`), "data-astro-transition-scope")}> ${imageUrl ? renderTemplate`<div${addAttribute(`absolute inset-0 ${imageVariant === "logo" ? "flex items-center justify-center p-10 bg-gray-950/50" : ""}`, "class")}> <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> ${imageVariant === "logo" && renderTemplate`<div class="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 pointer-events-none"></div>`}  ${imageVariant === "logo" ? !isStringImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": title, "width": imageWidth, "height": imageHeight, "loading": imageLoading, "decoding": "async", "fetchpriority": imageFetchPriority, "class": "w-20 h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" })}` : isRemoteImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": title, "width": imageWidth, "height": imageHeight, "loading": imageLoading, "decoding": "async", "fetchpriority": imageFetchPriority, "class": "w-20 h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" })}` : renderTemplate`<img${addAttribute(imageUrl, "src")}${addAttribute(title, "alt")}${addAttribute(imageWidth, "width")}${addAttribute(imageHeight, "height")}${addAttribute(imageLoading, "loading")} decoding="async"${addAttribute(imageFetchPriority, "fetchpriority")} class="w-20 h-20 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">` : (
    /* BANNER & WIDTH-BANNER VARIANTS */
    !isStringImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": title, "width": imageWidth, "height": imageHeight, "loading": imageLoading, "decoding": "async", "fetchpriority": imageFetchPriority, "class": `w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 ${imageVariant === "width-banner" ? "object-contain p-4" : "object-cover"}` })}` : isRemoteImage ? renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": imageUrl, "alt": title, "width": imageWidth, "height": imageHeight, "loading": imageLoading, "decoding": "async", "fetchpriority": imageFetchPriority, "class": `w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 ${imageVariant === "width-banner" ? "object-contain p-4" : "object-cover"}` })}` : renderTemplate`<img${addAttribute(imageUrl, "src")}${addAttribute(title, "alt")}${addAttribute(imageWidth, "width")}${addAttribute(imageHeight, "height")}${addAttribute(imageLoading, "loading")} decoding="async"${addAttribute(imageFetchPriority, "fetchpriority")}${addAttribute(`w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 ${imageVariant === "width-banner" ? "object-contain p-4" : "object-cover"}`, "class")}>`
  )} </div>` : renderTemplate`<div class="absolute inset-0 flex items-center justify-center bg-gray-900/50"> <svg class="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path> </svg> </div>`} </div> <!-- Content --> <div class="p-6 flex flex-col flex-grow"> <div class="flex items-start justify-between mb-3"> <h3 class="text-xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors font-mono"${addAttribute(renderTransition($$result, "ss4dyz42", "", `project-title-${slug}`), "data-astro-transition-scope")}> ${title} </h3> <svg class="w-5 h-5 text-gray-600 group-hover:text-cyan-400 transition-colors transform -rotate-45 group-hover:rotate-0 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> </div> <p class="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow"> ${description} </p> <div class="flex flex-wrap gap-2 mt-auto"> ${tags.slice(0, 3).map((tag) => renderTemplate`<span class="px-2 py-1 text-xs font-mono text-cyan-300/80 bg-cyan-950/30 border border-cyan-900/50 rounded"> ${tag} </span>`)} ${tags.length > 3 && renderTemplate`<span class="px-2 py-1 text-xs font-mono text-gray-500 bg-gray-900/50 border border-gray-800 rounded">
+${tags.length - 3} </span>`} </div> <a${addAttribute(link, "href")} class="absolute inset-0 z-10"${addAttribute(`View ${title}`, "aria-label")}></a> </div> </div>`;
}, "/Users/hafiz/Developments/portfolio-astro/src/components/project/ProjectCard.astro", "self");

const jomDapur = new Proxy({"src":"/_astro/jom-dapur.D9WnXa45.jpg","width":862,"height":862,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/hafiz/Developments/portfolio-astro/src/assets/projects/jom-dapur.jpg";
							}
							
							return target[name];
						}
					});

const jdManagement = new Proxy({"src":"/_astro/jd-management.CegnnpbO.png","width":1080,"height":1080,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/hafiz/Developments/portfolio-astro/src/assets/projects/jd-management.png";
							}
							
							return target[name];
						}
					});

const invois = new Proxy({"src":"/_astro/invois.Jon9esQ3.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/hafiz/Developments/portfolio-astro/src/assets/projects/invois/invois.png";
							}
							
							return target[name];
						}
					});

export { $$ProjectCard as $, jdManagement as a, invois as i, jomDapur as j };
