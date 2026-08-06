import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";

export const WorkspaceService = {
  getAll() {
    return api.get(ENDPOINTS.WORKSPACES);
  },

  getById(id: string) {
    return api.get(`${ENDPOINTS.WORKSPACES}/${id}`);
  },

  create(data: unknown) {
    return api.post(ENDPOINTS.WORKSPACES, data);
  },

  update(id: string, data: unknown) {
    return api.patch(`${ENDPOINTS.WORKSPACES}/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`${ENDPOINTS.WORKSPACES}/${id}`);
  },
};