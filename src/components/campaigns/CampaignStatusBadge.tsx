interface CampaignStatusBadgeProps {
  status: "Active" | "Draft" | "Scheduled" | "Completed";
}

export default function CampaignStatusBadge({
  status,
}: CampaignStatusBadgeProps) {
  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Draft: "bg-yellow-100 text-yellow-700",
    Scheduled: "bg-blue-100 text-blue-700",
    Completed: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}