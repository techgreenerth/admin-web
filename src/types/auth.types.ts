export enum AdminRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SUPERVISOR = "SUPERVISOR",
  VERIFIER = "VERIFIER",
}

export interface Admin {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: Admin;
  token: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
