export interface KontikiActivationData {
  id: string;
  activationId: string;
  kontikiId: string;

  tractorPhoto?: string;
  mixingVideo?: string;

  createdAt?: string;
  updatedAt?: string;

  kontiki?: {
    id: string;
    kontikiCode: string;
    kontikiName: string;
  };
}

export interface BiocharActivationRecord {
  id: string;
  userId: string;
  siteId: string;

  recordDate: string;
  recordTime: string;

  latitude: string;
  longitude: string;
  gpsAccuracy?: string;

  mixingAgent: string;

  shiftId: string;

  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;

  status: "SUBMITTED" | "VERIFIED" | "REJECTED" | "IN_PROGRESS";

  submittedAt: string;
  createdAt?: string;
  updatedAt?: string;

  user?: {
    id: string;
    userCode: string;
    firstName: string;
    lastName: string;
    email?: string;
  };

  site?: {
    id: string;
    siteCode: string;
    siteName: string;
  };

  shift?: {
    id: string;
    shiftName: string;
    startTime?: string;
    endTime?: string;
    shiftNumber?: string;
  };

  kontikiRecords: KontikiActivationData[];
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
