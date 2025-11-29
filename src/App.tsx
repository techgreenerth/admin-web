import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";

// Auth pages
import Login from "./pages/auth/Login";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import BatchVerification from "./pages/admin/BatchVerification";
import CarbonLedger from "./pages/admin/CarbonLedger";
import Users from "./pages/admin/Users";
import Admins from "./pages/admin/Admins";

// Partner pages
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import Sites from "./pages/partner/Sites";

// Other pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes - No layout */}
          <Route path="/login" element={<Login />} />

          {/* Admin routes - With layout */}
          <Route path="/*" element={
            <AppLayout userRole="admin" userName="Admin User">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="verification/pending-batches" element={<BatchVerification />} />
                <Route path="carbon-ledger" element={<CarbonLedger />} />
                <Route path="users" element={<Users />} />
                <Route path="admins" element={<Admins />} />
                <Route path="biomass-sourcing" element={<NotFound />} />
                <Route path="biochar-production" element={<NotFound />} />
                <Route path="biochar-activation" element={<NotFound />} />
                <Route path="biochar-sampling" element={<NotFound />} />
                <Route path="bulk-density" element={<NotFound />} />
                <Route path="sites" element={<NotFound />} />
                <Route path="kontikis" element={<NotFound />} />
                <Route path="shifts" element={<NotFound />} />
                <Route path="settings" element={<NotFound />} />
                <Route path="help" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
