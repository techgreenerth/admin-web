export type KontikiStatus = "ACTIVE" | "INACTIVE" | "MAINTENANCE";

export interface SiteSummary {
  id: string;
  siteCode: string;
  siteName: string;
}

export interface Kontiki {
  id: string;
  kontikiCode: string;
  kontikiName: string;
  status: KontikiStatus;

  siteId: string;
  site?: SiteSummary;

  capacity?: string;
  specifications?: string;

  createdAt: string;
  updatedAt?: string;
}

export interface CreateKontikiPayload {
  siteId: string;
  kontikiCode: string;
  kontikiName: string;
  capacity?: string;
  specifications?: string;
}
 
export interface UpdateKontikiPayload {
  kontikiCode?: string;
  kontikiName?: string;
  capacity?: string;
  specifications?: string;
  status?: KontikiStatus;
}


export interface KontikisResponse {
  data: Kontiki[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

