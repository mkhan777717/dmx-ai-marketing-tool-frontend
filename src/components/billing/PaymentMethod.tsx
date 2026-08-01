export default function PaymentMethod() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header — matches CampaignTable / CurrentPlan */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Payment Method</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your saved payment details</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Card row */}
        <div className="flex items-center justify-between px-4 py-3.5 rounded-lg border border-slate-200 bg-slate-50/60">
          <div className="flex items-center gap-3">
            {/* Card icon */}
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Visa •••• 4587</p>
              <p className="text-xs text-slate-400 mt-0.5">Expires 08/2029</p>
            </div>
          </div>
          {/* Default badge */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Default
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button type="button"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Update Card
          </button>
          <button type="button"
            className="inline-flex items-center h-9 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
            + Add New
          </button>
        </div>
      </div>
    </div>
  );
}
