import Link from "next/link";
import CampaignStatusBadge from "./CampaignStatusBadge";

const campaigns = [
  { id: 1, name: "Summer Sale", status: "Active", budget: "₹20,000", startDate: "15 Jul 2026" },
  { id: 2, name: "AI Webinar", status: "Draft", budget: "₹10,000", startDate: "20 Jul 2026" },
  { id: 3, name: "Product Launch", status: "Scheduled", budget: "₹50,000", startDate: "01 Aug 2026" },
];

export default function CampaignTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
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
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="hover:bg-blue-50/30 transition-colors duration-100 group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{campaign.name}</p>
                      <p className="text-xs text-slate-400">ID #{campaign.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <CampaignStatusBadge
                    status={campaign.status as "Active" | "Draft" | "Scheduled" | "Completed"}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-slate-700">{campaign.budget}</td>
                <td className="px-6 py-4 text-slate-500">{campaign.startDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/campaigns/${campaign.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      View
                    </Link>
                    <button
                      className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
                      aria-label={`Edit ${campaign.name}`}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-xs text-slate-400">Showing 3 of 3 campaigns</p>
        <div className="flex items-center gap-1">
          <button
            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40"
            disabled
            aria-label="Previous page"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-xs font-semibold text-slate-600 px-2">1 / 1</span>
          <button
            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40"
            disabled
            aria-label="Next page"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
