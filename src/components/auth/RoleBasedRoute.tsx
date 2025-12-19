// src/components/auth/RoleBasedRoute.tsx
import { Navigate } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export const RoleBasedRoute = ({
  allowedRoles,
  children,
}: RoleBasedRouteProps) => {
  const { profile, isLoading } = useProfile();

  if (isLoading) return null; // or loader

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(profile.role)) {
    // redirect based on role
    if (profile.role === "CSI_MANAGER") {
      return <Navigate to="/csi" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// src/constants/roles.ts


export const ROLES = {
  ADMIN: "ADMIN",
  CSI_MANAGER: "CSI_MANAGER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
