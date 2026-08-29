"use client";

import { useEffect, useState, useCallback } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { IntegrationService } from "@/services/integration.service";
import { SocialService } from "@/services/social.service";
import type { SocialAccount } from "@/types/social";
import type { IntegrationConnection } from "@/types/integration";

const PROVIDERS = [
  { id: "facebook", name: "Facebook", iconColor: "text-blue-600", desc: "Publish posts & sync page analytics" },
  { id: "meta", name: "Meta / Instagram", iconColor: "text-pink-600", desc: "Publish Instagram & Facebook campaigns" },
  { id: "linkedin", name: "LinkedIn", iconColor: "text-sky-700", desc: "Share company updates & articles" },
  { id: "google_analytics", name: "Google Analytics", iconColor: "text-amber-600", desc: "Track web traffic & conversion goals" },
  { id: "hubspot", name: "HubSpot", iconColor: "text-orange-600", desc: "Sync CRM leads & customer lifecycle" },
  { id: "slack", name: "Slack", iconColor: "text-emerald-600", desc: "Receive campaign notifications & alerts" },
];

export default function SocialIntegrationsCard() {
  const { currentWorkspace } = useWorkspace();
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [integrations, setIntegrations] = useState<IntegrationConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (workspaceId: string) => {
    try {
      setLoading(true);
      setError(null);
      const [accRes, intRes] = await Promise.allSettled([
        SocialService.getAccounts(workspaceId),
        IntegrationService.getIntegrations(),
      ]);

      if (accRes.status === "fulfilled") {
        const accs = Array.isArray(accRes.value.data) ? accRes.value.data : (accRes.value.data as unknown as { data: SocialAccount[] })?.data || [];
        setSocialAccounts(accs);
      }
      if (intRes.status === "fulfilled") {
        const ints = Array.isArray(intRes.value.data) ? intRes.value.data : intRes.value.data?.data || [];
        setIntegrations(ints);
      }
    } catch {
      setError("Unable to load connected accounts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!currentWorkspace?.id) return;
    void loadData(currentWorkspace.id);
  }, [currentWorkspace?.id, loadData]);

  const handleConnect = async (providerId: string) => {
    if (!currentWorkspace?.id) {
      setError("Please select an active workspace before connecting an account.");
      return;
    }

    try {
      setConnecting(providerId);
      setError(null);
      const redirectUri = typeof window !== "undefined" ? `${window.location.origin}/dashboard/settings` : "";

      // OAuth request passes active workspace_id to backend
      const response = await IntegrationService.getOAuthUrl(providerId, redirectUri, currentWorkspace.id);
      const urlData = response.data?.data;
      const targetUrl = typeof urlData === "string" ? urlData : urlData?.url;

      if (targetUrl) {
        window.location.href = targetUrl;
      } else {
        setError(`Failed to retrieve OAuth URL for ${providerId}.`);
      }
    } catch {
      setError(`Unable to initiate OAuth connection for ${providerId}.`);
    } finally {
      setConnecting(null);
    }
  };

  const isConnected = (providerId: string) => {
    const hasSocial = socialAccounts.some((a) => a.provider.toLowerCase() === providerId.toLowerCase() && a.is_active);
    const hasIntegration = integrations.some((i) => i.provider.toLowerCase() === providerId.toLowerCase() && i.status === "connected");
    return hasSocial || hasIntegration;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Connected Accounts & Integrations</h3>
          <p className="text-xs text-slate-400 mt-0.5">Workspace-scoped OAuth integrations and social channels</p>
        </div>
        {currentWorkspace && (
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            Workspace: {currentWorkspace.name}
          </span>
        )}
      </div>

      {error && (
        <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      <div className="p-6">
        {loading ? (
          <div className="text-xs text-slate-400 py-4">Loading integrations…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROVIDERS.map((prov) => {
              const connected = isConnected(prov.id);
              const isConnectingThis = connecting === prov.id;

              return (
                <div key={prov.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm text-slate-800`}>{prov.name}</span>
                      {connected ? (
                        <span className="text-[0.65rem] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Connected
                        </span>
                      ) : (
                        <span className="text-[0.65rem] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Not Connected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate">{prov.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleConnect(prov.id)}
                    disabled={isConnectingThis || !currentWorkspace?.id}
                    className={`h-8 px-3.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                      connected
                        ? "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs shadow-blue-200"
                    } disabled:opacity-50`}
                  >
                    {isConnectingThis ? "Connecting…" : connected ? "Reconnect" : "Connect"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
