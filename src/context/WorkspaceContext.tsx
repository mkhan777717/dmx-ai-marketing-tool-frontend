"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { WorkspaceService } from "@/services/workspace.service";
import type { Workspace } from "@/types/workspace";
import { useUser } from "@/context/UserContext";

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  loading: boolean;
  error: string | null;
  setCurrentWorkspaceId: (id: string) => void;
  refetchWorkspaces: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspaces: [],
  currentWorkspace: null,
  loading: true,
  error: null,
  setCurrentWorkspaceId: () => {},
  refetchWorkspaces: async () => {},
});

const DEFAULT_WORKSPACE_ID = "00000000-0000-0000-0000-000000000000";

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspaces = useCallback(async () => {
    if (!user) {
      setWorkspaces([]);
      setCurrentWorkspaceId(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await WorkspaceService.getAll();
      const list = res.data?.data || [];
      setWorkspaces(list);

      if (list.length > 0) {
        if (!currentWorkspaceId || !list.some((w) => w.id === currentWorkspaceId)) {
          setCurrentWorkspaceId(list[0].id);
        }
      } else {
        // Fallback workspace if none returned
        const dummyWorkspace: Workspace = {
          id: DEFAULT_WORKSPACE_ID,
          name: "Default Workspace",
          slug: "default-workspace",
          owner_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setWorkspaces([dummyWorkspace]);
        setCurrentWorkspaceId(dummyWorkspace.id);
      }
    } catch {
      setError("Failed to fetch workspaces");
      const dummyWorkspace: Workspace = {
        id: DEFAULT_WORKSPACE_ID,
        name: "Default Workspace",
        slug: "default-workspace",
        owner_id: user?.id || "user",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setWorkspaces([dummyWorkspace]);
      setCurrentWorkspaceId(dummyWorkspace.id);
    } finally {
      setLoading(false);
    }
  }, [user, currentWorkspaceId]);

  useEffect(() => {
    void fetchWorkspaces();
  }, [fetchWorkspaces]);

  const currentWorkspace =
    workspaces.find((w) => w.id === currentWorkspaceId) || workspaces[0] || null;

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        loading,
        error,
        setCurrentWorkspaceId,
        refetchWorkspaces: fetchWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
