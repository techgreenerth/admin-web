import apiClient from "./axios";
import {
  BiomassSourcingRecord,
  BiomassSourcingResponse,
} from "@/types/biomassSourcing.types";

export const biomassSourcingService = {
  // Get all biomass sourcing records
  async getAllRecords(
    page = 1,
    limit = 20
  ): Promise<BiomassSourcingResponse> {
    const response = await apiClient.get<BiomassSourcingResponse>(
      "/v1/biomass-sourcing",
      {
        params: { page, limit },
      }
    );
    return response.data;
  },

  // Get biomass sourcing record by ID
  async getRecordById(id: string): Promise<BiomassSourcingRecord> {
    const response = await apiClient.get<BiomassSourcingRecord>(
      `/v1/biomass-sourcing/${id}`
    );
    return response.data;
  },
};
