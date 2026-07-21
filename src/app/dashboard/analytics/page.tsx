export default function AnalyticsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Analytics</h2>
        <p className="text-sm text-slate-500 mt-0.5">Insights and performance data across all campaigns.</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-700">Analytics coming soon</p>
        <p className="text-xs text-slate-400 mt-1">This module is under development.</p>
      </div>
    </div>
  );
}
