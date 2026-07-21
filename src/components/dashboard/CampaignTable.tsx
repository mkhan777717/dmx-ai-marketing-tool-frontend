import Link from "next/link";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";

const campaigns = [
  { id: 1, name: "Summer Sale", status: "Active", budget: "₹20,000", startDate: "15 Jul 2026" },
  { id: 2, name: "AI Webinar", status: "Draft", budget: "₹10,000", startDate: "20 Jul 2026" },
  { id: 3, name: "Product Launch", status: "Scheduled", budget: "₹50,000", startDate: "01 Aug 2026" },
];

export default function DashboardCampaignTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">Recent Campaigns</h2>
          <p className="text-xs text-slate-400 mt-0.5">Latest 3 campaigns across all channels</p>
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
            {campaigns.map((campaign) => (
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
                  <CampaignStatusBadge status={campaign.status as "Active" | "Draft" | "Scheduled" | "Completed"} />
                </td>
                <td className="px-6 py-3.5 font-medium text-slate-700">{campaign.budget}</td>
                <td className="px-6 py-3.5 text-slate-500">{campaign.startDate}</td>
                <td className="px-6 py-3.5">
                  <Link
                    href={`/dashboard/campaigns/${campaign.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    View
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
