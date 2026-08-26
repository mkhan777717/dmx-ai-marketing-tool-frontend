export const ENDPOINTS = {
  HEALTH: "/health",
  USER_PROFILE: "/users/me",

  // Workspaces
  WORKSPACES: "/workspaces",
  WORKSPACE_BY_ID: (workspaceId: string) => `/workspaces/${workspaceId}`,
  WORKSPACE_TRANSFER_OWNERSHIP: (workspaceId: string) =>
    `/workspaces/${workspaceId}/transfer-ownership`,

  // Members
  MEMBERS: (workspaceId: string) => `/workspaces/${workspaceId}/members`,
  MEMBER_BY_ID: (workspaceId: string, memberId: string) =>
    `/workspaces/${workspaceId}/members/${memberId}`,
  MEMBER_SUSPEND: (workspaceId: string, memberId: string) =>
    `/workspaces/${workspaceId}/members/${memberId}/suspend`,
  MEMBER_REACTIVATE: (workspaceId: string, memberId: string) =>
    `/workspaces/${workspaceId}/members/${memberId}/reactivate`,

  // Invites
  INVITES: (workspaceId: string) => `/workspaces/${workspaceId}/invites`,
  INVITE_REVOKE: (workspaceId: string, inviteId: string) =>
    `/workspaces/${workspaceId}/invites/${inviteId}/revoke`,
  INVITE_RESEND: (workspaceId: string, inviteId: string) =>
    `/workspaces/${workspaceId}/invites/${inviteId}/resend`,
  INVITE_ACCEPT: (token: string) => `/invites/${token}/accept`,

  // Campaigns
  CAMPAIGNS: (workspaceId: string) => `/workspaces/${workspaceId}/campaigns`,
  CAMPAIGN_BY_ID: (workspaceId: string, campaignId: string) =>
    `/workspaces/${workspaceId}/campaigns/${campaignId}`,
  CAMPAIGN_STATUS: (workspaceId: string, campaignId: string) =>
    `/workspaces/${workspaceId}/campaigns/${campaignId}/status`,

  // Campaign Scheduler
  CAMPAIGN_SCHEDULE: (campaignId: string) =>
    `/campaigns/${campaignId}/schedule`,
  CAMPAIGN_PUBLISH: (campaignId: string) =>
    `/campaigns/${campaignId}/publish`,
  CAMPAIGN_PAUSE: (campaignId: string) => `/campaigns/${campaignId}/pause`,
  CAMPAIGN_RESUME: (campaignId: string) => `/campaigns/${campaignId}/resume`,
  CAMPAIGN_HISTORY: (campaignId: string) => `/campaigns/${campaignId}/history`,

  // AI & Campaign Content
  AI_GENERATE: (workspaceId: string) => `/workspaces/${workspaceId}/ai/generate`,
  CAMPAIGN_CONTENTS: (workspaceId: string, campaignId: string) =>
    `/workspaces/${workspaceId}/campaigns/${campaignId}/contents`,
  CAMPAIGN_CONTENT_BY_ID: (
    workspaceId: string,
    campaignId: string,
    contentId: string
  ) =>
    `/workspaces/${workspaceId}/campaigns/${campaignId}/contents/${contentId}`,

  // Analytics
  ANALYTICS_DASHBOARD: (workspaceId: string) =>
    `/workspaces/${workspaceId}/analytics/dashboard`,
  ANALYTICS_OVERVIEW: (workspaceId: string) =>
    `/workspaces/${workspaceId}/analytics/overview`,
  ANALYTICS_CAMPAIGNS: (workspaceId: string) =>
    `/workspaces/${workspaceId}/analytics/campaigns`,
  ANALYTICS_AI: (workspaceId: string) =>
    `/workspaces/${workspaceId}/analytics/ai`,

  // Plans
  PLANS: "/plans",
  PLAN_BY_ID: (planId: string) => `/plans/${planId}`,

  // Social Accounts & Publishing
  SOCIAL_ACCOUNTS: (workspaceId: string) =>
    `/workspaces/${workspaceId}/social-accounts`,
  SOCIAL_CONNECT: (workspaceId: string) =>
    `/workspaces/${workspaceId}/social-accounts/connect`,
  PUBLISHING_PUBLISH: (workspaceId: string) =>
    `/workspaces/${workspaceId}/publishing/publish`,
  PUBLISHING_HISTORY: (workspaceId: string) =>
    `/workspaces/${workspaceId}/publishing/history`,

  // Integrations
  INTEGRATIONS: "/integrations",
  INTEGRATION_OAUTH_URL: (provider: string) =>
    `/integrations/oauth/${provider}/url`,
  INTEGRATION_OAUTH_CALLBACK: "/integrations/oauth/callback",
  INTEGRATION_SYNC: (provider: string) => `/integrations/${provider}/sync`,
  INTEGRATION_DISCONNECT: (provider: string) => `/integrations/${provider}`,

  // Notifications
  NOTIFICATIONS: "/notifications",
  NOTIFICATION_READ: (notificationId: string) =>
    `/notifications/${notificationId}/read`,
  NOTIFICATIONS_READ_ALL: "/notifications/read-all",
  NOTIFICATION_DELETE: (notificationId: string) =>
    `/notifications/${notificationId}`,
  NOTIFICATION_PREFERENCES: "/notifications/preferences",
};