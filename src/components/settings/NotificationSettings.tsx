"use client";

import { useEffect, useState } from "react";
import { NotificationService } from "@/services/notification.service";
import type { NotificationPreferenceResponse } from "@/types/notification";

const preferenceLabels: Record<string, { label: string; description: string }> = {
  email: { label: "Email Notifications", description: "Receive updates and alerts via email" },
  campaigns: { label: "Campaign Alerts", description: "Get notified about campaign performance" },
  ai: { label: "AI Suggestions", description: "Receive AI-powered recommendations" },
};

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferenceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await NotificationService.getPreferences();
        setPreferences(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to load notification preferences.";
        if (message.includes("401") || message.includes("403")) {
          setError("You are not authorized to view notification preferences.");
        } else if (message.includes("404")) {
          setError("Preference settings are unavailable at the moment.");
        } else if (message.includes("500")) {
          setError("The server could not load notification preferences. Please try again later.");
        } else {
          setError("Unable to load notification preferences right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    void loadPreferences();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Notification Settings</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your current notification preferences from the server</p>
      </div>

      {loading ? (
        <div className="px-6 py-8 text-sm text-slate-500">Loading preferences…</div>
      ) : error ? (
        <div className="px-6 py-8 text-sm text-red-600">{error}</div>
      ) : preferences.length === 0 ? (
        <div className="px-6 py-8 text-sm text-slate-500">No preference settings available.</div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {preferences.map((item) => {
            const config = preferenceLabels[item.notification_type] ?? {
              label: item.notification_type,
              description: "Notification preference from your account",
            };

            return (
              <li key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{config.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{config.description}</p>
                </div>
                <div className="text-xs text-slate-500 text-right">
                  <p>In-app: {item.in_app_enabled ? "On" : "Off"}</p>
                  <p>Email: {item.email_enabled ? "On" : "Off"}</p>
                  <p>Push: {item.push_enabled ? "On" : "Off"}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
