const invoices = [
  { id: 1, invoice: "INV-1001", date: "01 Aug 2026", amount: "₹2,499", status: "Paid" },
  { id: 2, invoice: "INV-1000", date: "01 Jul 2026", amount: "₹2,499", status: "Paid" },
  { id: 3, invoice: "INV-999",  date: "01 Jun 2026", amount: "₹2,499", status: "Paid" },
];

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function BillingHistory() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Billing History</h3>
          <p className="text-xs text-slate-400 mt-0.5">Your past invoices and payment records</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          {/* Table header — matches CampaignTable th exactly */}
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-blue-50/30 transition-colors duration-100">
                {/* Invoice number with icon */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-800">{invoice.invoice}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">{invoice.date}</td>
                <td className="px-6 py-4 font-semibold text-slate-700">{invoice.amount}</td>
                {/* Status badge — dot + text + border, matches CampaignStatusBadge */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {invoice.status}
                  </span>
                </td>
                {/* Download action */}
                <td className="px-6 py-4">
                  <button type="button" aria-label={`Download ${invoice.invoice}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                    <DownloadIcon />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table footer — matches CampaignTable */}
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-xs text-slate-400">Showing 3 of 3 invoices</p>
        <div className="flex items-center gap-1">
          <button disabled aria-label="Previous page"
            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-xs font-semibold text-slate-600 px-2">1 / 1</span>
          <button disabled aria-label="Next page"
            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-40">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
