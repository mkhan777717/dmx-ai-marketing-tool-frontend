import CampaignFilters from "@/components/campaigns/CampaignFilters";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";
import CampaignTable from "@/components/campaigns/CampaignTable";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Campaigns Management</h1>
      <CampaignFilters />
      <CampaignTable />
    </div>
  );
}