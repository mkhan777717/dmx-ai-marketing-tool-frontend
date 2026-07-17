import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import RecentCampaigns from "@/components/dashboard/RecentCampaigns";
import RecentActivity from "@/components/dashboard/RecentActivity";
import CampaignTable from "@/components/dashboard/CampaignTable";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Active Campaigns" value="24" change="+12% this month"/>
        <StatCard title="Total Leads" value="1,240" change="+8% this month"/>
        <StatCard title="Revenue" value="₹85,000" change="+18% this month"/>
        <StatCard title="AI Score" value="92%" change="+5% this month"/>
      </div>
      <CampaignTable/>
      <RecentCampaigns/>
      <RecentActivity/>
    </>
  );
}