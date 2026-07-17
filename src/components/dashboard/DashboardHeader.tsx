export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1"> Welcome to the AI Marketing Dashboard.</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">+ New Campaign</button>
    </div>
  );
}