import { api } from "@/lib/api";

export const HealthService = {
  check() {
    return api.get("/health");
  },
};