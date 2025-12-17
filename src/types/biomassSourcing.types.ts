export type BiomassSourcingStatus = "SUBMITTED" | "VERIFIED" | "REJECTED";

export interface BiomassSourcingRecord {
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
  distanceKm: string;
  tripNumber: string;
  farmerName: string;
  farmerMobile: string;
  farmAreaAcres: string;
  tractorPhoto: string;
  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;
  status: BiomassSourcingStatus;
  submittedAt: string;
  verifiedAt?: string;
  verifiedById?: string;
  verifiedByName?: string;
  rejectionNote?: string;
  createdAt?: string;
  updatedAt?: string;
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

export type BiomassSourcingResponse = PaginatedResponse<BiomassSourcingRecord>;
