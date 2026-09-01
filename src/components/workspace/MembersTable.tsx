"use client";

import { useEffect, useState } from "react";
import { MemberService } from "@/services/member.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { WorkspaceMemberResponse } from "@/types/member";

const roleConfig: Record<string, string> = {
  admin: "bg-blue-50 text-blue-700 border border-blue-200",
  editor: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  viewer: "bg-slate-50 text-slate-600 border border-slate-200",
  member: "bg-teal-50 text-teal-700 border border-teal-200",
};

export default function MembersTable() {
  const { currentWorkspace } = useWorkspace();
  const [members, setMembers] = useState<WorkspaceMemberResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = (workspaceId: string) => {
    setLoading(true);
    setError(null);
    MemberService.getMembers(workspaceId)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setMembers(list);
      })
      .catch(() => {
        setError("Failed to fetch workspace members");
        setMembers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    if (!currentWorkspace?.id) return;

    MemberService.getMembers(currentWorkspace.id)
      .then((res) => {
        if (isMounted) {
          const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
          setMembers(list);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to fetch workspace members");
          setMembers([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentWorkspace?.id]);

  const handleRemove = async (memberId: string, email?: string) => {
    if (!currentWorkspace?.id) return;
    if (!confirm(`Are you sure you want to remove member ${email || memberId}?`)) return;

    try {
      await MemberService.removeMember(currentWorkspace.id, memberId);
      fetchMembers(currentWorkspace.id);
    } catch {
      alert("Failed to remove member");
    }
  };

  const handleSuspend = async (memberId: string) => {
    if (!currentWorkspace?.id) return;

    try {
      await MemberService.suspendMember(currentWorkspace.id, memberId);
      fetchMembers(currentWorkspace.id);
    } catch {
      alert("Failed to suspend member");
    }
  };

  const handleReactivate = async (memberId: string) => {
    if (!currentWorkspace?.id) return;

    try {
      await MemberService.reactivateMember(currentWorkspace.id, memberId);
      fetchMembers(currentWorkspace.id);
    } catch {
      alert("Failed to reactivate member");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Team Members</h3>
          <p className="text-xs text-slate-400 mt-0.5">All members in this workspace</p>
        </div>
        <span className="text-xs font-semibold text-slate-400">{members.length} total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[650px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Member
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Role ID
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3.5 text-left text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400">
                  Loading members...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs text-red-500">
                  {error}
                </td>
              </tr>
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-400">
                  No members found in workspace.
                </td>
              </tr>
            ) : (
              members.map((member) => {
                const displayName = member.user?.full_name || member.user?.email || "Workspace Member";
                const displayEmail = member.user?.email || "—";
                const isSuspended = member.status.toLowerCase() === "suspended";

                return (
                  <tr key={member.id} className="hover:bg-blue-50/30 transition-colors duration-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0">
                          <span className="text-[0.65rem] font-bold text-white">
                            {displayName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{displayName}</p>
                          <p className="text-xs text-slate-400">ID: {member.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          roleConfig[member.role_id?.toLowerCase()] || roleConfig.viewer
                        }`}
                      >
                        {member.role_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{displayEmail}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          isSuspended
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-green-50 text-green-700 border border-green-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isSuspended ? "bg-rose-500" : "bg-green-500"
                          }`}
                        />
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {isSuspended ? (
                          <button
                            type="button"
                            onClick={() => handleReactivate(member.id)}
                            className="inline-flex items-center text-xs font-semibold text-emerald-600 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            Reactivate
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSuspend(member.id)}
                            className="inline-flex items-center text-xs font-semibold text-amber-600 hover:bg-amber-50 px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            Suspend
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemove(member.id, displayEmail)}
                          className="inline-flex items-center text-xs font-semibold text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
