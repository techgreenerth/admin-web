import { useState ,useEffect} from "react";
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



import { useDashboard } from "../../contexts/DashboardContext";
import { formatTime } from "@/lib/utils/date";
import { parseDDMMYYYY, normalizeDateForSearch } from "@/lib/utils/utils";





export default function AdminDashboard() {

  const { overview, isLoading ,recordStatus,recentActivity ,recordTrend, fetchRecordTrend} = useDashboard();
  const [trendFilters, setTrendFilters] = useState({startDate: "",endDate: ""});

  const mockStatusData = recordStatus
  ? [
      {
        name: "Verified",
        value: recordStatus.verified.count,
        color: "#10B981",
      },
      {
        name: "submitted",
        value: recordStatus.submitted.count,
        color: "#F59E0B",
      },
      {
        name: "Rejected",
        value: recordStatus.rejected.count,
        color: "#EF4444",
      },
      {
        name: "Draft",
        value: recordStatus.draft.count,
        color: "#6B7280",
      },
    ].filter((item) => item.value > 0)
  : [];


// Process chart data with proper date formatting

// Backend returns format: "YYYY-MM" (e.g., "2025-12")
const chartData = (recordTrend ?? []).map((item) => {
  let displayMonth = item.month;

  // Check if it's YYYY-MM format (e.g., "2025-12")
  if (/^\d{4}-\d{2}$/.test(item.month)) {
    const [year, month] = item.month.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    displayMonth = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  // Check if it's DD/MM/YYYY format
  else {
    const parsedDate = parseDDMMYYYY(item.month);
    if (parsedDate) {
      displayMonth = parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else {
      // Try to parse as ISO date (YYYY-MM-DD or full ISO)
      const isoDate = new Date(item.month);
      if (!isNaN(isoDate.getTime())) {
        displayMonth = isoDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      }
    }
  }

  return {
    date: displayMonth,
    records: item.count,
  };
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

    useEffect(() => {
  if (trendFilters.startDate && trendFilters.endDate) {
    fetchRecordTrend(trendFilters.startDate, trendFilters.endDate);
  }
}, [trendFilters.startDate, trendFilters.endDate]);



    if (isLoading || !overview ) {
        return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-[#295F58] border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading details...</p>
        </div>
      </div>
    );
  }

  

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
                  {overview.activeSites}
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
                  {overview.totalBiomassSourced.value} kg
                </h3>
                <p className="text-xs text-muted-foreground">
                  from {overview.totalBiomassSourced.fromTrips} trips
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
                  {overview.totalBatches}
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
                  {overview.totalBiocharProduced.value}
                </h3>
                <p className="text-xs text-muted-foreground">Kilograms</p>
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
                    setTrendFilters({
                      ...trendFilters,
                      startDate: e.target.value,
                    })
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
                    setTrendFilters({
                      ...trendFilters,
                      endDate: e.target.value,
                    })
                  }
                  className="h-9 mt-1 border-[#295F58]/20 hover:border-[#295F58]/50 hover:bg-gray-50 transition-colors cursor-pointer"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
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
                  dot={{
                    fill: "#295F58",
                    r: 6,
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
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
                    <th className="text-left  py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(recentActivity ?? []).map((activity, index) => {
                    // Parse the date/time from ISO string or DD/MM/YYYY format
                    const dateObj = new Date(activity.time);
                    const isValidDate = !isNaN(dateObj.getTime());

                    const formattedDate = isValidDate
                      ? dateObj.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "—";

                    const formattedTime = isValidDate
                      ? dateObj.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : formatTime(activity.time);

                    return (
                      <tr
                        key={`${activity.site}-${index}`}
                        className="border-b hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-medium">
                          {activity.module}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {activity.user}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {activity.site}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <Badge className={getStatusColor(activity.status)}>
                            {activity.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground font-medium">
                          {formattedDate}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {formattedTime}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
