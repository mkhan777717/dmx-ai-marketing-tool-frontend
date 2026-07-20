import Link from "next/link";
import CampaignStatusBadge from "./CampaignStatusBadge";

const campaigns = [
  {
    id: 1,
    name: "Summer Sale",
    status: "Active",
    budget: "₹20,000",
    startDate: "15 Jul 2026",
  },
  {
    id: 2,
    name: "AI Webinar",
    status: "Draft",
    budget: "₹10,000",
    startDate: "20 Jul 2026",
  },
  {
    id: 3,
    name: "Product Launch",
    status: "Scheduled",
    budget: "₹50,000",
    startDate: "01 Aug 2026",
  },
];
export default function CampaignTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Campaign List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Campaign</th>
            <th className="py-3">Status</th>
            <th className="py-3">Budget</th>
            <th className="py-3">Start Date</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="py-4">{campaign.name}</td>
              <td className="py-4">
                <CampaignStatusBadge
                  status={
                    campaign.status as
                      | "Active"
                      | "Draft"
                      | "Scheduled"
                      | "Completed"
                  }
                />
              </td>
              <td className="py-4">{campaign.budget}</td>
              <td className="py-4">{campaign.startDate}</td>
              <td className="py-4">
                <Link
                  href={`/dashboard/campaigns/${campaign.id}`}
                  className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
