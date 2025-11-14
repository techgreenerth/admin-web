import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

export default function Sites() {
  const sites = []; // Mock data

  return (
    <AppLayout userRole="partner" userName="Partner User">
      <PageHeader
        title="Sites"
        description="Manage your production sites"
        breadcrumbs={[
          { label: "Dashboard", href: "/partner/dashboard" },
          { label: "Sites" },
        ]}
        actions={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Site
          </Button>
        }
      />

      {sites.length === 0 ? (
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <EmptyState
              icon={MapPin}
              title="No sites registered"
              description="Start by adding your first production site to begin tracking biochar production"
              actionLabel="Add Your First Site"
              onAction={() => console.log("Navigate to add site")}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Site cards will be rendered here */}
        </div>
      )}
    </AppLayout>
  );
}
