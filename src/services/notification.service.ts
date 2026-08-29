import { api } from "@/lib/api";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  NotificationPreferenceResponse,
  NotificationResponse,
} from "@/types/notification";

export const NotificationService = {
  getUnread(limit = 50) {
    return api.get<NotificationResponse[]>(ENDPOINTS.NOTIFICATIONS, {
      params: { limit },
    });
  },

  markAsRead(notificationId: string) {
    return api.patch<NotificationResponse>(
      ENDPOINTS.NOTIFICATION_READ(notificationId)
    );
  },

  markAllAsRead() {
    return api.patch<{ message: string }>(ENDPOINTS.NOTIFICATIONS_READ_ALL);
  },

  delete(notificationId: string) {
    return api.delete(ENDPOINTS.NOTIFICATION_DELETE(notificationId));
  },

  getPreferences() {
    return api.get<NotificationPreferenceResponse[]>(
      ENDPOINTS.NOTIFICATION_PREFERENCES
    );
  },

  updatePreference(preferenceId: string, data: Record<string, boolean>) {
    void preferenceId;
    void data;
    return Promise.reject(
      new Error("Notification preference updates are not supported by the current backend contract.")
    );
  },
};
