

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { AdminRole } from "@/types/auth.types";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user } = useAuth();

  const role = user?.role;

  const showSidebar =
    role === AdminRole.ADMIN ||
    role === AdminRole.SUPER_ADMIN ||
    role === AdminRole.SUPERVISOR;

  // Determine user role type for sidebar
  const userRoleType =
    role === AdminRole.SUPERVISOR
      ? "supervisor"
      : "admin";

  return (
    <SidebarProvider>
      <div className="h-screen flex w-full overflow-hidden">
        {showSidebar && <AppSidebar userRole={userRoleType} />}

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
