import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { biomassSourcingService } from "@/lib/api/biomassSourcing.service";
import {
  BiomassSourcingRecord,
  PaginationMeta,
} from "@/types/biomassSourcing.types";

interface BiomassSourcingContextType {
  records: BiomassSourcingRecord[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  fetchRecords: () => Promise<void>;
  getRecordById: (id: string) => Promise<BiomassSourcingRecord>;
}

const BiomassSourcingContext = createContext<
  BiomassSourcingContextType | undefined
>(undefined);

export function BiomassSourcingProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<BiomassSourcingRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initRecords = async () => {
      await fetchRecords();
    };

    initRecords();
  }, []);

  // Fetch all biomass sourcing records
  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      const response = await biomassSourcingService.getAllRecords();
      setRecords(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Error fetching biomass sourcing records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch record by ID
  const getRecordById = async (id: string): Promise<BiomassSourcingRecord> => {
    setIsLoading(true);
    try {
      const record = await biomassSourcingService.getRecordById(id);
      return record;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BiomassSourcingContext.Provider
      value={{
        records,
        meta,
        isLoading,
        fetchRecords,
        getRecordById,
      }}
    >
      {children}
    </BiomassSourcingContext.Provider>
  );
}

export function useBiomassSourcing() {
  const context = useContext(BiomassSourcingContext);
  if (context === undefined) {
    throw new Error(
      "useBiomassSourcing must be used within a BiomassSourcingProvider"
    );
  }
  return context;
}
