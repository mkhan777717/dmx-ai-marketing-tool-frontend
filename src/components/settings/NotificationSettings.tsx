"use client";

import { useEffect, useState } from "react";
import { NotificationService } from "@/services/notification.service";
import type { NotificationPreferenceResponse } from "@/types/notification";

const preferenceLabels: Record<string, { label: string; description: string }> = {
  system: { label: "System Notifications", description: "Platform updates and important account notices." },
  alert: { label: "Alerts", description: "Critical messages that need your attention." },
  message: { label: "Messages", description: "Standard in-app and delivery notifications." },
  billing: { label: "Billing", description: "Subscription and billing-related notifications." },
};

const preferenceFields: Array<{
  key: keyof Pick<NotificationPreferenceResponse, "in_app_enabled" | "email_enabled" | "push_enabled">;
  label: string;
}> = [
  { key: "in_app_enabled", label: "In-app" },
  { key: "email_enabled", label: "Email" },
  { key: "push_enabled", label: "Push" },
];

const PREFERENCE_UPDATES_UNSUPPORTED = true;
const PREFERENCE_UPDATE_UNSUPPORTED_MESSAGE =
  "Notification preference updates are unavailable because the current backend contract does not include a writable preference endpoint.";

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferenceResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<Record<string, boolean>>({});
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

  const handleToggle = async (
    preferenceId: string,
    field: keyof Pick<NotificationPreferenceResponse, "in_app_enabled" | "email_enabled" | "push_enabled">,
    value: boolean
  ) => {
    setSaving((current) => ({ ...current, [preferenceId]: true }));
    setError(null);

    try {
      await NotificationService.updatePreference(preferenceId, { [field]: value });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to update notification preference.";
      if (message.includes("401") || message.includes("403")) {
        setError("You are not authorized to update notification preferences.");
      } else if (message.includes("404")) {
        setError("Unable to update that preference at the moment.");
      } else if (message.includes("500")) {
        setError("The server could not save notification preference changes. Please try again later.");
      } else {
        setError(PREFERENCE_UPDATE_UNSUPPORTED_MESSAGE);
      }
    } finally {
      setSaving((current) => ({ ...current, [preferenceId]: false }));
    }
  };

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
            const config = preferenceLabels[item.notification_type.toLowerCase()] ?? {
              label: item.notification_type,
              description: "Notification preference from your account",
            };
            const isSaving = Boolean(saving[item.id]);

            return (
              <li key={item.id} className="px-6 py-4 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-tight">{config.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{config.description}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {preferenceFields.map((field) => (
                        <label
                          key={field.key}
                          className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700"
                        >
                          <span>{field.label}</span>
                          <input
                            type="checkbox"
                            checked={item[field.key]}
                            onChange={(event) => void handleToggle(item.id, field.key, event.target.checked)}
                            disabled={isSaving || PREFERENCE_UPDATES_UNSUPPORTED}
                            className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </label>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-amber-600">{PREFERENCE_UPDATE_UNSUPPORTED_MESSAGE}</p>
                    {isSaving ? <p className="mt-2 text-xs text-slate-400">Saving changes…</p> : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
