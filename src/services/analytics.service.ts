import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  DashboardOverviewResponse,
  AnalyticsSnapshotResponse,
  CampaignAnalyticsResponse,
  AIUsageResponse,
} from "@/types/analytics";

export const AnalyticsService = {
  getDashboard(workspaceId: string) {
    return api.get<ApiResponse<DashboardOverviewResponse>>(
      ENDPOINTS.ANALYTICS_DASHBOARD(workspaceId)
    );
  },

  getOverview(workspaceId: string, snapshotType = "daily") {
    return api.get<ApiResponse<AnalyticsSnapshotResponse>>(
      ENDPOINTS.ANALYTICS_OVERVIEW(workspaceId),
      { params: { snapshot_type: snapshotType } }
    );
  },

  getCampaignAnalytics(
    workspaceId: string,
    params?: { skip?: number; limit?: number; campaign_id?: string }
  ) {
    return api.get<ApiResponse<CampaignAnalyticsResponse[]>>(
      ENDPOINTS.ANALYTICS_CAMPAIGNS(workspaceId),
      { params }
    );
  },

  getAIUsage(workspaceId: string, params?: { skip?: number; limit?: number }) {
    return api.get<ApiResponse<AIUsageResponse[]>>(
      ENDPOINTS.ANALYTICS_AI(workspaceId),
      { params }
    );
  },
};
