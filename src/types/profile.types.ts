export type AdminRole = "ADMIN" | "SUPER_ADMIN";
export type AdminStatus = "ACTIVE" | "SUSPENDED";
import { Role } from ".././constrants/roles";

export interface AdminProfile {
id: string;
email: string;
phone: string;
firstName: string;
lastName: string;
role: Role;
status: AdminStatus;
permissions: string[];
profileImage: string | null;
createdAt: string;
updatedAt: string;
lastLoginAt: string;
}


export interface UpdateProfilePayload {
firstName?: string;
lastName?: string;
phone?: string;
profileImage?: string | null;
role?: AdminRole;
status?: AdminStatus;
permissions?: string[];
}