export type CampaignStatus =
  | "DRAFT"
  | "ACTIVE"
  | "PAUSED"
  | "SCHEDULED"
  | "COMPLETED"
  | "ARCHIVED"
  | "draft"
  | "scheduled"
  | "active"
  | "paused"
  | "completed"
  | "archived";

export interface Campaign {
  id: string;
  workspace_id: string;
  owner_id?: string;
  creator_id?: string | null;
  name?: string;
  campaign_name?: string;
  description?: string | null;
  objective?: string | null;
  campaign_type?: string | null;
  target_channels?: string | null;
  status: CampaignStatus;
  budget?: number | string | null;
  currency?: string | null;
  target_audience?: Record<string, unknown> | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignCreate {
  campaign_name?: string;
  name?: string;
  description?: string | null;
  objective?: string | null;
  campaign_type?: string | null;
  target_channels?: string | null;
  status?: CampaignStatus;
  budget?: number | null;
  currency?: string | null;
  target_audience?: Record<string, unknown> | null;
  start_date?: string | null;
  end_date?: string | null;
}

export interface CampaignUpdate {
  campaign_name?: string | null;
  name?: string | null;
  description?: string | null;
  objective?: string | null;
  campaign_type?: string | null;
  target_channels?: string | null;
  status?: CampaignStatus | null;
  budget?: number | null;
  currency?: string | null;
  target_audience?: Record<string, unknown> | null;
  start_date?: string | null;
  end_date?: string | null;
}

export interface CampaignStatusUpdate {
  status: CampaignStatus;
}

export interface CampaignScheduleCreate {
  scheduled_at: string;
  recurrence_rule?: string | null;
  target_channels?: string[] | null;
}

export interface CampaignScheduleUpdate {
  scheduled_at?: string | null;
  recurrence_rule?: string | null;
  target_channels?: string[] | null;
}

export interface CampaignScheduleResponse {
  id: string;
  campaign_id: string;
  workspace_id: string;
  scheduled_at: string;
  recurrence_rule?: string | null;
  target_channels?: string[] | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignPublishHistory {
  id: string;
  campaign_id: string;
  published_at: string;
  status: string;
  channel?: string | null;
  response_data?: Record<string, unknown> | null;
}
