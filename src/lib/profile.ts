import { ApiClient } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export interface Profile {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  createdAt: string;
}

class ProfileService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getProfile(): Promise<Profile | null> {
    try {
      // Assuming there's an endpoint to get the current user's profile
      // If not, we might need to fetch by ID from the auth user
      // Based on users.ts, we have GET /owner/users/:id
      // We need to know the current user's ID. 
      // For now, let's assume we store the user ID in localStorage or getting it from a 'me' endpoint if it existed.
      // Since 'me' endpoint isn't explicitly in users.ts, we'll try to get the first user or rely on the auth response which has the user object.

      // However, a better approach is to fetch the user details using the ID stored in auth service if possible,
      // but auth service is separate.

      // Let's try to fetch user with ID 1 (Owner) as a default fallback or use the stored user from auth
      // But strictly speaking, we should probably add a 'me' endpoint in the backend.
      // Given I cannot change backend easily without instruction, I will fetch user ID 1 for now as it seems to be a single-owner portfolio.

      return await this.get<Profile>('/owner/users/1');
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  }

  async updateProfile(id: number, data: Partial<Profile>): Promise<Profile | null> {
    try {
      return await this.put<Profile>(`/owner/users/${id}`, data);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
