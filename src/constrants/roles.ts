export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  SUPERVISOR: "SUPERVISOR", // Display as "Implementation Partner" in UI
  VERIFIER: "VERIFIER",
  CSI_MANAGER: "CSI_MANAGER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
