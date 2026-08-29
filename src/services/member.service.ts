import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  WorkspaceMemberResponse,
  WorkspaceMemberUpdateRequest,
} from "@/types/member";

export const MemberService = {
  getMembers(workspaceId: string) {
    return api.get<ApiResponse<WorkspaceMemberResponse[]>>(
      ENDPOINTS.MEMBERS(workspaceId)
    );
  },

  getMember(workspaceId: string, memberId: string) {
    return api.get<ApiResponse<WorkspaceMemberResponse>>(
      ENDPOINTS.MEMBER_BY_ID(workspaceId, memberId)
    );
  },

  updateMember(
    workspaceId: string,
    memberId: string,
    data: WorkspaceMemberUpdateRequest
  ) {
    return api.patch<ApiResponse<WorkspaceMemberResponse>>(
      ENDPOINTS.MEMBER_BY_ID(workspaceId, memberId),
      data
    );
  },

  removeMember(workspaceId: string, memberId: string) {
    return api.delete<ApiResponse<null>>(
      ENDPOINTS.MEMBER_BY_ID(workspaceId, memberId)
    );
  },

  suspendMember(workspaceId: string, memberId: string) {
    return api.post<ApiResponse<WorkspaceMemberResponse>>(
      ENDPOINTS.MEMBER_SUSPEND(workspaceId, memberId)
    );
  },

  reactivateMember(workspaceId: string, memberId: string) {
    return api.post<ApiResponse<WorkspaceMemberResponse>>(
      ENDPOINTS.MEMBER_REACTIVATE(workspaceId, memberId)
    );
  },
};