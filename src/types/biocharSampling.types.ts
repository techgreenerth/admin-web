export interface SamplingUser {
  id: string;
  userCode: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SamplingSite {
  id: string;
  siteCode: string;
  siteName: string;
}
export interface KontikiInfo {
  id: string;
  kontikiCode: string;
  kontikiName: string;
}
export interface KontikiSamplingRecord {
  id: string;
  samplingId: string;
  kontikiId: string;
  productionBatches: string;
  samplePhoto: string;
  createdAt: string;
  updatedAt: string;
  kontiki: KontikiInfo;
}

export interface BiocharSamplingRecord {
  id: string;

  userId: string;
  siteId: string;

  recordDate: string;
  recordTime: string;

  latitude: string;
  longitude: string;
  gpsAccuracy?: string;

  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;

  status: "SUBMITTED" | "VERIFIED" | "REJECTED";

  submittedAt: string;
  createdAt: string;
  updatedAt: string;

  user: SamplingUser;
  site: SamplingSite;

  kontikiRecords: KontikiSamplingRecord[];
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

export type BiocharSamplingResponse = PaginatedResponse<BiocharSamplingRecord>;
