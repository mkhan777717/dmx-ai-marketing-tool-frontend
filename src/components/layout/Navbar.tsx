"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { NotificationService } from "@/services/notification.service";
import type { NotificationResponse } from "@/types/notification";
import { useUser } from "@/context/UserContext";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard":                    { title: "Dashboard",       description: "Welcome back — here's what's happening." },
  "/dashboard/campaigns":          { title: "Campaigns",       description: "Manage and monitor your marketing campaigns." },
  "/dashboard/campaigns/create":   { title: "Create Campaign", description: "Set up a new marketing campaign." },
  "/dashboard/analytics":          { title: "Analytics",       description: "Insights and performance data." },
  "/dashboard/reports":            { title: "Reports",         description: "Download and review your reports." },
  "/dashboard/ai-tools":           { title: "AI Tools",        description: "AI-powered marketing utilities." },
  "/dashboard/billing":            { title: "Billing",         description: "Manage your subscription and invoices." },
  "/dashboard/profile":            { title: "Profile",         description: "Manage your account information." },
  "/dashboard/settings":           { title: "Settings",        description: "Manage your preferences and application settings." },
  "/dashboard/workspace":          { title: "Workspace",       description: "Manage your workspace, members and permissions." },
};

function getPageMeta(pathname: string) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/dashboard/campaigns/") && pathname !== "/dashboard/campaigns/create") {
    return { title: "Campaign Details", description: "View detailed campaign information." };
  }
  return { title: "DatamindX", description: "AI Marketing Platform" };
}

export default function Navbar() {
  const pathname = usePathname();
  const meta = getPageMeta(pathname);
  const { user, loading: userLoading } = useUser();
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const userDisplayName = user?.full_name || user?.name || (user?.email ? user.email.split("@")[0] : "User");
  const userEmail = user?.email || "";
  const userInitials = useMemo(() => {
    if (user?.full_name || user?.name) {
      const parts = (user.full_name || user.name || "").trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      } else if (parts[0]) {
        return parts[0].substring(0, 2).toUpperCase();
      }
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  }, [user]);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read_at).length, [notifications]);

  const loadedTokenRef = useRef<string | null>(null);

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await NotificationService.getUnread(50);
      setNotifications(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          setError("You are not authorized to view notifications right now.");
        } else if (status === 404) {
          setError("Notifications are unavailable at the moment.");
        } else if (status === 500) {
          setError("The server could not load notifications. Please try again later.");
        } else if (!err.response) {
          setError("Unable to connect to the notification service. Please check your connection.");
        } else {
          setError("Unable to load notifications right now.");
        }
      } else if (err instanceof Error) {
        const message = err.message;
        if (message.includes("401") || message.includes("403")) {
          setError("You are not authorized to view notifications right now.");
        } else if (message.includes("404")) {
          setError("Notifications are unavailable at the moment.");
        } else if (message.includes("500")) {
          setError("The server could not load notifications. Please try again later.");
        } else {
          setError("Unable to load notifications right now.");
        }
      } else {
        setError("Unable to load notifications right now.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    const handleSession = (session: Session | null) => {
      if (!session || !isSubscribed) return;
      if (loadedTokenRef.current === session.access_token) return;
      loadedTokenRef.current = session.access_token;
      void loadNotifications();
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
  }, [loadNotifications]);

  const handleMarkRead = async (notificationId: string) => {
    try {
      await NotificationService.markAsRead(notificationId);
      setNotifications((current) =>
        current.map((item) => (item.id === notificationId ? { ...item, read_at: new Date().toISOString() } : item))
      );
    } catch {
      setError("Unable to mark that notification as read.");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await NotificationService.markAllAsRead();
      setNotifications((current) => current.map((item) => ({ ...item, read_at: item.read_at ?? new Date().toISOString() })));
    } catch {
      setError("Unable to mark all notifications as read.");
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await NotificationService.delete(notificationId);
      setNotifications((current) => current.filter((item) => item.id !== notificationId));
    } catch {
      setError("Unable to delete that notification.");
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-[0.95rem] font-semibold text-slate-900 leading-tight">{meta.title}</h1>
          <p className="text-[0.72rem] text-slate-400 leading-tight hidden sm:block">{meta.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 text-sm w-52 hover:border-slate-300 transition-colors cursor-text">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-[0.8rem] select-none">Search anything…</span>
          <span className="ml-auto text-[0.65rem] px-1.5 py-0.5 rounded border border-slate-300 text-slate-400 font-mono">⌘K</span>
        </div>
        <div className="relative">
          <button
            aria-label="Notifications"
            onClick={() => setOpen((current) => !current)}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 ? (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-blue-600 text-[0.65rem] font-semibold text-white ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            ) : (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white" />
            )}
          </button>
          {open ? (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-xl z-40 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Notifications</p>
                  <p className="text-xs text-slate-400">{unreadCount} unread</p>
                </div>
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  disabled={loading || unreadCount === 0}
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="px-4 py-6 text-sm text-slate-500">Loading notifications…</div>
                ) : error ? (
                  <div className="px-4 py-6 text-sm text-red-600">{error}</div>
                ) : notifications.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-slate-500">No notifications yet.</div>
                ) : (
                  notifications.map((item) => (
                    <div key={item.id} className={`border-b border-slate-100 px-4 py-3 last:border-b-0 ${item.read_at ? "bg-white" : "bg-blue-50/60"}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                          <p className="mt-1 text-xs text-slate-500 line-clamp-3">{item.body}</p>
                        </div>
                        {!item.read_at ? (
                          <span className="mt-0.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                        ) : null}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        {!item.read_at ? (
                          <button
                            onClick={() => void handleMarkRead(item.id)}
                            className="text-xs font-medium text-slate-600 hover:text-slate-800"
                          >
                            Mark read
                          </button>
                        ) : null}
                        <button
                          onClick={() => void handleDelete(item.id)}
                          className="text-xs font-medium text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : null}
        </div>
        <div className="w-px h-6 bg-slate-200 mx-1" />
        <button aria-label="User profile" className="flex items-center gap-2.5 h-9 px-2 rounded-lg hover:bg-slate-100 transition-colors group">
          {user?.avatar_url ? (
            <img src={user.avatar_url} alt={userDisplayName} className="w-7 h-7 rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[0.7rem] font-bold shrink-0">
              {userInitials}
            </div>
          )}
          <div className="hidden sm:block text-left">
            <p className="text-[0.8rem] font-semibold text-slate-800 leading-tight">
              {userLoading ? "Loading..." : userDisplayName}
            </p>
            <p className="text-[0.65rem] text-slate-400 leading-tight">{userEmail}</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 hidden sm:block">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </header>
  );
}
