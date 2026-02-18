import type { BlogPost, BlogPostSummary, CreateBlogPostPayload, UpdateBlogPostPayload } from '../types/blog';
import { ApiClient } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export class BlogService extends ApiClient {
    constructor() {
        super(API_BASE_URL);
    }

    async getPublicPosts(): Promise<BlogPostSummary[]> {
        const result = await this.get<BlogPostSummary[]>('blog');
        return result || [];
    }

    async getPublicPostBySlug(slug: string): Promise<BlogPost | null> {
        return this.get<BlogPost>(`blog/${slug}`);
    }

    async getAdminPosts(): Promise<BlogPostSummary[]> {
        const result = await this.get<BlogPostSummary[]>('owner/blog');
        return result || [];
    }

    async getAdminPostById(id: number): Promise<BlogPost | null> {
        return this.get<BlogPost>(`owner/blog/${id}`);
    }

    async createPost(data: CreateBlogPostPayload): Promise<BlogPost | null> {
        return this.post<BlogPost>('owner/blog', data);
    }

    async updatePost(id: number, data: UpdateBlogPostPayload): Promise<BlogPost | null> {
        return this.put<BlogPost>(`owner/blog/${id}`, data);
    }

    async deletePost(id: number): Promise<boolean> {
        try {
            await this.delete(`owner/blog/${id}`);
            return true;
        } catch (error) {
            console.error('Failed to delete blog post:', error);
            return false;
        }
    }
}

export const blogService = new BlogService();
