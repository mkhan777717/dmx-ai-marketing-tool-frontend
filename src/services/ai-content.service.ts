import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  AIContentGenerateRequest,
  AIContentGenerateResponse,
  CampaignContent,
  CampaignContentCreate,
  CampaignContentUpdate,
} from "@/types/ai-content";

export const AIContentService = {
  generateContent(
    workspaceId: string,
    data: AIContentGenerateRequest
  ) {
    const payload = {
      prompt: data.prompt,
      content_type: data.content_type || "SOCIAL_POST",
      campaign_id: data.campaign_id || undefined,
      language: data.language || "en",
      tone_of_voice: data.tone_of_voice || data.tone || undefined,
      target_audience: data.target_audience || undefined,
      brand_kit_id: data.brand_kit_id || undefined,
      provider: data.provider || "MOCK",
    };

    return api.post<ApiResponse<AIContentGenerateResponse>>(
      ENDPOINTS.AI_GENERATE(workspaceId),
      payload
    );
  },

  createContent(workspaceId: string, campaignId: string, data: CampaignContentCreate) {
    return api.post<ApiResponse<CampaignContent>>(
      ENDPOINTS.CAMPAIGN_CONTENTS(workspaceId, campaignId),
      data
    );
  },

  listContents(workspaceId: string, campaignId: string, params?: { skip?: number; limit?: number }) {
    return api.get<ApiResponse<CampaignContent[]>>(
      ENDPOINTS.CAMPAIGN_CONTENTS(workspaceId, campaignId),
      { params }
    );
  },

  getContent(workspaceId: string, campaignId: string, contentId: string) {
    return api.get<ApiResponse<CampaignContent>>(
      ENDPOINTS.CAMPAIGN_CONTENT_BY_ID(workspaceId, campaignId, contentId)
    );
  },

  updateContent(
    workspaceId: string,
    campaignId: string,
    contentId: string,
    data: CampaignContentUpdate
  ) {
    return api.patch<ApiResponse<CampaignContent>>(
      ENDPOINTS.CAMPAIGN_CONTENT_BY_ID(workspaceId, campaignId, contentId),
      data
    );
  },

  deleteContent(workspaceId: string, campaignId: string, contentId: string) {
    return api.delete<ApiResponse<CampaignContent>>(
      ENDPOINTS.CAMPAIGN_CONTENT_BY_ID(workspaceId, campaignId, contentId)
    );
  },
};
