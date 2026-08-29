import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type {
  Workspace,
  WorkspaceCreate,
  WorkspaceUpdate,
  WorkspaceTransferOwnershipRequest,
} from "@/types/workspace";

export const WorkspaceService = {
  getAll() {
    return api.get<ApiResponse<Workspace[]>>(ENDPOINTS.WORKSPACES);
  },

  getById(id: string) {
    return api.get<ApiResponse<Workspace>>(ENDPOINTS.WORKSPACE_BY_ID(id));
  },

  create(data: WorkspaceCreate) {
    return api.post<ApiResponse<Workspace>>(ENDPOINTS.WORKSPACES, data);
  },

  update(id: string, data: WorkspaceUpdate) {
    return api.patch<ApiResponse<Workspace>>(
      ENDPOINTS.WORKSPACE_BY_ID(id),
      data
    );
  },

  delete(id: string) {
    return api.delete<ApiResponse<null>>(ENDPOINTS.WORKSPACE_BY_ID(id));
  },

  transferOwnership(id: string, data: WorkspaceTransferOwnershipRequest) {
    return api.post<ApiResponse<Workspace>>(
      ENDPOINTS.WORKSPACE_TRANSFER_OWNERSHIP(id),
      data
    );
  },
};