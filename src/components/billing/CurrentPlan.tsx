export default function CurrentPlan() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Current Plan</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your active subscription details</p>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Professional Plan</p>
            <p className="text-xs text-slate-500 mt-1">Unlimited campaigns, analytics, reports and AI tools.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Active
          </span>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-3">Renews on 01 Sep 2026</p>
          <div className="flex items-center gap-2">
            <button type="button" className="inline-flex items-center h-9 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
              Change Plan
            </button>
            <button type="button" className="inline-flex items-center h-9 px-4 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-sm font-semibold text-red-600 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
