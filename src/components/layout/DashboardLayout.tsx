"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { UserProvider } from "@/context/UserContext";
import { WorkspaceProvider } from "@/context/WorkspaceContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authState, setAuthState] = useState<"checking" | "authenticated" | "unauthenticated">("checking");

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      if (session) {
        setAuthState("authenticated");
      } else {
        setAuthState("unauthenticated");
        router.replace("/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session) {
        setAuthState("authenticated");
      } else {
        setAuthState("unauthenticated");
        router.replace("/login");
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (authState === "checking" || authState === "unauthenticated") {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <UserProvider>
      <WorkspaceProvider>
        <div className="flex min-h-screen bg-slate-50 relative">
          <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <div className="flex flex-1 flex-col min-w-0">
            <Navbar setMobileOpen={setMobileOpen} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      </WorkspaceProvider>
    </UserProvider>
  );
}

