
import {
  Home,
  Users,
  MapPin,
  Flame,
  Leaf,
  Factory,
  FlaskConical,
  TestTube,
  Weight,
  Settings,
  HelpCircle,
  Shield,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarNavItem } from "./SidebarNavItem";

interface AppSidebarProps {
  userRole?: "admin" | "partner" | "verifier";
}

export function AppSidebar({ userRole = "admin" }: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-[#295F58] text-white"
    >
      <SidebarContent className="py-4 flex flex-col h-full overflow-y-auto">

        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Home className="h-5 w-5" />
                    <span className="text-base">Dashboard</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Production Modules */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs uppercase text-white/70">
            Production Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/biomass-sourcing"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Leaf className="h-5 w-5" />
                    <span className="text-base">Biomass Sourcing</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/biochar-production"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Factory className="h-5 w-5" />
                    <span className="text-base">Biochar Production</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/biochar-activation"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <FlaskConical className="h-5 w-5" />
                    <span className="text-base">Biochar Activation</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/biochar-sampling"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <TestTube className="h-5 w-5" />
                    <span className="text-base">Biochar Sampling</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/bulk-density"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Weight className="h-5 w-5" />
                    <span className="text-base">Bulk Density</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs uppercase text-white/70">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/admins"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Shield className="h-5 w-5" />
                    <span className="text-base">Admins</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/users"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Users className="h-5 w-5" />
                    <span className="text-base">Users</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/sites"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <MapPin className="h-5 w-5" />
                    <span className="text-base">Artisan Pro Sites</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/kontikis"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Flame className="h-5 w-5" />
                    <span className="text-base">Kontikis</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings & Help */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/settings"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Settings className="h-5 w-5" />
                    <span className="text-base">Settings</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/help"
                    className="hover:bg-white/10 transition-colors"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span className="text-base">Help & Support</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}
