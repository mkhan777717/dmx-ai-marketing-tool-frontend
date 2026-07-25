export type ReportType = "Campaign" | "Analytics" | "Finance" | "Performance";

interface ReportTypeBadgeProps {
  type: ReportType;
}

const typeConfig: Record<ReportType, { wrapper: string }> = {
  Campaign: { wrapper: "bg-blue-50 text-blue-700 border border-blue-200" },
  Analytics: { wrapper: "bg-indigo-50 text-indigo-700 border border-indigo-200" },
  Finance: { wrapper: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  Performance: { wrapper: "bg-violet-50 text-violet-700 border border-violet-200" },
};

export default function ReportTypeBadge({ type }: ReportTypeBadgeProps) {
  const config = typeConfig[type];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.wrapper}`}>
      {type}
    </span>
  );
}
