import apiClient from "./axios";
import {
  BiocharActivationRecord,
  BiocharActivationResponse,
} from "@/types/biocharActivation.types";

export type ExportBiocharActivationCSVParams = {
  userId?: string;
  siteId?: string;
  status?: "DRAFT" | "SUBMITTED" | "VERIFIED" | "REJECTED";
  startDate?: string;
  endDate?: string;
};

export const biocharActivationService = {
  // Get all biochar activation records
  async getAllRecords(
    page = 1,
    limit = 20
  ): Promise<BiocharActivationResponse> {
    const response = await apiClient.get<BiocharActivationResponse>(
      "/v1/biochar-activation",
      {
        params: { page, limit },
      }
    );
    return response.data;
  },

  // Get biochar activation record by ID
  async getRecordById(id: string): Promise<BiocharActivationRecord> {
    const response = await apiClient.get<BiocharActivationRecord>(
      `/v1/biochar-activation/${id}`
    );
    return response.data;
  },

  // Export biochar activation records to CSV
  async exportToCSV(
    params?: ExportBiocharActivationCSVParams
  ): Promise<Blob> {
    const response = await apiClient.get(
      "/v1/biochar-activation/export/csv",
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
