"use client";

import Link from "next/link";

export default function SignupForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Full Name
        </label>
        <input id="name" type="text" placeholder="Your full name"
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Email Address
        </label>
        <input id="email" type="email" placeholder="you@datamindx.io"
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Password
          </label>
          <input id="password" type="password" placeholder="••••••••"
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Confirm
          </label>
          <input id="confirmPassword" type="password" placeholder="••••••••"
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
        </div>
      </div>

      <button type="submit"
        className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150">
        Create Account
      </button>

      <p className="text-center text-xs text-slate-500 pt-1">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}
