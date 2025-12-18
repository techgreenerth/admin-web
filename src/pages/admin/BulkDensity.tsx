import { useEffect, useState } from "react";
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
  Loader2,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSites } from "@/contexts/siteContext";
import { userService, User as UserType } from "@/lib/api/user.service";
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
import { useBulkDensity } from "@/contexts/bulkDensityContext";
import { BulkDensityRecord as BulkDensityRecordType } from "@/types/bulkDensity.types";

export default function BulkDensity() {
  const location = useLocation();
  const { records, meta, isLoading, fetchRecords } = useBulkDensity();
  const { sites: allSites, fetchSites } = useSites();

  const [users, setUsers] = useState<UserType[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(false);

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
  const [selectedRecord, setSelectedRecord] = useState<BulkDensityRecordType | null>(null);

  // Load dropdown data
  useEffect(() => {
    // NOTE: fetchSites isn't memoized in the context, so don't add it as a dependency
    // or this effect can refire on every provider re-render.
    fetchSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsUsersLoading(true);
        const resp = await userService.getAll({ page: 1, limit: 200, status: "ACTIVE" });
        setUsers(resp.data);
      } catch (error) {
        console.error("Failed to fetch users for filter dropdown:", error);
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Fetch records when filters change OR when user navigates back to this page.
  useEffect(() => {
    const params: any = {
      page: currentPage,
      limit: itemsPerPage,
    };

    if (searchQuery) params.search = searchQuery;
    if (siteFilter !== "all") params.siteId = siteFilter;
    if (userFilter !== "all") params.userId = userFilter;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    fetchRecords(params);
    // fetchRecords isn't memoized in the context; avoid it in deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, currentPage, searchQuery, siteFilter, userFilter, startDate, endDate]);

  // Calculate average bulk density from records
  const averageBulkDensity = records.length > 0
    ? (
        records.reduce((sum, record) => {
          const v = parseFloat(record.bulkDensityCalculated);
          return sum + (isNaN(v) ? 0 : v);
        }, 0) / records.length
      ).toFixed(2)
    : "0.00";

  // Pagination from meta
  const totalPages = meta?.totalPages || 1;
  const totalRecords = meta?.total || 0;
  const startIndex = ((meta?.page || 1) - 1) * (meta?.limit || itemsPerPage);
  const endIndex = Math.min(startIndex + (meta?.limit || itemsPerPage), totalRecords);

  // Handlers
  const handleViewRecord = (record: BulkDensityRecordType) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl   font-bold text-[#295F58]">Bulk Density Measurement</h1>
        <p className="text-sm  text-muted-foreground mt-1">
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
              <p className="text-xs text-muted-foreground mt-1">Based on {records.length} record{records.length !== 1 ? 's' : ''}</p>
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
                    {allSites.map((site) => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.siteCode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={userFilter}
                  onValueChange={setUserFilter}
                  disabled={isUsersLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.userCode}
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
  {/* DESKTOP & TABLET VIEW: Hidden on small screens (max-sm) */}
  <div className="hidden sm:block overflow-x-auto">
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
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading records...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : records.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
              No records found
            </TableCell>
          </TableRow>
        ) : (
          records.map((record) => (
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
                  <div className="text-sm font-medium">
                    {record.site?.siteCode ?? "—"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {record.user?.userCode ?? "—"}
                  </div>
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
  </div>

  {/* MOBILE VIEW: Hidden on larger screens (min-sm) */}
  <div className="sm:hidden">
    {isLoading ? (
      <div className="p-8 text-center flex flex-col items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Loading records...</span>
      </div>
    ) : records.length === 0 ? (
      <div className="p-8 text-center text-muted-foreground text-sm">No records found</div>
    ) : (
      <div className="divide-y divide-border">
        {records.map((record) => (
          <div key={record.id} className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E1EFEE] shrink-0">
                  <Scale className="h-5 w-5 text-[#295F58]" />
                </div>
                <div>
                  <div className="font-bold text-base">{record.recordDate}</div>
                  <div className="text-sm text-muted-foreground">{record.recordTime}</div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleViewRecord(record)}
                className="border-[#295F58]/20 text-[#295F58]"
              >
                <Eye className="h-4 w-4 mr-2" /> View
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Site/User</p>
                <p className="text-sm font-medium">{record.site?.siteCode ?? "—"}</p>
                <p className="text-xs text-muted-foreground">{record.user?.userCode ?? "—"}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Measurements</p>
                <div className="flex items-center gap-1.5 text-xs mt-1">
                  <Box className="h-3 w-3 text-muted-foreground" />
                  <span>{record.measuringBoxVolume}L</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Weight className="h-3 w-3 text-muted-foreground" />
                  <span>{record.recordedWeightKg}kg</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-[#E1EFEE] p-3 rounded-md">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Bulk Density
              </span>
              <span className="text-base font-bold text-[#295F58]">
                {record.bulkDensityCalculated} kg/m³
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {endIndex} of{" "}
            {totalRecords} records
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
                    {selectedRecord.site?.siteCode ?? "—"} - {selectedRecord.site?.siteName ?? "—"}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">User</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div className="font-medium">
                      {selectedRecord.user?.userCode ?? "—"} - {selectedRecord.user ? `${selectedRecord.user.firstName} ${selectedRecord.user.lastName}` : "—"}
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
                  {selectedRecord.emptyBoxPhoto ? (
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
                  ) : (
                    <div className="text-sm text-muted-foreground">No empty box photo</div>
                  )}
                  {/* Filled Box Photo */}
                  {selectedRecord.filledBoxPhoto ? (
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
                  ) : (
                    <div className="text-sm text-muted-foreground">No filled box photo</div>
                  )}
                  {/* Measurement Video */}
                  {selectedRecord.measurementVideo ? (
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
                  ) : (
                    <div className="text-sm text-muted-foreground">No weighing video</div>
                  )}
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
