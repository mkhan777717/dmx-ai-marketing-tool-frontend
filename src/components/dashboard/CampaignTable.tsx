export default function CampaignTable() {
  const campaigns = [
    {
      name: "Summer Sale",
      status: "Active",
      budget: "₹20,000",
    },
    {
      name: "AI Webinar",
      status: "Draft",
      budget: "₹10,000",
    },
    {
      name: "Product Launch",
      status: "Scheduled",
      budget: "₹50,000",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Campaigns
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Campaign</th>
            <th className="text-left py-3">Status</th>
            <th className="text-left py-3">Budget</th>
          </tr>
        </thead>

        <tbody>
          {campaigns.map((campaign, index) => (
            <tr key={index} className="border-b">
              <td className="py-3">{campaign.name}</td>
              <td className="py-3">{campaign.status}</td>
              <td className="py-3">{campaign.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}