import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  WorkspaceInviteRequest,
  WorkspaceInviteResponse,
} from "@/types/invite";

export const InviteService = {
  createInvite(workspaceId: string, data: WorkspaceInviteRequest) {
    return api.post<ApiResponse<WorkspaceInviteResponse>>(
      ENDPOINTS.INVITES(workspaceId),
      data
    );
  },

  getInvites(workspaceId: string) {
    return api.get<ApiResponse<WorkspaceInviteResponse[]>>(
      ENDPOINTS.INVITES(workspaceId)
    );
  },

  revokeInvite(workspaceId: string, inviteId: string) {
    return api.post<ApiResponse<WorkspaceInviteResponse>>(
      ENDPOINTS.INVITE_REVOKE(workspaceId, inviteId)
    );
  },

  resendInvite(workspaceId: string, inviteId: string) {
    return api.post<ApiResponse<WorkspaceInviteResponse>>(
      ENDPOINTS.INVITE_RESEND(workspaceId, inviteId)
    );
  },

  acceptInvite(token: string) {
    return api.post<ApiResponse<null>>(ENDPOINTS.INVITE_ACCEPT(token));
  },
};
