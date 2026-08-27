export interface PlanResponse {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  monthly_price?: number;
  price_monthly?: number;
  yearly_price?: number;
  price_yearly?: number;
  max_users?: number;
  max_workspaces?: number;
  max_ai_credits?: number;
  features?: string[] | Record<string, unknown> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlanCreate {
  name: string;
  slug: string;
  description?: string | null;
  monthly_price?: number;
  price_monthly?: number;
  yearly_price?: number;
  price_yearly?: number;
  max_users?: number;
  max_workspaces?: number;
  max_ai_credits?: number;
  features?: string[] | Record<string, unknown> | null;
  is_active?: boolean;
}

export interface PlanUpdate {
  name?: string | null;
  slug?: string | null;
  description?: string | null;
  monthly_price?: number | null;
  price_monthly?: number | null;
  yearly_price?: number | null;
  price_yearly?: number | null;
  max_users?: number | null;
  max_workspaces?: number | null;
  max_ai_credits?: number | null;
  features?: string[] | Record<string, unknown> | null;
  is_active?: boolean | null;
}
