import { useState } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Scale,
  MapPin,
  User,
  Calendar,
  Image as ImageIcon,
  Video,
  Box,
  Weight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface BulkDensityRecord {
  id: string;
  userId: string;
  userName: string;
  userCode: string;
  siteId: string;
  siteName: string;
  siteCode: string;
  recordDate: string;
  recordTime: string;
  latitude: string;
  longitude: string;
  gpsAccuracy?: string;
  measuringBoxVolume: string;
  emptyBoxPhoto: string;
  filledBoxPhoto: string;
  recordedWeightKg: string;
  measurementVideo: string;
  bulkDensityCalculated: string;
  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;
  status: string;
  submittedAt: string;
  verifiedAt?: string;
  verifiedById?: string;
  verifiedByName?: string;
  rejectionNote?: string;
}

export default function BulkDensity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [siteFilter, setSiteFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BulkDensityRecord | null>(null);

  // Mock data for filters
  const sites = [
    { id: "1", code: "SITE-001" },
    { id: "2", code: "SITE-002" },
  ];

  const users = [
    { id: "1", code: "USER-001" },
    { id: "2", code: "USER-002" },
  ];

  // Mock data - TODO: Replace with actual API call
  const records: BulkDensityRecord[] = [
    {
      id: "1",
      userId: "1",
      userName: "Rajesh Kumar",
      userCode: "USER-001",
      siteId: "1",
      siteName: "Kothapally Site",
      siteCode: "SITE-001",
      recordDate: "2024-01-15",
      recordTime: "18:00",
      latitude: "28.61394",
      longitude: "77.20902",
      gpsAccuracy: "5m",
      measuringBoxVolume: "10",
      emptyBoxPhoto: "https://via.placeholder.com/400x300?text=Empty+Box",
      filledBoxPhoto: "https://via.placeholder.com/400x300?text=Filled+Box",
      recordedWeightKg: "3.148",
      measurementVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
      bulkDensityCalculated: "314.8",
      capturedAt: "2024-01-15T18:00:00Z",
      deviceInfo: "Samsung Galaxy A52",
      appVersion: "1.2.0",
      status: "VERIFIED",
      submittedAt: "2024-01-15T18:05:00Z",
      verifiedAt: "2024-01-15T19:45:00Z",
      verifiedById: "admin1",
      verifiedByName: "Admin User",
    },
    {
      id: "2",
      userId: "2",
      userName: "Priya Sharma",
      userCode: "USER-002",
      siteId: "2",
      siteName: "Dharampur Site",
      siteCode: "SITE-002",
      recordDate: "2024-01-16",
      recordTime: "13:30",
      latitude: "28.62394",
      longitude: "77.21902",
      gpsAccuracy: "4m",
      measuringBoxVolume: "10",
      emptyBoxPhoto: "https://via.placeholder.com/400x300?text=Empty+Box",
      filledBoxPhoto: "https://via.placeholder.com/400x300?text=Filled+Box",
      recordedWeightKg: "2.950",
      measurementVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
      bulkDensityCalculated: "295.0",
      capturedAt: "2024-01-16T13:30:00Z",
      deviceInfo: "Xiaomi Redmi Note 10",
      appVersion: "1.2.0",
      status: "SUBMITTED",
      submittedAt: "2024-01-16T13:35:00Z",
    },
    {
      id: "3",
      userId: "1",
      userName: "Rajesh Kumar",
      userCode: "USER-001",
      siteId: "1",
      siteName: "Kothapally Site",
      siteCode: "SITE-001",
      recordDate: "2024-01-14",
      recordTime: "16:00",
      latitude: "28.61494",
      longitude: "77.21002",
      gpsAccuracy: "6m",
      measuringBoxVolume: "10",
      emptyBoxPhoto: "https://via.placeholder.com/400x300?text=Empty+Box",
      filledBoxPhoto: "https://via.placeholder.com/400x300?text=Filled+Box",
      recordedWeightKg: "3.320",
      measurementVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
      bulkDensityCalculated: "332.0",
      capturedAt: "2024-01-14T16:00:00Z",
      deviceInfo: "Samsung Galaxy A52",
      appVersion: "1.2.0",
      status: "REJECTED",
      submittedAt: "2024-01-14T16:05:00Z",
      rejectionNote: "Measurement video is unclear. Please record the weighing process again with steady camera.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-100 text-gray-800";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800";
      case "VERIFIED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.userCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.siteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.bulkDensityCalculated.includes(searchQuery);
    const matchesSite = siteFilter === "all" || record.siteId === siteFilter;
    const matchesUser = userFilter === "all" || record.userId === userFilter;

    // Date range filter
    let matchesDateRange = true;
    if (startDate && endDate) {
      const recordDate = new Date(record.recordDate);
      matchesDateRange = recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
    }

    return matchesSearch && matchesSite && matchesUser && matchesDateRange;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  // Calculate average bulk density from filtered records
  const averageBulkDensity = filteredRecords.length > 0
    ? (filteredRecords.reduce((sum, record) => sum + parseFloat(record.bulkDensityCalculated), 0) / filteredRecords.length).toFixed(2)
    : "0.00";

  // Handlers
  const handleViewRecord = (record: BulkDensityRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#295F58]">Bulk Density Measurement</h1>
        <p className="text-muted-foreground mt-1">
          Track and verify biochar bulk density measurements
        </p>
      </div>

      {/* Average Bulk Density Pill */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Bulk Density</p>
              <h3 className="text-3xl font-bold text-[#295F58] mt-2">{averageBulkDensity} kg/m³</h3>
              <p className="text-xs text-muted-foreground mt-1">Based on {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
              <Scale className="h-6 w-6 text-[#295F58]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">All Records</CardTitle>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search user, site, density..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={siteFilter} onValueChange={setSiteFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Site" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sites</SelectItem>
                    {sites.map((site) => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="startDate" className="text-xs text-muted-foreground mb-1 block">From</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="hover:border-[#295F58]/50 hover:bg-gray-50 transition-colors cursor-pointer"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-xs text-muted-foreground mb-1 block">To</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="hover:border-[#295F58]/50 hover:bg-gray-50 transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record Info</TableHead>
                <TableHead>Site & User</TableHead>
                <TableHead>Measurements</TableHead>
                <TableHead>Bulk Density</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E1EFEE]">
                            <Scale className="h-4 w-4 text-[#295F58]" />
                          </div>
                          <div>
                            <div className="font-medium">{record.recordDate}</div>
                            <div className="text-sm text-muted-foreground">{record.recordTime}</div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{record.siteCode}</div>
                        <div className="text-sm text-muted-foreground">{record.userCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Box className="h-3 w-3 text-muted-foreground" />
                          <span>{record.measuringBoxVolume}L</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Weight className="h-3 w-3 text-muted-foreground" />
                          <span>{record.recordedWeightKg}kg</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-[#295F58]">
                        {record.bulkDensityCalculated} kg/m³
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewRecord(record)}
                        className="hover:bg-[#295F58]/10"
                      >
                        <Eye className="h-4 w-4 text-[#295F58]" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredRecords.length)} of{" "}
            {filteredRecords.length} records
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={
                  currentPage === page
                    ? "bg-[#295F58] hover:bg-[#1e4540]"
                    : ""
                }
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bulk Density Measurement Details</DialogTitle>
            <DialogDescription>
              Complete information about this measurement record
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6 py-4">
              {/* Status Banner */}
              {/* Record Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Date & Time</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div className="font-medium">
                      {selectedRecord.recordDate} at {selectedRecord.recordTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Site & User Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Site</Label>
                  <div className="font-medium">
                    {selectedRecord.siteCode} - {selectedRecord.siteName}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">User</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div className="font-medium">
                      {selectedRecord.userCode} - {selectedRecord.userName}
                    </div>
                  </div>
                </div>
              </div>

              {/* GPS Location */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">GPS Location</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="font-mono text-sm">
                    {selectedRecord.latitude}, {selectedRecord.longitude}
                    {selectedRecord.gpsAccuracy && (
                      <span className="text-muted-foreground ml-2">
                        (±{selectedRecord.gpsAccuracy})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Measurements */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Label className="text-muted-foreground mb-3 block">Measurements</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Box Volume</Label>
                    <div className="flex items-center gap-2">
                      <Box className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{selectedRecord.measuringBoxVolume} liters</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Recorded Weight</Label>
                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{selectedRecord.recordedWeightKg} kg</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Bulk Density</Label>
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-[#295F58]" />
                      <span className="font-medium text-[#295F58]">
                        {selectedRecord.bulkDensityCalculated} kg/m³
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="text-xs text-muted-foreground">
                    Formula: ({selectedRecord.recordedWeightKg} / {selectedRecord.measuringBoxVolume}) × 1000 = {selectedRecord.bulkDensityCalculated} kg/m³
                  </div>
                </div>
              </div>

              {/* Photos & Video */}
              <div className="space-y-3">
                <Label className="text-muted-foreground">Media</Label>
                <div className="grid grid-cols-3 gap-4">
                  {/* Empty Box Photo */}
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Empty Box
                    </Label>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={selectedRecord.emptyBoxPhoto}
                        alt="Empty measuring box"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  {/* Filled Box Photo */}
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Filled Box
                    </Label>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={selectedRecord.filledBoxPhoto}
                        alt="Box filled with biochar"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  {/* Measurement Video */}
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Weighing Video
                    </Label>
                    <div className="border rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-auto"
                        src={selectedRecord.measurementVideo}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Captured At</Label>
                  <div className="text-sm">{new Date(selectedRecord.capturedAt).toLocaleString()}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Device</Label>
                  <div className="text-sm">{selectedRecord.deviceInfo || "N/A"}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">App Version</Label>
                  <div className="text-sm">{selectedRecord.appVersion || "N/A"}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
