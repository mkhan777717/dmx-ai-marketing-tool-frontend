import Link from "next/link";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";

interface CampaignDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CampaignDetailsPage({ params }: CampaignDetailsPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/dashboard/campaigns" className="hover:text-slate-600 transition-colors">
          Campaigns
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-slate-600 font-medium">Campaign #{id}</span>
      </div>

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Campaign Details</h2>
          <p className="text-sm text-slate-500 mt-0.5">Viewing campaign ID #{id}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center h-9 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
            Edit
          </button>
          <button className="inline-flex items-center h-9 px-4 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-sm font-semibold text-red-600 transition-all">
            Archive
          </button>
        </div>
      </div>

      {/* Detail card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Overview</h3>
          <CampaignStatusBadge status="Active" />
        </div>
        <div className="px-6 py-5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { label: "Campaign ID", value: `#${id}` },
              { label: "Campaign Name", value: "Summer Sale 2026" },
              { label: "Budget", value: "₹20,000" },
              { label: "Start Date", value: "15 Jul 2026" },
              { label: "End Date", value: "31 Jul 2026" },
              { label: "Channel", value: "Email + Social" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <dt className="text-[0.7rem] font-semibold text-slate-400 uppercase tracking-wide">{item.label}</dt>
                <dd className="text-sm font-semibold text-slate-800">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 pt-5 border-t border-slate-100">
            <dt className="text-[0.7rem] font-semibold text-slate-400 uppercase tracking-wide mb-2">Description</dt>
            <dd className="text-sm text-slate-600 leading-relaxed">
              Detailed campaign information will be displayed here once the campaign data API is connected.
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}
