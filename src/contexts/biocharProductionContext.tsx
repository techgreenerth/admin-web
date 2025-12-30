import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { biocharProductionService } from "@/lib/api/biocharProduction.service";
import {
  BiocharProductionRecord,
  BiocharProductionResponse,
  RejectKontikiPayload,
} from "@/types/biocharProduction.types";

interface BiocharProductionContextType {
  records: BiocharProductionRecord[];
  isLoading: boolean;
  refetch: () => void;
}

const BiocharProductionContext = createContext<
  BiocharProductionContextType | undefined
>(undefined);

export function BiocharProductionProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, refetch } = useQuery<BiocharProductionResponse>({
    queryKey: ["biocharProduction", "records"],
    queryFn: () => biocharProductionService.getAllRecords(1, 1000),
    refetchInterval: 30000, // Auto-refetch every 30 seconds for fresh data
    refetchOnMount: "always", // Always refetch when component mounts
  });

  const records = data?.data ?? [];

  return (
    <BiocharProductionContext.Provider
      value={{
        records,
        isLoading,
        refetch,
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

// Custom hooks for mutations
export function useVerifyKontiki() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (kontikiRecordId: string) =>
      biocharProductionService.verifyKontiki(kontikiRecordId),
    onSuccess: async () => {
      // Invalidate and immediately refetch to ensure fresh data
      await queryClient.invalidateQueries({ queryKey: ["biocharProduction", "records"] });
      await queryClient.refetchQueries({ queryKey: ["biocharProduction", "records"] });
    },
  });
}

export function useRejectKontiki() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ kontikiRecordId, payload }: { kontikiRecordId: string; payload: RejectKontikiPayload }) =>
      biocharProductionService.rejectKontiki(kontikiRecordId, payload),
    onSuccess: async () => {
      // Invalidate and immediately refetch to ensure fresh data
      await queryClient.invalidateQueries({ queryKey: ["biocharProduction", "records"] });
      await queryClient.refetchQueries({ queryKey: ["biocharProduction", "records"] });
    },
  });
}

export function useBiocharProductionById(id: string) {
  return useQuery<BiocharProductionRecord>({
    queryKey: ["biocharProduction", "record", id],
    queryFn: () => biocharProductionService.getRecordById(id),
    enabled: !!id,
  });
}
