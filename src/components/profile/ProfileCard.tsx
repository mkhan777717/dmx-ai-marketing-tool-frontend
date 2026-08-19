"use client";

import { useMemo } from "react";
import { useUser } from "@/context/UserContext";

export default function ProfileCard() {
  const { user, loading } = useUser();

  const userDisplayName = user?.full_name || user?.name || (user?.email ? user.email.split("@")[0] : "User");
  const userEmail = user?.email || "";
  const userRole = user?.role || "Member";
  const userDepartment = user?.department || "Marketing";

  const memberSince = useMemo(() => {
    if (!user?.created_at) return "Jan 2026";
    try {
      const date = new Date(user.created_at);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return "Jan 2026";
    }
  }, [user?.created_at]);

  const userInitials = useMemo(() => {
    if (user?.full_name || user?.name) {
      const parts = (user.full_name || user.name || "").trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      } else if (parts[0]) {
        return parts[0].substring(0, 2).toUpperCase();
      }
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U";
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center text-xs text-slate-500">
        Loading profile information...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Account</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your public profile information</p>
      </div>

      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar */}
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={userDisplayName}
            className="w-16 h-16 rounded-full object-cover shadow-md shadow-blue-200 shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue-200 shrink-0">
            {userInitials}
          </div>
        )}

        <h2 className="mt-4 text-sm font-bold text-slate-900">{userDisplayName}</h2>
        <p className="text-xs text-slate-500 mt-0.5">{userDepartment}</p>
        <p className="text-xs text-slate-400 mt-1">{userEmail}</p>

        {/* Status badge — dot + text + border, matches CampaignStatusBadge */}
        <span className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          Active
        </span>

        {/* Divider */}
        <div className="w-full border-t border-slate-100 mt-5 pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Member since</span>
            <span className="font-semibold text-slate-700">{memberSince}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Role</span>
            <span className="font-semibold text-slate-700">{userRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
