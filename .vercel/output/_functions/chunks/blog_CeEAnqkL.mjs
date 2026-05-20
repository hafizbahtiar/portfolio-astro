import { A as ApiClient } from './api-client_BtW8nPY3.mjs';

const API_BASE_URL = "http://localhost:8787/api/v1";
class BlogService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }
  async getPublicPosts() {
    const result = await this.get("blog");
    return result || [];
  }
  async getPublicPostBySlug(slug) {
    return this.get(`blog/${slug}`);
  }
  async getAdminPosts() {
    const result = await this.get("owner/blog");
    return result || [];
  }
  async getAdminPostById(id) {
    return this.get(`owner/blog/${id}`);
  }
  async createPost(data) {
    return this.post("owner/blog", data);
  }
  async updatePost(id, data) {
    return this.put(`owner/blog/${id}`, data);
  }
  async deletePost(id) {
    try {
      await this.delete(`owner/blog/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete blog post:", error);
      return false;
    }
  }
}
const blogService = new BlogService();

export { blogService as b };
