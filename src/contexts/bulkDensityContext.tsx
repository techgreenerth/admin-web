import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { bulkDensityService } from "@/lib/api/bulkDensity.service";
import {
  BulkDensityRecord,
  PaginationMeta,
  VerifyBulkDensityPayload,
  RejectBulkDensityPayload,
} from "@/types/bulkDensity.types";

interface BulkDensityContextType {
  records: BulkDensityRecord[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  fetchRecords: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    siteId?: string;
    userId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => Promise<void>;
  getRecordById: (id: string) => Promise<BulkDensityRecord>;
  verifyRecord: (payload: VerifyBulkDensityPayload) => Promise<void>;
  rejectRecord: (payload: RejectBulkDensityPayload) => Promise<void>;
  refreshRecords: () => Promise<void>;
}

const BulkDensityContext = createContext<
  BulkDensityContextType | undefined
>(undefined);

export function BulkDensityProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<BulkDensityRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchParams, setLastFetchParams] = useState<{
    page?: number;
    limit?: number;
    search?: string;
    siteId?: string;
    userId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  useEffect(() => {
    const initRecords = async () => {
      await fetchRecords();
    };

    initRecords();
  }, []);

  // Fetch all bulk density records with optional filters
  const fetchRecords = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    siteId?: string;
    userId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    setIsLoading(true);
    try {
      // Store params for refresh functionality
      if (params) {
        setLastFetchParams(params);
      }
      
      const response = await bulkDensityService.getAllRecords(
        params?.page,
        params?.limit,
        params
      );
      setRecords(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error fetching bulk density records:", error);
      // Set empty state on error
      setRecords([]);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch record by ID
  const getRecordById = async (id: string): Promise<BulkDensityRecord> => {
    setIsLoading(true);
    try {
      const record = await bulkDensityService.getRecordById(id);
      return record;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify record
  const verifyRecord = async (payload: VerifyBulkDensityPayload) => {
    try {
      setIsLoading(true);
      await bulkDensityService.verifyRecord(payload);
      await refreshRecords(); // Refresh the list after verification
    } finally {
      setIsLoading(false);
    }
  };

  // Reject record
  const rejectRecord = async (payload: RejectBulkDensityPayload) => {
    try {
      setIsLoading(true);
      await bulkDensityService.rejectRecord(payload);
      await refreshRecords(); // Refresh the list after rejection
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh records using the last fetch parameters
  const refreshRecords = async () => {
    await fetchRecords(lastFetchParams);
  };

  return (
    <BulkDensityContext.Provider
      value={{
        records,
        meta,
        isLoading,
        fetchRecords,
        getRecordById,
        verifyRecord,
        rejectRecord,
        refreshRecords,
      }}
    >
      {children}
    </BulkDensityContext.Provider>
  );
}

export function useBulkDensity() {
  const context = useContext(BulkDensityContext);
  if (context === undefined) {
    throw new Error(
      "useBulkDensity must be used within a BulkDensityProvider"
    );
  }
  return context;
}
