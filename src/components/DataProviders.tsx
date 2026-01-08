import React from "react";
import { SitesProvider } from "@/contexts/siteContext";
import { KontikiProvider } from "@/contexts/kontikisContext";
import { BiomassSourcingProvider } from "@/contexts/biomassSourcingContext";
import { BiocharProductionProvider } from "@/contexts/biocharProductionContext";
import { BiocharActivationProvider } from "@/contexts/biocharActivationContext";
import { BiocharSamplingProvider } from "@/contexts/biocharSamplingContext";
import { BulkDensityProvider } from "@/contexts/bulkDensityContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { DashboardProvider } from "@/contexts/DashboardContext";

interface DataProvidersProps {
    children: React.ReactNode;
}

export const DataProviders = ({ children }: DataProvidersProps) => {
    return (
        <DashboardProvider>
            <ProfileProvider>
                <SitesProvider>
                    <KontikiProvider>
                        <BiomassSourcingProvider>
                            <BiocharProductionProvider>
                                <BiocharActivationProvider>
                                    <BiocharSamplingProvider>
                                        <BulkDensityProvider>{children}</BulkDensityProvider>
                                    </BiocharSamplingProvider>
                                </BiocharActivationProvider>
                            </BiocharProductionProvider>
                        </BiomassSourcingProvider>
                    </KontikiProvider>
                </SitesProvider>
            </ProfileProvider>
        </DashboardProvider>
    );
};
