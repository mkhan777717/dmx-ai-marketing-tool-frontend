"use client";

import Link from "next/link";

export default function ResetPasswordForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
          New Password
        </label>
        <input id="password" type="password" placeholder="••••••••"
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Confirm New Password
        </label>
        <input id="confirmPassword" type="password" placeholder="••••••••"
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
      </div>

      <button type="submit"
        className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150">
        Reset Password
      </button>

      <p className="text-center text-xs text-slate-500 pt-1">
        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          ← Back to Sign In
        </Link>
      </p>
    </form>
  );
}
