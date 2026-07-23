import CampaignForm from "@/components/campaigns/CampaignForm";
import Link from "next/link";

export default function CreateCampaignPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/dashboard/campaigns" className="hover:text-slate-600 transition-colors">
          Campaigns
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-slate-600 font-medium">Create New</span>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900">Create Campaign</h2>
        <p className="text-sm text-slate-500 mt-0.5">Set up a new AI-powered marketing campaign.</p>
      </div>

      <CampaignForm />
    </div>
  );
}
