export default function AIToolsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">AI Tools</h2>
        <p className="text-sm text-slate-500 mt-0.5">AI-powered utilities to accelerate your marketing.</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-700">AI Tools coming soon</p>
        <p className="text-xs text-slate-400 mt-1">This module is under development.</p>
      </div>
    </div>
  );
}
