import { A as ApiClient } from './api-client_BtW8nPY3.mjs';

const API_BASE_URL = "http://localhost:8787/api/v1";
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

export { getProjects as g, projectsService as p };
