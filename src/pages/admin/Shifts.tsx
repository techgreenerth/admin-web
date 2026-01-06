import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
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

interface ProductionShift {
  id: string;
  shiftNumber: number;
  shiftName: string;
  status: string;
  siteId: string;
  siteName: string;
  siteCode: string;
  startTime?: string;
  endTime?: string;
  createdAt: string;
}

export default function Shifts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [siteFilter, setSiteFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ProductionShift | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    siteId: "",
    shiftNumber: 1,
    shiftName: "",
    startTime: "",
    endTime: "",
    status: "ACTIVE",
  });

  // Mock data - Replace with API call
  const shifts: ProductionShift[] = [
    {
      id: "1",
      shiftNumber: 1,
      shiftName: "Shift 1",
      status: "ACTIVE",
      siteId: "site1",
      siteName: "Green Valley Production Site",
      siteCode: "AP-001",
      startTime: "06:00",
      endTime: "14:00",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      shiftNumber: 2,
      shiftName: "Shift 2",
      status: "ACTIVE",
      siteId: "site1",
      siteName: "Green Valley Production Site",
      siteCode: "AP-001",
      startTime: "14:00",
      endTime: "22:00",
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      shiftNumber: 3,
      shiftName: "Shift 3",
      status: "INACTIVE",
      siteId: "site1",
      siteName: "Green Valley Production Site",
      siteCode: "AP-001",
      startTime: "22:00",
      endTime: "06:00",
      createdAt: "2024-01-15",
    },
    {
      id: "4",
      shiftNumber: 1,
      shiftName: "Morning Shift",
      status: "ACTIVE",
      siteId: "site2",
      siteName: "Eco Farm Biochar Unit",
      siteCode: "AP-002",
      startTime: "08:00",
      endTime: "16:00",
      createdAt: "2024-02-10",
    },
  ];

  // Mock sites for dropdown
  const sites = [
    { id: "site1", name: "Green Valley Production Site", code: "AP-001" },
    { id: "site2", name: "Eco Farm Biochar Unit", code: "AP-002" },
    { id: "site3", name: "Carbon Capture Facility", code: "AP-003" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getShiftNumberBadge = (number: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-pink-100 text-pink-800",
      "bg-cyan-100 text-cyan-800",
    ];
    return colors[number - 1] || "bg-gray-100 text-gray-800";
  };

  const normalizeLower = (value: unknown) => {
    if (typeof value === "string") return value.toLowerCase();
    if (value == null) return "";
    return String(value).toLowerCase();
  };

  // Filter shifts
  const filteredShifts = shifts.filter((shift) => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch =
      q.length === 0 ||
      normalizeLower(shift.shiftName).includes(q) ||
      normalizeLower(shift.siteName).includes(q) ||
      normalizeLower(shift.shiftNumber).includes(q);

    const matchesStatus = statusFilter === "all" || shift.status === statusFilter;
    const matchesSite = siteFilter === "all" || shift.siteId === siteFilter;
    return matchesSearch && matchesStatus && matchesSite;
  });

  // Pagination
  const totalPages = Math.ceil(filteredShifts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedShifts = filteredShifts.slice(startIndex, endIndex);

  // Handlers
  const handleCreateShift = () => {
    setFormData({
      siteId: "",
      shiftNumber: 1,
      shiftName: "",
      startTime: "",
      endTime: "",
      status: "ACTIVE",
    });
    setIsCreateDialogOpen(true);
  };

  const handleViewShift = (shift: ProductionShift) => {
    setSelectedShift(shift);
    setIsViewDialogOpen(true);
  };

  const handleEditShift = (shift: ProductionShift) => {
    setSelectedShift(shift);
    setFormData({
      siteId: shift.siteId,
      shiftNumber: shift.shiftNumber,
      shiftName: shift.shiftName,
      startTime: shift.startTime || "",
      endTime: shift.endTime || "",
      status: shift.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteShift = (shift: ProductionShift) => {
    setSelectedShift(shift);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitCreate = () => {
    // TODO: Add API call to create shift
    // console.log("Creating shift:", formData);
    setIsCreateDialogOpen(false);
  };

  const handleSubmitEdit = () => {
    // TODO: Add API call to update shift
    // console.log("Updating shift:", selectedShift?.id, formData);
    setIsEditDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Add API call to delete shift
    // console.log("Deleting shift:", selectedShift?.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#295F58]">Production Shifts</h1>
          <p className="text-muted-foreground mt-1">
            Manage production schedules and shift timings
          </p>
        </div>
        <Button className="bg-[#295F58] hover:bg-[#295F58]/90" onClick={handleCreateShift}>
          <Plus className="h-4 w-4 mr-2" />
          Add Shift
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <CardTitle className="text-lg">All Shifts</CardTitle>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, site, number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={siteFilter} onValueChange={setSiteFilter}>
                <SelectTrigger className="w-48">
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shift</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedShifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E1EFEE]">
                        <Clock className="h-4 w-4 text-[#295F58]" />
                      </div>
                      <div>
                        <div className="font-medium">{shift.shiftName}</div>
                        <Badge className={getShiftNumberBadge(shift.shiftNumber)} variant="outline">
                          #{shift.shiftNumber}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{shift.siteName}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {shift.siteCode}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {shift.startTime && shift.endTime ? (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{shift.startTime} - {shift.endTime}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not set</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(shift.status)}>
                      {shift.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewShift(shift)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditShift(shift)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteShift(shift)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredShifts.length)} of {filteredShifts.length} results
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

      {/* Create Shift Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Production Shift</DialogTitle>
            <DialogDescription>
              Add a new shift schedule for a site
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="siteId">Site *</Label>
              <Select value={formData.siteId} onValueChange={(value) => setFormData({ ...formData, siteId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.name} ({site.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shiftNumber">Shift Number * (1-5)</Label>
              <Select
                value={formData.shiftNumber.toString()}
                onValueChange={(value) => setFormData({ ...formData, shiftNumber: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Shift 1</SelectItem>
                  <SelectItem value="2">Shift 2</SelectItem>
                  <SelectItem value="3">Shift 3</SelectItem>
                  <SelectItem value="4">Shift 4</SelectItem>
                  <SelectItem value="5">Shift 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shiftName">Shift Name *</Label>
              <Input
                id="shiftName"
                value={formData.shiftName}
                onChange={(e) => setFormData({ ...formData, shiftName: e.target.value })}
                placeholder="e.g., Morning Shift"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#295F58] hover:bg-[#295F58]/90" onClick={handleSubmitCreate}>
              Create Shift
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Shift Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Production Shift</DialogTitle>
            <DialogDescription>
              Update shift information
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-siteId">Site *</Label>
              <Select value={formData.siteId} onValueChange={(value) => setFormData({ ...formData, siteId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.name} ({site.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-shiftNumber">Shift Number * (1-5)</Label>
              <Input
                id="edit-shiftNumber"
                type="number"
                min="1"
                max="5"
                value={formData.shiftNumber}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-shiftName">Shift Name *</Label>
              <Input
                id="edit-shiftName"
                value={formData.shiftName}
                onChange={(e) => setFormData({ ...formData, shiftName: e.target.value })}
                placeholder="e.g., Morning Shift"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-startTime">Start Time</Label>
              <Input
                id="edit-startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-endTime">End Time</Label>
              <Input
                id="edit-endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#295F58] hover:bg-[#295F58]/90" onClick={handleSubmitEdit}>
              Update Shift
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Shift Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Shift Details</DialogTitle>
            <DialogDescription>
              Complete information about the production shift
            </DialogDescription>
          </DialogHeader>
          {selectedShift && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#E1EFEE]">
                  <Clock className="h-8 w-8 text-[#295F58]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedShift.shiftName}</h3>
                  <Badge className={getShiftNumberBadge(selectedShift.shiftNumber)} variant="outline">
                    Shift #{selectedShift.shiftNumber}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Site</Label>
                  <p className="font-medium">{selectedShift.siteName}</p>
                  <p className="text-xs text-muted-foreground font-mono">{selectedShift.siteCode}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Status</Label>
                  <div>
                    <Badge className={getStatusColor(selectedShift.status)}>
                      {selectedShift.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Start Time</Label>
                  <p className="font-medium">{selectedShift.startTime || "Not set"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">End Time</Label>
                  <p className="font-medium">{selectedShift.endTime || "Not set"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Created At</Label>
                  <p className="font-medium">
                    {new Date(selectedShift.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Shift ID</Label>
                  <p className="font-medium text-xs">{selectedShift.id}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-[#295F58] hover:bg-[#295F58]/90" onClick={() => {
              setIsViewDialogOpen(false);
              handleEditShift(selectedShift!);
            }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Shift
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold text-foreground">
                {selectedShift?.shiftName}
              </span>{" "}
              (Shift #{selectedShift?.shiftNumber}) from {selectedShift?.siteName}. All associated production records will be affected. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete Shift
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
