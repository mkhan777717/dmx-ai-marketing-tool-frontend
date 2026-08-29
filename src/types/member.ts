export interface WorkspaceMemberResponse {
  id: string;
  workspace_id: string;
  user_id: string;
  role_id: string;
  status: string;
  joined_at?: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    email: string;
    full_name?: string | null;
    avatar_url?: string | null;
  } | null;
}

export interface WorkspaceMemberUpdateRequest {
  role_id: string;
}
