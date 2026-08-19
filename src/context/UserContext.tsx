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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const loadedTokenRef = useRef<string | null>(null);

  const fetchProfile = useCallback(async (session: Session | null) => {
    if (!session) {
      setUser(null);
      setLoading(false);
      setError(null);
      loadedTokenRef.current = null;
      return;
    }

    // Build fallback user object from Supabase auth session details
    const authUser = session.user;
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
      if (response.data) {
        setUser({
          ...fallbackUser,
          ...response.data,
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

      // Fallback to Supabase session user data so the frontend continues to show real logged-in details
      setUser(fallbackUser);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetchProfile = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    await fetchProfile(session);
  }, [fetchProfile]);

  useEffect(() => {
    let isSubscribed = true;

    const handleSession = (session: Session | null) => {
      if (!isSubscribed) return;
      const currentToken = session?.access_token || null;
      if (loadedTokenRef.current === currentToken && currentToken !== null) {
        return;
      }
      loadedTokenRef.current = currentToken;
      void fetchProfile(session);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    void supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  return (
    <UserContext.Provider value={{ user, loading, error, refetchProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
