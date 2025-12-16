import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { sitesService } from "@/lib/api/sites.service";
import { Site, PaginationMeta, CreateSitePayload,AssignUserPayload,UpdateSitePayload } from "@/types/site.types";

interface SitesContextType {
  sites: Site[];
  meta: PaginationMeta | null;
  isLoading: boolean;
  fetchSites: () => Promise<void>;
  createSite: (payload: CreateSitePayload) => Promise<void>;
  deleteSite: (id: string) => Promise<void>;
  updateSite: (id: string, payload: UpdateSitePayload) => Promise<void>;

  assignUserToSite: (
    siteId: string,
    payload: AssignUserPayload
  ) => Promise<void>;

  revokeUserFromSite: (
    siteId: string,
    payload: AssignUserPayload
  ) => Promise<void>;
}

const SitesContext = createContext<SitesContextType | undefined>(undefined);

export function SitesProvider({ children }: { children: ReactNode }) {
  const [sites, setSites] = useState<Site[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initSites = async () => {
      await fetchSites();
    };

    initSites();
  }, []);

  //   Fetch all Sites
  const fetchSites = async () => {
    setIsLoading(true);
    const response = await sitesService.getAllSites();
    setSites(response.data);
    setMeta(response.meta);
    setIsLoading(false);
  };
  //   Create New site
  const createSite = async (payload: CreateSitePayload) => {
    setIsLoading(true);
    await sitesService.createSite(payload);
    await fetchSites(); // refresh list after create
    setIsLoading(false);
  };

  //   Delete a Site
  const deleteSite = async (siteId: string) => {
    try {
      setIsLoading(true);
      await sitesService.deleteSite(siteId);
      await fetchSites(); // refresh list after delete
    } finally {
      setIsLoading(false);
    }
  };

//   assign a user
  const assignUserToSite = async (siteId: string,payload: AssignUserPayload) => {
  try {
    setIsLoading(true);
    await sitesService.assignUserToSite(siteId, payload);
    await fetchSites(); // refresh to reflect assignment
  } finally {
    setIsLoading(false);
  }
};

// Revoke a user
const revokeUserFromSite = async (
  siteId: string,
  payload: AssignUserPayload
) => {
  try {
    setIsLoading(true);
    await sitesService.revokeUserFromSite(siteId, payload);
    await fetchSites(); // refresh list
  } finally {
    setIsLoading(false);
  }
};

// Update a site 
const updateSite = async (
  id: string,
  payload: UpdateSitePayload
) => {
  await sitesService.updateSite(id, payload);

  // refresh list after update
  await fetchSites();
};

  return (
    <SitesContext.Provider
      value={{
        sites,
        meta,
        isLoading,
        fetchSites,
        createSite,
        deleteSite,
        assignUserToSite,
        revokeUserFromSite,
        updateSite
        
      }}
    >
      {children}
    </SitesContext.Provider>
  );
}

export function useSites() {
  const context = useContext(SitesContext);
  if (context === undefined) {
    throw new Error("useSites must be used within a SitesProvider");
  }
  return context;
}
