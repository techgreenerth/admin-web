export type KontikiStatus = "SUBMITTED" | "VERIFIED" | "REJECTED";
export type ProductionStatus = "SUBMITTED" | "VERIFIED" | "PARTIALLY_VERIFIED" | "REJECTED" | "IN_PROGRESS";

export interface KontikiData {
  kontikiId: string;
  kontikiName: string;
  moisturePercent?: string;
  moisturePhoto?: string;
  startPhoto?: string;
  middlePhoto?: string;
  endPhoto?: string;
  finalPhoto?: string;
  aiVolumeEstimate?: string;
  aiConfidenceScore?: string;
  aiModelVersion?: string;
  status: KontikiStatus;
  verifiedAt?: string;
  verifiedById?: string;
  verifiedByName?: string;
  rejectionNote?: string;
}

export interface BiocharProductionRecord {
  id: string;
  userId: string;
  userName: string;
  userCode: string;
  siteId: string;
  siteName: string;
  siteCode: string;
  recordDate: string;
  recordTime: string;
  latitude: string;
  longitude: string;
  gpsAccuracy?: string;
  shiftId: string;
  shiftName: string;
  shiftNumber: number;
  kontikis: KontikiData[];
  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;
  status: ProductionStatus;
  submittedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VerifyKontikiPayload {
  kontikiId: string;
}

export interface RejectKontikiPayload {
  kontikiId: string;
  rejectionNote: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export type BiocharProductionResponse = PaginatedResponse<BiocharProductionRecord>;
