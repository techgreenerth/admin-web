import apiClient from "./axios";
import {
  BiocharProductionRecord,
  BiocharProductionResponse,

} from "@/types/biocharProduction.types";

export type ExportBiocharProductionCSVParams = {
  userId?: string;
  siteId?: string;
  status?: "DRAFT" | "SUBMITTED" | "VERIFIED" | "REJECTED";
  productionStep?: number;
  startDate?: string;
  endDate?: string;
};

export const biocharProductionService = {
  // Get all biochar production records
  async getAllRecords(
    page = 1,
    limit = 20
  ): Promise<BiocharProductionResponse> {
    const response = await apiClient.get<BiocharProductionResponse>(
      "/v1/biochar-production",
      {
        params: { page, limit },
      }
    );
    return response.data;
  },

  // Get biochar production record by ID
  async getRecordById(id: string): Promise<BiocharProductionRecord> {
    const response = await apiClient.get<BiocharProductionRecord>(
      `/v1/biochar-production/${id}`
    );
    return response.data;
  },

  // Verify a specific production step (1: Moisture, 2: Start, 3: Middle, 4: End, 5: Final)
  async verifyKontikiStep(
    kontikiRecordId: string,
    stepNumber: number
  ): Promise<void> {
    await apiClient.post(
      `/v1/biochar-production/kontiki/${kontikiRecordId}/verify-step`,
      { stepNumber }
    );
  },

  // Reject a specific production step with rejection note
  async rejectKontikiStep(
    kontikiRecordId: string,
    stepNumber: number,
    rejectionNote: string
  ): Promise<void> {
    await apiClient.post(
      `/v1/biochar-production/kontiki/${kontikiRecordId}/reject-step`,
      { stepNumber, rejectionNote }
    );
  },

  // Get all step verifications for a kontiki record
  async getStepVerifications(kontikiRecordId: string): Promise<any> {
    const response = await apiClient.get(
      `/v1/biochar-production/kontiki/${kontikiRecordId}/step-verifications`
    );
    return response.data;
  },

  
  // Export biochar production records to CSV
  async exportToCSV(
    params?: ExportBiocharProductionCSVParams
  ): Promise<Blob> {
    const response = await apiClient.get(
      "/v1/biochar-production/export/csv",
      {
        params,
        responseType: 'blob'
      }
    );

    return new Blob([response.data], {
      type: "text/csv;charset=utf-8;",
    });
  }
}
