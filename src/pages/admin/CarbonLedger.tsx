import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { StatsCard } from "@/components/common/StatsCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Search, Download, FileText } from "lucide-react";

export default function CarbonLedger() {
  return (
    <AppLayout userRole="admin" userName="Admin User">
      <PageHeader
        title="Carbon Credit Ledger"
        description="Track and manage carbon credit issuance and retirement"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Carbon Ledger" },
        ]}
        actions={
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Ledger
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Credits"
          value="400.50"
          icon={Wallet}
          description="tCO2e"
        />
        <StatsCard
          title="Registered"
          value="150.20"
          icon={FileText}
          description="tCO2e"
        />
        <StatsCard
          title="Pending"
          value="200.30"
          icon={Wallet}
          description="tCO2e"
        />
        <StatsCard
          title="Retired"
          value="50.00"
          icon={Wallet}
          description="tCO2e"
        />
      </div>

      {/* Filters */}
      <Card className="shadow-card mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search stock ID..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" placeholder="Start date" />
            <Input type="date" placeholder="End date" />
          </div>
        </CardContent>
      </Card>

      {/* Credit List */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Credit Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Wallet}
            title="No credit records"
            description="Carbon credit records will appear here once batches are verified and credits are issued"
          />
        </CardContent>
      </Card>
    </AppLayout>
  );
}
