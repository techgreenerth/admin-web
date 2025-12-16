import apiClient from "./axios";
import { Site,SitesResponse,CreateSitePayload ,UpdateSitePayload,AssignUserPayload, RevokeUserPayload} from "@/types/site.types";

export const sitesService = {
  async getAllSites(
    page = 1,
    limit = 20
  ): Promise<SitesResponse> {
    const response = await apiClient.get<SitesResponse>(
      "/v1/sites",
      {
        params: { page, limit },
      }
    );

    return response.data;
  },

// Create a new site
async createSite(payload: CreateSitePayload) {
    const response = await apiClient.post("/v1/sites", payload);
    return response.data;
  },

  // Delete a  site
async deleteSite(id: string) {
    const response = await apiClient.delete(`/v1/sites/${id}`);
    return response.data;
  },

//   Assign Site to a User
async assignUserToSite(siteId: string, payload: AssignUserPayload) {
  const response = await apiClient.post(`/v1/sites/${siteId}/assign-user`,payload);
  return response.data;
},

// Revoke user from site
async revokeUserFromSite(siteId: string,payload: RevokeUserPayload) {
  const response = await apiClient.post(`/v1/sites/${siteId}/revoke-user`,payload);
  return response.data;
},

async updateSite(id: string, payload: UpdateSitePayload) {
  const response = await apiClient.patch(
    `/v1/sites/${id}`,
    payload
  );
  return response.data;
},

async getSiteById(siteId: string): Promise<Site> {
  const response = await apiClient.get<Site>(`/v1/sites/${siteId}`);
  return response.data;
},

};

