import { createContext, useContext, useEffect, useState } from "react";
import { DashboardOverview, RecordStatusDistribution ,RecentActivityItem,RecordTrendItem} from "@/types/dashboard.types";
import { DashboardService } from ".././lib/api/dashboard.service";

interface DashboardContextType {
  overview: DashboardOverview | null;
  recordStatus: RecordStatusDistribution | null;
  recentActivity: RecentActivityItem[];
  recordTrend: RecordTrendItem[];
  isLoading: boolean;
  error: string | null;
  refreshOverview: () => Promise<void>;
  fetchRecordTrend: (startDate?: string, endDate?: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [recordStatus, setRecordStatus] = useState<RecordStatusDistribution | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);
  const [recordTrend, setRecordTrend] = useState<RecordTrendItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const fetchOverview = async () => {
  try {
    setIsLoading(true);
    const data = await DashboardService.getOverview();
    console.log("Dashboard overview response:", data);
    setOverview(data);
  } catch (err: any) {
    console.error("Dashboard overview error:", err);
    setError(err?.message || "Failed to load dashboard overview");
  } finally {
    setIsLoading(false);
  }
};

const fetchRecordTrend = async (
  startDate?: string,
  endDate?: string
) => {
  try {
    const data = await DashboardService.getRecordTrend(startDate, endDate);
    setRecordTrend(data);
  } catch (err) {
    console.error("Record trend error:", err);
  }
};

const fetchRecordStatus = async () => {
  try {
    const data = await DashboardService.getRecordStatusDistribution();
    setRecordStatus(data);
  } catch (err) {
    console.error("Record status distribution error:", err);
  }
};
const fetchRecentActivity = async (limit = 5) => {
  try {
    const data = await DashboardService.getRecentActivity(limit);
    setRecentActivity(data);
  } catch (err) {
    console.error("Recent activity error:", err);
  }
};

  useEffect(() => {
    fetchOverview();
    fetchRecordStatus();
    fetchRecentActivity(5);
    fetchRecordTrend(); 
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        overview,
        recordStatus,
        recordTrend,
        isLoading,
        error,
        refreshOverview: fetchOverview,
        recentActivity,
        fetchRecordTrend,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within DashboardProvider"
    );
  }
  return context;
};



export const useDashboard = () => {
  return useDashboardContext();
};
