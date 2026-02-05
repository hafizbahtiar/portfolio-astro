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
  twitterUrl?: string;
  createdAt: string;
}

class ProfileService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getProfile(): Promise<Profile | null> {
    try {
      return await this.get<Profile>('/profile');
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  }

  async getOwnerProfile(): Promise<Profile | null> {
    try {
      return await this.get<Profile>('/owner/profile');
    } catch (error) {
      console.error('Get owner profile error:', error);
      return null;
    }
  }

  async updateProfile(id: number, data: Partial<Profile>): Promise<Profile | null> {
    try {
      // Use the owner/profile endpoint which updates the owner table
      // The id parameter is kept for signature compatibility but not used by the endpoint
      return await this.put<Profile>('/owner/profile', data);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
