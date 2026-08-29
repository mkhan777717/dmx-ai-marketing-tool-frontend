"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";
import { CampaignService } from "@/services/campaign.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { Campaign } from "@/types/campaign";

export default function RecentCampaigns() {
  const { currentWorkspace } = useWorkspace();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    let isMounted = true;
    if (!currentWorkspace?.id) return;

    CampaignService.getAll(currentWorkspace.id, { limit: 4 })
      .then((res) => {
        if (isMounted) {
          setCampaigns(res.data?.data || []);
        }
      })
      .catch(() => {
        if (isMounted) setCampaigns([]);
      });

    return () => {
      isMounted = false;
    };
  }, [currentWorkspace?.id]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">Quick Campaign Status</h2>
        <Link href="/dashboard/campaigns" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Manage →
        </Link>
      </div>
      <ul className="divide-y divide-slate-100">
        {campaigns.length === 0 ? (
          <li className="px-6 py-4 text-xs text-slate-400 text-center">No active campaigns</li>
        ) : (
          campaigns.map((c) => (
            <li key={c.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{c.name}</span>
              </div>
              <CampaignStatusBadge status={c.status} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
