"use client";

import { useEffect, useState } from "react";
import { AnalyticsService } from "@/services/analytics.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { CampaignAnalyticsResponse } from "@/types/analytics";

export default function CampaignPerformanceTable() {
  const { currentWorkspace } = useWorkspace();
  const [data, setData] = useState<CampaignAnalyticsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    if (!currentWorkspace?.id) return;

    setLoading(true);
    AnalyticsService.getCampaignAnalytics(currentWorkspace.id)
      .then((res) => {
        if (isMounted) {
          setData(res.data?.data || []);
        }
      })
      .catch(() => {
        if (isMounted) setData([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentWorkspace?.id]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Top Campaign Performance</h3>
          <p className="text-xs text-slate-400 mt-0.5">Click-through and engagement breakdown by campaign</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Campaign ID</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Impressions</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Clicks</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Engagement Rate</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Likes / Shares</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-xs text-slate-400">
                  Loading analytics...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-xs text-slate-400">
                  No campaign performance records found.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors duration-100">
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    ID #{item.campaign_id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{item.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">{item.clicks.toLocaleString()}</td>
                  <td className="px-6 py-4 text-slate-700">{item.engagement_rate}%</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
                      {item.likes} likes / {item.shares} shares
                    </span>
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
