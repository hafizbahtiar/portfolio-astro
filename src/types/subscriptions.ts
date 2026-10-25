// Owner subscriptions + monthly caps (backend migration 050, services/subscriptions.ts).

export type Billing = "monthly" | "yearly" | "usage" | "free";
export type Currency = "USD" | "MYR";
/** Codes the API charges per call - a metered row stops that call at its monthly cap. */
export type MeterCode = "web_search:brave" | "web_search:serper" | "web_search:parallel";

export interface Subscription {
  id: number;
  name: string;
  vendorUrl: string | null;
  plan: string | null;
  billing: Billing;
  /** Per billing period (month or year). */
  cost: number;
  currency: Currency;
  renewsOn: string | null;
  notes: string | null;
  active: boolean;
  meterCode: MeterCode | null;
  freeUnits: number | null;
  /** Per 1,000 calls. */
  unitPrice: number | null;
  monthlyCap: number | null;
  usedThisMonth: number;
  usageCostThisMonth: number | null;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionPayload = Omit<Subscription, "id" | "usedThisMonth" | "usageCostThisMonth" | "createdAt" | "updatedAt">;
