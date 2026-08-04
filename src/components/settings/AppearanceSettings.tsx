"use client";

const themes = [
  {
    value: "system",
    label: "System Default",
    description: "Follows your OS preference",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    value: "light",
    label: "Light",
    description: "Clean white interface",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    description: "Easy on the eyes",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
];

export default function AppearanceSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Appearance</h3>
        <p className="text-xs text-slate-400 mt-0.5">Choose your preferred interface theme</p>
      </div>

      <div className="p-6 space-y-3">
        {/* Theme picker — styled rows matching QuickActions item pattern */}
        {themes.map((theme, i) => (
          <label
            key={theme.value}
            className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
              i === 0
                ? "border-blue-200 bg-blue-50/60"
                : "border-slate-200 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              i === 0 ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
            }`}>
              {theme.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">{theme.label}</p>
              <p className="text-xs text-slate-400">{theme.description}</p>
            </div>
            <input
              type="radio"
              name="theme"
              defaultChecked={i === 0}
              className="accent-blue-600"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
