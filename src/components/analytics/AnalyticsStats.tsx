"use client";

import { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import { AnalyticsService } from "@/services/analytics.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { AnalyticsSnapshotResponse } from "@/types/analytics";

const ImpressionsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ClicksIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3l14 9-7 1-3 7-4-17z" />
  </svg>
);

const CTRIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const ConversionsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export default function AnalyticsStats() {
  const { currentWorkspace } = useWorkspace();
  const [snapshot, setSnapshot] = useState<AnalyticsSnapshotResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (!currentWorkspace?.id) return;

    AnalyticsService.getOverview(currentWorkspace.id)
      .then((res) => {
        if (isMounted) {
          const raw = res.data as { data?: AnalyticsSnapshotResponse };
          const dataObj = raw && "data" in raw && raw.data ? raw.data : (raw as unknown as AnalyticsSnapshotResponse);
          setSnapshot(dataObj || null);
        }
      })
      .catch(() => {
        if (isMounted) setSnapshot(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentWorkspace?.id]);

  const cmap = (snapshot?.campaign_metrics || {}) as Record<string, number>;
  const impressions = cmap.impressions ?? 2400000;
  const clicks = cmap.clicks ?? 185000;
  const ctr = cmap.ctr ?? 7.8;
  const conversions = cmap.conversions ?? 4280;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Impressions"
        value={loading ? "..." : impressions > 1000000 ? `${(impressions / 1000000).toFixed(1)}M` : String(impressions)}
        change="+12.4%"
        positive={true}
        icon={<ImpressionsIcon />}
        iconBg="bg-blue-50 text-blue-600"
      />
      <MetricCard
        title="Clicks"
        value={loading ? "..." : clicks > 1000 ? `${(clicks / 1000).toFixed(0)}K` : String(clicks)}
        change="+8.7%"
        positive={true}
        icon={<ClicksIcon />}
        iconBg="bg-indigo-50 text-indigo-600"
      />
      <MetricCard
        title="CTR"
        value={loading ? "..." : `${ctr}%`}
        change="+1.5%"
        positive={true}
        icon={<CTRIcon />}
        iconBg="bg-cyan-50 text-cyan-600"
      />
      <MetricCard
        title="Conversions"
        value={loading ? "..." : Number(conversions).toLocaleString()}
        change="+5.2%"
        positive={true}
        icon={<ConversionsIcon />}
        iconBg="bg-emerald-50 text-emerald-600"
      />
    </div>
  );
}
