export type PublishStatus = "PENDING" | "PUBLISHED" | "FAILED" | string;

export interface SocialAccount {
  id: string;
  workspace_id?: string;
  provider: string;
  name: string;
  account_name?: string;
  account_id: string;
  avatar_url?: string | null;
  is_active: boolean;
  status?: string;
  expires_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialAccountConnectRequest {
  provider: string;
  workspace_id?: string;
  code?: string;
  redirect_uri?: string;
  account_id?: string;
  name?: string;
}

export interface PublishRequest {
  social_account_id: string;
  content_id: string;
  message?: string | null;
  media_urls?: string[] | null;
}

export interface PublishHistoryResponse {
  id: string;
  workspace_id?: string;
  social_account_id: string;
  campaign_id?: string | null;
  content_id: string;
  status: PublishStatus;
  external_post_id?: string | null;
  error_message?: string | null;
  response_data?: Record<string, unknown> | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}
