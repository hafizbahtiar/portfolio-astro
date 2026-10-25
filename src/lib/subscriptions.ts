import type { Subscription, SubscriptionPayload } from "../types/subscriptions";
import { ApiClient } from "./api-client";
import { API_BASE_URL } from "./config";

const OWNER = "owner/subscriptions";

export class SubscriptionsService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }

  async list(): Promise<Subscription[]> {
    return (await this.get<Subscription[]>(OWNER)) ?? [];
  }

  getById(id: number): Promise<Subscription | null> {
    return this.get<Subscription>(`${OWNER}/${id}`);
  }

  create(data: SubscriptionPayload): Promise<Subscription | null> {
    return this.post<Subscription>(OWNER, data);
  }

  update(id: number, data: SubscriptionPayload): Promise<Subscription | null> {
    return this.put<Subscription>(`${OWNER}/${id}`, data);
  }

  async remove(id: number): Promise<void> {
    await this.delete(`${OWNER}/${id}`);
  }
}

export const subscriptionsService = new SubscriptionsService();
