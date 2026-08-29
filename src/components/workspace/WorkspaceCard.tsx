"use client";

import { useEffect, useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { WorkspaceService } from "@/services/workspace.service";

export default function WorkspaceCard() {
  const { currentWorkspace, refetchWorkspaces } = useWorkspace();
  const [name, setName] = useState(currentWorkspace?.name || "");
  const [slug, setSlug] = useState(currentWorkspace?.slug || "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (currentWorkspace) {
      setName(currentWorkspace.name || "");
      setSlug(currentWorkspace.slug || "");
    }
  }, [currentWorkspace]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace?.id) return;

    try {
      setLoading(true);
      setMsg(null);
      await WorkspaceService.update(currentWorkspace.id, {
        name,
        slug,
      });
      await refetchWorkspaces();
      setMsg({ type: "success", text: "Workspace updated successfully!" });
    } catch {
      setMsg({ type: "error", text: "Failed to update workspace." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Workspace Details</h3>
        <p className="text-xs text-slate-400 mt-0.5">Update your active workspace name and slug</p>
      </div>

      {msg && (
        <div
          className={`mx-6 mt-4 p-3 text-xs rounded-lg ${
            msg.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-rose-50 text-rose-700 border border-rose-200"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Workspace Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Workspace Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>

        {/* Workspace Slug */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      {/* Card footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 h-9 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150 disabled:opacity-50"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
