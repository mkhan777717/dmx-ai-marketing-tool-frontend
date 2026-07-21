interface CampaignStatusBadgeProps {
  status: "Active" | "Draft" | "Scheduled" | "Completed";
}

const statusConfig = {
  Active: {
    dot: "bg-green-500",
    wrapper: "bg-green-50 text-green-700 border border-green-200",
  },
  Draft: {
    dot: "bg-amber-400",
    wrapper: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  Scheduled: {
    dot: "bg-blue-500",
    wrapper: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  Completed: {
    dot: "bg-slate-400",
    wrapper: "bg-slate-50 text-slate-600 border border-slate-200",
  },
};

export default function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.wrapper}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {status}
    </span>
  );
}
