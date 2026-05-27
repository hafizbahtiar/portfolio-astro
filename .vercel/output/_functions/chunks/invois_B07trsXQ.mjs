import { c as createComponent } from './astro-component_BCrB7690.mjs';
import 'piccolore';
import { r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as renderSlot } from './entrypoint_DePlxNSC.mjs';
import { $ as $$PublicLayout, A as ApiClient, a as API_BASE_URL } from './api-client_CjQRNt0G.mjs';

const $$ProjectLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProjectLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PublicLayout", $$PublicLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container-main py-8 md:py-10 min-h-screen"> ${renderSlot($$result2, $$slots["default"])} </div> ` })}`;
}, "/Users/hafiz/Developments/portfolio-astro/src/layouts/ProjectLayout.astro", void 0);

class ProjectsService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }
  // Public methods
  async getProjects() {
    const result = await this.get("projects");
    return result || [];
  }
  async getProjectBySlug(slug) {
    return this.get(`projects/${slug}`);
  }
  async getProjectPolicyBySlug(slug) {
    return this.get(`projects/${slug}/policy`);
  }
  // Admin methods
  async getAdminProjects() {
    const result = await this.get("owner/projects/all");
    return result || [];
  }
  async getAdminProjectById(id) {
    const projects = await this.getAdminProjects();
    return projects.find((p) => p.id === id) || null;
  }
  async getAdminProjectPolicyById(id) {
    return this.get(`owner/projects/${id}/policy`);
  }
  async createProject(data) {
    return this.post("owner/projects", data);
  }
  async updateProject(id, data) {
    return this.put(`owner/projects/${id}`, data);
  }
  async upsertProjectPolicy(id, data) {
    return this.put(`owner/projects/${id}/policy`, data);
  }
  async deleteProject(id) {
    try {
      await this.delete(`owner/projects/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete project:", error);
      return false;
    }
  }
}
const projectsService = new ProjectsService();
const getProjects = () => projectsService.getProjects();
const getProjectBySlug = (slug) => projectsService.getProjectBySlug(slug);
const getProjectPolicyBySlug = (slug) => projectsService.getProjectPolicyBySlug(slug);

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

export { $$ProjectLayout as $, getProjectPolicyBySlug as a, jdManagement as b, getProjects as c, getProjectBySlug as g, invois as i, jomDapur as j };
