export type BiomassSourcingStatus = "SUBMITTED" | "VERIFIED" | "REJECTED";

export interface SourcingUser {
  id: string;
  userCode: string;
  firstName: string;
  lastName: string;
}

export interface SourcingSite {
  id: string;
  siteCode: string;
  siteName: string;
  latitude: string;
  longitude: string;
}

export interface BiomassSourcingRecord {
  id: string;

  userId: string;
  siteId: string;

  recordDate: string;
  recordTime: string;

  latitude: string;
  longitude: string;
  gpsAccuracy?: string;

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
  createdAt: string;
  updatedAt: string;

  user: SourcingUser;
  site: SourcingSite;
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
