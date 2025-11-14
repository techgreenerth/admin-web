import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { StatsCard } from "@/components/common/StatsCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Package, AlertCircle, TrendingUp, Activity, MapPin } from "lucide-react";

export default function AdminDashboard() {
  return (
    <AppLayout userRole="admin" userName="Admin User">
      <PageHeader
        title="Admin Dashboard"
        description="Overview of dMRV Biochar Platform"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
        ]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Carbon Credits"
          value="12,450"
          icon={Leaf}
          description="tCO2e generated"
          trend={{ value: "15% from last month", isPositive: true }}
        />
        <StatsCard
          title="Biochar Produced"
          value="8,325"
          icon={Package}
          description="tons"
          trend={{ value: "8% from last month", isPositive: true }}
        />
        <StatsCard
          title="Biomass Processed"
          value="25,750"
          icon={TrendingUp}
          description="tons"
        />
        <StatsCard
          title="Pending Verifications"
          value="23"
          icon={AlertCircle}
          description="batches awaiting review"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={Activity}
              title="No recent activity"
              description="Activity logs will appear here once users start interacting with the platform"
            />
          </CardContent>
        </Card>

        {/* Production Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Production Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={TrendingUp}
              title="No production data yet"
              description="Production trend charts will be displayed here once data is available"
            />
          </CardContent>
        </Card>
      </div>

      {/* Map View */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Site Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={MapPin}
            title="No sites registered"
            description="Interactive map showing all registered production sites will appear here"
          />
        </CardContent>
      </Card>
    </AppLayout>
  );
}
