"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (event: FormEvent) => {
  event.preventDefault();

  setError("");
  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (!data.session) {
      setError("Login succeeded, but no authentication session was created.");
      return;
    }

    router.push("/dashboard");
  } catch {
    setError("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-slate-600 uppercase tracking-wide"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-xs font-semibold text-slate-600 uppercase tracking-wide"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          required
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded accent-blue-600"
          />
          Remember me
        </label>

        <Link
          href="/forgot-password"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      <p className="text-center text-xs text-slate-500 pt-1">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Create account
        </Link>
      </p>
    </form>
  );
}
