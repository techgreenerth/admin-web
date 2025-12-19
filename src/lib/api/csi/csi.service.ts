import apiClient from "./../axios";

export interface CsiVerifiedRecord {
  id: string;
  siteId: string;
  siteCode: string;
  batchNumber: string;
  verifiedAt: string;
  quantity: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CsiVerifiedResponse {
  data: CsiVerifiedRecord[];
  meta: PaginationMeta;
}

export const CsiService = {
  getVerifiedRecords: async (params?: {
    page?: number;
    limit?: number;
    siteId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<CsiVerifiedResponse> => {
    const res = await apiClient.get("/v1/csi/verified-records", {
      params,
    });
    return res.data;
  },
};
