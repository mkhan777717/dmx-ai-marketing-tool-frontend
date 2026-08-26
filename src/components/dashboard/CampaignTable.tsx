"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";
import { CampaignService } from "@/services/campaign.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { Campaign } from "@/types/campaign";

export default function DashboardCampaignTable() {
  const { currentWorkspace } = useWorkspace();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (!currentWorkspace?.id) return;

    setLoading(true);
    CampaignService.getAll(currentWorkspace.id, { limit: 5 })
      .then((res) => {
        if (isMounted) {
          setCampaigns(res.data?.data || []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCampaigns([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentWorkspace?.id]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Recent Campaigns</h2>
          <p className="text-xs text-slate-400 mt-0.5">Latest campaigns in active workspace</p>
        </div>
        <Link
          href="/dashboard/campaigns"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
        >
          View all
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-3 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Campaign</th>
              <th className="px-6 py-3 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-3 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-xs text-slate-400">
                  Loading campaigns...
                </td>
              </tr>
            ) : campaigns.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-xs text-slate-400">
                  No campaigns found in workspace.
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-slate-50/70 transition-colors duration-100">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <span className="font-medium text-slate-800">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <CampaignStatusBadge status={campaign.status} />
                  </td>
                  <td className="px-6 py-3.5 font-medium text-slate-700">
                    {campaign.budget ? `₹${Number(campaign.budget).toLocaleString()}` : "—"}
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">
                    {campaign.start_date
                      ? new Date(campaign.start_date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-6 py-3.5">
                    <Link
                      href={`/dashboard/campaigns`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      View
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
