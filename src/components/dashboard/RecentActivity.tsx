const activities = [
  {
    id: 1,
    label: 'Campaign "Summer Sale" was created',
    time: "2 mins ago",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    iconBg: "bg-blue-50",
  },
  {
    id: 2,
    label: "AI generated 5 marketing ideas",
    time: "14 mins ago",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    iconBg: "bg-indigo-50",
  },
  {
    id: 3,
    label: "Weekly performance report downloaded",
    time: "1 hr ago",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    iconBg: "bg-green-50",
  },
  {
    id: 4,
    label: '"AI Webinar" campaign moved to Draft',
    time: "3 hrs ago",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    iconBg: "bg-amber-50",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">Recent Activity</h2>
        <p className="text-xs text-slate-400 mt-0.5">Latest platform events</p>
      </div>
      <ul className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3 px-6 py-3.5 hover:bg-slate-50/60 transition-colors">
            <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${activity.iconBg}`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 font-medium leading-snug">{activity.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
