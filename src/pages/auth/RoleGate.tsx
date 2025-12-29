import { Navigate } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { Role } from "@/constrants/roles";

interface RoleGateProps {
  allow: Role[];
  children: React.ReactNode;
}

export function RoleGate({ allow, children }: RoleGateProps) {
  const { profile, isLoading } = useProfile();

  if (isLoading) return null;

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (!allow.includes(profile.role)) {
    // fallback redirection based on role
    if (profile.role === "CSI_MANAGER") {
      return <Navigate to="/csi" replace />;
    }
    if (profile.role === "SUPERVISOR") {
      return <Navigate to="/biomass-sourcing" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
