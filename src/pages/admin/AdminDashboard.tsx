import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Factory,
  ClipboardCheck,
  FileCheck,
  Calendar,
  Leaf,
  Package,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data based on schema
const mockStats = {
  totalUsers: 45,
  totalAdmins: 8,
  totalSites: 12,
  totalKontikis: 24,
  totalShifts: 60,
  pendingVerifications: 127,
  verifiedRecords: 1854,
  rejectedRecords: 43,
  totalBiomassSourced: 24580,
  totalBatches: 156,
  totalBiocharProduced: 18420,
};

const mockModuleData = [
  { module: "Biomass", fullName: "Biomass Sourcing", count: 485, color: "#8B5CF6" },
  { module: "Production", fullName: "Biochar Production", count: 392, color: "#3B82F6" },
  { module: "Activation", fullName: "Biochar Activation", count: 318, color: "#F59E0B" },
  { module: "Sampling", fullName: "Biochar Sampling", count: 267, color: "#EC4899" },
  { module: "Bulk Density", fullName: "Bulk Density", count: 262, color: "#10B981" },
];

const mockStatusData = [
  { name: "Verified", value: 1854, color: "#10B981" },
  { name: "Pending", value: 127, color: "#F59E0B" },
  { name: "Rejected", value: 43, color: "#EF4444" },
];

const mockSiteData = [
  { site: "AP-001", count: 384 },
  { site: "AP-002", count: 342 },
  { site: "AP-003", count: 298 },
  { site: "AP-004", count: 256 },
  { site: "AP-005", count: 234 },
];

const mockTrendData = [
  { month: "Jul", records: 145 },
  { month: "Aug", records: 198 },
  { month: "Sep", records: 234 },
  { month: "Oct", records: 312 },
  { month: "Nov", records: 428 },
  { month: "Dec", records: 507 },
];

const mockRecentActivity = [
  {
    id: "1",
    module: "Biomass Sourcing",
    user: "Rajesh Kumar",
    site: "AP-001",
    status: "SUBMITTED",
    timestamp: "2024-12-01 14:30",
  },
  {
    id: "2",
    module: "Biochar Production",
    user: "Priya Sharma",
    site: "AP-002",
    status: "VERIFIED",
    timestamp: "2024-12-01 13:15",
  },
  {
    id: "3",
    module: "Biochar Activation",
    user: "Amit Patel",
    site: "AP-003",
    status: "SUBMITTED",
    timestamp: "2024-12-01 12:45",
  },
  {
    id: "4",
    module: "Bulk Density",
    user: "Sneha Reddy",
    site: "AP-001",
    status: "VERIFIED",
    timestamp: "2024-12-01 11:20",
  },
  {
    id: "5",
    module: "Biochar Sampling",
    user: "Vikram Singh",
    site: "AP-004",
    status: "REJECTED",
    timestamp: "2024-12-01 10:15",
  },
];

export default function AdminDashboard() {
  const [trendFilters, setTrendFilters] = useState({
    startDate: "",
    endDate: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return "bg-green-100 text-green-800";
      case "SUBMITTED":
        return "bg-orange-100 text-orange-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Custom label for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold"
        fontSize={14}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#295F58]">Overview</h1>
      </div>

      {/* Overview Stats - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Sites */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Active Sites
                </p>
                <h3 className="text-4xl font-bold text-[#295F58]">
                  {mockStats.totalSites}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Production sites
                </p>
              </div>
              <div className="h-16 w-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <MapPin className="h-8 w-8 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Biomass Sourced */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Biomass Sourced
                </p>
                <h3 className="text-4xl font-bold text-[#295F58]">
                  {mockStats.totalBiomassSourced.toLocaleString()}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Kilograms
                </p>
              </div>
              <div className="h-16 w-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <Leaf className="h-8 w-8 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Batches */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Batches
                </p>
                <h3 className="text-4xl font-bold text-[#295F58]">
                  {mockStats.totalBatches}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Production batches
                </p>
              </div>
              <div className="h-16 w-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <Package className="h-8 w-8 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Biochar Produced */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Biochar Produced
                </p>
                <h3 className="text-4xl font-bold text-[#295F58]">
                  {mockStats.totalBiocharProduced.toLocaleString()}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Kilograms
                </p>
              </div>
              <div className="h-16 w-16 bg-gray-100 rounded-xl flex items-center justify-center">
                <Factory className="h-8 w-8 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution - Pie Chart */}
        <Card>
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileCheck className="h-5 w-5 text-[#295F58]" />
              Record Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={mockStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#fff"
                >
                  {mockStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value, entry: any) => (
                    <span className="text-sm text-gray-700">
                      {value} ({entry.payload.value})
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Records Trend Over Time - Line Chart */}
        <Card>
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#295F58]" />
                Records Trend
              </div>
            </CardTitle>
            <div className="flex gap-3 mt-3">
              <div className="flex-1">
                <Label htmlFor="trendStartDate" className="text-xs">
                  Start Date
                </Label>
                <Input
                  id="trendStartDate"
                  type="date"
                  value={trendFilters.startDate}
                  onChange={(e) =>
                    setTrendFilters({ ...trendFilters, startDate: e.target.value })
                  }
                  className="h-9 mt-1 border-[#295F58]/20 hover:border-[#295F58]/50 hover:bg-gray-50 transition-colors cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="trendEndDate" className="text-xs">
                  End Date
                </Label>
                <Input
                  id="trendEndDate"
                  type="date"
                  value={trendFilters.endDate}
                  onChange={(e) =>
                    setTrendFilters({ ...trendFilters, endDate: e.target.value })
                  }
                  className="h-9 mt-1 border-[#295F58]/20 hover:border-[#295F58]/50 hover:bg-gray-50 transition-colors cursor-pointer"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E5E7EB" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E5E7EB" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="records"
                  stroke="#295F58"
                  strokeWidth={3}
                  dot={{ fill: "#295F58", r: 6, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        {/* Recent Activity Table */}
        <Card>
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardCheck className="h-5 w-5 text-[#295F58]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Module
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      User
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Site
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentActivity.map((activity) => (
                    <tr key={activity.id} className="border-b hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium">
                        {activity.module}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {activity.user}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <Badge variant="outline" className="font-mono text-xs">
                          {activity.site}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {activity.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
