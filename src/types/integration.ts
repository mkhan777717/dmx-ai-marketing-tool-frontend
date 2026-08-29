export interface IntegrationConnection {
  id: string;
  provider: string;
  provider_name?: string;
  category?: string;
  description?: string;
  icon_url?: string;
  status: "connected" | "disconnected" | "error" | "pending" | string;
  last_synced_at?: string | null;
  connected_at?: string | null;
  expires_at?: string | null;
  config?: Record<string, unknown>;
}

export interface OAuthUrlResponse {
  url: string;
  state: string;
}

export interface SyncResponse {
  sync_id?: string;
  status: string;
  message?: string;
}
