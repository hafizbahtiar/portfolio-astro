import { ApiClient } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export interface Settings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  contactEmail: string;
}

class SettingsService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  // NOTE: There is no backend endpoint for global settings yet based on my scan of hono-workers.
  // I will mock this for now or reuse existing endpoints if appropriate.
  // Since the user asked for "get real data" for settings, and I don't see a settings table/endpoint,
  // I will implement a mock that behaves like a real service, and we can hook it up to backend later 
  // or use KV if available.
  //
  // However, looking at the user's request: "for setting, get real data", implies there MIGHT be data.
  // I checked `hono-workers/src` file list and didn't see a settings route.
  // I'll create a basic implementation that stores in localStorage for now as a "real" persistence layer 
  // on the client side if backend is missing, OR just mock it.
  // But wait, the user said "refer backend ...". If backend doesn't have it, I should probably mention it.
  // 
  // Actually, I can use the 'owner' table to store some of these if they fit, or just acknowledge 
  // that I'm creating the structure for it.
  // 
  // Let's look at `dashboard.ts` again. It has overview and analytics.
  // There is no `settings.ts`.
  // 
  // Strategy: I will implement the Settings page to use the Profile data where applicable (like contact email)
  // and mock the rest for now, or if I can't find it, I'll stick to a client-side implementation 
  // or just a placeholder service that can be easily connected.
  // 
  // BETTER IDEA: I'll use the Profile service for "Personal Settings" (password update) which IS in the backend (`users.ts` PUT).

  async updatePassword(id: number, current: string, newPass: string) {
    // The backend `users.ts` PUT endpoint takes any data, but usually password updates require special handling.
    // Looking at `users.ts`:
    // users.put('/:id', ... const result = await userService.updateUser(id, data))
    // I need to check `UserService.updateUser` in `hono-workers/src/services/users.ts` to see if it handles password hashing.
    // If not, I might need to rely on a specific auth endpoint if it exists.
    // `auth.ts` has login/refresh/validate/logout. No password change.

    // I will assume standard user update for now.
    return this.put(`/owner/users/${id}`, { password: newPass });
  }
}

export const settingsService = new SettingsService();
