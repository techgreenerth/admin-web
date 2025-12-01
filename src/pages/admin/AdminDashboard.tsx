import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  UserCheck,
  MapPin,
  Factory,
  Clock,
  ClipboardCheck,
  ClipboardX,
  FileCheck,
  TrendingUp,
  Calendar,
  Filter,
  RefreshCw,
  ChevronRight,
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

const mockSites = ["All Sites", "AP-001", "AP-002", "AP-003", "AP-004", "AP-005"];
const mockUsers = ["All Users", "Rajesh Kumar", "Priya Sharma", "Amit Patel"];
const mockModules = [
  "All Modules",
  "Biomass Sourcing",
  "Biochar Production",
  "Biochar Activation",
  "Biochar Sampling",
  "Bulk Density",
];

export default function AdminDashboard() {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    site: "All Sites",
    user: "All Users",
    module: "All Modules",
    status: "All Status",
  });

  const [showFilters, setShowFilters] = useState(false);

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

  const handleResetFilters = () => {
    setFilters({
      startDate: "",
      endDate: "",
      site: "All Sites",
      user: "All Users",
      module: "All Modules",
      status: "All Status",
    });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#295F58]">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Complete overview of dMRV Biochar Platform
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Collapsible Filters Section */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                    className="border-[#295F58]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                    className="border-[#295F58]/20"
                  />
                </div>
              </div>

              {/* Other Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site" className="text-sm">
                    Site
                  </Label>
                  <Select
                    value={filters.site}
                    onValueChange={(value) =>
                      setFilters({ ...filters, site: value })
                    }
                  >
                    <SelectTrigger className="border-[#295F58]/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSites.map((site) => (
                        <SelectItem key={site} value={site}>
                          {site}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user" className="text-sm">
                    User
                  </Label>
                  <Select
                    value={filters.user}
                    onValueChange={(value) =>
                      setFilters({ ...filters, user: value })
                    }
                  >
                    <SelectTrigger className="border-[#295F58]/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockUsers.map((user) => (
                        <SelectItem key={user} value={user}>
                          {user}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="module" className="text-sm">
                    Module
                  </Label>
                  <Select
                    value={filters.module}
                    onValueChange={(value) =>
                      setFilters({ ...filters, module: value })
                    }
                  >
                    <SelectTrigger className="border-[#295F58]/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockModules.map((module) => (
                        <SelectItem key={module} value={module}>
                          {module}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm">
                    Status
                  </Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      setFilters({ ...filters, status: value })
                    }
                  >
                    <SelectTrigger className="border-[#295F58]/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Status">All Status</SelectItem>
                      <SelectItem value="VERIFIED">Verified</SelectItem>
                      <SelectItem value="SUBMITTED">Pending</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
                <Button className="bg-[#295F58] hover:bg-[#295F58]/90 gap-2">
                  <Filter className="h-4 w-4" />
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Stats - 8 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Users */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Users
                </p>
                <h3 className="text-4xl font-bold text-[#295F58]">
                  {mockStats.totalUsers}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Field workers
                </p>
              </div>
              <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admins */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Admins
                </p>
                <h3 className="text-4xl font-bold text-[#295F58]">
                  {mockStats.totalAdmins}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Platform admins
                </p>
              </div>
              <div className="h-16 w-16 bg-purple-100 rounded-xl flex items-center justify-center">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sites */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
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
              <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kontikis */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Kontikis
                </p>
                <h3 className="text-4xl font-bold text-[#295F58]">
                  {mockStats.totalKontikis}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Production kilns
                </p>
              </div>
              <div className="h-16 w-16 bg-orange-100 rounded-xl flex items-center justify-center">
                <Factory className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shifts */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-cyan-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Active Shifts
                </p>
                <h3 className="text-4xl font-bold text-[#295F58]">
                  {mockStats.totalShifts}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Production shifts
                </p>
              </div>
              <div className="h-16 w-16 bg-cyan-100 rounded-xl flex items-center justify-center">
                <Clock className="h-8 w-8 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Verifications */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500 bg-orange-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pending Reviews
                </p>
                <h3 className="text-4xl font-bold text-orange-600">
                  {mockStats.pendingVerifications}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Awaiting verification
                </p>
              </div>
              <div className="h-16 w-16 bg-orange-100 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verified Records */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500 bg-green-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Verified Records
                </p>
                <h3 className="text-4xl font-bold text-green-600">
                  {mockStats.verifiedRecords.toLocaleString()}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Total approved
                </p>
              </div>
              <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center">
                <FileCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rejected Records */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-red-500 bg-red-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Rejected Records
                </p>
                <h3 className="text-4xl font-bold text-red-600">
                  {mockStats.rejectedRecords}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Total rejected
                </p>
              </div>
              <div className="h-16 w-16 bg-red-100 rounded-xl flex items-center justify-center">
                <ClipboardX className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Records by Module - Bar Chart */}
        <Card>
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#295F58]" />
                Records by Module
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={mockModuleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="module"
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
                  formatter={(value: any, name: any, props: any) => [
                    value,
                    props.payload.fullName,
                  ]}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={60}>
                  {mockModuleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution - Pie Chart */}
        <Card>
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-[#295F58]" />
                Record Status Distribution
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
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
                Records Trend (Last 6 Months)
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
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

        {/* Records by Site - Bar Chart */}
        <Card>
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#295F58]" />
                Top 5 Sites by Records
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={mockSiteData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E5E7EB" }}
                />
                <YAxis
                  dataKey="site"
                  type="category"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickLine={false}
                  axisLine={{ stroke: "#E5E7EB" }}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="count" fill="#295F58" radius={[0, 8, 8, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Table - Takes 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-[#295F58]" />
                Recent Activity
              </div>
              <Button variant="ghost" size="sm" className="text-[#295F58] gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
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

        {/* Quick Insights - Takes 1 column */}
        <Card>
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-5 w-5 text-[#295F58]" />
              Quick Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-700 font-medium">Verification Rate</p>
                  <p className="text-2xl font-bold text-blue-900">93.6%</p>
                </div>
              </div>
              <p className="text-xs text-blue-700">
                Records verified successfully
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-green-700 font-medium">Most Active Site</p>
                  <p className="text-2xl font-bold text-green-900">AP-001</p>
                </div>
              </div>
              <p className="text-xs text-green-700">384 records this month</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-purple-700 font-medium">Top Performer</p>
                  <p className="text-2xl font-bold text-purple-900">Rajesh Kumar</p>
                </div>
              </div>
              <p className="text-xs text-purple-700">127 records submitted</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
