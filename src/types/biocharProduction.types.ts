export type KontikiStatus = "SUBMITTED" | "VERIFIED" | "REJECTED";
export type ProductionStatus = "SUBMITTED" | "VERIFIED" | "PARTIALLY_VERIFIED" | "REJECTED" | "IN_PROGRESS";

export interface KontikiData {
  id: string;
  productionId: string;
  kontikiId: string;

  productionStep: number;
  productionStepName: string;

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

  verifiedAt?: string | null;
  verifiedById?: string | null;
  rejectionNote?: string | null;

  kontiki?: {
    id: string;
    kontikiCode: string;
    kontikiName: string;
  };

  createdAt?: string;
  updatedAt?: string;
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
  kontikiRecords: KontikiData[];
  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;
  status: ProductionStatus;
  submittedAt: string;
  createdAt?: string;
  updatedAt?: string;

  user?: {
    userCode: string;
    firstName: string;
    lastName: string;
  };

  site?: {
    
    siteCode: string;
    siteName: string;
  };

  shift?: {
    id: string;
    shiftNumber:string;
    shiftName: string;

  };
}

export interface VerifyKontikiPayload {
  kontikiRecordId: string;
}

export interface RejectKontikiPayload {
  
 
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
