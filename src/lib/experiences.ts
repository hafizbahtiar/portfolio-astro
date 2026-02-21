import type {
    Experience,
    CreateExperiencePayload,
    UpdateExperiencePayload
} from "../types/experiences";
import { ApiClient } from "./api-client";

const API_BASE_URL =
    import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export class ExperiencesService extends ApiClient {
    constructor() {
        super(API_BASE_URL);
    }

    async getPublicExperiences(): Promise<Experience[]> {
        const result = await this.get<Experience[]>("experiences");
        return result || [];
    }

    async getAdminExperiences(): Promise<Experience[]> {
        const result = await this.get<Experience[]>("owner/experiences");
        return result || [];
    }

    async getAdminExperienceById(id: number): Promise<Experience | null> {
        return this.get<Experience>(`owner/experiences/${id}`);
    }

    async createExperience(
        data: CreateExperiencePayload,
    ): Promise<Experience | null> {
        return this.post<Experience>("owner/experiences", data);
    }

    async updateExperience(
        id: number,
        data: UpdateExperiencePayload,
    ): Promise<Experience | null> {
        return this.put<Experience>(`owner/experiences/${id}`, data);
    }

    async deleteExperience(id: number): Promise<boolean> {
        try {
            await this.delete(`owner/experiences/${id}`);
            return true;
        } catch (error) {
            console.error("Failed to delete experience:", error);
            return false;
        }
    }
}

export const experiencesService = new ExperiencesService();
