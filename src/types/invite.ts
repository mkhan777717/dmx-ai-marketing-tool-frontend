export interface WorkspaceInviteRequest {
  email: string;
  role_id: string;
}

export interface WorkspaceInviteResponse {
  id: string;
  workspace_id: string;
  email: string;
  role_id: string;
  token: string;
  status: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}
