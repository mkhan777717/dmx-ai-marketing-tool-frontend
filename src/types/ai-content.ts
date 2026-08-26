export interface AIContentGenerateRequest {
  prompt: string;
  platform?: string | null;
  tone?: string | null;
  topic?: string | null;
  language?: string | null;
}

export interface AIContentGenerateResponse {
  generated_text: string;
  tokens_used?: number | null;
  provider?: string | null;
  model?: string | null;
}

export interface CampaignContent {
  id: string;
  workspace_id: string;
  campaign_id: string;
  title?: string | null;
  content_type: string;
  body: string;
  platform?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignContentCreate {
  campaign_id?: string;
  title?: string | null;
  content_type?: string;
  body: string;
  platform?: string | null;
  status?: string;
}

export interface CampaignContentUpdate {
  title?: string | null;
  body?: string | null;
  platform?: string | null;
  status?: string | null;
}
