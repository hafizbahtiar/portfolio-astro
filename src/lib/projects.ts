import type { Project } from '../types/project';
import { ApiClient } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export class ProjectsService extends ApiClient {
    constructor() {
        super(API_BASE_URL);
    }

    // Public methods
    async getProjects(): Promise<Project[]> {
        const result = await this.get<Project[]>('projects');
        return result || [];
    }

    async getProjectBySlug(slug: string): Promise<Project | null> {
        return this.get<Project>(`projects/${slug}`);
    }

    // Admin methods
    async getAdminProjects(): Promise<Project[]> {
        const result = await this.get<Project[]>('owner/projects/all');
        return result || [];
    }

    async getAdminProjectById(id: number): Promise<Project | null> {
        const projects = await this.getAdminProjects();
        return projects.find(p => p.id === id) || null;
    }

    async createProject(data: Partial<Project>): Promise<Project | null> {
        return this.post<Project>('owner/projects', data);
    }

    async updateProject(id: number, data: Partial<Project>): Promise<Project | null> {
        return this.put<Project>(`owner/projects/${id}`, data);
    }

    async deleteProject(id: number): Promise<boolean> {
        try {
            await this.delete(`owner/projects/${id}`);
            return true;
        } catch (error) {
            console.error('Failed to delete project:', error);
            return false;
        }
    }
}

// Export a singleton instance
export const projectsService = new ProjectsService();

// Export standalone functions for backward compatibility
export const getProjects = () => projectsService.getProjects();
export const getProjectBySlug = (slug: string) => projectsService.getProjectBySlug(slug);
