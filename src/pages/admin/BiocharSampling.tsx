import { useState, useEffect } from "react";
import { useSites } from "@/contexts/siteContext";
import { userService, User as UserType } from "@/lib/api/user.service";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Beaker,
  CheckCircle,
  Image as ImageIcon,
  Download,
  Loader2,
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useBiocharSampling } from "@/contexts/biocharSamplingContext";
import { BiocharSamplingRecord as BiocharSamplingRecordType } from "@/types/biocharSampling.types";

import { formatDate, formatTime } from "@/lib/utils/date";

export default function BiocharSampling() {
  const { records, meta, isLoading, fetchRecords } = useBiocharSampling();
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
  const [selectedRecord, setSelectedRecord] = useState<BiocharSamplingRecordType | null>(null);

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

  // Fetch records when filters change
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchQuery, siteFilter, userFilter, startDate, endDate]);

  const getKontikiRecords = (record: BiocharSamplingRecordType) =>
    record.kontikiRecords ?? [];

  const getKontikiName = (kontikiRecord: BiocharSamplingRecordType["kontikiRecords"][number]) =>
    kontikiRecord.kontiki?.kontikiName ?? "—";

  const getTotalSamplePhotosCount = (record: BiocharSamplingRecordType) =>
    getKontikiRecords(record).reduce((sum, k) => sum + (k.samplePhotos?.length ?? 0), 0);

  const hasAnySamplePhoto = (record: BiocharSamplingRecordType) =>
    getKontikiRecords(record).some((k) => (k.samplePhotos?.length ?? 0) > 0);

  // Pagination from meta
  const totalPages = meta?.totalPages || 1;
  const totalRecords = meta?.total || 0;
  const startIndex = ((meta?.page || 1) - 1) * (meta?.limit || itemsPerPage);
  const endIndex = Math.min(startIndex + (meta?.limit || itemsPerPage), totalRecords);

  // Handlers
  const handleViewRecord = (record: BiocharSamplingRecordType) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl  font-bold text-[#295F58]">Biochar Sampling</h1>
          <p className=" text-sm text-muted-foreground mt-1">
            Track and verify biochar sample collection records
          </p>
        </div>
      </div>

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
                    placeholder="Search user, site, kontiki..."
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
          <TableHead>Kon-tikis</TableHead>
          <TableHead>Samples</TableHead>
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
                      <Beaker className="h-4 w-4 text-[#295F58]" />
                    </div>
                    <div>
                      <div className="font-medium">{formatDate(record.recordDate)}</div>
                      <div className="text-sm text-muted-foreground">{formatTime(record.recordTime)}</div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{record.site?.siteCode ?? "—"}</div>
                  <div className="text-sm text-muted-foreground">{record.user?.userCode ?? "—"}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    {getKontikiRecords(record)
                      .map((k) => getKontikiName(k))
                      .join(", ")}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {hasAnySamplePhoto(record) && (
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {getTotalSamplePhotosCount(record)}
                    {" "}
                    {getTotalSamplePhotosCount(record) === 1 ? "photo" : "photos"}
                  </span>
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
      <div className="p-8  text-center flex flex-col items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Loading records...</span>
      </div>
    ) : records.length === 0 ? (
      <div className="p-8 text-center text-muted-foreground text-sm">No records found</div>
    ) : (
      <div className="divide-y divide-border">
        {records.map((record) => (
          <div key={record.id} className="p-4 mb-8 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E1EFEE] shrink-0">
                  <Beaker className="h-5 w-5 text-[#295F58]" />
                </div>
                <div>
                  <div className="font-bold text-base">{formatDate(record.recordDate)}</div>
                  <div className="text-sm text-muted-foreground">{formatTime(record.recordTime)}</div>
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
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Kon-tikis</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {getKontikiRecords(record)
                    .map((k) => getKontikiName(k))
                    .join(", ") || "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
              <div className="flex items-center gap-2">
                {hasAnySamplePhoto(record) && (
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-xs text-muted-foreground">
                  {getTotalSamplePhotosCount(record)}
                  {" "}
                  {getTotalSamplePhotosCount(record) === 1 ? "photo" : "photos"}
                </span>
              </div>
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Biochar Sampling Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6 py-4">
              {/* Record Submitted Status */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800">
                  <CheckCircle className="h-5 w-5" />
                  <div className="font-medium">Record Submitted</div>
                </div>
              </div>

              {/* General Record Information */}
              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Date</Label>
                  <div className="text-sm font-medium">{formatDate(selectedRecord.recordDate)}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Time</Label>
                  <div className="text-sm font-medium">{formatTime(selectedRecord.recordTime)}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Site</Label>
                  <div className="text-sm font-medium">{selectedRecord.site?.siteCode ?? "—"} - {selectedRecord.site?.siteName ?? "—"}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">User</Label>
                  <div className="text-sm font-medium">{selectedRecord.user?.userCode ?? "—"} - {selectedRecord.user ? `${selectedRecord.user.firstName} ${selectedRecord.user.lastName}` : "—"}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Location</Label>
                  <div className="text-sm font-mono">{selectedRecord.latitude}, {selectedRecord.longitude}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Kon-tiki used</Label>
                  <div className="text-sm font-medium">{getKontikiRecords(selectedRecord).map((k) => k.kontiki?.kontikiName ?? "—").join(", ")}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Device</Label>
                  <div className="text-sm font-medium">{selectedRecord.deviceInfo || "N/A"}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">App Version</Label>
                  <div className="text-sm font-medium">{selectedRecord.appVersion || "N/A"}</div>
                </div>
              </div>

              {/* Kon-tiki Sections */}
              {getKontikiRecords(selectedRecord).map((kontiki) => (
                <div key={kontiki.id ?? kontiki.kontikiId} className="border border-gray-200 rounded-lg p-6 space-y-6">
                  {/* Kon-tiki Header */}
                  <div className="pb-4 border-b">
                    <h3 className="text-lg font-semibold text-[#295F58]">
                      {kontiki.kontiki?.kontikiName ?? "—"}
                    </h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      {kontiki.productionBatches ? `Batches: ${kontiki.productionBatches}` : ""}
                    </div>
                  </div>

                  {/* Sample Photos */}
                  {(kontiki.samplePhotos ?? []).length > 0 ? (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-[#295F58]" />
                        Sample Photos ({kontiki.samplePhotos.length})
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {kontiki.samplePhotos.map((src, idx) => (
                          <div key={`${kontiki.id}-${idx}`} className="border rounded-lg overflow-hidden">
                            <img src={src} alt={`Sample ${idx + 1}`} className="w-full h-auto" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No sample photos</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
