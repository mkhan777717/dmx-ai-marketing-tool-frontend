import AIToolsStats from "@/components/ai-tools/AIToolsStats";
import QuickActions from "@/components/ai-tools/QuickActions";
import AIToolsGrid from "@/components/ai-tools/AIToolsGrid";
import RecentAIActivity from "@/components/ai-tools/RecentAIActivity";

export default function AIToolsPage() {
  return (
    <div className="space-y-5">
      {/* Page header — matches Analytics / Reports / Campaigns heading style */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">AI Tools</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Generate marketing content and optimize campaigns using AI.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New AI Task
        </button>
      </div>

      <AIToolsStats />
      <QuickActions />
      <AIToolsGrid />
      <RecentAIActivity />
    </div>
  );
}
