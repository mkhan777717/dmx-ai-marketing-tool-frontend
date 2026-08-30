interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-14 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">DatamindX</p>
            <p className="text-[0.65rem] text-blue-200 uppercase tracking-widest">AI Platform</p>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            AI-powered marketing,<br />simplified.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-blue-100">
            Manage campaigns, analytics, reports, and AI tools all from one powerful platform.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {[
              { label: "Campaigns", value: "24 active" },
              { label: "AI Score",  value: "92%" },
              { label: "Revenue",   value: "₹85K" },
              { label: "Leads",     value: "1,240" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 backdrop-blur-sm">
                <p className="text-xs text-blue-200">{item.label}</p>
                <p className="text-lg font-bold mt-0.5">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-blue-300">© 2026 DatamindX Technologies. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-6 sm:mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">DatamindX</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
