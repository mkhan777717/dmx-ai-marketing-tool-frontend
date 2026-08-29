interface CampaignStatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { dot: string; wrapper: string; label: string }> = {
  active: {
    dot: "bg-green-500",
    wrapper: "bg-green-50 text-green-700 border border-green-200",
    label: "Active",
  },
  draft: {
    dot: "bg-amber-400",
    wrapper: "bg-amber-50 text-amber-700 border border-amber-200",
    label: "Draft",
  },
  scheduled: {
    dot: "bg-blue-500",
    wrapper: "bg-blue-50 text-blue-700 border border-blue-200",
    label: "Scheduled",
  },
  completed: {
    dot: "bg-slate-400",
    wrapper: "bg-slate-50 text-slate-600 border border-slate-200",
    label: "Completed",
  },
  paused: {
    dot: "bg-orange-400",
    wrapper: "bg-orange-50 text-orange-700 border border-orange-200",
    label: "Paused",
  },
  archived: {
    dot: "bg-zinc-400",
    wrapper: "bg-zinc-50 text-zinc-600 border border-zinc-200",
    label: "Archived",
  },
};

export default function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const normalizedKey = status.toLowerCase();
  const config = statusConfig[normalizedKey] || {
    dot: "bg-slate-400",
    wrapper: "bg-slate-50 text-slate-600 border border-slate-200",
    label: status,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.wrapper}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
}
