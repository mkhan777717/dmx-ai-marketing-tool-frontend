import Link from "next/link";

export default function CampaignFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search campaigns..."
          className="h-11 flex-1 rounded-lg border px-4"
        />
        <select className="h-11 rounded-lg border px-4">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Scheduled</option>
          <option>Completed</option>
        </select>
      </div>
      <Link
        href="/dashboard/campaigns/create"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        + Create Campaign
      </Link>
    </div>
  );
}
