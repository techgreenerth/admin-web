import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Leaf,
  MapPin,
  User,
  Truck,
  Package,
  Download,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useBiomassSourcing } from "@/contexts/biomassSourcingContext";
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

export default function BiomassSourcing() {
  // Use context hook
  const { records, isLoading, fetchRecords } = useBiomassSourcing();

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
  const [selectedRecord, setSelectedRecord] = useState<BiomassSourcingRecord | null>(null);

  // Mock sites and users for filters
  const sites = [
    { id: "site1", name: "Green Valley Production Site", code: "AP-001" },
    { id: "site2", name: "Eco Farm Biochar Unit", code: "AP-002" },
  ];

  const users = [
    { id: "u1", name: "John Doe", code: "USER-001" },
    { id: "u2", name: "Jane Smith", code: "USER-002" },
  ];

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.tripNumber.includes(searchQuery) ||
      record.userName.toLowerCase().includes(searchQuery.toLowerCase());
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
  const handleViewRecord = (record: BiomassSourcingRecord) => {
    setSelectedRecord(record);
    setIsViewDialogOpen(true);
  };

  // Calculate statistics
  const totalTrips = filteredRecords.length;
  const totalBiomassKg = totalTrips * 500; // Each trip = 500 kg
  const totalDistanceKm = filteredRecords.reduce((sum, record) => {
    return sum + parseFloat(record.distanceKm || "0");
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#295F58]">Biomass Sourcing</h1>
      </div>

      {/* Dashboard Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Biomass Sourced</p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">{filteredRecords.length}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Total Biomass Weight</p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">{totalBiomassKg.toLocaleString()} kg</h3>
                <p className="text-xs text-muted-foreground mt-1">{totalTrips} trips × 500 kg</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Distance Travelled</p>
                <h3 className="text-3xl font-bold text-[#295F58] mt-2">{totalDistanceKm.toFixed(1)} km</h3>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E1EFEE]">
                <Truck className="h-6 w-6 text-[#295F58]" />
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
                <TableHead>Farmer Details</TableHead>
                <TableHead>Site & User</TableHead>
                <TableHead>Distance Travelled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E1EFEE]">
                        <Leaf className="h-4 w-4 text-[#295F58]" />
                      </div>
                      <div>
                        <div className="font-medium">Trip {record.tripNumber}</div>
                        <div className="text-xs text-muted-foreground">
                          {record.recordDate} {record.recordTime}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{record.farmerName}</div>
                      <div className="text-xs text-muted-foreground">{record.farmerMobile}</div>
                      <div className="text-xs text-muted-foreground">{record.farmAreaAcres} acres</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{record.siteName}</div>
                      <div className="text-xs text-muted-foreground font-mono">{record.siteCode}</div>
                      <div className="text-xs text-muted-foreground">{record.userName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{record.distanceKm} km</span>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredRecords.length)} of {filteredRecords.length} results
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-[#295F58] hover:bg-[#295F58]/90" : ""}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
              <div className="space-y-2">
                <Label className="text-muted-foreground">Tractor Photo</Label>
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src={selectedRecord.tractorPhoto}
                    alt="Tractor with biomass"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Record Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Trip Number</Label>
                  <p className="font-medium">Trip {selectedRecord.tripNumber}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Record Date & Time</Label>
                  <p className="font-medium">{selectedRecord.recordDate} {selectedRecord.recordTime}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Submitted At</Label>
                  <p className="font-medium">{new Date(selectedRecord.submittedAt).toLocaleString()}</p>
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
                    <Label className="text-muted-foreground">Mobile Number</Label>
                    <p className="font-medium">{selectedRecord.farmerMobile}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Farm Area</Label>
                    <p className="font-medium">{selectedRecord.farmAreaAcres} acres</p>
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
                    <p className="font-medium font-mono">{selectedRecord.latitude}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Longitude</Label>
                    <p className="font-medium font-mono">{selectedRecord.longitude}</p>
                  </div>
                  {selectedRecord.gpsAccuracy && (
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">GPS Accuracy</Label>
                      <p className="font-medium">±{selectedRecord.gpsAccuracy} meters</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Site and User */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Site</Label>
                  <p className="font-medium">{selectedRecord.siteName}</p>
                  <p className="text-xs text-muted-foreground font-mono">{selectedRecord.siteCode}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Recorded By</Label>
                  <p className="font-medium">{selectedRecord.userName}</p>
                  <p className="text-xs text-muted-foreground font-mono">{selectedRecord.userCode}</p>
                </div>
              </div>

              {/* Verification Details */}
              {selectedRecord.status === "VERIFIED" && selectedRecord.verifiedAt && (
                <div className="space-y-3 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    Verification Details
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Verified At</Label>
                      <p className="font-medium">{new Date(selectedRecord.verifiedAt).toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Verified By</Label>
                      <p className="font-medium">{selectedRecord.verifiedByName || "Admin"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rejection Details */}
              {selectedRecord.status === "REJECTED" && selectedRecord.rejectionNote && (
                <div className="space-y-3 p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold flex items-center gap-2 text-red-800">
                    <XCircle className="h-4 w-4" />
                    Rejection Details
                  </h3>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Rejection Note</Label>
                    <p className="font-medium">{selectedRecord.rejectionNote}</p>
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t">
                {selectedRecord.deviceInfo && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">Device Info</Label>
                    <p className="font-medium text-xs">{selectedRecord.deviceInfo}</p>
                  </div>
                )}
                {selectedRecord.appVersion && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground">App Version</Label>
                    <p className="font-medium text-xs">{selectedRecord.appVersion}</p>
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
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
