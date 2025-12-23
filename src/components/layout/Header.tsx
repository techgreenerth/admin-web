import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useProfile } from "@/contexts/ProfileContext";

export function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { profile, isLoading } = useProfile();

  const userName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "Loading...";

  const userRole = profile?.role ?? "ADMIN";

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-4 sm:px-6 gap-3 ">
        <SidebarTrigger className="lg:hidden bg-[#295F58] text-white" />

        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Greenerth"
            className="h-8 w-8 sm:h-9 sm:w-9 object-contain"
          />
          <div className="hidden sm:block">
        <h1 className="font-bold text-xl lg:text-2xl text-[#295F58]">
          Greenerth
        </h1>
        <p className="text-xs lg:text-sm text-muted-foreground">
          Admin Portal
        </p>
      </div>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 outline-none">
            <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
              <AvatarFallback className="bg-[#295F58] text-white font-semibold">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Hide on mobile */}
            <div className="hidden md:flex flex-col items-start">
              <span className="font-medium text-sm truncate max-w-[120px]">
                {userName}
              </span>
              <span className="text-xs text-muted-foreground">
                {userRole.replace("_", " ")}
              </span>
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => navigate("/settings")}>
            Settings
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
      </div>
    </header>
  );
}
