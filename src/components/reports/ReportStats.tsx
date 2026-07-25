import StatCard from "@/components/dashboard/StatCard";

const TotalReportsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const GeneratedTodayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ScheduledIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const DownloadsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function ReportStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Total Reports"
        value="248"
        change="+12%"
        icon={<TotalReportsIcon />}
        iconBg="bg-blue-50 text-blue-600"
        positive={true}
      />
      <StatCard
        title="Generated Today"
        value="18"
        change="+6%"
        icon={<GeneratedTodayIcon />}
        iconBg="bg-indigo-50 text-indigo-600"
        positive={true}
      />
      <StatCard
        title="Scheduled Reports"
        value="12"
        change="+2%"
        icon={<ScheduledIcon />}
        iconBg="bg-amber-50 text-amber-600"
        positive={true}
      />
      <StatCard
        title="Downloads"
        value="4.8K"
        change="+15%"
        icon={<DownloadsIcon />}
        iconBg="bg-emerald-50 text-emerald-600"
        positive={true}
      />
    </div>
  );
}
