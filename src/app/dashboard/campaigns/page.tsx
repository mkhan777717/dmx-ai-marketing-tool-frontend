import CampaignFilters from "@/components/campaigns/CampaignFilters";
import CampaignTable from "@/components/campaigns/CampaignTable";

export default function CampaignsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">All Campaigns</h2>
          <p className="text-sm text-slate-500 mt-0.5">Monitor and manage all your marketing campaigns in one place.</p>
        </div>
      </div>

      <CampaignFilters />

      <CampaignTable />
    </div>
  );
}
