import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  SocialAccount,
  SocialAccountConnectRequest,
  PublishRequest,
  PublishHistoryResponse,
} from "@/types/social";

export const SocialService = {
  getAccounts(workspaceId: string, params?: { skip?: number; limit?: number }) {
    return api.get<ApiResponse<SocialAccount[]> | SocialAccount[]>(
      ENDPOINTS.SOCIAL_ACCOUNTS(workspaceId),
      { params }
    );
  },

  connectAccount(workspaceId: string, data: SocialAccountConnectRequest) {
    const payload = {
      ...data,
      workspace_id: workspaceId,
    };
    return api.post<ApiResponse<SocialAccount> | SocialAccount>(
      ENDPOINTS.SOCIAL_CONNECT(workspaceId),
      payload
    );
  },

  // Backend returns ApiResponse wrapper for publishing
  publishContent(workspaceId: string, data: PublishRequest) {
    return api.post<ApiResponse<PublishHistoryResponse>>(
      ENDPOINTS.PUBLISHING_PUBLISH(workspaceId),
      data
    );
  },

  getPublishHistory(
    workspaceId: string,
    params?: {
      skip?: number;
      limit?: number;
      campaign_id?: string;
      content_id?: string;
      status?: string;
      social_account_id?: string;
    }
  ) {
    return api.get<ApiResponse<PublishHistoryResponse[]>>(
      ENDPOINTS.PUBLISHING_HISTORY(workspaceId),
      { params }
    );
  },
};
