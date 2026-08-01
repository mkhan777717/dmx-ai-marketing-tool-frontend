import StatCard from "@/components/dashboard/StatCard";

const MembersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const CampaignsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const StorageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

export default function WorkspaceStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Members"
        value="12"
        change="+2"
        icon={<MembersIcon />}
        iconBg="bg-blue-50 text-blue-600"
        positive={true}
      />
      <StatCard
        title="Active Projects"
        value="8"
        change="+1"
        icon={<ProjectsIcon />}
        iconBg="bg-indigo-50 text-indigo-600"
        positive={true}
      />
      <StatCard
        title="Campaigns"
        value="24"
        change="+3"
        icon={<CampaignsIcon />}
        iconBg="bg-cyan-50 text-cyan-600"
        positive={true}
      />
      <StatCard
        title="Storage"
        value="3.2 GB"
        change="32%"
        icon={<StorageIcon />}
        iconBg="bg-amber-50 text-amber-600"
        positive={true}
      />
    </div>
  );
}
