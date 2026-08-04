"use client";

const notifications = [
  {
    id: "email",
    label: "Email Notifications",
    description: "Receive updates and alerts via email",
    defaultChecked: true,
    iconBg: "bg-blue-50 text-blue-600",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "campaigns",
    label: "Campaign Alerts",
    description: "Get notified about campaign performance",
    defaultChecked: true,
    iconBg: "bg-indigo-50 text-indigo-600",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: "ai",
    label: "AI Suggestions",
    description: "Receive AI-powered recommendations",
    defaultChecked: false,
    iconBg: "bg-amber-50 text-amber-600",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export default function NotificationSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Notification Settings</h3>
        <p className="text-xs text-slate-400 mt-0.5">Choose which notifications you receive</p>
      </div>

      {/* Notification rows — divide-y list matching SecuritySettings / RecentActivity */}
      <ul className="divide-y divide-slate-100">
        {notifications.map((item) => (
          <li key={item.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 leading-tight">{item.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
            </div>
            {/* Toggle switch */}
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                defaultChecked={item.defaultChecked}
                className="sr-only peer"
              />
              <div className="w-9 h-5 rounded-full bg-slate-200 peer-checked:bg-blue-600 transition-colors duration-200 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 after:shadow-sm" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
