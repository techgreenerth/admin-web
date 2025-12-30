import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDensityService } from "@/lib/api/bulkDensity.service";
import {
  BulkDensityRecord,
  BulkDensityResponse,
  VerifyBulkDensityPayload,
  RejectBulkDensityPayload,
} from "@/types/bulkDensity.types";

interface BulkDensityContextType {
  records: BulkDensityRecord[];
  isLoading: boolean;
  refetch: () => void;
}

const BulkDensityContext = createContext<BulkDensityContextType | undefined>(
  undefined
);

export function BulkDensityProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Fetch all bulk density records with TanStack Query
  const { data, isLoading, refetch } = useQuery<BulkDensityResponse>({
    queryKey: ["bulkDensity", "records"],
    queryFn: () => bulkDensityService.getAllRecords(1, 1000),
    refetchInterval: 30000, // Auto-refetch every 30 seconds for fresh data
    refetchOnMount: "always", // Always refetch when component mounts
  });

  const records = data?.data ?? [];

  return (
    <BulkDensityContext.Provider
      value={{
        records,
        isLoading,
        refetch,
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

// Custom hooks for mutations
export function useVerifyBulkDensity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VerifyBulkDensityPayload) =>
      bulkDensityService.verifyRecord(payload),
    onSuccess: () => {
      // Invalidate and refetch records after verification
      queryClient.invalidateQueries({ queryKey: ["bulkDensity", "records"] });
    },
  });
}

export function useRejectBulkDensity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RejectBulkDensityPayload) =>
      bulkDensityService.rejectRecord(payload),
    onSuccess: () => {
      // Invalidate and refetch records after rejection
      queryClient.invalidateQueries({ queryKey: ["bulkDensity", "records"] });
    },
  });
}

export function useBulkDensityById(id: string) {
  return useQuery<BulkDensityRecord>({
    queryKey: ["bulkDensity", "record", id],
    queryFn: () => bulkDensityService.getRecordById(id),
    enabled: !!id, // Only run query if id is provided
  });
}
