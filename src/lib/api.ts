import axios from "axios";
import { supabase } from "@/lib/supabase";

const DEFAULT_API_URL = "https://dmx-ai-marketing-backend.onrender.com/api/v1";
const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
const baseURL = rawBaseUrl.endsWith("/") ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    const hasSession = Boolean(session);
    const hasAccessToken = Boolean(session?.access_token);

    if (!error && session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        hasSession,
        hasAccessToken,
        hasAuthHeader: Boolean(config.headers.Authorization),
      });
    }
  }

  return config;
});

// Global response interceptor to normalize network/auth errors & handle 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
          {
            status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message,
          }
        );
      }

      if (status === 401 && typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const isAuthPage = currentPath.startsWith("/login") || currentPath.startsWith("/signup");
        
        if (!isAuthPage) {
          // Check if session is expired/missing before redirecting
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            window.location.href = "/login";
          }
        }
      }

      if (!error.response) {
        error.message = `Network Error: unable to reach API at ${baseURL}`;
      }
    }

    return Promise.reject(error);
  }
);