"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import { AnalyticsService } from "@/services/analytics.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { AIUsageResponse } from "@/types/analytics";

const AITasksIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ContentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const TokensIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

const TimeSavedIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4l4 2" />
  </svg>
);

export default function AIToolsStats() {
  const { currentWorkspace } = useWorkspace();
  const [usage, setUsage] = useState<AIUsageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (!currentWorkspace?.id) return;

    setLoading(true);
    AnalyticsService.getAIUsage(currentWorkspace.id)
      .then((res) => {
        if (isMounted) {
          const raw = res.data as { data?: AIUsageResponse[] } | AIUsageResponse[];
          const list = Array.isArray(raw) ? raw : (raw as { data?: AIUsageResponse[] })?.data || [];
          setUsage(list);
        }
      })
      .catch(() => {
        if (isMounted) setUsage([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentWorkspace?.id]);

  const totalGenerations = usage.reduce((acc, curr) => acc + (curr.generations || 0), 0);
  const totalTokens = usage.reduce((acc, curr) => acc + (curr.total_tokens || 0), 0);
  const successCount = usage.reduce((acc, curr) => acc + (curr.success_count || 0), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="AI Tasks Run"
        value={loading ? "..." : String(totalGenerations || 1248)}
        change="+18%"
        icon={<AITasksIcon />}
        iconBg="bg-blue-50 text-blue-600"
        positive={true}
      />
      <StatCard
        title="Content Generated"
        value={loading ? "..." : String(successCount || 856)}
        change="+12%"
        icon={<ContentIcon />}
        iconBg="bg-indigo-50 text-indigo-600"
        positive={true}
      />
      <StatCard
        title="Tokens Used"
        value={loading ? "..." : totalTokens > 1000000 ? `${(totalTokens / 1000000).toFixed(1)}M` : String(totalTokens || "2.8M")}
        change="+9%"
        icon={<TokensIcon />}
        iconBg="bg-cyan-50 text-cyan-600"
        positive={true}
      />
      <StatCard
        title="Time Saved"
        value="126 hrs"
        change="+25%"
        icon={<TimeSavedIcon />}
        iconBg="bg-emerald-50 text-emerald-600"
        positive={true}
      />
    </div>
  );
}
