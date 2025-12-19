import apiClient from "./axios";
import { AdminProfile, UpdateProfilePayload } from "@/types/profile.types";


export const profileService = {
// GET /admin/me
async getMe(): Promise<AdminProfile> {
const response = await apiClient.get<AdminProfile>(
"/v1/admin/me"
);
return response.data;
},


// PATCH /admin/:id
async updateProfile(
id: string,
payload: UpdateProfilePayload
): Promise<AdminProfile> {
const response = await apiClient.patch<AdminProfile>(
`/v1/admin/${id}`,
payload
);
return response.data;
},
};