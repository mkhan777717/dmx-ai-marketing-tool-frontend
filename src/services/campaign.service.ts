import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  Campaign,
  CampaignCreate,
  CampaignUpdate,
  CampaignStatusUpdate,
  CampaignScheduleCreate,
  CampaignScheduleUpdate,
  CampaignScheduleResponse,
  CampaignPublishHistory,
} from "@/types/campaign";

export const CampaignService = {
  getAll(workspaceId: string, params?: { skip?: number; limit?: number; status?: string; search?: string }) {
    return api.get<ApiResponse<Campaign[]>>(ENDPOINTS.CAMPAIGNS(workspaceId), {
      params,
    });
  },

  getById(workspaceId: string, campaignId: string) {
    return api.get<ApiResponse<Campaign>>(
      ENDPOINTS.CAMPAIGN_BY_ID(workspaceId, campaignId)
    );
  },

  create(workspaceId: string, data: CampaignCreate) {
    const payload = {
      ...data,
      campaign_name: data.campaign_name || data.name || "Untitled Campaign",
    };
    return api.post<ApiResponse<Campaign>>(
      ENDPOINTS.CAMPAIGNS(workspaceId),
      payload
    );
  },

  update(workspaceId: string, campaignId: string, data: CampaignUpdate) {
    const payload = {
      ...data,
      campaign_name: data.campaign_name || data.name || undefined,
    };
    return api.put<ApiResponse<Campaign>>(
      ENDPOINTS.CAMPAIGN_BY_ID(workspaceId, campaignId),
      payload
    );
  },

  delete(workspaceId: string, campaignId: string) {
    return api.delete<ApiResponse<Campaign>>(
      ENDPOINTS.CAMPAIGN_BY_ID(workspaceId, campaignId)
    );
  },

  changeStatus(workspaceId: string, campaignId: string, data: CampaignStatusUpdate) {
    return api.post<ApiResponse<Campaign>>(
      ENDPOINTS.CAMPAIGN_STATUS(workspaceId, campaignId),
      data
    );
  },

  // Scheduling APIs
  schedule(campaignId: string, data: CampaignScheduleCreate) {
    return api.post<CampaignScheduleResponse>(
      ENDPOINTS.CAMPAIGN_SCHEDULE(campaignId),
      data
    );
  },

  updateSchedule(campaignId: string, data: CampaignScheduleUpdate) {
    return api.put<CampaignScheduleResponse>(
      ENDPOINTS.CAMPAIGN_SCHEDULE(campaignId),
      data
    );
  },

  cancelSchedule(campaignId: string) {
    return api.delete<CampaignScheduleResponse>(
      ENDPOINTS.CAMPAIGN_SCHEDULE(campaignId)
    );
  },

  publishImmediately(campaignId: string) {
    return api.post<CampaignScheduleResponse>(
      ENDPOINTS.CAMPAIGN_PUBLISH(campaignId)
    );
  },

  pauseSchedule(campaignId: string) {
    return api.post<CampaignScheduleResponse>(
      ENDPOINTS.CAMPAIGN_PAUSE(campaignId)
    );
  },

  resumeSchedule(campaignId: string) {
    return api.post<CampaignScheduleResponse>(
      ENDPOINTS.CAMPAIGN_RESUME(campaignId)
    );
  },

  getHistory(campaignId: string) {
    return api.get<CampaignPublishHistory[]>(
      ENDPOINTS.CAMPAIGN_HISTORY(campaignId)
    );
  },
};
