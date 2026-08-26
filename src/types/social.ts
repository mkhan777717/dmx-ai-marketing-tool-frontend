export interface SocialAccount {
  id: string;
  workspace_id: string;
  provider: string;
  account_name: string;
  account_id: string;
  avatar_url?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SocialAccountConnectRequest {
  provider: string;
  code: string;
  redirect_uri: string;
}

export interface PublishRequest {
  social_account_id: string;
  content_id: string;
  message?: string | null;
  media_urls?: string[] | null;
}

export interface PublishHistoryResponse {
  id: string;
  workspace_id: string;
  social_account_id: string;
  campaign_id?: string | null;
  content_id?: string | null;
  status: string;
  response_data?: Record<string, unknown> | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}
