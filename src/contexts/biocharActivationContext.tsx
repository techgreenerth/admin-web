import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { biocharActivationService } from "@/lib/api/biocharActivation.service";
import {
  BiocharActivationRecord,
  PaginationMeta,
} from "@/types/biocharActivation.types";

interface BiocharActivationContextType {
  records: BiocharActivationRecord[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  fetchRecords: () => Promise<void>;
  getRecordById: (id: string) => Promise<BiocharActivationRecord>;
}

const BiocharActivationContext = createContext<
  BiocharActivationContextType | undefined
>(undefined);

export function BiocharActivationProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<BiocharActivationRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initRecords = async () => {
      await fetchRecords();
    };

    initRecords();
  }, []);

  // Fetch all biochar activation records
  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await biocharActivationService.getAllRecords();
      setRecords(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error fetching biochar activation records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch record by ID
  const getRecordById = async (id: string): Promise<BiocharActivationRecord> => {
    setIsLoading(true);
    try {
      const record = await biocharActivationService.getRecordById(id);
      return record;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BiocharActivationContext.Provider
      value={{
        records,
        meta,
        isLoading,
        fetchRecords,
        getRecordById,
      }}
    >
      {children}
    </BiocharActivationContext.Provider>
  );
}

export function useBiocharActivation() {
  const context = useContext(BiocharActivationContext);
  if (context === undefined) {
    throw new Error(
      "useBiocharActivation must be used within a BiocharActivationProvider"
    );
  }
  return context;
}
