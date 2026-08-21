"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { supabase } from "@/lib/supabase";
import { UserService } from "@/services/user.service";
import type { UserProfile } from "@/types/user";
import type { Session } from "@supabase/supabase-js";

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  refetchProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
  refetchProfile: async () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const loadedTokenRef = useRef<string | null>(null);

  // 1. Supabase auth listener: ONLY updates React session state
  useEffect(() => {
    let isMounted = true;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
      }
    });

    void supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (isMounted) {
        setSession(initialSession);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Helper to fetch backend profile for a given session
  const fetchBackendProfile = useCallback(async (activeSession: Session) => {
    const authUser = activeSession.user;
    const fallbackUser: UserProfile = {
      id: authUser.id,
      email: authUser.email || "",
      full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || "",
      name: authUser.user_metadata?.name || authUser.user_metadata?.full_name || "",
      avatar_url: authUser.user_metadata?.avatar_url || "",
      created_at: authUser.created_at,
    };

    try {
      setLoading(true);
      setError(null);
      const response = await UserService.getProfile();
      const profileData = response.data?.data;

      if (profileData) {
        setUser({
          ...fallbackUser,
          ...profileData,
        });
      } else {
        setUser(fallbackUser);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401) {
          setError("Session expired or unauthorized. Please log in again.");
        } else if (status === 403) {
          setError("You do not have permission to view profile details.");
        } else if (status === 404) {
          setError("User profile endpoint not found on backend.");
        } else if (status && status >= 500) {
          setError("Server error while retrieving user profile.");
        } else if (!err.response) {
          setError("Network error: unable to reach the API.");
        } else {
          setError("Failed to load user profile from API.");
        }
      } else {
        setError("An unexpected error occurred while loading profile.");
      }

      // Fallback to Supabase session user data so UI degrades gracefully
      setUser(fallbackUser);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. React effect driven by session state change: safely triggers profile API fetch outside callback
  useEffect(() => {
    let isMounted = true;

    if (!session) {
      loadedTokenRef.current = null;
      Promise.resolve().then(() => {
        if (isMounted) {
          setUser(null);
          setLoading(false);
          setError(null);
        }
      });
      return () => {
        isMounted = false;
      };
    }

    const currentToken = session.access_token;
    if (loadedTokenRef.current === currentToken) {
      return () => {
        isMounted = false;
      };
    }
    loadedTokenRef.current = currentToken;

    void fetchBackendProfile(session);

    return () => {
      isMounted = false;
    };
  }, [session, fetchBackendProfile]);

  // Manual refetch trigger
  const refetchProfile = useCallback(async () => {
    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();
    if (currentSession) {
      loadedTokenRef.current = null;
      await fetchBackendProfile(currentSession);
    }
  }, [fetchBackendProfile]);

  return (
    <UserContext.Provider value={{ user, loading, error, refetchProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
