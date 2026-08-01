// Reuses StatCard directly — identical to Dashboard, Analytics, Billing stat grids
import StatCard from "@/components/dashboard/StatCard";

const CampaignsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const ReportsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const AITasksIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const WorkspaceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7h18" />
    <path d="M5 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
    <rect x="3" y="7" width="18" height="13" rx="2" />
  </svg>
);

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Campaigns"
        value="24"
        change="+3"
        icon={<CampaignsIcon />}
        iconBg="bg-blue-50 text-blue-600"
        positive={true}
      />
      <StatCard
        title="Reports"
        value="18"
        change="+2"
        icon={<ReportsIcon />}
        iconBg="bg-indigo-50 text-indigo-600"
        positive={true}
      />
      <StatCard
        title="AI Tasks"
        value="156"
        change="+12"
        icon={<AITasksIcon />}
        iconBg="bg-amber-50 text-amber-600"
        positive={true}
      />
      <StatCard
        title="Workspace"
        value="Marketing"
        change="Active"
        icon={<WorkspaceIcon />}
        iconBg="bg-emerald-50 text-emerald-600"
        positive={true}
      />
    </div>
  );
}
