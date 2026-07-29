// AIToolCard — rounded-xl, w-10 h-10 rounded-lg icon, text-sm font-semibold title,
// category badge with border (matches ReportTypeBadge pattern),
// primary button matches all other primary buttons in the app

export type AIToolCategory = "Content" | "Social" | "Email" | "SEO" | "Advertising" | "Analytics";

const categoryConfig: Record<AIToolCategory, { wrapper: string; iconBg: string }> = {
  Content:     { wrapper: "bg-blue-50 text-blue-700 border border-blue-200",    iconBg: "bg-blue-50 text-blue-600" },
  Social:      { wrapper: "bg-indigo-50 text-indigo-700 border border-indigo-200", iconBg: "bg-indigo-50 text-indigo-600" },
  Email:       { wrapper: "bg-cyan-50 text-cyan-700 border border-cyan-200",    iconBg: "bg-cyan-50 text-cyan-600" },
  SEO:         { wrapper: "bg-amber-50 text-amber-700 border border-amber-200", iconBg: "bg-amber-50 text-amber-600" },
  Advertising: { wrapper: "bg-violet-50 text-violet-700 border border-violet-200", iconBg: "bg-violet-50 text-violet-600" },
  Analytics:   { wrapper: "bg-emerald-50 text-emerald-700 border border-emerald-200", iconBg: "bg-emerald-50 text-emerald-600" },
};

type AIToolCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: AIToolCategory;
  buttonText?: string;
};

export default function AIToolCard({
  title,
  description,
  icon,
  category,
  buttonText = "Open Tool",
}: AIToolCardProps) {
  const config = categoryConfig[category];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Card header area */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.iconBg}`}>
            {icon}
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.wrapper}`}>
            {category}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-800 leading-tight">{title}</h3>
        <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>

      {/* Card footer */}
      <div className="px-5 pb-5">
        <button
          type="button"
          className="w-full inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-sm shadow-blue-200 transition-all duration-150"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
