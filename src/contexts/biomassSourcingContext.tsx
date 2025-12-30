import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { biomassSourcingService } from "@/lib/api/biomassSourcing.service";
import {
  BiomassSourcingRecord,
  BiomassSourcingResponse,
} from "@/types/biomassSourcing.types";

interface BiomassSourcingContextType {
  records: BiomassSourcingRecord[];
  isLoading: boolean;
  refetch: () => void;
}

const BiomassSourcingContext = createContext<
  BiomassSourcingContextType | undefined
>(undefined);

export function BiomassSourcingProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery<BiomassSourcingResponse>({
    queryKey: ["biomassSourcing", "records"],
    queryFn: () => biomassSourcingService.getAllRecords(1, 1000),
    staleTime: 30000,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
  });

  const records = data?.data ?? [];

  return (
    <BiomassSourcingContext.Provider
      value={{
        records,
        isLoading,
        refetch,
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

export function useBiomassSourcingById(id: string) {
  return useQuery<BiomassSourcingRecord>({
    queryKey: ["biomassSourcing", "record", id],
    queryFn: () => biomassSourcingService.getRecordById(id),
    enabled: !!id,
  });
}
