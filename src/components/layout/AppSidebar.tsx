import {
  BarChart3,
  ClipboardCheck,
  FileText,
  Home,
  LayersIcon,
  MapPin,
  Settings,
  Users,
  Wallet,
  HelpCircle,
  Package,
  GraduationCap,
  FileStack,
  Receipt,
  Leaf,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole?: "admin" | "partner" | "verifier";
}

const adminMenuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Batch Verification", url: "/admin/verification/pending-batches", icon: ClipboardCheck },
  { title: "Artisan Pros", url: "/admin/users/artisan-pros", icon: Users },
  { title: "Partners", url: "/admin/users/partners", icon: LayersIcon },
  { title: "Sites", url: "/admin/entities/sites", icon: MapPin },
  { title: "Carbon Ledger", url: "/admin/carbon-ledger", icon: Wallet },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const partnerMenuItems = [
  { title: "Dashboard", url: "/partner/dashboard", icon: Home },
  { title: "Sites", url: "/partner/sites", icon: MapPin },
  { title: "Artisans", url: "/partner/artisans", icon: Users },
  { title: "Production", url: "/partner/production", icon: Package },
  { title: "Biomass", url: "/partner/biomass", icon: Leaf },
  { title: "Training", url: "/partner/training", icon: GraduationCap },
  { title: "Documents", url: "/partner/documents", icon: FileStack },
  { title: "Invoices", url: "/partner/invoices", icon: Receipt },
];

export function AppSidebar({ userRole = "admin" }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  const menuItems = userRole === "partner" ? partnerMenuItems : adminMenuItems;

  return (
    <Sidebar className="border-r">
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 mb-2 text-xs uppercase text-sidebar-foreground/70">
            {isCollapsed ? "Menu" : `${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Menu`}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className="hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent font-medium"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/help"
                    className="hover:bg-sidebar-accent transition-colors"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Help & Support</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
