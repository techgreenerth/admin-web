import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";

// Auth pages
import Login from "./pages/auth/Login";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Admins from "./pages/admin/Admins";
import Sites from "./pages/admin/Sites";
import SiteDetails from "./pages/admin/SiteDetails";
import Kontikis from "./pages/admin/Kontikis";
import Shifts from "./pages/admin/Shifts";
import BiomassSourcing from "./pages/admin/BiomassSourcing";
import BiocharProduction from "./pages/admin/BiocharProduction";
import BiocharActivation from "./pages/admin/BiocharActivation";
import BiocharSampling from "./pages/admin/BiocharSampling";
import BulkDensity from "./pages/admin/BulkDensity";
import HelpSupport from "./pages/admin/HelpSupport";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/admin/Profile";
import { SitesProvider } from "./contexts/siteContext";
import { KontikiProvider } from "./contexts/kontikisContext";
import { BiomassSourcingProvider } from "./contexts/biomassSourcingContext";
import { BiocharProductionProvider } from "./contexts/biocharProductionContext";
import { BiocharActivationProvider } from "./contexts/biocharActivationContext";
import { BiocharSamplingProvider } from "./contexts/biocharSamplingContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SitesProvider>
            <KontikiProvider>
              <BiomassSourcingProvider>
                <BiocharProductionProvider>
                  <BiocharActivationProvider>
                    <BiocharSamplingProvider>
          <Routes>
            {/* Auth routes - No layout */}
            <Route path="/login" element={<Login />} />

            {/* Admin routes - With layout and protection */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppLayout userRole="admin">
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="users" element={<Users />} />
                      <Route path="admins" element={<Admins />} />
                      <Route path="sites" element={<Sites />} />
                      <Route path="sites/:id" element={<SiteDetails />} />
                      <Route path="kontikis" element={<Kontikis />} />
                      <Route path="shifts" element={<Shifts />} />
                      <Route
                        path="biomass-sourcing"
                        element={<BiomassSourcing />}
                      />
                      <Route
                        path="biochar-production"
                        element={<BiocharProduction />}
                      />
                      <Route
                        path="biochar-activation"
                        element={<BiocharActivation />}
                      />
                      <Route
                        path="biochar-sampling"
                        element={<BiocharSampling />}
                      />
                      <Route path="bulk-density" element={<BulkDensity />} />
                      <Route path="help" element={<HelpSupport />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
                    </BiocharSamplingProvider>
                  </BiocharActivationProvider>
                </BiocharProductionProvider>
              </BiomassSourcingProvider>
          </KontikiProvider>
          </SitesProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
