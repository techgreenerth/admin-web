import { useState } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Beaker,
  CheckCircle,
  Image as ImageIcon,
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface KontikiSamplingData {
  kontikiId: string;
  kontikiName: string;
  samplePhoto: string;
}

interface BiocharSamplingRecord {
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
  kontikis: KontikiSamplingData[];
  capturedAt: string;
  deviceInfo?: string;
  appVersion?: string;
  submittedAt: string;
}

export default function BiocharSampling() {
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
  const [selectedRecord, setSelectedRecord] = useState<BiocharSamplingRecord | null>(null);

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
  const records: BiocharSamplingRecord[] = [
    {
      id: "1",
      userId: "1",
      userName: "Rajesh Kumar",
      userCode: "USER-001",
      siteId: "1",
      siteName: "Kothapally Site",
      siteCode: "SITE-001",
      recordDate: "2024-01-15",
      recordTime: "17:30",
      latitude: "28.61394",
      longitude: "77.20902",
      gpsAccuracy: "5m",
      shiftId: "1",
      shiftName: "Shift 1",
      shiftNumber: 1,
      kontikis: [
        {
          kontikiId: "1",
          kontikiName: "Kon-tiki 1",
          samplePhoto: "https://via.placeholder.com/400x300?text=K1+Sample",
        },
        {
          kontikiId: "2",
          kontikiName: "Kon-tiki 2",
          samplePhoto: "https://via.placeholder.com/400x300?text=K2+Sample",
        },
      ],
      capturedAt: "2024-01-15T17:30:00Z",
      deviceInfo: "Samsung Galaxy A52",
      appVersion: "1.2.0",
      submittedAt: "2024-01-15T17:35:00Z",
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
      recordTime: "12:15",
      latitude: "28.62394",
      longitude: "77.21902",
      gpsAccuracy: "4m",
      shiftId: "2",
      shiftName: "Shift 2",
      shiftNumber: 2,
      kontikis: [
        {
          kontikiId: "3",
          kontikiName: "Kon-tiki 3",
          samplePhoto: "https://via.placeholder.com/400x300?text=K3+Sample",
        },
      ],
      capturedAt: "2024-01-16T12:15:00Z",
      deviceInfo: "Xiaomi Redmi Note 10",
      appVersion: "1.2.0",
      submittedAt: "2024-01-16T12:20:00Z",
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
      recordTime: "15:00",
      latitude: "28.61494",
      longitude: "77.21002",
      gpsAccuracy: "6m",
      shiftId: "1",
      shiftName: "Shift 1",
      shiftNumber: 1,
      kontikis: [
        {
          kontikiId: "1",
          kontikiName: "Kon-tiki 1",
          samplePhoto: "https://via.placeholder.com/400x300?text=K1+Sample",
        },
      ],
      capturedAt: "2024-01-14T15:00:00Z",
      deviceInfo: "Samsung Galaxy A52",
      appVersion: "1.2.0",
      submittedAt: "2024-01-14T15:05:00Z",
    },
  ];

  const getShiftColor = (shiftNumber: number) => {
    const colors = [
      "bg-blue-100 text-blue-800", // Shift 1
      "bg-purple-100 text-purple-800", // Shift 2
      "bg-orange-100 text-orange-800", // Shift 3
      "bg-pink-100 text-pink-800", // Shift 4
      "bg-cyan-100 text-cyan-800", // Shift 5
    ];
    return colors[shiftNumber - 1] || "bg-gray-100 text-gray-800";
  };

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.userCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.siteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.kontikis.some(k => k.kontikiName.toLowerCase().includes(searchQuery.toLowerCase()));
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

  // Handlers
  const handleViewRecord = (record: BiocharSamplingRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#295F58]">Biochar Sampling</h1>
          <p className="text-muted-foreground mt-1">
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
                <TableHead>Samples</TableHead>
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
                            <Beaker className="h-4 w-4 text-[#295F58]" />
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
                        <div className="text-sm text-muted-foreground">
                          {record.kontikis.map(k => k.kontikiName).join(", ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {record.kontikis.length} {record.kontikis.length === 1 ? 'photo' : 'photos'}
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
              {selectedRecord.kontikis.map((kontiki) => (
                <div key={kontiki.kontikiId} className="border border-gray-200 rounded-lg p-6 space-y-6">
                  {/* Kontiki Header */}
                  <div className="pb-4 border-b">
                    <h3 className="text-lg font-semibold text-[#295F58]">{kontiki.kontikiName}</h3>
                  </div>

                  {/* Sample Photo */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-[#295F58]" />
                      Sample Photo
                    </Label>
                    <div className="border rounded-lg overflow-hidden max-w-md">
                      <img
                        src={kontiki.samplePhoto}
                        alt={`${kontiki.kontikiName} Sample`}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
