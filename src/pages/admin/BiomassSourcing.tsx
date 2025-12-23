import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Leaf,
  MapPin,
  User,
  Package,
  Download,
  Loader2,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useBiomassSourcing } from "@/contexts/biomassSourcingContext";
import { useSites } from "@/contexts/siteContext";
import { userService, User as UserType } from "@/lib/api/user.service";
import { biomassSourcingService } from "@/lib/api/biomassSourcing.service";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BiomassSourcingRecord } from "@/types/biomassSourcing.types";
import { formatDate, formatTime ,formatDateTime} from "../../lib/utils/date";
import { toast } from "react-hot-toast";
import { normalizeDateForSearch, toSearchString } from "@/lib/utils/utils";

export default function BiomassSourcing() {
  // Use context hooks
  const { records, isLoading } = useBiomassSourcing();
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
  const [selectedRecord, setSelectedRecord] =
    useState<BiomassSourcingRecord | null>(null);

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
        const resp = await userService.getAll({
          page: 1,
          limit: 200,
          status: "ACTIVE",
        });
        setUsers(resp.data);
      } catch (error) {
        console.error("Failed to fetch users for filter dropdown:", error);
      } finally {
        setIsUsersLoading(false);
      }
    };

    loadUsers();
  }, []);

  const normalizeLower = (value: unknown) => {
    if (typeof value === "string") return value.toLowerCase();
    if (value == null) return "";
    return String(value).toLowerCase();
  };

  // Filter records


  
  const filteredRecords = records.filter((record) => {
    const q = searchQuery.trim().toLowerCase();

    const searchableText = [
      // Trip / farmer
      `Trip ${record.tripNumber}`,

      record.farmerName,
      record.farmerMobile,
      record.farmAreaAcres,

      // Nested user
      record.user?.userCode,
      record.user?.firstName,
      record.user?.lastName,

      // Nested site
      record.site?.siteCode,
      record.site?.siteName,

      // Dates (ISO + normal)
      normalizeDateForSearch(record.recordDate),
      normalizeDateForSearch(record.createdAt),
    ]
      .map(toSearchString)
      .join(" ");

    const matchesSearch = q.length === 0 || searchableText.includes(q);

    const matchesSite = siteFilter === "all" || record.siteId === siteFilter;

    const matchesUser = userFilter === "all" || record.userId === userFilter;

    // Date range filter (inclusive)
    let matchesDateRange = true;
    if (startDate && endDate) {
      const recordDate = record.recordDate ? new Date(record.recordDate) : null;

      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      matchesDateRange =
        !!recordDate && recordDate >= start && recordDate <= end;
    }

    return matchesSearch && matchesSite && matchesUser && matchesDateRange;
  });


  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  // Handlers
  const handleViewRecord = (record: BiomassSourcingRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

 


const { mutate: downloadCSV, isPending } = useMutation<Blob, Error>({
  mutationFn: () =>
    biomassSourcingService.exportToCSV({
      userId: userFilter !== "all" ? userFilter : undefined,
      siteId: siteFilter !== "all" ? siteFilter : undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    }),

  onSuccess: (blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `biomass-sourcing-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("CSV exported successfully!");
  },

  onError: (error) => {
    toast.error(error.message || "Failed to export CSV");
  },
});



  // Calculate statistics
  const totalTrips = filteredRecords.length;
  const totalFarmAreaAcres = filteredRecords.reduce((sum, record) => {
    const acres = parseFloat(record.farmAreaAcres || "0");
    return sum + (isNaN(acres) ? 0 : acres);
  }, 0);
  const uniqueFarmers = new Set(
    filteredRecords.map((r) => r.farmerMobile || r.farmerName)
  ).size;

    if (isLoading || !records) {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-full border-4 border-[#295F58] border-t-transparent animate-spin" />
            <p className="text-muted-foreground text-sm">
              Loading  details...
            </p>
          </div>
        </div>
      );
    }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#295F58]">
          Biomass Sourcing
        </h1>
      </div>

      {/* Dashboard Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Biomass Sourced
                </p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">
                  {filteredRecords.length}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">trips</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <Leaf className="h-6 w-6 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Farm Area
                </p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">
                  {totalFarmAreaAcres.toFixed(1)} acres
                </h3>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <Package className="h-6 w-6 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Unique Farmers
                </p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">
                  {uniqueFarmers}
                </h3>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <User className="h-6 w-6 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">All Records</CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  downloadCSV();
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download size={14} className="mr-2" />
                    Export CSV
                  </>
                )}
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search farmer, trip, user..."
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
                  <Label
                    htmlFor="startDate"
                    className="text-xs text-muted-foreground mb-1 block"
                  >
                    From
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="hover:border-[#295F58]/50 hover:bg-gray-50 transition-colors cursor-pointer"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="endDate"
                    className="text-xs text-muted-foreground mb-1 block"
                  >
                    To
                  </Label>
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
          {/* DESKTOP VIEW: Visible on sm (640px) and up */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      Record Info
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Farmer Details
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Site & User
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Media</TableHead>
                    <TableHead className="text-right whitespace-nowrap">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12">
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Loading biomass sourcing records...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : paginatedRecords.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E1EFEE] shrink-0">
                              <Leaf className="h-4 w-4 text-[#295F58]" />
                            </div>
                            <div>
                              <div className="font-medium">
                                Trip {record.tripNumber}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(record.recordDate)}{" "}
                                {formatTime(record.recordTime)}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-medium">
                              {record.farmerName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {record.farmerMobile}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {record.farmAreaAcres} acres
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-medium">
                              {record.site?.siteName ?? "—"}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {record.site?.siteCode ?? "—"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {record.user
                                ? `${record.user.firstName} (${record.user.userCode})`
                                : "—"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {record.tractorPhoto ? (
                              <Package className="h-4 w-4" />
                            ) : null}
                            <span>
                              {record.tractorPhoto ? "Tractor photo" : "—"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
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
          </div>

          {/* MOBILE VIEW: Visible only on screens < 640px */}
          <div className="sm:hidden divide-y divide-border">
            {isLoading ? (
              <div className="p-12 text-center flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-[#295F58]" />
                <span className="text-sm text-muted-foreground">
                  Loading records...
                </span>
              </div>
            ) : paginatedRecords.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                No records found
              </div>
            ) : (
              paginatedRecords.map((record) => (
                <div key={record.id} className="p-4 space-y-4">
                  {/* Mobile Header: Trip & Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E1EFEE]">
                        <Leaf className="h-5 w-5 text-[#295F58]" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          Trip {record.tripNumber}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(record.recordDate)} |{" "}
                          {formatTime(record.recordTime)}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRecord(record)}
                      className="border-[#295F58]/20 text-[#295F58]"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                        Farmer Details
                      </p>
                      <p className="text-sm font-semibold truncate">
                        {record.farmerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {record.farmerMobile}
                      </p>
                      <p className="text-[11px] bg-[#295F58]/10 text-[#295F58] inline-block px-1.5 rounded mt-1">
                        {record.farmAreaAcres} Acres
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                        Site & User
                      </p>
                      <p className="text-sm font-medium truncate">
                        {record.site?.siteName ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {record.site?.siteCode ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground italic truncate">
                        {record.user
                          ? `${record.user.firstName} (${record.user.userCode})`
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {/* Media Footer */}
                  <div className="flex items-center gap-2 px-1">
                    <Package
                      className={`h-4 w-4 ${
                        record.tractorPhoto ? "text-[#295F58]" : "text-gray-300"
                      }`}
                    />
                    <span className="text-xs font-medium">
                      {record.tractorPhoto
                        ? "Tractor photo attached"
                        : "No photo available"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredRecords.length)} of{" "}
              {filteredRecords.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-[#295F58] hover:bg-[#295F58]/90"
                          : ""
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* View Record Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Biomass Sourcing Record Details</DialogTitle>
            <DialogDescription>
              Complete information about the biomass delivery
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6 py-4">
              {/* Tractor Photo */}
              {selectedRecord.tractorPhoto ? (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Tractor Photo</Label>
                  <div className=" rounded-lg overflow-hidden">
                    <img
                      src={selectedRecord.tractorPhoto}
                      alt="Tractor with biomass"
                      className=" md:w-1/3 rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No tractor photo
                </div>
              )}

              {/* Record Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Trip Number</Label>
                  <p className="font-medium">
                    Trip {selectedRecord.tripNumber}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">
                    Record Date & Time
                  </Label>
                  <p className="font-medium">
                    {formatDate(selectedRecord.recordDate)}{" "}
                    {formatTime(selectedRecord.recordTime)}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Submitted At</Label>
                  <p className="font-medium">
                    {formatDateTime(selectedRecord.submittedAt)}
                  </p>
                </div>
              </div>

              {/* Farmer Details */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Farmer Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Farmer Name</Label>
                    <p className="font-medium">{selectedRecord.farmerName}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Mobile Number
                    </Label>
                    <p className="font-medium">{selectedRecord.farmerMobile}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Farm Area</Label>
                    <p className="font-medium">
                      {selectedRecord.farmAreaAcres} acres
                    </p>
                  </div>
                </div>
              </div>

              {/* GPS Location */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  GPS Location
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Latitude</Label>
                    <p className="font-medium font-mono">
                      {selectedRecord.latitude}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Longitude</Label>
                    <p className="font-medium font-mono">
                      {selectedRecord.longitude}
                    </p>
                  </div>
                  {selectedRecord.gpsAccuracy && (
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">
                        GPS Accuracy
                      </Label>
                      <p className="font-medium">
                        ±{selectedRecord.gpsAccuracy} meters
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Site and User */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Site</Label>
                  <p className="font-medium">
                    {selectedRecord.site?.siteName ?? "—"}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedRecord.site?.siteCode ?? "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Recorded By</Label>
                  <p className="font-medium">
                    {selectedRecord.user
                      ? `${selectedRecord.user.firstName} ${selectedRecord.user.lastName}`
                      : "—"}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedRecord.user?.userCode ?? "—"}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-1">
                <Label className="text-muted-foreground">Status</Label>
                <p className="font-medium">{selectedRecord.status}</p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                {selectedRecord.deviceInfo && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Device Info</Label>
                    <p className="font-medium text-xs">
                      {selectedRecord.deviceInfo}
                    </p>
                  </div>
                )}
                {selectedRecord.appVersion && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">App Version</Label>
                    <p className="font-medium text-xs">
                      {selectedRecord.appVersion}
                    </p>
                  </div>
                )}
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Record ID</Label>
                  <p className="font-medium text-xs">{selectedRecord.id}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
