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

  // Export biomass sourcing records to CSV
  // async exportToCSV(params?: {
  //   userId?: string;
  //   siteId?: string;
  //   status?: string;
  //   startDate?: string;
  //   endDate?: string;
  // }): Promise<Blob> {
  //   const response = await apiClient.get("/v1/biomass-sourcing/export/csv", {
  //     params,
  //     responseType: "blob",
  //   });
  //   return response.data;
  // },
  


  // ff
  async exportToCSV(params?: {
    userId?: string;
    siteId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  } ): Promise<Blob>{
    const response = await apiClient.get("/v1/biomass-sourcing/export/csv", {
      params,
    });

    const csvText = response.data.data; // 👈 extract CSV string

    return new Blob([csvText], { type: "text/csv;charset=utf-8;" });
  }
};
