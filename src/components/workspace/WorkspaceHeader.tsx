import InviteMemberButton from "./InviteMemberModal";

export default function WorkspaceHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Workspace</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your workspace, members and permissions.
        </p>
      </div>
      <InviteMemberButton />
    </div>
  );
}
