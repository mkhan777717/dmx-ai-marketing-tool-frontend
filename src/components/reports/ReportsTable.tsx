import ReportStatusBadge from "./ReportStatusBadge";
import ReportTypeBadge from "./ReportTypeBadge";
import type { ReportStatus } from "./ReportStatusBadge";
import type { ReportType } from "./ReportTypeBadge";

interface Report {
  id: number;
  name: string;
  type: ReportType;
  status: ReportStatus;
  generatedOn: string;
  generatedBy: string;
}

const reports: Report[] = [
  {
    id: 1,
    name: "Marketing Performance Q2",
    type: "Campaign",
    status: "Ready",
    generatedOn: "23 Jul 2026",
    generatedBy: "Admin",
  },
  {
    id: 2,
    name: "Revenue Summary — July",
    type: "Finance",
    status: "Ready",
    generatedOn: "22 Jul 2026",
    generatedBy: "Vaishnavi",
  },
  {
    id: 3,
    name: "Weekly Analytics Digest",
    type: "Analytics",
    status: "Generating",
    generatedOn: "24 Jul 2026",
    generatedBy: "AI Engine",
  },
  {
    id: 4,
    name: "Campaign ROI Report",
    type: "Performance",
    status: "Scheduled",
    generatedOn: "25 Jul 2026",
    generatedBy: "Marketing Team",
  },
  {
    id: 5,
    name: "Lead Conversion Funnel",
    type: "Analytics",
    status: "Failed",
    generatedOn: "21 Jul 2026",
    generatedBy: "AI Engine",
  },
];

const ReportIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const ViewIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function EmptyState() {
  return (
    <tr>
      <td colSpan={6}>
        <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">No reports generated yet</p>
          <p className="text-xs text-slate-400 max-w-xs mb-5">
            Generate your first report to start tracking marketing insights across all campaigns.
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-2 h-9 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Generate Report
          </button>
        </div>
      </td>
    </tr>
  );
}

const ITEMS_PER_PAGE = 5;
const totalItems = 25;

export default function ReportsTable() {
  const currentPage = 1;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const from = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const to = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
  const hasReports = reports.length > 0;
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">All Reports</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Showing latest generated and scheduled reports
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Report Name
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Generated On
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Generated By
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {hasReports ? (
              reports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-blue-50/30 transition-colors duration-100"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <ReportIcon />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{report.name}</p>
                        <p className="text-xs text-slate-400">ID #{report.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <ReportTypeBadge type={report.type} />
                  </td>
                  <td className="px-6 py-4">
                    <ReportStatusBadge status={report.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-500">{report.generatedOn}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0">
                        <span className="text-[0.55rem] font-bold text-white">
                          {report.generatedBy.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{report.generatedBy}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label={`View ${report.name}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <ViewIcon />
                        View
                      </button>
                      <button
                        aria-label={`Download ${report.name}`}
                        disabled={report.status !== "Ready"}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 bg-slate-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>
      </div>

      {hasReports && (
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-400 whitespace-nowrap">
            Showing <span className="font-semibold text-slate-600">{from}–{to}</span> of{" "}
            <span className="font-semibold text-slate-600">{totalItems}</span> reports
          </p>

          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft />
              Previous
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 bg-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
