import apiClient from "./axios";
import {
  BiocharProductionRecord,
  BiocharProductionResponse,
  VerifyKontikiPayload,
  RejectKontikiPayload,
} from "@/types/biocharProduction.types";

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

  // Verify a kontiki in a production record
  async verifyKontiki(
    recordId: string,
    payload: VerifyKontikiPayload
  ): Promise<void> {
    await apiClient.post(
      `/v1/biochar-production/${recordId}/verify-kontiki`,
      payload
    );
  },

  // Reject a kontiki in a production record
  async rejectKontiki(
    recordId: string,
    payload: RejectKontikiPayload
  ): Promise<void> {
    await apiClient.post(
      `/v1/biochar-production/${recordId}/reject-kontiki`,
      payload
    );
  },
};
