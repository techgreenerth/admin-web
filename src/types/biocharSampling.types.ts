export interface KontikiSamplingData {
  kontikiId: string;
  kontikiName: string;
  samplePhoto?: string;
}

export interface BiocharSamplingRecord {
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
  kontikis: KontikiSamplingData[];
  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;
  submittedAt: string;
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

export type BiocharSamplingResponse = PaginatedResponse<BiocharSamplingRecord>;
