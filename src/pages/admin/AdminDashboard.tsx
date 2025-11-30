import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Package, AlertCircle, TrendingUp, Activity, MapPin, ArrowUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#295F58]">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of Tech Greenerth platform metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Carbon Credits</p>
                <h3 className="text-2xl font-bold mt-2">12,450</h3>
                <p className="text-xs text-muted-foreground mt-1">tCO2e generated</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3" />
              <span>15% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Biochar Produced</p>
                <h3 className="text-2xl font-bold mt-2">8,325</h3>
                <p className="text-xs text-muted-foreground mt-1">tons</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3 text-xs text-green-600">
              <ArrowUp className="h-3 w-3" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Biomass Processed</p>
                <h3 className="text-2xl font-bold mt-2">25,750</h3>
                <p className="text-xs text-muted-foreground mt-1">tons</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Verifications</p>
                <h3 className="text-2xl font-bold mt-2">23</h3>
                <p className="text-xs text-muted-foreground mt-1">batches awaiting review</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-[#295F58]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Activity className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">No recent activity</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Activity logs will appear here once users start interacting with the platform
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Production Trends */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-[#295F58]" />
              Production Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg mb-2">No production data yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Production trend charts will be displayed here once data is available
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map View */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-[#295F58]" />
            Site Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-lg mb-2">No sites registered</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Interactive map showing all registered production sites will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
