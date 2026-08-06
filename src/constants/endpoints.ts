export const ENDPOINTS = {
  HEALTH: "/health",

  WORKSPACES: "/workspaces",

  MEMBERS: (workspaceId: string) =>
    `/workspaces/${workspaceId}/members`,

  INVITES: (workspaceId: string) =>
    `/workspaces/${workspaceId}/invites`,
};