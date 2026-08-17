export const NOTIFICATION_TYPES = ["SYSTEM", "ALERT", "MESSAGE", "BILLING"] as const;
export const NOTIFICATION_PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];
export type NotificationPriority = (typeof NOTIFICATION_PRIORITIES)[number];

export interface NotificationResponse {
  id: string;
  workspace_id: string;
  user_id: string;
  title: string;
  body: string;
  type: NotificationType;
  priority: NotificationPriority;
  data: Record<string, unknown> | unknown[] | null;
  read_at: string | null;
  created_at: string;
}

export interface NotificationPreferenceResponse {
  id: string;
  notification_type: NotificationType;
  in_app_enabled: boolean;
  email_enabled: boolean;
  push_enabled: boolean;
}

export interface NotificationPreferenceUpdate {
  in_app_enabled?: boolean;
  email_enabled?: boolean;
  push_enabled?: boolean;
}
