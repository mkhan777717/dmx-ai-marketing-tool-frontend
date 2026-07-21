import Link from "next/link";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";

const campaigns = [
  { id: 1, name: "Summer Sale", status: "Active" as const },
  { id: 2, name: "AI Webinar", status: "Draft" as const },
  { id: 3, name: "Product Launch", status: "Scheduled" as const },
];

export default function RecentCampaigns() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">Quick Campaign Status</h2>
        <Link href="/dashboard/campaigns" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Manage →
        </Link>
      </div>
      <ul className="divide-y divide-slate-100">
        {campaigns.map((c) => (
          <li key={c.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50/60 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              <span className="text-sm font-medium text-slate-700">{c.name}</span>
            </div>
            <CampaignStatusBadge status={c.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
