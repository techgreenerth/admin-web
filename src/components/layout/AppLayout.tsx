import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  userRole?: "admin" | "partner" | "verifier";
  userName?: string;
}

export function AppLayout({
  children,
  userRole = "admin",
  userName,
}: AppLayoutProps) {
  return (
    <SidebarProvider
      className="!h-screen !min-h-screen !max-h-screen overflow-hidden"
      style={{ height: "100vh", minHeight: "100vh", maxHeight: "100vh" }}
    >
      <div className="h-full flex w-full overflow-hidden">
        <AppSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
          <Header userRole={userRole} userName={userName} />
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
