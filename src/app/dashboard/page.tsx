import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import RecentCampaigns from "@/components/dashboard/RecentCampaigns";
import DashboardCampaignTable from "@/components/dashboard/CampaignTable";

const CampaignIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const LeadsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const RevenueIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const AIIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Active Campaigns"
          value="24"
          change="+12%"
          icon={<CampaignIcon />}
          iconBg="bg-blue-50 text-blue-600"
          positive={true}
        />
        <StatCard
          title="Total Leads"
          value="1,240"
          change="+8%"
          icon={<LeadsIcon />}
          iconBg="bg-indigo-50 text-indigo-600"
          positive={true}
        />
        <StatCard
          title="Revenue"
          value="₹85,000"
          change="+18%"
          icon={<RevenueIcon />}
          iconBg="bg-emerald-50 text-emerald-600"
          positive={true}
        />
        <StatCard
          title="AI Score"
          value="92%"
          change="+5%"
          icon={<AIIcon />}
          iconBg="bg-amber-50 text-amber-600"
          positive={true}
        />
      </div>
      <DashboardCampaignTable />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentCampaigns />
        <RecentActivity />
      </div>
    </div>
  );
}
