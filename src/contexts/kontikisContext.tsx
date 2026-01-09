import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { kontikiService } from "@/lib/api/kontikis.service";
import {
  Kontiki,
  CreateKontikiPayload,
  KontikisResponse,
  UpdateKontikiPayload,
} from "@/types/kontikis.types";

interface KontikiContextType {
  kontikis: Kontiki[];
  isLoading: boolean;

  fetchKontikis: () => Promise<void>;
  createKontiki: (payload: CreateKontikiPayload) => Promise<void>;
  updateKontiki: (id: string, payload: UpdateKontikiPayload) => Promise<void>;
  deleteKontiki: (id: string) => Promise<void>;
}

const KontikiContext = createContext<KontikiContextType | undefined>(undefined);

export function KontikiProvider({ children }: { children: ReactNode }) {
  const [kontikis, setKontikis] = useState<Kontiki[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initKontikis = async () => {
      await fetchKontikis();
    };

    initKontikis();
  }, []);

  // Fetch all kontikis
  const fetchKontikis = async () => {
    try {
      setIsLoading(true);
      const response = await kontikiService.getAll();
      setKontikis(response.data);

    } finally {
      setIsLoading(false);
    }
  };

  // Create kontiki
  const createKontiki = async (payload: CreateKontikiPayload) => {
    try {
      await kontikiService.create(payload);
      await fetchKontikis();
    } catch (error) {
      throw error;
    }
  };

  // Update kontiki
  const updateKontiki = async (
    id: string,
    payload: UpdateKontikiPayload
  ) => {
    try {
      await kontikiService.update(id, payload);
      await fetchKontikis();
    } catch (error) {
      throw error;
    }
  };

  // Delete kontiki
  const deleteKontiki = async (id: string) => {
    try {
      await kontikiService.delete(id);
      await fetchKontikis();
    } catch (error) {
      throw error;
    }
  };

  return (
    <KontikiContext.Provider
      value={{
        kontikis,
        isLoading,
        fetchKontikis,
        createKontiki,
        updateKontiki,
        deleteKontiki,
      }}
    >
      {children}
    </KontikiContext.Provider>
  );
}

export function useKontikis() {
  const context = useContext(KontikiContext);
  if (context === undefined) {
    throw new Error("useKontikis must be used within a KontikiProvider");
  }
  return context;
}
