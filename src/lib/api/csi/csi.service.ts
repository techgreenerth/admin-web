import apiClient from "./../axios";

export interface Site {
  id: string;
  siteCode: string;
  siteName: string;
  latitude: string;
  longitude: string;
}

export interface User {
  id: string;
  userCode: string;
  firstName: string;
  lastName: string;
}

export interface Shift {
  id: string;
  shiftNumber: number;
  shiftName: string;
}

export interface Production {
  id: string;
  userId: string;
  siteId: string;
  recordDate: string;
  recordTime: string;
  latitude: string;
  longitude: string;
  gpsAccuracy: string;
  shiftId: string;
  capturedAt: Record<string, unknown>;
  deviceInfo: string;
  appVersion: string;
  status: string;
  submittedAt: Record<string, unknown>;
  createdAt: Record<string, unknown>;
  updatedAt: Record<string, unknown>;
  site: Site;
  user: User;
  shift: Shift;
}

export interface Kontiki {
  id: string;
  kontikiCode: string;
  kontikiName: string;
}

export interface VerifiedBy {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface CsiVerifiedRecord {
  id: string;
  productionId: string;
  kontikiId: string;
  productionStep: number;
  productionStepName: string;
  moisturePercent: string;
  moisturePhoto: string;
  startPhoto: string;
  middlePhoto: string;
  endPhoto: string;
  finalPhoto: string;
  aiVolumeEstimate: string;
  aiConfidenceScore: string;
  aiModelVersion: string;
  status: string;
  verifiedAt: Record<string, unknown>;
  verifiedById: string;
  rejectionNote: string | null;
  createdAt: Record<string, unknown>;
  updatedAt: Record<string, unknown>;
  production: Production;
  kontiki: Kontiki;
  verifiedBy: VerifiedBy;
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

  async exportToCSV(params?: {
    siteId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> {
    const response = await apiClient.get("/v1/csi/export/csv",
      { params, });


    const blob = new Blob([response.data], {
      type: 'text/csv;charset=utf-8;',
    })
    return blob
  }
};
