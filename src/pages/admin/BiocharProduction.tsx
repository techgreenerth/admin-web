import { useState } from "react";
import {
  Search,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Trash2,
  Factory,
  MapPin,
  User,
  Calendar,
  Image as ImageIcon,
  Flame,
  Droplets,
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

interface BiocharProductionRecord {
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
  shiftId: string;
  shiftName: string;
  shiftNumber: number;
  kontikiIds: string[];
  kontikiNames: string[];
  productionStep: number;
  productionStepName: string;
  moisturePercent?: string;
  moisturePhoto?: string;
  startPhoto?: string;
  middlePhoto?: string;
  endPhoto?: string;
  finalPhoto?: string;
  aiVolumeEstimate?: string;
  aiConfidenceScore?: string;
  aiModelVersion?: string;
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

export default function BiocharProduction() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [stepFilter, setStepFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BiocharProductionRecord | null>(null);
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

  // Mock data - TODO: Replace with actual API call
  const records: BiocharProductionRecord[] = [
    {
      id: "1",
      userId: "1",
      userName: "Rajesh Kumar",
      userCode: "USER-001",
      siteId: "1",
      siteName: "Kothapally Site",
      siteCode: "SITE-001",
      recordDate: "2024-01-15",
      recordTime: "14:30",
      latitude: "28.61394",
      longitude: "77.20902",
      gpsAccuracy: "5m",
      shiftId: "1",
      shiftName: "Shift 1",
      shiftNumber: 1,
      kontikiIds: ["1", "2"],
      kontikiNames: ["Kon-tiki 1", "Kon-tiki 2"],
      productionStep: 5,
      productionStepName: "Final biochar production",
      moisturePercent: "12.5",
      moisturePhoto: "https://via.placeholder.com/400x300?text=Moisture+Meter",
      startPhoto: "https://via.placeholder.com/400x300?text=Start+25%25",
      middlePhoto: "https://via.placeholder.com/400x300?text=Middle+50%25",
      endPhoto: "https://via.placeholder.com/400x300?text=End+90%25",
      finalPhoto: "https://via.placeholder.com/400x300?text=Final+Biochar",
      aiVolumeEstimate: "450 liters",
      aiConfidenceScore: "0.94",
      aiModelVersion: "v2.1.0",
      capturedAt: "2024-01-15T14:30:00Z",
      deviceInfo: "Samsung Galaxy A52",
      appVersion: "1.2.0",
      status: "VERIFIED",
      submittedAt: "2024-01-15T14:35:00Z",
      verifiedAt: "2024-01-15T16:20:00Z",
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
      recordTime: "10:15",
      latitude: "28.62394",
      longitude: "77.21902",
      gpsAccuracy: "4m",
      shiftId: "2",
      shiftName: "Shift 2",
      shiftNumber: 2,
      kontikiIds: ["3"],
      kontikiNames: ["Kon-tiki 3"],
      productionStep: 3,
      productionStepName: "Middle of production",
      moisturePercent: "11.8",
      moisturePhoto: "https://via.placeholder.com/400x300?text=Moisture+Meter",
      startPhoto: "https://via.placeholder.com/400x300?text=Start+25%25",
      middlePhoto: "https://via.placeholder.com/400x300?text=Middle+50%25",
      capturedAt: "2024-01-16T10:15:00Z",
      deviceInfo: "Xiaomi Redmi Note 10",
      appVersion: "1.2.0",
      status: "SUBMITTED",
      submittedAt: "2024-01-16T10:20:00Z",
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
      recordTime: "09:00",
      latitude: "28.61494",
      longitude: "77.21002",
      gpsAccuracy: "6m",
      shiftId: "1",
      shiftName: "Shift 1",
      shiftNumber: 1,
      kontikiIds: ["1"],
      kontikiNames: ["Kon-tiki 1"],
      productionStep: 1,
      productionStepName: "Moisture Reading",
      moisturePercent: "13.2",
      moisturePhoto: "https://via.placeholder.com/400x300?text=Moisture+Meter",
      capturedAt: "2024-01-14T09:00:00Z",
      deviceInfo: "Samsung Galaxy A52",
      appVersion: "1.2.0",
      status: "REJECTED",
      submittedAt: "2024-01-14T09:05:00Z",
      rejectionNote: "Moisture reading too high. Please dry the biomass further before production.",
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
      record.kontikiNames.some(name => name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesSite = siteFilter === "all" || record.siteId === siteFilter;
    const matchesUser = userFilter === "all" || record.userId === userFilter;
    const matchesStep = stepFilter === "all" || record.productionStep.toString() === stepFilter;

    // Date range filter
    let matchesDateRange = true;
    if (startDate && endDate) {
      const recordDate = new Date(record.recordDate);
      matchesDateRange = recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
    }

    return matchesSearch && matchesStatus && matchesSite && matchesUser && matchesStep && matchesDateRange;
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

  const handleVerifyRecord = (record: BiocharProductionRecord) => {
    setSelectedRecord(record);
    setIsVerifyDialogOpen(true);
  };

  const handleRejectRecord = (record: BiocharProductionRecord) => {
    setSelectedRecord(record);
    setRejectionNote("");
    setIsRejectDialogOpen(true);
  };

  const handleDeleteRecord = (record: BiocharProductionRecord) => {
    setSelectedRecord(record);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmVerify = () => {
    // TODO: Add API call to verify record
    console.log("Verifying record:", selectedRecord?.id);
    setIsVerifyDialogOpen(false);
  };

  const handleConfirmReject = () => {
    // TODO: Add API call to reject record
    console.log("Rejecting record:", selectedRecord?.id, "Note:", rejectionNote);
    setIsRejectDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Add API call to delete record
    console.log("Deleting record:", selectedRecord?.id);
    setIsDeleteDialogOpen(false);
  };

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

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4">
            <CardTitle className="text-lg">All Records</CardTitle>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
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
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="SUBMITTED">Submitted</SelectItem>
                    <SelectItem value="VERIFIED">Verified</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
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
                <Select value={stepFilter} onValueChange={setStepFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Production Step" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Steps</SelectItem>
                    <SelectItem value="1">Step 1: Moisture</SelectItem>
                    <SelectItem value="2">Step 2: Start (25%)</SelectItem>
                    <SelectItem value="3">Step 3: Middle (50%)</SelectItem>
                    <SelectItem value="4">Step 4: End (90%)</SelectItem>
                    <SelectItem value="5">Step 5: Final</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start Date"
                  className="hover:border-[#295F58]/50 hover:bg-gray-50 transition-colors cursor-pointer"
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End Date"
                  className="hover:border-[#295F58]/50 hover:bg-gray-50 transition-colors cursor-pointer"
                />
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
                <TableHead>Production Step</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
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
                          {record.kontikiNames.join(", ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStepColor(record.productionStep)}>
                        Step {record.productionStep}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {record.productionStepName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewRecord(record)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {record.status === "SUBMITTED" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleVerifyRecord(record)}
                                className="text-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Verify
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleRejectRecord(record)}
                                className="text-orange-600"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteRecord(record)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
            <DialogTitle>Biochar Production Details</DialogTitle>
            <DialogDescription>
              Complete information about this production record
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6 py-4">
              {/* Status Banner */}
              {selectedRecord.status === "VERIFIED" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Verified</div>
                      <div className="text-sm">
                        Verified by {selectedRecord.verifiedByName} on{" "}
                        {new Date(selectedRecord.verifiedAt!).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {selectedRecord.status === "REJECTED" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-2 text-red-800">
                    <XCircle className="h-5 w-5 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium">Rejected</div>
                      <div className="text-sm mt-1">{selectedRecord.rejectionNote}</div>
                    </div>
                  </div>
                </div>
              )}

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
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Status</Label>
                  <div>
                    <Badge className={getStatusColor(selectedRecord.status)}>
                      {selectedRecord.status}
                    </Badge>
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

              {/* Shift & Kontikis */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Shift</Label>
                  <div className="flex items-center gap-2">
                    <Badge className={getStepColor(selectedRecord.shiftNumber)}>
                      Shift {selectedRecord.shiftNumber}
                    </Badge>
                    <span className="text-sm">{selectedRecord.shiftName}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Kontikis Used</Label>
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-muted-foreground" />
                    <div className="font-medium">{selectedRecord.kontikiNames.join(", ")}</div>
                  </div>
                </div>
              </div>

              {/* Production Step */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Production Step</Label>
                <div className="flex items-center gap-2">
                  <Badge className={getStepColor(selectedRecord.productionStep)}>
                    Step {selectedRecord.productionStep}
                  </Badge>
                  <span className="font-medium">{selectedRecord.productionStepName}</span>
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

              {/* Step-specific Data */}
              {selectedRecord.moisturePercent && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Moisture Reading</Label>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">{selectedRecord.moisturePercent}%</span>
                  </div>
                </div>
              )}

              {/* AI Estimates (Step 5 only) */}
              {selectedRecord.productionStep === 5 && selectedRecord.aiVolumeEstimate && (
                <div className="grid grid-cols-3 gap-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">AI Volume Estimate</Label>
                    <div className="font-medium">{selectedRecord.aiVolumeEstimate}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Confidence Score</Label>
                    <div className="font-medium">{selectedRecord.aiConfidenceScore}</div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Model Version</Label>
                    <div className="font-medium">{selectedRecord.aiModelVersion}</div>
                  </div>
                </div>
              )}

              {/* Photos */}
              <div className="space-y-3">
                <Label className="text-muted-foreground">Production Photos</Label>
                <div className="grid grid-cols-2 gap-4">
                  {selectedRecord.moisturePhoto && (
                    <div className="space-y-2">
                      <Label className="text-sm">Moisture Reading</Label>
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={selectedRecord.moisturePhoto}
                          alt="Moisture meter reading"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  )}
                  {selectedRecord.startPhoto && (
                    <div className="space-y-2">
                      <Label className="text-sm">Start (25% fill)</Label>
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={selectedRecord.startPhoto}
                          alt="Start of production"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  )}
                  {selectedRecord.middlePhoto && (
                    <div className="space-y-2">
                      <Label className="text-sm">Middle (50% fill)</Label>
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={selectedRecord.middlePhoto}
                          alt="Middle of production"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  )}
                  {selectedRecord.endPhoto && (
                    <div className="space-y-2">
                      <Label className="text-sm">End (90% fill)</Label>
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={selectedRecord.endPhoto}
                          alt="End of production"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  )}
                  {selectedRecord.finalPhoto && (
                    <div className="space-y-2">
                      <Label className="text-sm">Final Biochar (Post-quenching)</Label>
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={selectedRecord.finalPhoto}
                          alt="Final biochar"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
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

      {/* Verify Dialog */}
      <AlertDialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify Production Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to verify this biochar production record? This action will mark
              the record as verified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmVerify}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Production Record</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this record
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionNote">Rejection Note *</Label>
              <Textarea
                id="rejectionNote"
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                placeholder="Explain why this record is being rejected..."
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
              Reject Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Production Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this biochar production record? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
