import { ApiClient } from "./api-client";
import type {
  CreateFamilyPersonPayload,
  CreateFamilyRelationshipPayload,
  CreateFamilyTreePayload,
  FamilyPerson,
  FamilyRelationship,
  FamilyTree,
  FamilyTreeDetail,
  UpdateFamilyPersonPayload,
  UpdateFamilyRelationshipPayload,
  UpdateFamilyTreePayload,
} from "../types/family";

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

const withNoCache = (endpoint: string) => {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}noCache=1&_=${Date.now()}`;
};

export class FamilyService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getPublicTrees(): Promise<FamilyTree[]> {
    const result = await this.get<FamilyTree[]>(withNoCache("family"));
    return result || [];
  }

  async getPublicTreeBySlug(slug: string): Promise<FamilyTreeDetail | null> {
    return this.get<FamilyTreeDetail>(withNoCache(`family/${slug}`));
  }

  async getPublicPersonById(id: number): Promise<FamilyPerson | null> {
    return this.get<FamilyPerson>(withNoCache(`family/person/${id}`));
  }
  
  async getPublicTreesByGlobalKey(key: string): Promise<FamilyTree[]> {
    const result = await this.get<FamilyTree[]>(
      withNoCache(`family/trees-by-global/${encodeURIComponent(key)}`),
    );
    return result || [];
  }

  async getAdminTrees(): Promise<FamilyTree[]> {
    const result = await this.get<FamilyTree[]>("owner/family");
    return result || [];
  }

  async getAdminTreeDetailById(id: number): Promise<FamilyTreeDetail | null> {
    return this.get<FamilyTreeDetail>(`owner/family/${id}`);
  }

  async createTree(data: CreateFamilyTreePayload): Promise<FamilyTree | null> {
    return this.post<FamilyTree>("owner/family", data);
  }

  async updateTree(
    id: number,
    data: UpdateFamilyTreePayload,
  ): Promise<FamilyTree | null> {
    return this.put<FamilyTree>(`owner/family/${id}`, data);
  }

  async deleteTree(id: number): Promise<boolean> {
    try {
      await this.delete(`owner/family/${id}`);
      return true;
    } catch (error) {
      console.error("Failed to delete tree:", error);
      return false;
    }
  }

  async createPerson(
    treeId: number,
    data: CreateFamilyPersonPayload,
  ): Promise<FamilyPerson | null> {
    return this.post<FamilyPerson>(`owner/family/${treeId}/people`, data);
  }

  async updatePerson(
    personId: number,
    data: UpdateFamilyPersonPayload,
  ): Promise<FamilyPerson | null> {
    return this.put<FamilyPerson>(`owner/family/people/${personId}`, data);
  }

  async deletePerson(personId: number): Promise<boolean> {
    try {
      await this.delete(`owner/family/people/${personId}`);
      return true;
    } catch (error) {
      console.error("Failed to delete person:", error);
      return false;
    }
  }

  async createRelationship(
    treeId: number,
    data: CreateFamilyRelationshipPayload,
  ): Promise<FamilyRelationship | null> {
    return this.post<FamilyRelationship>(
      `owner/family/${treeId}/relationships`,
      data,
    );
  }

  async updateRelationship(
    relationshipId: number,
    data: UpdateFamilyRelationshipPayload,
  ): Promise<FamilyRelationship | null> {
    return this.put<FamilyRelationship>(
      `owner/family/relationships/${relationshipId}`,
      data,
    );
  }

  async deleteRelationship(relationshipId: number): Promise<boolean> {
    try {
      await this.delete(`owner/family/relationships/${relationshipId}`);
      return true;
    } catch (error) {
      console.error("Failed to delete relationship:", error);
      return false;
    }
  }
}

export const familyService = new FamilyService();

export const getPublicFamilyTrees = () => familyService.getPublicTrees();
export const getPublicFamilyTreeBySlug = (slug: string) =>
  familyService.getPublicTreeBySlug(slug);
export const getPublicFamilyPersonById = (id: number) =>
  familyService.getPublicPersonById(id);
export const getPublicFamilyTreesByGlobalKey = (key: string) =>
  familyService.getPublicTreesByGlobalKey(key);
