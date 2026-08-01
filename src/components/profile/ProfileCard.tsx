export default function ProfileCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Account</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your public profile information</p>
      </div>

      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue-200 shrink-0">
          V
        </div>

        <h2 className="mt-4 text-sm font-bold text-slate-900">Vaishnavi</h2>
        <p className="text-xs text-slate-500 mt-0.5">Frontend Developer</p>
        <p className="text-xs text-slate-400 mt-1">vaishnavi@datamindx.com</p>

        {/* Status badge — dot + text + border, matches CampaignStatusBadge */}
        <span className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          Active
        </span>

        {/* Divider */}
        <div className="w-full border-t border-slate-100 mt-5 pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Member since</span>
            <span className="font-semibold text-slate-700">Jan 2026</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Role</span>
            <span className="font-semibold text-slate-700">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
