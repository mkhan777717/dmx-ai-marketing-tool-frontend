const usageItems = [
  {
    label: "Storage",
    used: "3.2 GB",
    total: "10 GB",
    percent: 32,
    barColor: "bg-blue-500",
    trackColor: "bg-blue-100",
  },
  {
    label: "AI Credits",
    used: "620",
    total: "1,000",
    percent: 62,
    barColor: "bg-emerald-500",
    trackColor: "bg-emerald-100",
  },
  {
    label: "Campaigns",
    used: "24",
    total: "100",
    percent: 24,
    barColor: "bg-indigo-500",
    trackColor: "bg-indigo-100",
  },
];

export default function UsageCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Usage</h3>
        <p className="text-xs text-slate-400 mt-0.5">Resource consumption across your plan</p>
      </div>

      <div className="p-6 space-y-5">
        {usageItems.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600">{item.label}</span>
              <span className="text-xs text-slate-400">
                <span className="font-semibold text-slate-700">{item.used}</span>
                {" / "}{item.total}
              </span>
            </div>
            {/* Progress track */}
            <div className={`h-1.5 rounded-full w-full ${item.trackColor}`}>
              <div
                className={`h-1.5 rounded-full ${item.barColor} transition-all duration-300`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
            <p className="text-[0.65rem] text-slate-400 mt-1">{item.percent}% used</p>
          </div>
        ))}
      </div>
    </div>
  );
}
