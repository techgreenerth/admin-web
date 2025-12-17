import apiClient from "./axios";
import {
  BiocharActivationRecord,
  BiocharActivationResponse,
} from "@/types/biocharActivation.types";

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
};
