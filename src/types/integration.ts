export interface IntegrationConnection {
  id: string;
  provider: string;
  status: string;
  expires_at?: string | null;
}

export interface OAuthUrlResponse {
  url: string;
  state: string;
}
