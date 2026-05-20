import { A as ApiClient } from './api-client_BtW8nPY3.mjs';

const API_BASE_URL = "http://localhost:8787/api/v1";
const withNoCache = (endpoint) => {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}noCache=1&_=${Date.now()}`;
};
class FamilyService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }
  async getPublicTrees() {
    const result = await this.get(withNoCache("family"));
    return result || [];
  }
  async getPublicTreeBySlug(slug) {
    return this.get(withNoCache(`family/${slug}`));
  }
  async getPublicPersonById(id) {
    return this.get(withNoCache(`family/person/${id}`));
  }
  async getPublicTreesByGlobalKey(key) {
    const result = await this.get(
      withNoCache(`family/trees-by-global/${encodeURIComponent(key)}`)
    );
    return result || [];
  }
  async getAdminTrees() {
    const result = await this.get("owner/family");
    return result || [];
  }
  async getAdminTreeDetailById(id) {
    return this.get(`owner/family/${id}`);
  }
  async createTree(data) {
    return this.post("owner/family", data);
  }
  async updateTree(id, data) {
    return this.put(`owner/family/${id}`, data);
  }
  async deleteTree(id) {
    try {
      await this.delete(`owner/family/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete tree:", error);
      return false;
    }
  }
  async createPerson(treeId, data) {
    return this.post(`owner/family/${treeId}/people`, data);
  }
  async updatePerson(personId, data) {
    return this.put(`owner/family/people/${personId}`, data);
  }
  async deletePerson(personId) {
    try {
      await this.delete(`owner/family/people/${personId}`);
      return true;
    } catch (error) {
      console.error("Failed to delete person:", error);
      return false;
    }
  }
  async createRelationship(treeId, data) {
    return this.post(
      `owner/family/${treeId}/relationships`,
      data
    );
  }
  async updateRelationship(relationshipId, data) {
    return this.put(
      `owner/family/relationships/${relationshipId}`,
      data
    );
  }
  async deleteRelationship(relationshipId) {
    try {
      await this.delete(`owner/family/relationships/${relationshipId}`);
      return true;
    } catch (error) {
      console.error("Failed to delete relationship:", error);
      return false;
    }
  }
}
const familyService = new FamilyService();
const getPublicFamilyTrees = () => familyService.getPublicTrees();
const getPublicFamilyTreeBySlug = (slug) => familyService.getPublicTreeBySlug(slug);
const getPublicFamilyTreesByGlobalKey = (key) => familyService.getPublicTreesByGlobalKey(key);

export { getPublicFamilyTreeBySlug as a, getPublicFamilyTreesByGlobalKey as b, familyService as f, getPublicFamilyTrees as g };
