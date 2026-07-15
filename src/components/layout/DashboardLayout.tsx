import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 p-8 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}