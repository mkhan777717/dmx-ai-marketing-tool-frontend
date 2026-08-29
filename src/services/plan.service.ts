import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type { PlanResponse, PlanCreate, PlanUpdate } from "@/types/plan";

export const PlanService = {
  getAll(activeOnly = true) {
    return api.get<ApiResponse<PlanResponse[]>>(ENDPOINTS.PLANS, {
      params: { active_only: activeOnly },
    });
  },

  getById(planId: string) {
    return api.get<ApiResponse<PlanResponse>>(ENDPOINTS.PLAN_BY_ID(planId));
  },

  create(data: PlanCreate) {
    return api.post<ApiResponse<PlanResponse>>(ENDPOINTS.PLANS, data);
  },

  update(planId: string, data: PlanUpdate) {
    return api.patch<ApiResponse<PlanResponse>>(
      ENDPOINTS.PLAN_BY_ID(planId),
      data
    );
  },

  delete(planId: string) {
    return api.delete<ApiResponse<null>>(ENDPOINTS.PLAN_BY_ID(planId));
  },
};
