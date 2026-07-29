// Matches RecentActivity (dashboard) pattern exactly:
// rounded-xl card, card-header, divide-y list rows, w-7 h-7 rounded-md icons,
// px-6 py-3.5 rows, hover:bg-slate-50/60, type badge with border

const activities = [
  {
    id: 1,
    label: "Blog generated successfully",
    time: "5 mins ago",
    type: "Content",
    typeBadge: "bg-blue-50 text-blue-700 border border-blue-200",
    iconBg: "bg-blue-50",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
      </svg>
    ),
  },
  {
    id: 2,
    label: "SEO audit completed",
    time: "18 mins ago",
    type: "SEO",
    typeBadge: "bg-amber-50 text-amber-700 border border-amber-200",
    iconBg: "bg-amber-50",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Email campaign created",
    time: "1 hr ago",
    type: "Email",
    typeBadge: "bg-cyan-50 text-cyan-700 border border-cyan-200",
    iconBg: "bg-cyan-50",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: 4,
    label: "Ad copy generated for Product Launch",
    time: "2 hrs ago",
    type: "Advertising",
    typeBadge: "bg-violet-50 text-violet-700 border border-violet-200",
    iconBg: "bg-violet-50",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
  },
];

export default function RecentAIActivity() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Recent AI Activity</h3>
        <p className="text-xs text-slate-400 mt-0.5">Latest AI-generated marketing tasks</p>
      </div>

      {/* Activity list — matches RecentActivity (dashboard) row structure */}
      <ul className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-start gap-3 px-6 py-3.5 hover:bg-slate-50/60 transition-colors"
          >
            {/* Icon */}
            <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${activity.iconBg}`}>
              {activity.icon}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 font-medium leading-snug">{activity.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
            </div>

            {/* Type badge — matches ReportTypeBadge style */}
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${activity.typeBadge}`}>
              {activity.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
