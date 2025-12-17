import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { biocharSamplingService } from "@/lib/api/biocharSampling.service";
import {
  BiocharSamplingRecord,
  PaginationMeta,
} from "@/types/biocharSampling.types";

interface BiocharSamplingContextType {
  records: BiocharSamplingRecord[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  fetchRecords: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    siteId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
  }) => Promise<void>;
  getRecordById: (id: string) => Promise<BiocharSamplingRecord>;
  refreshRecords: () => Promise<void>;
}

const BiocharSamplingContext = createContext<
  BiocharSamplingContextType | undefined
>(undefined);

export function BiocharSamplingProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<BiocharSamplingRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchParams, setLastFetchParams] = useState<{
    page?: number;
    limit?: number;
    search?: string;
    siteId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  useEffect(() => {
    const initRecords = async () => {
      await fetchRecords();
    };

    initRecords();
  }, []);

  // Fetch all biochar sampling records with optional filters
  const fetchRecords = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    siteId?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    setIsLoading(true);
    try {
      // Store params for refresh functionality
      if (params) {
        setLastFetchParams(params);
      }
      
      const response = await biocharSamplingService.getAllRecords(
        params?.page,
        params?.limit,
        params
      );
      setRecords(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error fetching biochar sampling records:", error);
      // Set empty state on error
      setRecords([]);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch record by ID
  const getRecordById = async (id: string): Promise<BiocharSamplingRecord> => {
    setIsLoading(true);
    try {
      const record = await biocharSamplingService.getRecordById(id);
      return record;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh records using the last fetch parameters
  const refreshRecords = async () => {
    await fetchRecords(lastFetchParams);
  };

  return (
    <BiocharSamplingContext.Provider
      value={{
        records,
        meta,
        isLoading,
        fetchRecords,
        getRecordById,
        refreshRecords,
      }}
    >
      {children}
    </BiocharSamplingContext.Provider>
  );
}

export function useBiocharSampling() {
  const context = useContext(BiocharSamplingContext);
  if (context === undefined) {
    throw new Error(
      "useBiocharSampling must be used within a BiocharSamplingProvider"
    );
  }
  return context;
}
