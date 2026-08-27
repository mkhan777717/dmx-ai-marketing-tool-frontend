"use client";

import { useState } from "react";
import { AIContentService } from "@/services/ai-content.service";
import { useWorkspace } from "@/context/WorkspaceContext";

interface AIGeneratorModalProps {
  onClose: () => void;
  defaultTopic?: string;
}

export default function AIGeneratorModal({
  onClose,
  defaultTopic = "",
}: AIGeneratorModalProps) {
  const { currentWorkspace } = useWorkspace();
  const [prompt, setPrompt] = useState(defaultTopic);
  const [platform, setPlatform] = useState("LinkedIn");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
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

      const response = await AIContentService.generateContent(currentWorkspace.id, {
        prompt: prompt.trim(),
        platform,
        tone,
      });

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-4">
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

        <form onSubmit={handleGenerate} className="space-y-4">
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
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter / X</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Blog">Blog Article</option>
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
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Generated Content:</span>
              <button
                onClick={() => navigator.clipboard.writeText(generatedResult)}
                className="text-blue-600 hover:underline"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-slate-800 whitespace-pre-wrap">{generatedResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}
