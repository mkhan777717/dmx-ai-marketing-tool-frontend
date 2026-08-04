import MembersTable from "@/components/workspace/MembersTable";
import RolesCard from "@/components/workspace/RolesCard";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import WorkspaceStats from "@/components/workspace/WorkspaceStats";

export default function WorkspacePage() {
  return (
    <div className="space-y-5">
      <WorkspaceHeader />
      <WorkspaceStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <MembersTable />
        </div>
        <RolesCard />
      </div>
      <WorkspaceCard />
    </div>
  );
}
