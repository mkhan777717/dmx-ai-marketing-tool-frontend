export interface Workspace {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  plan_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceCreate {
  name: string;
  slug?: string;
  plan_id?: string;
}

export interface WorkspaceUpdate {
  name?: string;
  slug?: string;
  plan_id?: string;
}

export interface WorkspaceTransferOwnershipRequest {
  new_owner_id: string;
}
