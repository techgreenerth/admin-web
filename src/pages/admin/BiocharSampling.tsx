import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSites } from "@/contexts/siteContext";
import { userService, User as UserType } from "@/lib/api/user.service";
import { biocharSamplingService } from "@/lib/api/biocharSampling.service";
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
import { useMutation } from "@tanstack/react-query";
import { normalizeDateForSearch, parseDDMMYYYY, toSearchString } from "@/lib/utils/utils";

export default function BiocharSampling() {
  const { records, isLoading, refetch } = useBiocharSampling();
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
    useState<BiocharSamplingRecordType | null>(null);

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

  useEffect(() => {
    refetch(); // force fresh data whenever page is opened
  }, [refetch]);

  const getKontikiRecords = (record: BiocharSamplingRecordType) =>
    record.kontikiRecords ?? [];

  const getKontikiName = (
    kontikiRecord: BiocharSamplingRecordType["kontikiRecords"][number]
  ) => kontikiRecord.kontiki?.kontikiName ?? "—";

  const getTotalSamplePhotosCount = (record: BiocharSamplingRecordType) =>
    getKontikiRecords(record).reduce(
      (sum, k) => sum + (k.samplePhoto ? 1 : 0),
      0
    );

  const hasAnySamplePhoto = (record: BiocharSamplingRecordType) =>
    getKontikiRecords(record).some((k) => (k.samplePhoto?.length ?? 0) > 0);

  // Filter records (client-side filtering like activation page)
  const filteredRecords = records.filter((record) => {
    const q = searchQuery.trim().toLowerCase();
    const kontikiRecords = getKontikiRecords(record);

    const searchableText = [
      // User (match UI)
      record.user?.userCode,
      `user ${record.user?.userCode}`,
      record.user?.firstName,
      record.user?.lastName,

      // Site (match UI)
      record.site?.siteCode,
      `site ${record.site?.siteCode}`,
      record.site?.siteName,

      // Kontiki (match formatted UI)
      ...kontikiRecords.flatMap((k) => [
        k.kontikiId,
        `kontiki ${k.kontikiId}`,
        k.kontiki?.kontikiCode,
        k.kontiki?.kontikiName,
      ]),

      // Dates
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
      const recordDate = parseDDMMYYYY(record.recordDate);

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
  const handleViewRecord = (record: BiocharSamplingRecordType) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  // const handleExportCSV = async () => {
  //   try {
  //     toast.loading("Exporting to CSV...", { id: "export-csv" });

  //     const blob = await biocharSamplingService.exportToCSV({
  //       userId: userFilter !== "all" ? userFilter : undefined,
  //       siteId: siteFilter !== "all" ? siteFilter : undefined,
  //       startDate: startDate || undefined,
  //       endDate: endDate || undefined,
  //     });

  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = `biochar-sampling-${new Date().toISOString().split("T")[0]}.csv`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);

  //     toast.success("CSV exported successfully!", { id: "export-csv" });
  //   } catch (error) {
  //     console.error("Export CSV error:", error);
  //     toast.error("Failed to export CSV", { id: "export-csv" });
  //   }
  // };

  const { mutate: exportCSV, isPending: isExportingCSV } = useMutation<
    Blob,
    Error
  >({
    mutationFn: () =>
      biocharSamplingService.exportToCSV({
        userId: userFilter !== "all" ? userFilter : undefined,
        siteId: siteFilter !== "all" ? siteFilter : undefined,
        // status: statusFilter !== "all" ? (statusFilter as any) : undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      }),

    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `biochar-sampling-${
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

  if (isUsersLoading || !records) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-[#295F58] border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading sampling records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl  font-bold text-[#295F58]">
            Biochar Sampling
          </h1>
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
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  exportCSV();
                }}
              >
                {isExportingCSV ? (
                  <>
                    <Loader2 className="-ml-1 animate-spin" size={16} />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    <span>Export CSV</span>
                  </>
                )}
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
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Loading biochar sampling records...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedRecords.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-8"
                    >
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
                              <Beaker className="h-4 w-4 text-[#295F58]" />
                            </div>
                            <div>
                              <div className="font-medium">
                                {record.recordDate}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {record.recordTime}
                              </div>
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
                            {getTotalSamplePhotosCount(record)}{" "}
                            {getTotalSamplePhotosCount(record) === 1
                              ? "photo"
                              : "photos"}
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

          {/* MOBILE VIEW: Card Stack */}
          <div className="sm:hidden divide-y divide-border">
            {isLoading ? (
              <div className="p-8 text-center flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin text-[#295F58]" />
                <span className="text-sm text-muted-foreground">
                  Loading records...
                </span>
              </div>
            ) : paginatedRecords.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No records found
              </div>
            ) : (
              paginatedRecords.map((record) => (
                <div key={record.id} className="p-4 mb-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E1EFEE] shrink-0">
                        <Beaker className="h-5 w-5 text-[#295F58]" />
                      </div>
                      <div>
                        <div className="font-bold text-base">
                          {record.recordDate}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {record.recordTime}
                        </div>
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
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Site/User
                      </p>
                      <p className="text-sm font-medium">
                        {record.site?.siteCode ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {record.user?.userCode ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                        Kon-tikis
                      </p>
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
                        {getTotalSamplePhotosCount(record)}{" "}
                        {getTotalSamplePhotosCount(record) === 1
                          ? "photo"
                          : "photos"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredRecords.length)} of{" "}
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
                  currentPage === page ? "bg-[#295F58] hover:bg-[#1e4540]" : ""
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
                  <div className="text-sm font-medium">
                    {selectedRecord.recordDate}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Time</Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.recordTime}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Site</Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.site?.siteCode ?? "—"} -{" "}
                    {selectedRecord.site?.siteName ?? "—"} 
                    <div className="text-sm font-medium">
                      Shift_No. {selectedRecord.shift?.shiftNumber ?? "—"}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">User</Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.user?.userCode ?? "—"} -{" "}
                    {selectedRecord.user
                      ? `${selectedRecord.user.firstName} ${selectedRecord.user.lastName}`
                      : "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">
                    Location
                  </Label>
                  <div className="text-sm font-mono">
                    {selectedRecord.latitude}, {selectedRecord.longitude}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">
                    Kon-tiki used
                  </Label>
                  <div className="text-sm font-medium">
                    {getKontikiRecords(selectedRecord)
                      .map((k) => k.kontiki?.kontikiName ?? "—")
                      .join(", ")}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">
                    Device
                  </Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.deviceInfo || "N/A"}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">
                    App Version
                  </Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.appVersion || "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex">
                {/* Kon-tiki Sections */}
                {getKontikiRecords(selectedRecord).map((kontiki) => (
                  <div
                    key={kontiki.id ?? kontiki.kontikiId}
                    className="border-4 border-gray-200 rounded-lg p-6 space-y-6"
                  >
                    {/* Kon-tiki Header */}
                    <div className="pb-4 border-b">
                      <h3 className="text-lg font-semibold text-[#295F58]">
                        {kontiki.kontiki?.kontikiName ?? "—"}
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        {kontiki.productionBatches
                          ? `Batches: ${kontiki.productionBatches}`
                          : ""}
                      </div>
                    </div>

                    {/* Sample Photos */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-[#295F58]" />
                        Sample Photo
                      </Label>

                      {kontiki.samplePhoto ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          <div className="border rounded-lg overflow-hidden">
                            <img
                              src={kontiki.samplePhoto}
                              alt="Sample photo"
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground italic">
                          No image found
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
