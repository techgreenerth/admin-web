import { useState } from "react";
import {
  Search,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Factory,
  MapPin,
  User,
  Calendar,
  Image as ImageIcon,
  Flame,
  Droplets,
  Download,
  Loader2,
} from "lucide-react";
import { useBiocharProduction } from "@/contexts/biocharProductionContext";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  BiocharProductionRecord,
  KontikiData,
} from "@/types/biocharProduction.types";

export default function BiocharProduction() {
  // Use context hook
  const { records, isLoading, verifyKontiki, rejectKontiki } = useBiocharProduction();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BiocharProductionRecord | null>(null);
  const [selectedKontiki, setSelectedKontiki] = useState<KontikiData | null>(null);
  const [rejectionNote, setRejectionNote] = useState("");

  // Mock data for filters
  const sites = [
    { id: "1", code: "SITE-001" },
    { id: "2", code: "SITE-002" },
  ];

  const users = [
    { id: "1", code: "USER-001" },
    { id: "2", code: "USER-002" },
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
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "PARTIALLY_VERIFIED":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to determine the actual status based on kontikis
  const getActualStatus = (record: BiocharProductionRecord) => {
    const kontikis = record.kontikis;
    const verifiedCount = kontikis.filter(k => k.status === "VERIFIED").length;
    const rejectedCount = kontikis.filter(k => k.status === "REJECTED").length;
    const submittedCount = kontikis.filter(k => k.status === "SUBMITTED").length;

    // All submitted, none reviewed
    if (submittedCount === kontikis.length) {
      return "SUBMITTED";
    }

    // All reviewed (all verified or all rejected)
    if (verifiedCount + rejectedCount === kontikis.length) {
      return "VERIFIED";
    }

    // Partially reviewed (some reviewed, some pending)
    return "IN_PROGRESS";
  };

  // Helper function to get status subtext
  const getStatusSubtext = (record: BiocharProductionRecord) => {
    const kontikis = record.kontikis;
    const verifiedCount = kontikis.filter(k => k.status === "VERIFIED").length;
    const rejectedCount = kontikis.filter(k => k.status === "REJECTED").length;
    const submittedCount = kontikis.filter(k => k.status === "SUBMITTED").length;
    const actualStatus = getActualStatus(record);

    if (actualStatus === "SUBMITTED") {
      return "Start Review";
    }

    if (actualStatus === "VERIFIED") {
      return `${verifiedCount} accepted, ${rejectedCount} rejected`;
    }

    if (actualStatus === "IN_PROGRESS") {
      return "Complete Review";
    }

    return "";
  };

  const getStepColor = (step: number) => {
    const colors = [
      "bg-purple-100 text-purple-800",  // Step 1: Moisture
      "bg-blue-100 text-blue-800",      // Step 2: Start
      "bg-orange-100 text-orange-800",  // Step 3: Middle
      "bg-pink-100 text-pink-800",      // Step 4: End
      "bg-green-100 text-green-800",    // Step 5: Final
    ];
    return colors[step - 1] || "bg-gray-100 text-gray-800";
  };

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.userCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.siteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.kontikis.some(k => k.kontikiName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || getActualStatus(record) === statusFilter;
    const matchesSite = siteFilter === "all" || record.siteId === siteFilter;
    const matchesUser = userFilter === "all" || record.userId === userFilter;

    // Date range filter
    let matchesDateRange = true;
    if (startDate && endDate) {
      const recordDate = new Date(record.recordDate);
      matchesDateRange = recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
    }

    return matchesSearch && matchesStatus && matchesSite && matchesUser && matchesDateRange;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  // Handlers
  const handleViewRecord = (record: BiocharProductionRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  const handleVerifyKontiki = (record: BiocharProductionRecord, kontiki: KontikiData) => {
    setSelectedRecord(record);
    setSelectedKontiki(kontiki);
    setIsVerifyDialogOpen(true);
  };

  const handleRejectKontiki = (record: BiocharProductionRecord, kontiki: KontikiData) => {
    setSelectedRecord(record);
    setSelectedKontiki(kontiki);
    setRejectionNote("");
    setIsRejectDialogOpen(true);
  };

  const handleConfirmVerify = async () => {
    if (!selectedRecord || !selectedKontiki) return;
    
    try {
      await verifyKontiki(selectedRecord.id, { kontikiId: selectedKontiki.kontikiId });
      setIsVerifyDialogOpen(false);
      setSelectedKontiki(null);
      setIsViewDialogOpen(false); // Close the view dialog to refresh
    } catch (error) {
      console.error("Error verifying kontiki:", error);
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedRecord || !selectedKontiki || !rejectionNote.trim()) return;
    
    try {
      await rejectKontiki(selectedRecord.id, {
        kontikiId: selectedKontiki.kontikiId,
        rejectionNote,
      });
      setIsRejectDialogOpen(false);
      setSelectedKontiki(null);
      setRejectionNote("");
      setIsViewDialogOpen(false); // Close the view dialog to refresh
    } catch (error) {
      console.error("Error rejecting kontiki:", error);
    }
  };

  // Calculate statistics
  const totalBatches = filteredRecords.length;
  const totalBiocharProduced = filteredRecords.reduce((total, record) => {
    const recordTotal = record.kontikis.reduce((sum, kontiki) => {
      if (kontiki.aiVolumeEstimate) {
        const volume = parseFloat(kontiki.aiVolumeEstimate.replace(/[^0-9.]/g, ''));
        return sum + volume;
      }
      return sum;
    }, 0);
    return total + recordTotal;
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#295F58]">Biochar Production</h1>
          <p className="text-muted-foreground mt-1">
            Track and verify biochar production records
          </p>
        </div>
      </div>

      {/* Dashboard Pills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Batches</p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">{totalBatches}</h3>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <Factory className="h-6 w-6 text-[#295F58]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Biochar Produced</p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">{totalBiocharProduced.toFixed(0)} L</h3>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <Flame className="h-6 w-6 text-[#295F58]" />
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
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search user, site, kontiki..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="SUBMITTED">Submitted</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="VERIFIED">Verified</SelectItem>
                  </SelectContent>
                </Select>
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
                <TableHead>Shift & Kontikis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Loading biochar production records...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedRecords.length === 0 ? (
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
                            <Factory className="h-4 w-4 text-[#295F58]" />
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
                        <Badge className={getStepColor(record.shiftNumber)}>
                          Shift {record.shiftNumber}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {record.kontikis.map(k => k.kontikiName).join(", ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getStatusColor(getActualStatus(record))}>
                          {getActualStatus(record).replace("_", " ")}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {getStatusSubtext(record)}
                        </div>
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Biochar Production Details</DialogTitle>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6 py-4">
              {/* Record Submitted Status */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-800">
                    <CheckCircle className="h-5 w-5" />
                    <div className="font-medium">Record Submitted</div>
                  </div>
                  {getActualStatus(selectedRecord) === "VERIFIED" && (
                    <div className="text-sm text-blue-700 font-medium">
                      {getStatusSubtext(selectedRecord)}
                    </div>
                  )}
                </div>
              </div>

              {/* General Record Information */}
              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Date</Label>
                  <div className="text-sm font-medium">{selectedRecord.recordDate}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Time</Label>
                  <div className="text-sm font-medium">{selectedRecord.recordTime}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Site</Label>
                  <div className="text-sm font-medium">{selectedRecord.siteCode} - {selectedRecord.siteName}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">User</Label>
                  <div className="text-sm font-medium">{selectedRecord.userCode} - {selectedRecord.userName}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Location</Label>
                  <div className="text-sm font-mono">{selectedRecord.latitude}, {selectedRecord.longitude}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Shift No.</Label>
                  <div className="text-sm font-medium">Shift {selectedRecord.shiftNumber}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Ken tiki used</Label>
                  <div className="text-sm font-medium">{selectedRecord.kontikis.map(k => k.kontikiName).join(", ")}</div>
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

              {/* Kontiki Sections */}
              {selectedRecord.kontikis.map((kontiki, index) => (
                <div key={kontiki.kontikiId} className="border border-gray-200 rounded-lg p-6 space-y-6">
                  {/* Kontiki Header with Accept/Reject Buttons */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="text-lg font-semibold text-[#295F58]">{kontiki.kontikiName}</h3>
                    {kontiki.status === "SUBMITTED" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleVerifyKontiki(selectedRecord, kontiki)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectKontiki(selectedRecord, kontiki)}
                          className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-colors"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}
                    {kontiki.status === "VERIFIED" && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Accepted
                      </Badge>
                    )}
                    {kontiki.status === "REJECTED" && (
                      <Badge className="bg-red-100 text-red-800">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                  </div>

                  {/* Rejection Note */}
                  {kontiki.status === "REJECTED" && kontiki.rejectionNote && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <Label className="text-xs text-red-800 font-medium">Rejection Note:</Label>
                      <p className="text-sm text-red-700 mt-1">{kontiki.rejectionNote}</p>
                    </div>
                  )}

                  {/* Kontiki Production Process */}
                  <div className="space-y-4">
                    {/* 1. Moisture Photo & Percentage */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#295F58] text-white text-xs font-bold">1</span>
                          <Label className="text-sm font-medium">Moisture Photo</Label>
                        </div>
                        {kontiki.moisturePhoto && (
                          <div className="border rounded-lg overflow-hidden">
                            <img src={kontiki.moisturePhoto} alt="Moisture meter" className="w-full h-auto" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Moisture Percentage</Label>
                        {kontiki.moisturePercent && (
                          <div className="flex items-center gap-2 mt-8">
                            <Droplets className="h-5 w-5 text-blue-600" />
                            <span className="text-lg font-semibold">{kontiki.moisturePercent}%</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 2. Start (25%) */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#295F58] text-white text-xs font-bold">2</span>
                        <Label className="text-sm font-medium">Start (25% fill)</Label>
                      </div>
                      {kontiki.startPhoto && (
                        <div className="border rounded-lg overflow-hidden max-w-md">
                          <img src={kontiki.startPhoto} alt="Start phase" className="w-full h-auto" />
                        </div>
                      )}
                    </div>

                    {/* 3. Middle (50%) */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#295F58] text-white text-xs font-bold">3</span>
                        <Label className="text-sm font-medium">Middle (50% fill)</Label>
                      </div>
                      {kontiki.middlePhoto && (
                        <div className="border rounded-lg overflow-hidden max-w-md">
                          <img src={kontiki.middlePhoto} alt="Middle phase" className="w-full h-auto" />
                        </div>
                      )}
                    </div>

                    {/* 4. End (90%) */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#295F58] text-white text-xs font-bold">4</span>
                        <Label className="text-sm font-medium">End (90% fill)</Label>
                      </div>
                      {kontiki.endPhoto && (
                        <div className="border rounded-lg overflow-hidden max-w-md">
                          <img src={kontiki.endPhoto} alt="End phase" className="w-full h-auto" />
                        </div>
                      )}
                    </div>

                    {/* 5. Final Biochar with AI Estimate */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#295F58] text-white text-xs font-bold">5</span>
                        <Label className="text-sm font-medium">Final Biochar</Label>
                      </div>
                      {kontiki.finalPhoto && (
                        <div className="border rounded-lg overflow-hidden max-w-md">
                          <img src={kontiki.finalPhoto} alt="Final biochar" className="w-full h-auto" />
                        </div>
                      )}
                      {kontiki.aiVolumeEstimate && (
                        <div className="grid grid-cols-3 gap-4 bg-purple-50 border border-purple-200 rounded-lg p-3 max-w-2xl">
                          <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs">AI Volume Estimate</Label>
                            <div className="font-medium text-sm">{kontiki.aiVolumeEstimate}</div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs">Confidence</Label>
                            <div className="font-medium text-sm">{kontiki.aiConfidenceScore}</div>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-muted-foreground text-xs">Model Version</Label>
                            <div className="font-medium text-sm">{kontiki.aiModelVersion}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Verify Dialog */}
      <AlertDialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Kon-tiki</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to accept {selectedKontiki?.kontikiName}? This action will mark
              this Kon-tiki as verified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmVerify}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Kon-tiki</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting {selectedKontiki?.kontikiName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionNote">Rejection Note *</Label>
              <Textarea
                id="rejectionNote"
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                placeholder="Explain why this Kon-tiki is being rejected..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleConfirmReject}
              disabled={!rejectionNote.trim()}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
