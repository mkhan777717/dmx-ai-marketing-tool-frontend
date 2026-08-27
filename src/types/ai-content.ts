export type ContentType =
  | "SOCIAL_POST"
  | "EMAIL"
  | "BLOG"
  | "ADVERTISEMENT"
  | "LANDING_PAGE"
  | "SMS"
  | "OTHER"
  | string;

export interface AIContentGenerateRequest {
  prompt: string;
  content_type?: ContentType;
  platform?: string | null;
  tone?: string | null;
  tone_of_voice?: string | null;
  topic?: string | null;
  language?: string | null;
  brand_kit_id?: string | null;
  target_audience?: string | null;
  provider?: string | null;
}

export interface AIContentGenerateResponse {
  body: string;
  generated_text?: string;
  content_type?: string;
  summary?: string | null;
  hashtags?: string | null;
  cta?: string | null;
  tokens_used?: number | null;
  provider_used?: string | null;
  provider?: string | null;
  model?: string | null;
}

export interface CampaignContent {
  id: string;
  campaign_id: string;
  title: string;
  content_type: ContentType;
  body?: string | null;
  summary?: string | null;
  hashtags?: string | null;
  cta?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  scheduled_placeholder?: string | null;
  status: string;
  version?: number;
  is_current?: boolean;
  created_at: string;
  updated_at: string;
}

export interface CampaignContentCreate {
  campaign_id: string;
  title: string;
  content_type: ContentType;
  body?: string | null;
  summary?: string | null;
  hashtags?: string | null;
  cta?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  language?: string | null;
}

export interface CampaignContentUpdate {
  title?: string | null;
  content_type?: ContentType | null;
  body?: string | null;
  summary?: string | null;
  hashtags?: string | null;
  cta?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  status?: string | null;
}
