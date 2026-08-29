import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiResponse } from "@/types/api";
import type { UserProfile } from "@/types/user";

export const UserService = {
  getProfile() {
    return api.get<ApiResponse<UserProfile>>(ENDPOINTS.USER_PROFILE);
  },
};
