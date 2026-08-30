"use client";

import { useEffect, useState } from "react";
import CampaignStatusBadge from "./CampaignStatusBadge";
import { CampaignService } from "@/services/campaign.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { Campaign, CampaignStatus } from "@/types/campaign";

interface CampaignTableProps {
  searchQuery?: string;
  statusFilter?: string;
  onRefreshTrigger?: number;
}

export default function CampaignTable({
  searchQuery = "",
  statusFilter = "all",
  onRefreshTrigger = 0,
}: CampaignTableProps) {
  const { currentWorkspace } = useWorkspace();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = (workspaceId: string) => {
    setLoading(true);
    setError(null);

    const params: { status?: string; search?: string } = {};
    if (statusFilter !== "all") params.status = statusFilter;
    if (searchQuery.trim()) params.search = searchQuery.trim();

    CampaignService.getAll(workspaceId, params)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setCampaigns(list);
      })
      .catch(() => {
        setError("Failed to load campaigns.");
        setCampaigns([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (!currentWorkspace?.id) return;

    const params: { status?: string; search?: string } = {};
    if (statusFilter !== "all") params.status = statusFilter;
    if (searchQuery.trim()) params.search = searchQuery.trim();

    CampaignService.getAll(currentWorkspace.id, params)
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
          setCampaigns(list);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load campaigns.");
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
  }, [currentWorkspace?.id, searchQuery, statusFilter, onRefreshTrigger]);

  const handleDelete = async (campaignId: string, campaignName: string) => {
    if (!currentWorkspace?.id) return;
    if (!confirm(`Are you sure you want to delete campaign "${campaignName}"?`)) return;

    try {
      await CampaignService.delete(currentWorkspace.id, campaignId);
      fetchCampaigns(currentWorkspace.id);
    } catch {
      alert("Failed to delete campaign");
    }
  };

  const handleStatusChange = async (campaignId: string, newStatus: CampaignStatus) => {
    if (!currentWorkspace?.id) return;

    try {
      await CampaignService.changeStatus(currentWorkspace.id, campaignId, { status: newStatus });
      fetchCampaigns(currentWorkspace.id);
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400">
                  Loading campaigns...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs text-red-500">
                  {error}
                </td>
              </tr>
            ) : campaigns.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400">
                  No campaigns found. Click &quot;Create Campaign&quot; to get started.
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-blue-50/30 transition-colors duration-100 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {campaign.campaign_name || campaign.name || "Untitled Campaign"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {campaign.description || `ID: ${campaign.id.slice(0, 8)}...`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CampaignStatusBadge status={campaign.status} />
                      <select
                        className="text-xs border border-slate-200 rounded px-1.5 py-0.5 bg-white text-slate-600 focus:outline-none cursor-pointer"
                        value={campaign.status}
                        onChange={(e) =>
                          handleStatusChange(campaign.id, e.target.value as CampaignStatus)
                        }
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="ACTIVE">Active</option>
                        <option value="PAUSED">Paused</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {campaign.budget ? `₹${Number(campaign.budget).toLocaleString()}` : "—"}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {campaign.start_date
                      ? new Date(campaign.start_date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(campaign.id, campaign.campaign_name || campaign.name || "Campaign")}
                        className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          Showing {campaigns.length} campaign{campaigns.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
