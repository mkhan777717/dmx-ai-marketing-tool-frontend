export default function BillingHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Billing</h2>
        <p className="text-sm text-slate-500 mt-0.5">Manage your subscription, payment methods and invoices.</p>
      </div>
      <button type="button"
        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150 shrink-0 self-start sm:self-auto">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
        Upgrade Plan
      </button>
    </div>
  );
}
