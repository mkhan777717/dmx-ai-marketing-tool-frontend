import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { UserProvider } from "@/context/UserContext";
import { WorkspaceProvider } from "@/context/WorkspaceContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <UserProvider>
      <WorkspaceProvider>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <div className="flex flex-1 flex-col min-w-0">
            <Navbar />
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </WorkspaceProvider>
    </UserProvider>
  );
}
