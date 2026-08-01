"use client";

export default function WorkspaceCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Workspace Details</h3>
        <p className="text-xs text-slate-400 mt-0.5">Update your workspace name, organization and description</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Workspace Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Workspace Name
          </label>
          <input
            type="text"
            defaultValue="DatamindX Marketing"
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>

        {/* Organization */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Organization
          </label>
          <input
            type="text"
            defaultValue="DatamindX Technologies"
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Description
          </label>
          <textarea
            rows={3}
            defaultValue="AI-powered digital marketing workspace for managing campaigns, analytics, reports, and AI tools."
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
          />
        </div>
      </div>

      {/* Card footer — matches CampaignForm / PersonalInformation footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
        <button type="button"
          className="inline-flex items-center h-9 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
          Cancel
        </button>
        <button type="button"
          className="inline-flex items-center gap-2 h-9 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Save Changes
        </button>
      </div>
    </div>
  );
}
