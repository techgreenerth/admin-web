import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  MapPin,
  User,
  Download,
  Loader2,
  Cpu,
  Image as ImageIcon,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  CsiService,
  CsiVerifiedRecord,
  PaginationMeta,
} from "../../lib/api/csi/csi.service";
import { formatDate, formatTime } from "../../lib/utils/date";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { normalizeDateForSearch, parseDDMMYYYY, toSearchString } from "@/lib/utils/utils";

export default function CsiVerifiedRecords() {
  const [records, setRecords] = useState<CsiVerifiedRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [siteFilter, setSiteFilter] = useState("all");
  const [stepFilter, setStepFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<CsiVerifiedRecord | null>(null);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const res = await CsiService.getVerifiedRecords({
        page: 1,
        limit: 1000, // Fetch all records for client-side filtering
      });
      setRecords(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error("CSI verified records error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter records (client-side filtering like activation page)
  const filteredRecords = records.filter((record) => {
    const q = searchQuery.trim().toLowerCase();

    const searchableText = [
      // Site
      record.production?.site?.siteName,
      record.production?.site?.siteCode,
      `site ${record.production?.site?.siteCode}`,

      // User
      record.production?.user?.firstName,
      record.production?.user?.lastName,
      record.production?.user?.userCode,
      `user ${record.production?.user?.userCode}`,

      // Kontiki
      record.kontiki?.kontikiName,
      record.kontiki?.kontikiCode,
      `kontiki ${record.kontiki?.kontikiCode}`,

      // Verified by
      record.verifiedBy?.firstName,
      record.verifiedBy?.lastName,

      // Production step
      record.productionStepName,

      // Dates
      normalizeDateForSearch(record.production?.recordDate),
      normalizeDateForSearch(record.createdAt),
    ]
      .map(toSearchString)
      .join(" ");

    const matchesSearch = q.length === 0 || searchableText.includes(q);

    const matchesSite =
      siteFilter === "all" || record.production?.siteId === siteFilter;

    const matchesStep =
      stepFilter === "all" || record.productionStepName === stepFilter;

    // Date range filter (inclusive)
    let matchesDateRange = true;
    if (startDate && endDate) {
      const recordDate = parseDDMMYYYY(record.production?.recordDate);

      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      matchesDateRange =
        !!recordDate && recordDate >= start && recordDate <= end;
    }

    return matchesSearch && matchesSite && matchesStep && matchesDateRange;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  // Handlers
  const handleViewRecord = (record: CsiVerifiedRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

 const { mutate: exportCSV, isPending: isExportingCSV } = useMutation<
   Blob,
   Error
 >({
   mutationFn: () =>
     CsiService.exportToCSV({
       siteId: siteFilter !== "all" ? siteFilter : undefined,
       // status: statusFilter !== "all" ? (statusFilter as any) : undefined,
       startDate: startDate || undefined,
       endDate: endDate || undefined,
     }),

   onSuccess: (blob) => {
     const url = window.URL.createObjectURL(blob);
     const a = document.createElement("a");
     a.href = url;
     a.download = `csi-${
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
  const totalVerified = filteredRecords.length;
  const totalAIEstimate = filteredRecords.reduce((sum, record) => {
    const estimate = parseFloat(record.aiVolumeEstimate || "0");
    return sum + (isNaN(estimate) ? 0 : estimate);
  }, 0);
  const avgConfidence = filteredRecords.length
    ? filteredRecords.reduce((sum, record) => {
        const score = parseFloat(record.aiConfidenceScore || "0");
        return sum + (isNaN(score) ? 0 : score);
      }, 0) / filteredRecords.length
    : 0;

  // Get unique sites for filter
  const uniqueSites = Array.from(
    new Set(records.map((r) => r.production?.site?.id).filter(Boolean))
  )
    .map((id) => {
      const site = records.find((r) => r.production?.site?.id === id)
        ?.production?.site;
      return site;
    })
    .filter(Boolean);

  // Production steps
  const productionSteps = ["STEP1", "STEP2", "STEP3", "STEP4", "STEP5"];

  if (isLoading || !records) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-[#295F58] border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">
            Loading Verified details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#295F58]">
          CSI Verified Records
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View all verified biochar production records
        </p>
      </div>

      {/* Dashboard Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Verified
                </p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">
                  {totalVerified}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">records</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <ShieldCheck className="h-6 w-6 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total AI Volume
                </p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">
                  {totalAIEstimate.toFixed(1)}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">cu.m</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <Cpu className="h-6 w-6 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Confidence
                </p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">
                  {avgConfidence.toFixed(1)}%
                </h3>
                <p className="text-xs text-muted-foreground mt-1">AI score</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <Cpu className="h-6 w-6 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">All Verified Records</CardTitle>
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
                    placeholder="Search site, user, kontiki..."
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
                    {uniqueSites.map((site) => (
                      <SelectItem key={site!.id} value={site!.id}>
                        {site!.siteCode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={stepFilter} onValueChange={setStepFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Production Step" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Steps</SelectItem>
                    {productionSteps.map((step) => (
                      <SelectItem key={step} value={step}>
                        {step}
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
                      Production Info
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Site & User
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Kontiki</TableHead>
                    <TableHead className="whitespace-nowrap">
                      AI Metrics
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-right whitespace-nowrap">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Loading verified records...</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : paginatedRecords.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
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
                              <ShieldCheck className="h-4 w-4 text-[#295F58]" />
                            </div>
                            <div>
                              <div className="font-medium">
                                {record.productionStepName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {record.production?.recordDate}{" "}
                                {record.production?.recordTime}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-medium">
                              {record.production?.site?.siteName ?? "—"}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {record.production?.site?.siteCode ?? "—"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {record.production?.user
                                ? `${record.production.user.firstName} (${record.production.user.userCode})`
                                : "—"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-medium">
                              {record.kontiki?.kontikiName ?? "—"}
                            </div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {record.kontiki?.kontikiCode ?? "—"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="text-sm">
                            <div className="font-medium">
                              {record.aiVolumeEstimate} cu.m
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {record.aiConfidenceScore}% confidence
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {record.aiModelVersion}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge
                            variant={
                              record.status === "VERIFIED"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              record.status === "VERIFIED"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : ""
                            }
                          >
                            {record.status}
                          </Badge>
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
                  {/* Mobile Header: Production & Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E1EFEE]">
                        <ShieldCheck className="h-5 w-5 text-[#295F58]" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {record.productionStepName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {record.production?.recordDate} |{" "}
                          {record.production?.recordTime}
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
                        Site & User
                      </p>
                      <p className="text-sm font-semibold truncate">
                        {record.production?.site?.siteName ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {record.production?.site?.siteCode ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground italic truncate">
                        {record.production?.user
                          ? `${record.production.user.firstName} (${record.production.user.userCode})`
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                        Kontiki
                      </p>
                      <p className="text-sm font-medium truncate">
                        {record.kontiki?.kontikiName ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {record.kontiki?.kontikiCode ?? "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                        AI Estimate
                      </p>
                      <p className="text-sm font-semibold">
                        {record.aiVolumeEstimate} cu.m
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {record.aiConfidenceScore}% confidence
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">
                        Status
                      </p>
                      <Badge
                        variant={
                          record.status === "VERIFIED" ? "default" : "secondary"
                        }
                        className={
                          record.status === "VERIFIED"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : ""
                        }
                      >
                        {record.status}
                      </Badge>
                    </div>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>CSI Verified Record Details</DialogTitle>
            <DialogDescription>
              Complete information about the verified production record
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6 py-4">
              {/* Production Photos Grid */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">
                  Production Photos
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {selectedRecord.moisturePhoto && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Moisture
                      </p>
                      <div className="border rounded-lg overflow-hidden aspect-square">
                        <img
                          src={selectedRecord.moisturePhoto}
                          alt="Moisture reading"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {selectedRecord.startPhoto && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Start
                      </p>
                      <div className="border rounded-lg overflow-hidden aspect-square">
                        <img
                          src={selectedRecord.startPhoto}
                          alt="Start photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {selectedRecord.middlePhoto && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Middle
                      </p>
                      <div className="border rounded-lg overflow-hidden aspect-square">
                        <img
                          src={selectedRecord.middlePhoto}
                          alt="Middle photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {selectedRecord.endPhoto && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        End
                      </p>
                      <div className="border rounded-lg overflow-hidden aspect-square">
                        <img
                          src={selectedRecord.endPhoto}
                          alt="End photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  {selectedRecord.finalPhoto && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Final
                      </p>
                      <div className="border rounded-lg overflow-hidden aspect-square">
                        <img
                          src={selectedRecord.finalPhoto}
                          alt="Final photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Production Information */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Production Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Production Step
                    </Label>
                    <p className="font-medium">
                      {selectedRecord.productionStepName} (Step{" "}
                      {selectedRecord.productionStep})
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Record Date & Time
                    </Label>
                    <p className="font-medium">
                      {selectedRecord.production?.recordDate}{" "}
                      {selectedRecord.production?.recordTime}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Moisture Percent
                    </Label>
                    <p className="font-medium">
                      {selectedRecord.moisturePercent}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge
                      variant={
                        selectedRecord.status === "VERIFIED"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        selectedRecord.status === "VERIFIED"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ""
                      }
                    >
                      {selectedRecord.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* AI Metrics */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  AI Volume Estimation
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Volume Estimate
                    </Label>
                    <p className="font-medium">
                      {selectedRecord.aiVolumeEstimate} cu.m
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Confidence Score
                    </Label>
                    <p className="font-medium">
                      {selectedRecord.aiConfidenceScore}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Model Version
                    </Label>
                    <p className="font-medium">
                      {selectedRecord.aiModelVersion}
                    </p>
                  </div>
                </div>
              </div>

              {/* Site and User */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Site & User Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Site</Label>
                    <p className="font-medium">
                      {selectedRecord.production?.site?.siteName ?? "—"}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {selectedRecord.production?.site?.siteCode ?? "—"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Recorded By</Label>
                    <p className="font-medium">
                      {selectedRecord.production?.user
                        ? `${selectedRecord.production.user.firstName} ${selectedRecord.production.user.lastName}`
                        : "—"}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {selectedRecord.production?.user?.userCode ?? "—"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Shift</Label>
                    <p className="font-medium">
                      {selectedRecord.production?.shift?.shiftName ?? "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Shift #{selectedRecord.production?.shift?.shiftNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Kontiki Details */}
              <div className="space-y-3">
                <h3 className="font-semibold">Kontiki Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Kontiki Name
                    </Label>
                    <p className="font-medium">
                      {selectedRecord.kontiki?.kontikiName ?? "—"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">
                      Kontiki Code
                    </Label>
                    <p className="font-medium font-mono">
                      {selectedRecord.kontiki?.kontikiCode ?? "—"}
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
                      {selectedRecord.production?.latitude}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Longitude</Label>
                    <p className="font-medium font-mono">
                      {selectedRecord.production?.longitude}
                    </p>
                  </div>
                  {selectedRecord.production?.gpsAccuracy && (
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">
                        GPS Accuracy
                      </Label>
                      <p className="font-medium">
                        ±{selectedRecord.production.gpsAccuracy} meters
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Verification Details */}
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Verification Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Verified By</Label>
                    <p className="font-medium">
                      {selectedRecord.verifiedBy
                        ? `${selectedRecord.verifiedBy.firstName} ${selectedRecord.verifiedBy.lastName}`
                        : "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedRecord.verifiedBy?.email ?? "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Role: {selectedRecord.verifiedBy?.role ?? "—"}
                    </p>
                  </div>
                  {selectedRecord.rejectionNote && (
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">
                        Rejection Note
                      </Label>
                      <p className="font-medium text-red-600">
                        {selectedRecord.rejectionNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                {selectedRecord.production?.deviceInfo && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Device Info</Label>
                    <p className="font-medium text-xs">
                      {selectedRecord.production.deviceInfo}
                    </p>
                  </div>
                )}
                {selectedRecord.production?.appVersion && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">App Version</Label>
                    <p className="font-medium text-xs">
                      {selectedRecord.production.appVersion}
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
