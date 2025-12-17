import apiClient from "./axios";
import {
  BiocharSamplingRecord,
  BiocharSamplingResponse,
} from "@/types/biocharSampling.types";

export const biocharSamplingService = {
  // Get all biochar sampling records
  async getAllRecords(
    page = 1,
    limit = 20,
    filters?: {
      search?: string;
      siteId?: string;
      userId?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<BiocharSamplingResponse> {
    const response = await apiClient.get<BiocharSamplingResponse>(
      "/v1/biochar-sampling",
      {
        params: { 
          page, 
          limit,
          ...filters 
        },
      }
    );
    return response.data;
  },

  // Get biochar sampling record by ID
  async getRecordById(id: string): Promise<BiocharSamplingRecord> {
    const response = await apiClient.get<BiocharSamplingRecord>(
      `/v1/biochar-sampling/${id}`
    );
    return response.data;
  },
};
