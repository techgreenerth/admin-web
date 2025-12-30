import apiClient from "./axios";
import {
  BulkDensityRecord,
  BulkDensityResponse,
  VerifyBulkDensityPayload,
  RejectBulkDensityPayload,
} from "@/types/bulkDensity.types";

export const bulkDensityService = {
  // Get all bulk density records
  async getAllRecords(
    page = 1,
    limit = 20,
    filters?: {
      search?: string;
      siteId?: string;
      userId?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<BulkDensityResponse> {
    const response = await apiClient.get<BulkDensityResponse>(
      "/v1/bulk-density",
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

  // Get bulk density record by ID
  async getRecordById(id: string): Promise<BulkDensityRecord> {
    const response = await apiClient.get<BulkDensityRecord>(
      `/v1/bulk-density/${id}`
    );
    return response.data;
  },

  // Verify a bulk density record
  async verifyRecord(
    payload: VerifyBulkDensityPayload
  ): Promise<void> {
    await apiClient.post(
      `/v1/bulk-density/${payload.recordId}/verify`,
      payload
    );
  },

  // Reject a bulk density record
  async rejectRecord(
    payload: RejectBulkDensityPayload
  ): Promise<void> {
    await apiClient.post(
      `/v1/bulk-density/${payload.recordId}/reject`,
      payload
    );
  },

  async exportToCSV(params?: {
    userId?: string;
    siteId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> {
    const response = await apiClient.get("/v1/bulk-density/export/csv",
      {
        params,
        responseType: 'blob'
      });


    const blob = new Blob([response.data], {
      type: 'text/csv;charset=utf-8;',
    })
    return blob
  }
};
