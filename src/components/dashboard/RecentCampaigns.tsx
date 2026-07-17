export default function RecentCampaigns() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Campaigns</h2>
      <div className="space-y-3">
        <div className="flex justify-between border-b pb-2">
          <span>Summer Sale</span>
          <span className="text-green-600">Active</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span>AI Webinar</span>
          <span className="text-yellow-600">Draft</span>
        </div>
        <div className="flex justify-between">
          <span>Product Launch</span>
          <span className="text-blue-600">Scheduled</span>
        </div>
      </div>
    </div>
  );
}