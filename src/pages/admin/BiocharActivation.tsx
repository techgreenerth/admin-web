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
  FlaskConical,
  MapPin,
  User,
  Calendar,
  Image as ImageIcon,
  Video,
  Clock,
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

interface BiocharActivationRecord {
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
  mixingAgent: string;
  shiftId: string;
  shiftName: string;
  shiftNumber: number;
  tractorPhoto: string;
  mixingVideo: string;
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

export default function BiocharActivation() {
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BiocharActivationRecord | null>(null);
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
  const records: BiocharActivationRecord[] = [
    {
      id: "1",
      userId: "1",
      userName: "Rajesh Kumar",
      userCode: "USER-001",
      siteId: "1",
      siteName: "Kothapally Site",
      siteCode: "SITE-001",
      recordDate: "2024-01-15",
      recordTime: "16:30",
      latitude: "28.61394",
      longitude: "77.20902",
      gpsAccuracy: "5m",
      mixingAgent: "Potassium Hydroxide (KOH)",
      shiftId: "1",
      shiftName: "Shift 1",
      shiftNumber: 1,
      tractorPhoto: "https://via.placeholder.com/400x300?text=Tractor+Photo",
      mixingVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
      capturedAt: "2024-01-15T16:30:00Z",
      deviceInfo: "Samsung Galaxy A52",
      appVersion: "1.2.0",
      status: "VERIFIED",
      submittedAt: "2024-01-15T16:35:00Z",
      verifiedAt: "2024-01-15T18:20:00Z",
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
      recordTime: "11:15",
      latitude: "28.62394",
      longitude: "77.21902",
      gpsAccuracy: "4m",
      mixingAgent: "Sodium Hydroxide (NaOH)",
      shiftId: "2",
      shiftName: "Shift 2",
      shiftNumber: 2,
      tractorPhoto: "https://via.placeholder.com/400x300?text=Tractor+Photo",
      mixingVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
      capturedAt: "2024-01-16T11:15:00Z",
      deviceInfo: "Xiaomi Redmi Note 10",
      appVersion: "1.2.0",
      status: "SUBMITTED",
      submittedAt: "2024-01-16T11:20:00Z",
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
      recordTime: "14:00",
      latitude: "28.61494",
      longitude: "77.21002",
      gpsAccuracy: "6m",
      mixingAgent: "Potassium Hydroxide (KOH)",
      shiftId: "1",
      shiftName: "Shift 1",
      shiftNumber: 1,
      tractorPhoto: "https://via.placeholder.com/400x300?text=Tractor+Photo",
      mixingVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
      capturedAt: "2024-01-14T14:00:00Z",
      deviceInfo: "Samsung Galaxy A52",
      appVersion: "1.2.0",
      status: "REJECTED",
      submittedAt: "2024-01-14T14:05:00Z",
      rejectionNote: "Mixing video quality is poor. Please record again with better lighting.",
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

  const getShiftColor = (shiftNumber: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",      // Shift 1
      "bg-purple-100 text-purple-800",  // Shift 2
      "bg-orange-100 text-orange-800",  // Shift 3
      "bg-pink-100 text-pink-800",      // Shift 4
      "bg-cyan-100 text-cyan-800",      // Shift 5
    ];
    return colors[shiftNumber - 1] || "bg-gray-100 text-gray-800";
  };

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.userCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.siteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.mixingAgent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
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
  const handleViewRecord = (record: BiocharActivationRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  const handleVerifyRecord = (record: BiocharActivationRecord) => {
    setSelectedRecord(record);
    setIsVerifyDialogOpen(true);
  };

  const handleRejectRecord = (record: BiocharActivationRecord) => {
    setSelectedRecord(record);
    setRejectionNote("");
    setIsRejectDialogOpen(true);
  };

  const handleDeleteRecord = (record: BiocharActivationRecord) => {
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
          <h1 className="text-3xl font-bold text-[#295F58]">Biochar Activation</h1>
          <p className="text-muted-foreground mt-1">
            Track and verify biochar mixing and activation records
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-4">
            <CardTitle className="text-lg">All Records</CardTitle>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search user, site, agent..."
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
                <TableHead>Shift & Agent</TableHead>
                <TableHead>Media</TableHead>
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
                            <FlaskConical className="h-4 w-4 text-[#295F58]" />
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
                        <Badge className={getShiftColor(record.shiftNumber)}>
                          Shift {record.shiftNumber}
                        </Badge>
                        <div className="text-sm text-muted-foreground">{record.mixingAgent}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <Video className="h-4 w-4 text-muted-foreground" />
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
            <DialogTitle>Biochar Activation Details</DialogTitle>
            <DialogDescription>
              Complete information about this activation record
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

              {/* Shift & Mixing Agent */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Shift</Label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Badge className={getShiftColor(selectedRecord.shiftNumber)}>
                      Shift {selectedRecord.shiftNumber}
                    </Badge>
                    <span className="text-sm">{selectedRecord.shiftName}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Mixing Agent</Label>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-muted-foreground" />
                    <div className="font-medium">{selectedRecord.mixingAgent}</div>
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

              {/* Media */}
              <div className="space-y-3">
                <Label className="text-muted-foreground">Media</Label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Tractor Photo */}
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Tractor Photo
                    </Label>
                    <div className="border rounded-lg overflow-hidden">
                      <img
                        src={selectedRecord.tractorPhoto}
                        alt="Tractor with activated biochar"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  {/* Mixing Video */}
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Mixing Video
                    </Label>
                    <div className="border rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-auto"
                        src={selectedRecord.mixingVideo}
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

      {/* Verify Dialog */}
      <AlertDialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify Activation Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to verify this biochar activation record? This action will mark
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
            <DialogTitle>Reject Activation Record</DialogTitle>
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
            <AlertDialogTitle>Delete Activation Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this biochar activation record? This action cannot be
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
