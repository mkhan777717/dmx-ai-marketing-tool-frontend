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

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetchWorkspaces = useCallback(async () => {
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
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setWorkspaces(list);

      if (list.length > 0) {
        setCurrentWorkspaceId((prev) => (!prev || !list.some((w) => w.id === prev) ? list[0].id : prev));
      } else {
        setCurrentWorkspaceId(null);
      }
    } catch {
      setError("Failed to fetch workspaces");
      setWorkspaces([]);
      setCurrentWorkspaceId(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    if (!user) {
      Promise.resolve().then(() => {
        if (isMounted) {
          setWorkspaces([]);
          setCurrentWorkspaceId(null);
          setLoading(false);
        }
      });
      return () => {
        isMounted = false;
      };
    }

    WorkspaceService.getAll()
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setWorkspaces(list);
        if (list.length > 0) {
          setCurrentWorkspaceId((prev) => (!prev || !list.some((w) => w.id === prev) ? list[0].id : prev));
        } else {
          setCurrentWorkspaceId(null);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Failed to fetch workspaces");
        setWorkspaces([]);
        setCurrentWorkspaceId(null);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user]);

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
        refetchWorkspaces,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
