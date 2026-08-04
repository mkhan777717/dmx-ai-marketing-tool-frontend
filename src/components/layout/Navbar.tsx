"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/dashboard":                    { title: "Dashboard",       description: "Welcome back — here's what's happening." },
  "/dashboard/campaigns":          { title: "Campaigns",       description: "Manage and monitor your marketing campaigns." },
  "/dashboard/campaigns/create":   { title: "Create Campaign", description: "Set up a new marketing campaign." },
  "/dashboard/analytics":          { title: "Analytics",       description: "Insights and performance data." },
  "/dashboard/reports":            { title: "Reports",         description: "Download and review your reports." },
  "/dashboard/ai-tools":           { title: "AI Tools",        description: "AI-powered marketing utilities." },
  "/dashboard/billing":            { title: "Billing",         description: "Manage your subscription and invoices." },
  "/dashboard/profile":            { title: "Profile",         description: "Manage your account information." },
  "/dashboard/settings":           { title: "Settings",        description: "Manage your preferences and application settings." },
  "/dashboard/workspace":          { title: "Workspace",       description: "Manage your workspace, members and permissions." },
};

function getPageMeta(pathname: string) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/dashboard/campaigns/") && pathname !== "/dashboard/campaigns/create") {
    return { title: "Campaign Details", description: "View detailed campaign information." };
  }
  return { title: "DatamindX", description: "AI Marketing Platform" };
}

export default function Navbar() {
  const pathname = usePathname();
  const meta = getPageMeta(pathname);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-[0.95rem] font-semibold text-slate-900 leading-tight">{meta.title}</h1>
          <p className="text-[0.72rem] text-slate-400 leading-tight hidden sm:block">{meta.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-400 text-sm w-52 hover:border-slate-300 transition-colors cursor-text">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-[0.8rem] select-none">Search anything…</span>
          <span className="ml-auto text-[0.65rem] px-1.5 py-0.5 rounded border border-slate-300 text-slate-400 font-mono">⌘K</span>
        </div>
        <button aria-label="Notifications" className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white" />
        </button>
        <div className="w-px h-6 bg-slate-200 mx-1" />
        <button aria-label="User profile" className="flex items-center gap-2.5 h-9 px-2 rounded-lg hover:bg-slate-100 transition-colors group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[0.7rem] font-bold shrink-0">AD</div>
          <div className="hidden sm:block text-left">
            <p className="text-[0.8rem] font-semibold text-slate-800 leading-tight">Admin</p>
            <p className="text-[0.65rem] text-slate-400 leading-tight">admin@datamindx.io</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 hidden sm:block">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </header>
  );
}
