"use client";

import { useState } from "react";
import CampaignFilters from "@/components/campaigns/CampaignFilters";
import CampaignTable from "@/components/campaigns/CampaignTable";
import CampaignForm from "@/components/campaigns/CampaignForm";

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreated = () => {
    setShowCreateModal(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">All Campaigns</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor and manage all your marketing campaigns in one place.
          </p>
        </div>
      </div>

      <CampaignFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onCreateClick={() => setShowCreateModal(true)}
      />

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CampaignForm
              onSuccess={handleCreated}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}

      <CampaignTable
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onRefreshTrigger={refreshTrigger}
      />
    </div>
  );
}
