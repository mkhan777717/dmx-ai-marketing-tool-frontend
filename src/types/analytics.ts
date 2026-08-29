export interface AIUsageResponse {
  id: string;
  workspace_id: string;
  provider: string;
  model: string;
  generations: number;
  success_count: number;
  failure_count: number;
  total_tokens: number;
  created_at: string;
  updated_at: string;
}

export interface CampaignAnalyticsResponse {
  id: string;
  campaign_id: string;
  impressions: number;
  reach: number;
  clicks: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  engagement_rate: number;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsSnapshotResponse {
  id: string;
  workspace_id: string;
  snapshot_type: string;
  snapshot_date: string;
  campaign_metrics?: Record<string, unknown> | null;
  ai_metrics?: Record<string, unknown> | null;
  publishing_metrics?: Record<string, unknown> | null;
  workspace_metrics?: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardOverviewResponse {
  workspace_id: string;
  date: string;
  campaign_metrics: {
    total_campaigns?: number;
    active_campaigns?: number;
    scheduled_campaigns?: number;
    draft_campaigns?: number;
    completed_campaigns?: number;
    total_budget?: number;
    [key: string]: unknown;
  };
  ai_metrics: {
    total_generations?: number;
    total_tokens?: number;
    ai_score?: number;
    [key: string]: unknown;
  };
  publishing_metrics: {
    total_published?: number;
    total_scheduled?: number;
    total_failed?: number;
    [key: string]: unknown;
  };
  workspace_metrics: {
    total_members?: number;
    total_leads?: number;
    revenue?: number;
    [key: string]: unknown;
  };
}
