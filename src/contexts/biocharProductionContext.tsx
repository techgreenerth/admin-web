import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { biocharProductionService } from "@/lib/api/biocharProduction.service";
import {
  BiocharProductionRecord,
  PaginationMeta,
  VerifyKontikiPayload,
  RejectKontikiPayload,
} from "@/types/biocharProduction.types";

interface BiocharProductionContextType {
  records: BiocharProductionRecord[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  fetchRecords: () => Promise<void>;
  getRecordById: (id: string) => Promise<BiocharProductionRecord>;
  verifyKontiki: (kontikiRecordId: string) => Promise<void>;
  rejectKontiki: (recordId: string, payload: RejectKontikiPayload) => Promise<void>;
}

const BiocharProductionContext = createContext<
  BiocharProductionContextType | undefined
>(undefined);

export function BiocharProductionProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<BiocharProductionRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initRecords = async () => {
      await fetchRecords();
    };

    initRecords();
  }, []);

  // Fetch all biochar production records
  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await biocharProductionService.getAllRecords();
      setRecords(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error fetching biochar production records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch record by ID
  const getRecordById = async (id: string): Promise<BiocharProductionRecord> => {
    setIsLoading(true);
    try {
      const record = await biocharProductionService.getRecordById(id);
      return record;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify kontiki
const verifyKontiki = async (kontikiRecordId: string) => {
  await biocharProductionService.verifyKontiki(kontikiRecordId);
};
  // Reject kontiki
const rejectKontiki = async (
  kontikiRecordId: string,
  payload: RejectKontikiPayload
) => {
  try {
    setIsLoading(true);
    await biocharProductionService.rejectKontiki(kontikiRecordId, payload);
    await fetchRecords();
  } finally {
    setIsLoading(false);
  }
};

  return (
    <BiocharProductionContext.Provider
      value={{
        records,
        meta,
        isLoading,
        fetchRecords,
        getRecordById,
        verifyKontiki,
        rejectKontiki,
      }}
    >
      {children}
    </BiocharProductionContext.Provider>
  );
}

export function useBiocharProduction() {
  const context = useContext(BiocharProductionContext);
  if (context === undefined) {
    throw new Error(
      "useBiocharProduction must be used within a BiocharProductionProvider"
    );
  }
  return context;
}
