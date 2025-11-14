import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { StatsCard } from "@/components/common/StatsCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Package, Plus, FileText } from "lucide-react";

export default function PartnerDashboard() {
  return (
    <AppLayout userRole="partner" userName="Partner User">
      <PageHeader
        title="Partner Dashboard"
        description="Manage your sites and production"
        breadcrumbs={[
          { label: "Dashboard", href: "/partner/dashboard" },
        ]}
        actions={
          <>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              View Reports
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Site
            </Button>
          </>
        }
      />

      {/* Multi-site Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Active Sites"
          value="8"
          icon={MapPin}
          description="across all locations"
        />
        <StatsCard
          title="Total Artisans"
          value="151"
          icon={Users}
          description="Artisan Pros registered"
        />
        <StatsCard
          title="This Month Production"
          value="600.23"
          icon={Package}
          description="tons of biochar"
          trend={{ value: "12% from last month", isPositive: true }}
        />
      </div>

      {/* Production Summary */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Production Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Package}
            title="No production data"
            description="Production summary and charts will be displayed here once batches are created"
          />
        </CardContent>
      </Card>

      {/* Recent Batches */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Batches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={FileText}
            title="No batches yet"
            description="Recent production batches will appear here once you start tracking production"
            actionLabel="Create First Batch"
            onAction={() => console.log("Navigate to create batch")}
          />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Plus className="h-6 w-6" />
          <span>Add Site</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Users className="h-6 w-6" />
          <span>Add Artisan</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <Package className="h-6 w-6" />
          <span>New Batch</span>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2">
          <FileText className="h-6 w-6" />
          <span>View Documents</span>
        </Button>
      </div>
    </AppLayout>
  );
}
