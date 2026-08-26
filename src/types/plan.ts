export interface PlanResponse {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price_monthly: number;
  price_yearly: number;
  features?: string[] | Record<string, unknown> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlanCreate {
  name: string;
  slug: string;
  description?: string | null;
  price_monthly: number;
  price_yearly: number;
  features?: string[] | Record<string, unknown> | null;
  is_active?: boolean;
}

export interface PlanUpdate {
  name?: string | null;
  description?: string | null;
  price_monthly?: number | null;
  price_yearly?: number | null;
  features?: string[] | Record<string, unknown> | null;
  is_active?: boolean | null;
}
