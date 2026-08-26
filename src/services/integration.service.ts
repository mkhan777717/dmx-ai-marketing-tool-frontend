import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type { IntegrationConnection, OAuthUrlResponse } from "@/types/integration";

export const IntegrationService = {
  getIntegrations() {
    return api.get<ApiResponse<IntegrationConnection[]>>(ENDPOINTS.INTEGRATIONS);
  },

  getOAuthUrl(provider: string, redirectUri: string) {
    return api.get<ApiResponse<OAuthUrlResponse>>(
      ENDPOINTS.INTEGRATION_OAUTH_URL(provider),
      { params: { redirect_uri: redirectUri } }
    );
  },

  triggerSync(provider: string, syncType = "full") {
    return api.post<ApiResponse<unknown>>(
      ENDPOINTS.INTEGRATION_SYNC(provider),
      null,
      { params: { sync_type: syncType } }
    );
  },

  disconnect(provider: string) {
    return api.delete<ApiResponse<unknown>>(
      ENDPOINTS.INTEGRATION_DISCONNECT(provider)
    );
  },
};
