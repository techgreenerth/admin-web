import { Bell, User } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
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
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger className="lg:hidden" />
        
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Tech Greenerth" className="h-8 w-8 object-contain" />
          <span className="font-semibold text-lg hidden sm:inline-block">Tech Greenerth</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start text-sm">
                  <span className="font-medium">{userName}</span>
                  <Badge variant="secondary" className="text-xs mt-0.5">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </Badge>
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
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
