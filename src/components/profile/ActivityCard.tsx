const activities = [
  {
    id: 1,
    action: "Created a new campaign",
    time: "2 hours ago",
    iconBg: "bg-blue-50",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: 2,
    action: "Generated AI content",
    time: "Yesterday",
    iconBg: "bg-indigo-50",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 3,
    action: "Downloaded performance report",
    time: "2 days ago",
    iconBg: "bg-emerald-50",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    id: 4,
    action: "Updated workspace settings",
    time: "3 days ago",
    iconBg: "bg-amber-50",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
];

export default function ActivityCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Card header — matches RecentActivity (dashboard) */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Recent Activity</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your latest platform actions</p>
      </div>

      {/* List rows — matches RecentActivity divide-y pattern exactly */}
      <ul className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className="flex items-start gap-3 px-6 py-3.5 hover:bg-slate-50/60 transition-colors"
          >
            <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${activity.iconBg}`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 font-medium leading-snug">{activity.action}</p>
              <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
