import {
  Home,
  Users,
  MapPin,
  Flame,
  Clock,
  Leaf,
  Factory,
  FlaskConical,
  TestTube,
  Weight,
  Settings,
  HelpCircle,
  Shield,
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
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole?: "admin" | "partner" | "verifier";
}

export function AppSidebar({ userRole = "admin" }: AppSidebarProps) {
  return (
    <Sidebar className="border-r bg-[#295F58] text-white !h-full !min-h-full" collapsible="none" style={{ height: '100vh' }}>
      <SidebarContent className="py-4 flex flex-col !h-full overflow-y-auto">
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Home className="h-5 w-5" />
                    <span className="text-base">Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Production Modules */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs uppercase text-white/70">Production Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/biomass-sourcing" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Leaf className="h-5 w-5" />
                    <span className="text-base">Biomass Sourcing</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/biochar-production" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Factory className="h-5 w-5" />
                    <span className="text-base">Biochar Production</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/biochar-activation" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <FlaskConical className="h-5 w-5" />
                    <span className="text-base">Biochar Activation</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/biochar-sampling" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <TestTube className="h-5 w-5" />
                    <span className="text-base">Biochar Sampling</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/bulk-density" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Weight className="h-5 w-5" />
                    <span className="text-base">Bulk Density</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs uppercase text-white/70">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/admins" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Shield className="h-5 w-5" />
                    <span className="text-base">Admins</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/users" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Users className="h-5 w-5" />
                    <span className="text-base">Users</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/sites" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <MapPin className="h-5 w-5" />
                    <span className="text-base">Artisan Pro Sites</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/kontikis" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Flame className="h-5 w-5" />
                    <span className="text-base">Kontikis</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/shifts" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Clock className="h-5 w-5" />
                    <span className="text-base">Production Shifts</span>
                  </NavLink>
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
                  <NavLink to="/settings" className="hover:bg-white/10 transition-colors" activeClassName="bg-white/20 font-medium">
                    <Settings className="h-5 w-5" />
                    <span className="text-base">Settings</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/help" className="hover:bg-white/10 transition-colors">
                    <HelpCircle className="h-5 w-5" />
                    <span className="text-base">Help & Support</span>
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
