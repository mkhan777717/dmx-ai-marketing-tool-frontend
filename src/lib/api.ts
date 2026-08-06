import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
        // Clear stored token so subsequent requests don't keep failing.
        localStorage.removeItem("accessToken");
        // NOTE: avoid forcing navigation here; let callers decide how to handle redirects.
      }
    }

    return Promise.reject(error);
  }
);