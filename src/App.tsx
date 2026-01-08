import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import Unauthorized from "./pages/Unauthorized";

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
// import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/admin/Profile";
import { DataProviders } from "@/components/DataProviders";

import { ROLES } from "@/constrants/roles";
import { RoleGate } from "./pages/auth/RoleGate";
import CsiVerifiedRecords from "./pages/Csi/CsiVerifiedRecords";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      staleTime: 0, // Always consider data stale by default
      gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Auth routes - No layout */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/unauthorized"
              element={<Unauthorized />}
            />

            {/* Protected Routes Wrapper */}
            <Route
              element={
                <ProtectedRoute>
                  <DataProviders>
                    <Outlet />
                  </DataProviders>
                </ProtectedRoute>
              }
            >
              {/* CSI Manager Route - No Sidebar */}
              <Route
                path="/csi"
                element={
                  <RoleGate allow={[ROLES.CSI_MANAGER]}>
                    <AppLayout>
                      <CsiVerifiedRecords />
                    </AppLayout>
                  </RoleGate>
                }
              />
              {/* Admin routes - With layout and protection */}
              <Route
                path="/*"
                element={
                  <RoleGate allow={[ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.SUPERVISOR]}>
                    <AppLayout >
                      <Routes>
                        <Route
                          path="/"
                          element={<AdminDashboard />}
                        />
                        <Route
                          path="users"
                          element={<Users />}
                        />
                        {/* SUPER ADMIN ONLY */}
                        <Route
                          path="admins"
                          element={
                            <RoleGate allow={[ROLES.SUPER_ADMIN]}>
                              <Admins />
                            </RoleGate>
                          }
                        />

                        <Route
                          path="sites"
                          element={<Sites />}
                        />
                        <Route
                          path="sites/:id"
                          element={<SiteDetails />}
                        />
                        <Route
                          path="kontikis"
                          element={<Kontikis />}
                        />
                        <Route
                          path="shifts"
                          element={<Shifts />}
                        />
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
                        <Route
                          path="bulk-density"
                          element={<BulkDensity />}
                        />
                        <Route
                          path="help"
                          element={<HelpSupport />}
                        />
                        {/* <Route path="settings" element={<Settings />} /> */}
                        <Route
                          path="profile"
                          element={<Profile />}
                        />
                        <Route
                          path="*"
                          element={<NotFound />}
                        />
                      </Routes>
                    </AppLayout>
                  </RoleGate>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
