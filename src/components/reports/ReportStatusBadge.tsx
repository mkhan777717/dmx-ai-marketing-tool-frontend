export type ReportStatus = "Ready" | "Generating" | "Scheduled" | "Failed";

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

const statusConfig: Record<ReportStatus, { dot: string; wrapper: string }> = {
  Ready: {
    dot: "bg-green-500",
    wrapper: "bg-green-50 text-green-700 border border-green-200",
  },
  Generating: {
    dot: "bg-amber-400",
    wrapper: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  Scheduled: {
    dot: "bg-blue-500",
    wrapper: "bg-blue-50 text-blue-700 border border-blue-200",
  },
  Failed: {
    dot: "bg-red-500",
    wrapper: "bg-red-50 text-red-700 border border-red-200",
  },
};

export default function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${config.wrapper}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
      {status}
    </span>
  );
}
