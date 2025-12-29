export enum AdminRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SUPERVISOR = "SUPERVISOR", // Display as "Implementation Partner"
  VERIFIER = "VERIFIER",
  CSI_MANAGER = "CSI_MANAGER"
}

import { Role } from "../constrants/roles";
export interface Admin {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: Admin;
  accessToken: string;
  userType: 'admin' | 'user';
}

export interface LoginCredentials {
  email: string;
  password: string;
}
