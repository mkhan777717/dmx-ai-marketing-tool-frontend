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
    const { data: { session }, error } = await supabase.auth.getSession();
    if (!error && session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
  }
  return config;
});

// Global response interceptor to normalize network/auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network errors (no response) are common in browser fetch when CORS or DNS fails
    if (!error.response) {
      const msg = `Network Error: unable to reach API at ${process.env.NEXT_PUBLIC_API_URL}`;
      return Promise.reject(new Error(msg));
    }

    // Handle common auth case: 401 Unauthorized
    if (error.response.status === 401) {
      if (typeof window !== "undefined") {
        // Allow callers to decide how to respond; the shared Supabase session handles the auth source.
      }
    }

    return Promise.reject(error);
  }
);