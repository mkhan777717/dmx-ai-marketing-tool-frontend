const securityActions = [
  {
    label: "Change Password",
    description: "Update your account password",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    iconBg: "bg-blue-50 text-blue-600",
    variant: "default" as const,
  },
  {
    label: "Two-Factor Authentication",
    description: "Add an extra layer of security",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    iconBg: "bg-indigo-50 text-indigo-600",
    variant: "default" as const,
  },
  {
    label: "Logout from All Devices",
    description: "Sign out from all active sessions",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    iconBg: "bg-red-50 text-red-600",
    variant: "danger" as const,
  },
];

export default function SecuritySettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Security</h3>
        <p className="text-xs text-slate-400 mt-0.5">Manage your password and session security</p>
      </div>

      {/* Action list — matches RecentActivity divide-y pattern */}
      <ul className="divide-y divide-slate-100">
        {securityActions.map((action) => (
          <li key={action.label}>
            <button
              type="button"
              className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors group ${
                action.variant === "danger"
                  ? "hover:bg-red-50/60"
                  : "hover:bg-slate-50/60"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${action.iconBg}`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold leading-tight ${
                  action.variant === "danger" ? "text-red-600" : "text-slate-800"
                }`}>
                  {action.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{action.description}</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="text-slate-300 group-hover:text-slate-400 shrink-0 transition-colors">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
