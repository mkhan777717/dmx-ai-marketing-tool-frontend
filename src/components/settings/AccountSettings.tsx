"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function AccountSettings() {
  const { user } = useUser();

  const [prevUser, setPrevUser] = useState(user);
  const [fullName, setFullName] = useState(user?.full_name || user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  if (user !== prevUser) {
    setPrevUser(user);
    setFullName(user?.full_name || user?.name || "");
    setEmail(user?.email || "");
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Account Settings</h3>
        <p className="text-xs text-slate-400 mt-0.5">Update your name and email address</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
