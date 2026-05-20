import { A as ApiClient } from './api-client_BtW8nPY3.mjs';

const API_BASE_URL = "http://localhost:8787/api/v1";
class ExperiencesService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }
  async getPublicExperiences() {
    const result = await this.get("experiences");
    return result || [];
  }
  async getAdminExperiences() {
    const result = await this.get("owner/experiences");
    return result || [];
  }
  async getAdminExperienceById(id) {
    return this.get(`owner/experiences/${id}`);
  }
  async createExperience(data) {
    return this.post("owner/experiences", data);
  }
  async updateExperience(id, data) {
    return this.put(`owner/experiences/${id}`, data);
  }
  async deleteExperience(id) {
    try {
      await this.delete(`owner/experiences/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete experience:", error);
      return false;
    }
  }
}
const experiencesService = new ExperiencesService();

export { experiencesService as e };
