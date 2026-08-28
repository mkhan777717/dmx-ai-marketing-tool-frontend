"use client";

import { useState } from "react";
import { CampaignService } from "@/services/campaign.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { CampaignStatus } from "@/types/campaign";

interface CampaignFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CampaignForm({ onSuccess, onCancel }: CampaignFormProps) {
  const { currentWorkspace } = useWorkspace();
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<CampaignStatus>("DRAFT");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace?.id) {
      setError("No active workspace selected.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await CampaignService.create(currentWorkspace.id, {
        campaign_name: name,
        name,
        description: description.trim() || undefined,
        status,
        budget: budget ? parseFloat(budget) : undefined,
        start_date: startDate ? new Date(startDate).toISOString() : undefined,
        end_date: endDate ? new Date(endDate).toISOString() : undefined,
      });

      if (onSuccess) onSuccess();
    } catch {
      setError("Failed to create campaign. Please check input values.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 shadow-sm max-w-3xl overflow-hidden"
    >
      {/* Form header */}
      <div className="px-7 py-5 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800">Campaign Details</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Fill in the information below to set up your campaign.
        </p>
      </div>

      {error && (
        <div className="mx-7 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Form body */}
      <div className="px-7 py-6 space-y-5">
        {/* Campaign Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="campaign-name"
            className="block text-xs font-semibold text-slate-600 uppercase tracking-wide"
          >
            Campaign Name <span className="text-red-500">*</span>
          </label>
          <input
            id="campaign-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Summer Sale 2026"
            required
            className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        </div>

        {/* Budget + Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="campaign-budget"
              className="block text-xs font-semibold text-slate-600 uppercase tracking-wide"
            >
              Budget <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 pointer-events-none">
                ₹
              </span>
              <input
                id="campaign-budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="0"
                required
                className="w-full h-10 pl-7 pr-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="campaign-status"
              className="block text-xs font-semibold text-slate-600 uppercase tracking-wide"
            >
              Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="campaign-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as CampaignStatus)}
                className="w-full h-10 pl-3.5 pr-9 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all appearance-none cursor-pointer"
              >
                <option value="DRAFT">Draft</option>
                <option value="ACTIVE">Active</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="PAUSED">Paused</option>
                <option value="COMPLETED">Completed</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Start Date + End Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="campaign-start"
              className="block text-xs font-semibold text-slate-600 uppercase tracking-wide"
            >
              Start Date
            </label>
            <input
              id="campaign-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="campaign-end"
              className="block text-xs font-semibold text-slate-600 uppercase tracking-wide"
            >
              End Date
            </label>
            <input
              id="campaign-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-10 px-3.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label
            htmlFor="campaign-description"
            className="block text-xs font-semibold text-slate-600 uppercase tracking-wide"
          >
            Description
          </label>
          <textarea
            id="campaign-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the campaign goals, target audience, and key messaging…"
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all resize-none"
          />
        </div>
      </div>

      {/* Form footer */}
      <div className="px-7 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          <span className="text-red-500">*</span> Required fields
        </p>
        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center h-9 px-4 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 h-9 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-sm shadow-blue-200 transition-all duration-150 disabled:opacity-50"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {loading ? "Saving..." : "Save Campaign"}
          </button>
        </div>
      </div>
    </form>
  );
}
