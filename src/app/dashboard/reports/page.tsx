import ReportStats from "@/components/reports/ReportStats";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportsTable from "@/components/reports/ReportsTable";

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      {/* Page header — matches Campaigns / Analytics heading style */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Reports</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Generate, export and manage your marketing reports.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Reports
        </button>
      </div>

      <ReportStats />
      <ReportFilters />
      <ReportsTable />
    </div>
  );
}
