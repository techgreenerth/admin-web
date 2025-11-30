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

interface HeaderProps {
  userRole?: "admin" | "partner" | "verifier";
  userName?: string;
}

export function Header({ userRole = "admin", userName = "Admin User" }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6 gap-4">
        <SidebarTrigger className="lg:hidden" />

        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Tech Greenerth" className="h-9 w-9 object-contain" />
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg text-[#295F58]">Tech Greenerth</h1>
            <p className="text-xs text-muted-foreground">Admin Portal</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 hover:bg-[#E1EFEE]/50">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-[#295F58] text-white font-semibold">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="font-medium text-sm">{userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
