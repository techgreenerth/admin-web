export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SUPERVISOR: "SUPERVISOR",
  VERIFIER: "VERIFIER",
  CSI_MANAGER: "CSI_MANAGER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
