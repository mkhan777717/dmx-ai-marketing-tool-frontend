"use client";

import { useEffect, useState, use, useCallback } from "react";
import Link from "next/link";
import CampaignStatusBadge from "@/components/campaigns/CampaignStatusBadge";
import AIGeneratorModal from "@/components/ai-tools/AIGeneratorModal";
import { CampaignService } from "@/services/campaign.service";
import { AIContentService } from "@/services/ai-content.service";
import { useWorkspace } from "@/context/WorkspaceContext";
import type { Campaign } from "@/types/campaign";
import type { CampaignContent, ContentType } from "@/types/ai-content";

interface CampaignDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignDetailsPage({ params }: CampaignDetailsPageProps) {
  const { id: campaignId } = use(params);
  const { currentWorkspace } = useWorkspace();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [contents, setContents] = useState<CampaignContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentsLoading, setContentsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals & form states
  const [showAIModal, setShowAIModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingContent, setEditingContent] = useState<CampaignContent | null>(null);

  // New Content Form
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<ContentType>("SOCIAL_POST");
  const [newBody, setNewBody] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCampaignDetails = useCallback(async (workspaceId: string) => {
    try {
      const res = await CampaignService.getById(workspaceId, campaignId);
      const data = res.data?.data || (res.data as unknown as Campaign);
      setCampaign(data);
    } catch {
      setError("Failed to load campaign details.");
    } finally {
      setLoading(false);
    }
  }, [campaignId]);

