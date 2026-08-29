"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) return;

    setLoading(true);

    try {
      const redirectTo = typeof window !== "undefined"
        ? `${window.location.origin}/reset-password`
        : undefined;

      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("Password reset instructions have been sent to your email.");
      }
    } catch {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@datamindx.io"
          required
          className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
        />
        <p className="text-xs text-slate-400 mt-1">
          We&apos;ll send a password reset link to this address.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {message && (
        <p className="text-sm text-emerald-600" role="status">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150"
      >
        {loading ? "Sending Link..." : "Send Reset Link"}
      </button>

      <p className="text-center text-xs text-slate-500 pt-1">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}
