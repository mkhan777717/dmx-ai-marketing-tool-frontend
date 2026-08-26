export type CampaignStatus = "draft" | "scheduled" | "active" | "paused" | "completed" | "archived";

export interface Campaign {
  id: string;
  workspace_id: string;
  creator_id?: string | null;
  name: string;
  description?: string | null;
  status: CampaignStatus;
  budget?: number | string | null;
  target_audience?: Record<string, unknown> | null;
  start_date?: string | null;
  end_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignCreate {
  name: string;
  description?: string | null;
  status?: CampaignStatus;
  budget?: number | null;
  target_audience?: Record<string, unknown> | null;
  start_date?: string | null;
  end_date?: string | null;
}

export interface CampaignUpdate {
  name?: string | null;
  description?: string | null;
  status?: CampaignStatus | null;
  budget?: number | null;
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
