export interface BiomassMetric {
  value: number;
  unit: string;
  fromTrips?: number;
}

export interface DashboardOverview {
  activeSites: number;
  totalBiomassSourced: BiomassMetric;
  totalBatches: number;
  totalBiocharProduced: {
    value: number;
    unit: string;
  };
}

export interface StatusMetric {
  count: number;
  percentage: number;
}

export interface RecordStatusDistribution {
  verified: StatusMetric;
  pending: StatusMetric;
  rejected: StatusMetric;
  draft: StatusMetric;
  total: number;
}

export type RecordStatus =
  | "SUBMITTED"
  | "VERIFIED"
  | "REJECTED"
  | "DRAFT";

export interface RecentActivityItem {
  module: string;
  user: string;
  site: string;
  status: RecordStatus;
  time: string; // ISO string
}

export interface RecordTrendItem {
  month: string;   // ISO date or YYYY-MM-DD
  count: number;
}
