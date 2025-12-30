import apiClient from "./axios";
import {
  BiocharSamplingRecord,
  BiocharSamplingResponse,
} from "@/types/biocharSampling.types";

export type ExportBiocharActivationCSVParams = {
  userId?: string;
  siteId?: string;
  status?: "DRAFT" | "SUBMITTED" | "VERIFIED" | "REJECTED";
  startDate?: string;
  endDate?: string;
};

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

  // Export biochar sampling records to CSV
//   
  async exportToCSV(
    params?: ExportBiocharActivationCSVParams
  ): Promise<Blob> {
    const response = await apiClient.get(
      "/v1/biochar-sampling/export/csv",
      {
        params,
        responseType: 'blob'
      }
    );

    return new Blob([response.data], {
      type: "text/csv;charset=utf-8;",
    });
  }
};
