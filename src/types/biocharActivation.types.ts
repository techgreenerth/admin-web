export interface KontikiActivationData {
  kontikiId: string;
  kontikiName: string;
  tractorPhoto?: string;
  mixingVideo?: string;
}

export interface BiocharActivationRecord {
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
  mixingAgent: string;
  shiftId: string;
  shiftName: string;
  shiftNumber: number;
  kontikis: KontikiActivationData[];
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

export type BiocharActivationResponse = PaginatedResponse<BiocharActivationRecord>;
