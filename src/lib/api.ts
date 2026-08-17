import axios from "axios";
import { supabase } from "@/lib/supabase";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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

// Global response interceptor to normalize network/auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
          {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message,
          }
        );
      }

      if (!error.response) {
        error.message = `Network Error: unable to reach API at ${process.env.NEXT_PUBLIC_API_URL}`;
      }
    }

    return Promise.reject(error);
  }
);