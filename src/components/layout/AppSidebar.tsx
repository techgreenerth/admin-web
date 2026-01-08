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

import { useProfile } from "@/contexts/ProfileContext";
import { ROLES } from "@/constrants/roles";

export function AppSidebar() {
  const { profile } = useProfile();

  const role = profile?.role;

  const isSupervisor = role === ROLES.SUPERVISOR;
  const isSuperAdmin = role === ROLES.SUPER_ADMIN;

  return (
    <Sidebar collapsible="icon" className="border-r bg-[#295F58] text-white">
      <SidebarContent className="py-4 flex flex-col h-full overflow-y-auto">
        {/* Dashboard - Hide for Implementation Partner */}
        {!isSupervisor && (
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
                      <Home className="h-6 w-6" />
                      <span className="text-lg">Dashboard</span>
                    </SidebarNavItem>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Production Modules */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-sm uppercase text-white/70">
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
                    <Leaf className="h-8 w-8" />
                    <span className="text-lg">Biomass Sourcing</span>
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
                    <Factory className="h-8 w-8" />
                    <span className="text-lg">Biochar Production</span>
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
                    <FlaskConical className="h-8 w-8" />
                    <span className="text-lg">Biochar Mixing</span>
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
                    <TestTube className="h-8 w-8" />
                    <span className="text-lg">Biochar Sampling</span>
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
                    <Weight className="h-8 w-8" />
                    <span className="text-lg">Bulk Density</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management - Hide for Implementation Partner */}
        {!isSupervisor && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 text-sm uppercase text-white/70">
              Management
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Admins — ONLY SUPER ADMIN */}
                {isSuperAdmin && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <SidebarNavItem
                        to="/admins"
                        className="hover:bg-white/10 transition-colors"
                        activeClassName="bg-white/20 font-medium"
                      >
                        <Shield className="h-8 w-8" />
                        <span className="text-lg">Admins</span>
                      </SidebarNavItem>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {/* Users — Admin + Super Admin */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <SidebarNavItem
                      to="/users"
                      className="hover:bg-white/10 transition-colors"
                      activeClassName="bg-white/20 font-medium"
                    >
                      <Users className="h-8 w-8" />
                      <span className="text-lg">Users</span>
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
                      <MapPin className="h-8 w-8" />
                      <span className="text-lg">Artisan Pro Sites</span>
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
                      <Flame className="h-8 w-8" />
                      <span className="text-lg">Kontikis</span>
                    </SidebarNavItem>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings & Help */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/settings"
                    className="hover:bg-white/10 transition-colors"
                    activeClassName="bg-white/20 font-medium"
                  >
                    <Settings className="h-8 w-8" />
                    <span className="text-base">Settings</span>
                  </SidebarNavItem>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavItem
                    to="/help"
                    className="hover:bg-white/10 transition-colors"
                  >
                    <HelpCircle className="h-8 w-8" />
                    <span className="text-lg">Help & Support</span>
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
