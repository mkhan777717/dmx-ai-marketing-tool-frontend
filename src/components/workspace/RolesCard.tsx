const roles = [
  {
    role: "Admin",
    description: "Full access to all modules and settings.",
    iconBg: "bg-blue-50 text-blue-600",
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    role: "Editor",
    description: "Can create and edit campaigns and reports.",
    iconBg: "bg-indigo-50 text-indigo-600",
    badge: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    role: "Viewer",
    description: "Read-only access to workspace data.",
    iconBg: "bg-slate-100 text-slate-500",
    badge: "bg-slate-50 text-slate-600 border border-slate-200",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

export default function RolesCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Roles & Permissions</h3>
        <p className="text-xs text-slate-400 mt-0.5">Access levels for workspace members</p>
      </div>

      {/* Role list — divide-y pattern */}
      <ul className="divide-y divide-slate-100">
        {roles.map((role) => (
          <li key={role.role} className="flex items-start gap-3 px-6 py-4 hover:bg-slate-50/60 transition-colors">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${role.iconBg}`}>
              {role.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-sm font-semibold text-slate-800">{role.role}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-semibold ${role.badge}`}>
                  {role.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">{role.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
