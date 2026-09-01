"use client";

import { useState } from "react";
import InviteMemberButton from "./InviteMemberModal";
import CreateWorkspaceModal from "./CreateWorkspaceModal";

export default function WorkspaceHeader() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Workspace</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your workspace, members and permissions.
        </p>
      </div>
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all duration-150"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Workspace
        </button>
        <InviteMemberButton />
      </div>

      {showCreateModal && (
        <CreateWorkspaceModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
