export type BulkDensityStatus = "DRAFT" | "SUBMITTED" | "VERIFIED" | "REJECTED";


export interface BulkDensityUser {
  id: string;
  userCode: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface BulkDensitySite {
  id: string;
  siteCode: string;
  siteName: string;
}

export interface BulkDensityRecord {
  id: string;

  userId: string;
  siteId: string;

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
  createdAt: string;
  updatedAt: string;

  user: BulkDensityUser;
  site: BulkDensitySite;
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
