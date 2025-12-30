import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { biocharSamplingService } from "@/lib/api/biocharSampling.service";
import {
  BiocharSamplingRecord,
  BiocharSamplingResponse,
} from "@/types/biocharSampling.types";

interface BiocharSamplingContextType {
  records: BiocharSamplingRecord[];
  isLoading: boolean;
  refetch: () => void;
}

const BiocharSamplingContext = createContext<
  BiocharSamplingContextType | undefined
>(undefined);

export function BiocharSamplingProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery<BiocharSamplingResponse>({
    queryKey: ["biocharSampling", "records"],
    queryFn: () => biocharSamplingService.getAllRecords(1, 1000),
    refetchInterval: 30000, // Auto-refetch every 30 seconds for fresh data
    refetchOnMount: "always", // Always refetch when component mounts
  });

  const records = data?.data ?? [];

  return (
    <BiocharSamplingContext.Provider
      value={{
        records,
        isLoading,
        refetch,
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

export function useBiocharSamplingById(id: string) {
  return useQuery<BiocharSamplingRecord>({
    queryKey: ["biocharSampling", "record", id],
    queryFn: () => biocharSamplingService.getRecordById(id),
    enabled: !!id,
  });
}
