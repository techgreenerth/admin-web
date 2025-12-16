import apiClient from "./axios";
import {
  Kontiki,
  KontikisResponse,
  CreateKontikiPayload,
  UpdateKontikiPayload,
} from "@/types/kontikis.types";


export const kontikiService = {
  //  Get all kontikis 
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    siteId?: string;
  }): Promise<KontikisResponse> {
    const response = await apiClient.get<KontikisResponse>(
      "/v1/kontikis",
      { params }
    );
    return response.data;
  },

  // Get kontikis by site
  async getBySite(siteId: string): Promise<Kontiki[]> {
    const response = await apiClient.get<{ data: Kontiki[] }>(
      `/v1/kontikis/site/${siteId}`
    );
    return response.data.data;
  },

  // Get kontiki by ID
  async getById(id: string): Promise<Kontiki> {
    const response = await apiClient.get<{ data: Kontiki }>(
      `/v1/kontikis/${id}`
    );
    return response.data.data;
  },

  // Create kontiki (
  async create(payload: CreateKontikiPayload): Promise<Kontiki> {
    const response = await apiClient.post<{ data: Kontiki }>(
      "/v1/kontikis",
      payload
    );
    return response.data.data;
  },

  // Update kontiki (Admin)
  async update(
    id: string,
    payload: UpdateKontikiPayload
  ): Promise<Kontiki> {
    const response = await apiClient.patch<{ data: Kontiki }>(
      `/v1/kontikis/${id}`,
      payload
    );
    return response.data.data;
  },

  // Delete kontiki (Admin)
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/v1/kontikis/${id}`);
  },
};
