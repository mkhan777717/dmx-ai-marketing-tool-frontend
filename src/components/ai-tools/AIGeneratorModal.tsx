"use client";

import { useState } from "react";
import { AIContentService } from "@/services/ai-content.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { ContentType } from "@/types/ai-content";

interface AIGeneratorModalProps {
  onClose: () => void;
  defaultTopic?: string;
  campaignId?: string;
  onSaveSuccess?: () => void;
}

export default function AIGeneratorModal({
  onClose,
  defaultTopic = "",
  campaignId = "",
  onSaveSuccess,
}: AIGeneratorModalProps) {
  const { currentWorkspace } = useWorkspace();
  const [prompt, setPrompt] = useState(defaultTopic);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaignId);
  const [contentType, setContentType] = useState<ContentType>("SOCIAL_POST");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace?.id) {
      setError("Please select a valid workspace.");
      return;
    }
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setGeneratedResult(null);
      setSavedMsg(null);

      const activeCampaignId = selectedCampaignId || campaignId;

      const response = await AIContentService.generateContent(
        currentWorkspace.id,
        {
          prompt: prompt.trim(),
          content_type: contentType,
          campaign_id: activeCampaignId || undefined,
          tone_of_voice: tone,
        }
      );

      const data = response.data?.data;
      if (data?.body || data?.generated_text) {
        setGeneratedResult(data.body || data.generated_text || "");
      } else {
        setGeneratedResult("AI Content generated successfully.");
      }
    } catch {
      setError("Failed to generate content using AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCampaign = async () => {
    if (!currentWorkspace?.id) return;
    const targetCampaignId = selectedCampaignId || campaignId;
    if (!targetCampaignId) {
      setError("Please select a target campaign ID to save this content.");
      return;
    }
    if (!generatedResult) return;

    try {
      setSaving(true);
      setError(null);

      await AIContentService.createContent(
        currentWorkspace.id,
        targetCampaignId,
        {
          campaign_id: targetCampaignId,
          title: prompt.slice(0, 50) || "AI Generated Content",
          content_type: contentType,
          body: generatedResult,
        }
      );

      setSavedMsg("Content saved to campaign successfully!");
      if (onSaveSuccess) onSaveSuccess();
    } catch {
      setError("Failed to save content to campaign. Please verify target campaign ID.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-800">Generate Content with AI</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg leading-none"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        {savedMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg">
            {savedMsg}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          {!campaignId && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Target Campaign ID (Optional)
              </label>
              <input
                type="text"
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                placeholder="Enter campaign ID if saving to a specific campaign"
                className="w-full h-9 px-3.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Topic / Prompt <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Write a social post announcing our new summer discount..."
              required
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value as ContentType)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none"
              >
                <option value="SOCIAL_POST">Social Post</option>
                <option value="EMAIL">Email</option>
                <option value="BLOG">Blog Article</option>
                <option value="ADVERTISEMENT">Advertisement</option>
                <option value="LANDING_PAGE">Landing Page</option>
                <option value="SMS">SMS</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none"
              >
                <option value="Professional">Professional</option>
                <option value="Casual">Casual & Friendly</option>
                <option value="Persuasive">Persuasive</option>
                <option value="Witty">Witty / Funny</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate AI Content"}
            </button>
          </div>
        </form>

        {generatedResult && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Generated Content Preview (Not saved yet):</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(generatedResult)}
                  className="text-blue-600 hover:underline"
                >
                  Copy
                </button>
                <button
                  type="button"
                  onClick={handleSaveToCampaign}
                  disabled={saving}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save to Campaign"}
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
              {generatedResult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
