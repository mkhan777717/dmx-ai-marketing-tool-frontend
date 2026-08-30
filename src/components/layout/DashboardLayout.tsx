"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { UserProvider } from "@/context/UserContext";
import { WorkspaceProvider } from "@/context/WorkspaceContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <UserProvider>
      <WorkspaceProvider>
        <div className="flex min-h-screen bg-slate-50 relative">
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <div className="flex flex-1 flex-col min-w-0">
            <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </WorkspaceProvider>
    </UserProvider>
  );
}

