export type BulkDensityStatus = "DRAFT" | "SUBMITTED" | "VERIFIED" | "REJECTED";

export interface BulkDensityRecord {
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
  measuringBoxVolume: string;
  emptyBoxPhoto: string;
  filledBoxPhoto: string;
  recordedWeightKg: string;
  measurementVideo: string;
  bulkDensityCalculated: string;
  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;
  status: BulkDensityStatus;
  submittedAt: string;
  verifiedAt?: string;
  verifiedById?: string;
  verifiedByName?: string;
  rejectionNote?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface VerifyBulkDensityPayload {
  recordId: string;
}

export interface RejectBulkDensityPayload {
  recordId: string;
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

export type BulkDensityResponse = PaginatedResponse<BulkDensityRecord>;
