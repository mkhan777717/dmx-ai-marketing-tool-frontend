export const ENDPOINTS = {
  HEALTH: "/health",

  WORKSPACES: "/workspaces",

  NOTIFICATIONS: "/notifications",
  NOTIFICATION_READ: (notificationId: string) => `/notifications/${notificationId}/read`,
  NOTIFICATIONS_READ_ALL: "/notifications/read-all",
  NOTIFICATION_DELETE: (notificationId: string) => `/notifications/${notificationId}`,
  NOTIFICATION_PREFERENCES: "/notifications/preferences",

  MEMBERS: (workspaceId: string) =>
    `/workspaces/${workspaceId}/members`,

  INVITES: (workspaceId: string) =>
    `/workspaces/${workspaceId}/invites`,
};