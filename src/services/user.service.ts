import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type { UserProfile } from "@/types/user";

export const UserService = {
  getProfile() {
    return api.get<UserProfile>(ENDPOINTS.USER_PROFILE);
  },
};
