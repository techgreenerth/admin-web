import apiClient from "./axios";
import { DashboardOverview , RecordStatusDistribution,RecentActivityItem,RecordTrendItem} from "@/types/dashboard.types";

export const DashboardService = {
  getOverview: async (): Promise<DashboardOverview> => {
    const res = await apiClient.get("/v1/dashboard/overview");
    return res.data;
  },
  getRecordStatusDistribution: async (): Promise<RecordStatusDistribution> => {
    const res = await apiClient.get("/v1/dashboard/record-status-distribution");
    return res.data;
  },

  getRecordTrend: async (
    startDate?: string,
    endDate?: string
  ): Promise<RecordTrendItem[]> => {
    const res = await apiClient.get("/v1/dashboard/records-trend", {
      params: { startDate, endDate },
    });
    return res.data;
  },

  getRecentActivity: async (limit = 5): Promise<RecentActivityItem[]> => {
    const res = await apiClient.get("/v1/dashboard/recent-activity", {
      params: { limit },
    });
    return res.data;


  },
};