  const fetchContents = useCallback(async (workspaceId: string) => {
    try {
      const res = await AIContentService.listContents(workspaceId, campaignId);
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setContents(list);
    } catch {
      setContents([]);
    } finally {
      setContentsLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    let isMounted = true;
    if (!currentWorkspace?.id || !campaignId) return;

    CampaignService.getById(currentWorkspace.id, campaignId)
      .then((res) => {
        if (!isMounted) return;
        const data = res.data?.data || (res.data as unknown as Campaign);
        setCampaign(data);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load campaign details.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    AIContentService.listContents(currentWorkspace.id, campaignId)
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setContents(list);
      })
      .catch(() => {
        if (isMounted) setContents([]);
      })
      .finally(() => {
        if (isMounted) setContentsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentWorkspace?.id, campaignId]);

  const handleCreateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace?.id || !newTitle.trim()) return;

    try {
      setActionLoading(true);
      const res = await AIContentService.createContent(currentWorkspace.id, campaignId, {
        campaign_id: campaignId,
        title: newTitle.trim(),
        content_type: newType,
        body: newBody.trim(),
      });

      const newContent = res.data?.data || (res.data as unknown as CampaignContent);
      setContents((prev) => [newContent, ...prev]);
      setShowCreateModal(false);
      setNewTitle("");
      setNewBody("");
    } catch {
      alert("Failed to create content item.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace?.id || !editingContent) return;

    try {
      setActionLoading(true);
      const res = await AIContentService.updateContent(
        currentWorkspace.id,
        campaignId,
        editingContent.id,
        {
          title: editingContent.title,
          body: editingContent.body,
          status: editingContent.status,
        }
      );

      const updated = res.data?.data || (res.data as unknown as CampaignContent);
      setContents((prev) =>
        prev.map((c) => (c.id === editingContent.id ? { ...c, ...updated } : c))
      );
      setEditingContent(null);
    } catch {
      alert("Failed to update content item.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteContent = async (contentId: string, title: string) => {
    if (!currentWorkspace?.id) return;
    if (!confirm(`Are you sure you want to delete content "${title}"?`)) return;

    try {
      await AIContentService.deleteContent(currentWorkspace.id, campaignId, contentId);
      // Remove deleted content from state immediately so UI refreshes cleanly
      setContents((prev) => prev.filter((item) => item.id !== contentId));
    } catch {
      alert("Failed to delete content item.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Loading campaign details…
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/dashboard/campaigns" className="hover:text-slate-600 transition-colors">
          Campaigns
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-slate-600 font-medium">
          {campaign?.campaign_name || campaign?.name || `Campaign #${campaignId}`}
        </span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {campaign?.campaign_name || campaign?.name || "Campaign Details"}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage campaign details and generated marketing assets
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAIModal(true)}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            Generate AI Content
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
          >
            Add Content
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
          {error}
        </div>
      )}

      {/* Overview Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">Overview</h3>
          {campaign?.status && <CampaignStatusBadge status={campaign.status} />}
        </div>
        <div className="px-6 py-5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { label: "Campaign ID", value: campaign?.id || campaignId },
              { label: "Campaign Name", value: campaign?.campaign_name || campaign?.name || "—" },
              { label: "Budget", value: campaign?.budget ? `₹${Number(campaign.budget).toLocaleString()}` : "—" },
              {
                label: "Start Date",
                value: campaign?.start_date
                  ? new Date(campaign.start_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                  : "—",
              },
              {
                label: "End Date",
                value: campaign?.end_date
                  ? new Date(campaign.end_date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                  : "—",
              },
              { label: "Channels", value: campaign?.target_channels || "Social Media" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <dt className="text-[0.7rem] font-semibold text-slate-400 uppercase tracking-wide">{item.label}</dt>
                <dd className="text-sm font-semibold text-slate-800">{item.value}</dd>
              </div>
            ))}
          </dl>
          {campaign?.description && (
            <div className="mt-5 pt-5 border-t border-slate-100">
              <dt className="text-[0.7rem] font-semibold text-slate-400 uppercase tracking-wide mb-2">Description</dt>
              <dd className="text-sm text-slate-600 leading-relaxed">{campaign.description}</dd>
            </div>
          )}
        </div>
      </div>

      {/* Campaign Contents Section (CRUD) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Campaign Content Assets</h3>
            <p className="text-xs text-slate-400 mt-0.5">Content items created and saved for this campaign</p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
            {contents.length} item{contents.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {contentsLoading ? (
            <div className="px-6 py-8 text-center text-xs text-slate-400">
              Loading campaign contents…
            </div>
          ) : contents.length === 0 ? (
            <div className="px-6 py-10 text-center space-y-3">
              <p className="text-xs text-slate-400">
                No content items found for this campaign yet.
              </p>
              <button
                onClick={() => setShowAIModal(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
              >
                Generate content using AI &rarr;
              </button>
            </div>
          ) : (
            contents.map((item) => (
              <div key={item.id} className="p-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{item.title || "Untitled Content"}</span>
                      <span className="text-[0.65rem] font-semibold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        {item.content_type || "SOCIAL_POST"}
                      </span>
                      <span className="text-[0.65rem] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {item.status || "DRAFT"}
                      </span>
                    </div>
                    {item.body && (
                      <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">
                        {item.body}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingContent(item)}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 px-2 py-1 rounded hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteContent(item.id, item.title || "Content")}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-2 py-1 rounded hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AI Content Generator Modal */}
      {showAIModal && (
        <AIGeneratorModal
          campaignId={campaignId}
          onClose={() => setShowAIModal(false)}
          onSaveSuccess={() => {
            if (currentWorkspace?.id) void fetchContents(currentWorkspace.id);
          }}
        />
      )}

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-800">Add New Content Asset</h3>
            <form onSubmit={handleCreateContent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Launch Post Announcement"
                  required
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Content Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as ContentType)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none"
                >
                  <option value="SOCIAL_POST">Social Post</option>
                  <option value="EMAIL">Email</option>
                  <option value="BLOG">Blog</option>
                  <option value="ADVERTISEMENT">Advertisement</option>
                  <option value="LANDING_PAGE">Landing Page</option>
                  <option value="SMS">SMS</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Body Text</label>
                <textarea
                  rows={4}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Enter content text body..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading || !newTitle.trim()}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
                >
                  {actionLoading ? "Saving..." : "Create Content"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Content Modal */}
      {editingContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-4 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-800">Edit Content Asset</h3>
            <form onSubmit={handleUpdateContent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Title</label>
                <input
                  type="text"
                  value={editingContent.title}
                  onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                  required
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Status</label>
                <select
                  value={editingContent.status}
                  onChange={(e) => setEditingContent({ ...editingContent, status: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="IN_REVIEW">IN_REVIEW</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="READY">READY</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Body Text</label>
                <textarea
                  rows={4}
                  value={editingContent.body || ""}
                  onChange={(e) => setEditingContent({ ...editingContent, body: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingContent(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
                >
                  {actionLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
