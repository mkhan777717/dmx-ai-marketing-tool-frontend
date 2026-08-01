const members = [
  { id: 1, name: "Vaishnavi",      role: "Admin",  email: "vaishnavi@datamindx.com", status: "Active"  },
  { id: 2, name: "Marketing Team", role: "Editor", email: "marketing@datamindx.com", status: "Active"  },
  { id: 3, name: "AI Engine",      role: "Viewer", email: "ai@datamindx.com",        status: "Pending" },
];

const statusConfig = {
  Active:  { dot: "bg-green-500", wrapper: "bg-green-50 text-green-700 border border-green-200" },
  Pending: { dot: "bg-amber-400", wrapper: "bg-amber-50 text-amber-700 border border-amber-200" },
};

const roleConfig: Record<string, string> = {
  Admin:  "bg-blue-50 text-blue-700 border border-blue-200",
  Editor: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  Viewer: "bg-slate-50 text-slate-600 border border-slate-200",
};

export default function MembersTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header — matches CampaignTable pattern */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Team Members</h3>
          <p className="text-xs text-slate-400 mt-0.5">All members in this workspace</p>
        </div>
        <span className="text-xs font-semibold text-slate-400">{members.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Table header — matches CampaignTable th exactly */}
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {members.map((member) => {
              const sc = statusConfig[member.status as keyof typeof statusConfig];
              return (
                <tr key={member.id} className="hover:bg-blue-50/30 transition-colors duration-100">
                  {/* Member — avatar + name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0">
                        <span className="text-[0.65rem] font-bold text-white">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-400">ID #{member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${roleConfig[member.role]}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{member.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${sc.wrapper}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sc.dot}`} />
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button type="button"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                        Edit
                      </button>
                      <button type="button"
                        className="inline-flex items-center text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-xs text-slate-400">Showing {members.length} of {members.length} members</p>
        <div className="flex items-center gap-1">
          <button disabled aria-label="Previous page"
            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 disabled:opacity-40">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="text-xs font-semibold text-slate-600 px-2">1 / 1</span>
          <button disabled aria-label="Next page"
            className="h-7 w-7 rounded-md flex items-center justify-center text-slate-400 disabled:opacity-40">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
