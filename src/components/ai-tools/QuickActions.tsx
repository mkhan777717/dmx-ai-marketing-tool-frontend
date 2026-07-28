// Card uses rounded-xl, card-header pattern (text-sm font-semibold + subtitle),
// item buttons use SVG icons in w-10 h-10 rounded-lg, hover:-translate-y-0.5
const actions = [
  {
    title: "Generate Blog",
    description: "Create SEO-friendly blog content",
    iconBg: "bg-blue-50 text-blue-600",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    title: "Social Post",
    description: "Generate engaging social media posts",
    iconBg: "bg-indigo-50 text-indigo-600",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2H3v16h5v4l4-4h9V2z" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="12" y2="14" />
      </svg>
    ),
  },
  {
    title: "Email Campaign",
    description: "Write personalized marketing emails",
    iconBg: "bg-cyan-50 text-cyan-600",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    title: "SEO Audit",
    description: "Analyze website SEO performance",
    iconBg: "bg-amber-50 text-amber-600",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Card header — matches RecentActivity / CampaignTable header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Quick Actions</h3>
        <p className="text-xs text-slate-400 mt-0.5">Launch AI-powered marketing tasks instantly</p>
      </div>

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 text-left hover:bg-white hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${action.iconBg}`}>
              {action.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                {action.title}
              </p>
              <p className="text-xs text-slate-400 mt-1 leading-snug">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
