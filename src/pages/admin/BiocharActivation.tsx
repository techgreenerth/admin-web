import { useEffect, useState } from "react";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Video,
  CheckCircle,
  ImageIcon,
  Download,
  Loader2,
} from "lucide-react";
import { useBiocharActivation } from "@/contexts/biocharActivationContext";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BiocharActivationRecord } from "@/types/biocharActivation.types";
import { formatDate, formatTime } from "@/lib/utils/date";

export default function BiocharActivation() {
  // Use context hooks
  const { records, isLoading } = useBiocharActivation();
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
    useState<BiocharActivationRecord | null>(null);

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

  const getShiftNumber = (shiftName?: string) => {
    if (!shiftName) return 1;
    const match = shiftName.match(/\d+/);
    const n = match ? parseInt(match[0], 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : 1;
  };

  const getShiftColor = (shiftName?: string) => {
    const shiftNumber = getShiftNumber(shiftName);
    const colors = [
      "bg-blue-100 text-blue-800", // Shift 1
      "bg-purple-100 text-purple-800", // Shift 2
      "bg-orange-100 text-orange-800", // Shift 3
      "bg-pink-100 text-pink-800", // Shift 4
      "bg-cyan-100 text-cyan-800", // Shift 5
    ];
    return colors[shiftNumber - 1] || "bg-gray-100 text-gray-800";
  };

  const normalizeLower = (value: unknown) => {
    if (typeof value === "string") return value.toLowerCase();
    if (value == null) return "";
    return String(value).toLowerCase();
  };

  const getKontikiRecords = (record: BiocharActivationRecord) =>
    record.kontikiRecords ?? [];

  const hasAnyTractorPhoto = (record: BiocharActivationRecord) =>
    getKontikiRecords(record).some((k) => !!k.tractorPhoto);

  const hasAnyMixingVideo = (record: BiocharActivationRecord) =>
    getKontikiRecords(record).some((k) => !!k.mixingVideo);

  // Filter records
  const filteredRecords = records.filter((record) => {
    const q = searchQuery.trim().toLowerCase();
    const kontikiRecords = getKontikiRecords(record);

    const matchesSearch =
      q.length === 0 ||
      // User fields
      normalizeLower(record.user?.userCode).includes(q) ||
      normalizeLower(record.user?.firstName).includes(q) ||
      normalizeLower(record.user?.lastName).includes(q) ||
      // Site fields
      normalizeLower(record.site?.siteCode).includes(q) ||
      normalizeLower(record.site?.siteName).includes(q) ||
      // Activation fields
      normalizeLower(record.mixingAgent).includes(q) ||
      normalizeLower(record.shift?.shiftName).includes(q) ||
      // Kontiki fields
      kontikiRecords.some((k) =>
        normalizeLower(k.kontikiId).includes(q) ||
        normalizeLower(k.kontiki?.kontikiCode).includes(q) ||
        normalizeLower(k.kontiki?.kontikiName).includes(q)
      );

    const matchesSite = siteFilter === "all" || record.siteId === siteFilter;
    const matchesUser = userFilter === "all" || record.userId === userFilter;

    // Date range filter (treat endDate as inclusive, end-of-day)
    let matchesDateRange = true;
    if (startDate && endDate) {
      const recordDate = record.recordDate ? new Date(record.recordDate) : null;
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      matchesDateRange = !!recordDate && recordDate >= start && recordDate <= end;
    }

    return matchesSearch && matchesSite && matchesUser && matchesDateRange;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl  font-bold text-[#295F58]">
            Biochar Activation
          </h1>
          <p className=" text-sm text-muted-foreground mt-1">
            Track and verify biochar mixing and activation records
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
                    placeholder="Search user, site, agent..."
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
  {/* DESKTOP VIEW: Hidden on mobile, shown on tablet/desktop */}
  <div className="hidden sm:block overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Record Info</TableHead>
          <TableHead>Site & User</TableHead>
          <TableHead>Shift & Agent</TableHead>
          <TableHead>Media</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-12">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading biochar activation records...</span>
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
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E1EFEE] shrink-0">
                    <FlaskConical className="h-4 w-4 text-[#295F58]" />
                  </div>
                  <div>
                    <div className="font-medium">{formatDate(record.recordDate)}</div>
                    <div className="text-sm text-muted-foreground">{ formatTime(record.recordTime)}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium">{record.site?.siteCode ?? "—"}</div>
                <div className="text-sm text-muted-foreground">{record.user?.userCode ?? "—"}</div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Badge className={getShiftColor(record.shift?.shiftName)}>
                    {record.shift?.shiftName ?? "Shift"}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{record.mixingAgent}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {hasAnyTractorPhoto(record) && <ImageIcon className="h-4 w-4 text-muted-foreground" />}
                  {hasAnyMixingVideo(record) && <Video className="h-4 w-4 text-muted-foreground" />}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleViewRecord(record)} className="hover:bg-[#295F58]/10">
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
        <span className="text-sm text-muted-foreground">Loading records...</span>
      </div>
    ) : paginatedRecords.length === 0 ? (
      <div className="p-8 text-center text-muted-foreground">No records found</div>
    ) : (
      paginatedRecords.map((record) => (
        <div key={record.id} className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E1EFEE]">
                <FlaskConical className="h-5 w-5 text-[#295F58]" />
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

          <div className="grid grid-cols-2 gap-4">
            {/*Shift & Agent */}
            <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Shift & Agent</p>
              <p className="text-sm font-semibold text-[#295F58]">{record.mixingAgent || "Not Specified"}</p>
               <Badge className={`${getShiftColor(record.shift?.shiftName)} text-[10px] px-1.5 py-0 w-fit`}>
                  {record.shift?.shiftName ?? "Shift"}
                </Badge>
            </div>
            {/* Site and User */}
            <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Assignment</p>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium">{record.site?.siteCode ?? "—"}</span>
                <span className="text-xs font-medium">{record.user?.userCode ?? "—"}</span>
               
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <ImageIcon className={`h-4 w-4 ${hasAnyTractorPhoto(record) ? 'text-[#295F58]' : 'text-gray-300'}`} />
                <span className="text-[11px] text-muted-foreground">Photo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Video className={`h-4 w-4 ${hasAnyMixingVideo(record) ? 'text-[#295F58]' : 'text-gray-300'}`} />
                <span className="text-[11px] text-muted-foreground">Video</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              User: {record.user?.userCode ?? "—"}
            </span>
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
            <DialogTitle>Biochar Activation Details</DialogTitle>
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
                    {formatDate(selectedRecord.recordDate)}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Time</Label>
                  <div className="text-sm font-medium">
                    {formatTime(selectedRecord.recordTime)}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Site</Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.site?.siteCode ?? "—"} - {selectedRecord.site?.siteName ?? "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">User</Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.user?.userCode ?? "—"} - {selectedRecord.user ? `${selectedRecord.user.firstName} ${selectedRecord.user.lastName}` : "—"}
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
                    Shift No.
                  </Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.shift?.shiftName ?? "—"}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">
                    Mixing Agent
                  </Label>
                  <div className="text-sm font-medium">
                    {selectedRecord.mixingAgent}
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

              {/* Kon-tiki Sections */}
              {getKontikiRecords(selectedRecord).map((kontiki) => (
                <div
                  key={kontiki.id ?? kontiki.kontikiId}
                  className="border border-gray-200 rounded-lg p-6 space-y-6"
                >
                  {/* Kon-tiki Header */}
                  <div className="pb-4 border-b">
                    <h3 className="text-lg font-semibold text-[#295F58]">
                      {kontiki.kontiki?.kontikiName ?? "—"}
                    </h3>
                  </div>

                  {/* Tractor Photo */}
                  {kontiki.tractorPhoto && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <ImageIcon className="h-5 w-5 text-[#295F58]" />
                        Tractor Photo
                      </Label>
                      <div className="border rounded-lg overflow-hidden max-w-md">
                        <img
                          src={kontiki.tractorPhoto}
                          alt="Tractor"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  )}

                  {/* Mixing Video */}
                  {kontiki.mixingVideo && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Video className="h-5 w-5 text-[#295F58]" />
                        Mixing Video
                      </Label>
                      <div className="border rounded-lg overflow-hidden max-w-2xl">
                        <video
                          controls
                          className="w-full h-auto"
                          src={kontiki.mixingVideo}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
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
