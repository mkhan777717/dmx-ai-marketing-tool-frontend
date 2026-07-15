import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="mb-10 text-2xl font-bold"> DMX </h1>
      <nav className="flex flex-col gap-5">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/campaigns">Campaigns</Link>
        <Link href="/dashboard/analytics">Analytics</Link>
        <Link href="/dashboard/reports">Reports</Link>
        <Link href="/dashboard/ai">AI Tools</Link>
      </nav>
    </aside>
  );
}