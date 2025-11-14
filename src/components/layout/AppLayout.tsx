import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  userRole?: "admin" | "partner" | "verifier";
  userName?: string;
}

export function AppLayout({ children, userRole = "admin", userName }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header userRole={userRole} userName={userName} />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
