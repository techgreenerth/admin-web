import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { biocharActivationService } from "@/lib/api/biocharActivation.service";
import {
  BiocharActivationRecord,
  BiocharActivationResponse,
} from "@/types/biocharActivation.types";

interface BiocharActivationContextType {
  records: BiocharActivationRecord[];
  isLoading: boolean;
  refetch: () => void;
}

const BiocharActivationContext = createContext<
  BiocharActivationContextType | undefined
>(undefined);

export function BiocharActivationProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery<BiocharActivationResponse>({
    queryKey: ["biocharActivation", "records"],
    queryFn: () => biocharActivationService.getAllRecords(1, 1000),
    staleTime: 30000,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
  });

  const records = data?.data ?? [];

  return (
    <BiocharActivationContext.Provider
      value={{
        records,
        isLoading,
        refetch,
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

export function useBiocharActivationById(id: string) {
  return useQuery<BiocharActivationRecord>({
    queryKey: ["biocharActivation", "record", id],
    queryFn: () => biocharActivationService.getRecordById(id),
    enabled: !!id,
  });
}
