export interface Workspace {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  logo_url?: string | null;
  timezone?: string;
  industry?: string | null;
  country?: string | null;
  default_language?: string;
  status?: string;
  plan_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceCreate {
  name: string;
  slug?: string;
  logo_url?: string;
  timezone?: string;
  industry?: string;
  country?: string;
  default_language?: string;
  plan_id?: string;
}

export interface WorkspaceUpdate {
  name?: string;
  slug?: string;
  logo_url?: string;
  timezone?: string;
  industry?: string;
  country?: string;
  default_language?: string;
  plan_id?: string;
}

export interface WorkspaceTransferOwnershipRequest {
  new_owner_id: string;
}
