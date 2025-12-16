// export interface Site {
    
//   "siteCode": "string",
//   "siteName": "string",
//   "latitude": "string",
//   "longitude": "string",
//   "address": "string",
//   "district": "string",
//   "state": "string",
//   "country": "string",
//   "siteType": "string",
//   "capacity": "string",
//   "infrastructure": "string",
//   "sitePhotos": [
//     "string"
//   ],
//   "status": "ACTIVE"

// }

export interface Site {
  id: string;
  siteCode: string;
  siteName: string;
  status: string;
  latitude: string;
  longitude: string;
  address: string;
  district?: string;
  state?: string;
  country: string;
  siteType?: string;
  capacity?: string;
  infrastructure?: string;
  kontikisCount?: number;
  sitePhotos: string[];
  createdAt: string;

  _count?: {
    userAssignments: number;
    kontikis: number
  };
  
  assignedUsers?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userCode: string;
  }>;
}

export interface CreateSitePayload {
  siteCode: string;
  siteName: string;
  latitude: string;
  longitude: string;
  address: string;
  district?: string;
  state?: string;
  country: string;
  siteType?: string;
  capacity?: string;
  infrastructure?: string;
  sitePhotos: string[];
  status: string;
}
export type UpdateSitePayload = {
  siteName?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  district?: string;
  state?: string;
  country?: string;
  siteType?: string;
  capacity?: string;
  infrastructure?: string;
  sitePhotos?: string[];
  status?: string;
};

export interface AssignUserPayload {
  userId: string;
}

export interface RevokeUserPayload {
  userId: string;
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

export type SitesResponse = PaginatedResponse<Site>;