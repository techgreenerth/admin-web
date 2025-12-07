import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  UserPlus,
  UserMinus,
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

interface Site {
  id: string;
  siteCode: string;
  siteName: string;
  status: string;
  latitude: string;
  longitude: string;
  address: string;
  district?: string;
  state?: string;
  country: string;
  siteType?: string;
  capacity?: string;
  infrastructure?: string;
  sitePhotos: string[];
  createdAt: string;
  assignedUsers?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userCode: string;
  }>;
}

export default function Sites() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignUserDialogOpen, setIsAssignUserDialogOpen] = useState(false);
  const [isRevokeUserDialogOpen, setIsRevokeUserDialogOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    siteCode: "",
    siteName: "",
    latitude: "",
    longitude: "",
    address: "",
    district: "",
    state: "",
    country: "India",
    siteType: "",
    capacity: "",
    infrastructure: "",
    sitePhotos: [] as string[],
    status: "ACTIVE",
  });

  // Mock data - Replace with API call
  const sites: Site[] = [
    {
      id: "1",
      siteCode: "AP-001",
      siteName: "Green Valley Production Site",
      status: "ACTIVE",
      latitude: "28.61394",
      longitude: "77.20902",
      address: "Plot 123, Industrial Area",
      district: "New Delhi",
      state: "Delhi",
      country: "India",
      siteType: "Rural",
      capacity: "500 kg/day",
      infrastructure: "2 Kontikis, Storage Shed",
      sitePhotos: [],
      createdAt: "2024-01-15",
      assignedUsers: [
        {
          id: "u1",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          userCode: "USER-001",
        },
      ],
    },
    {
      id: "2",
      siteCode: "AP-002",
      siteName: "Eco Farm Biochar Unit",
      status: "ACTIVE",
      latitude: "19.07609",
      longitude: "72.87766",
      address: "Farm Road 45",
      district: "Mumbai",
      state: "Maharashtra",
      country: "India",
      siteType: "Urban",
      capacity: "300 kg/day",
      infrastructure: "1 Kontiki, Open Area",
      sitePhotos: [],
      createdAt: "2024-02-10",
      assignedUsers: [],
    },
    {
      id: "3",
      siteCode: "AP-003",
      siteName: "Carbon Capture Facility",
      status: "UNDER_MAINTENANCE",
      latitude: "13.08268",
      longitude: "80.27072",
      address: "Village Panchayat Area",
      district: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      siteType: "Rural",
      capacity: "700 kg/day",
      infrastructure: "3 Kontikis, Warehouse",
      sitePhotos: [],
      createdAt: "2024-03-20",
      assignedUsers: [],
    },
  ];

  // Mock users for assignment
  const availableUsers = [
    { id: "u1", name: "John Doe", userCode: "USER-001" },
    { id: "u2", name: "Jane Smith", userCode: "USER-002" },
    { id: "u3", name: "Mike Johnson", userCode: "USER-003" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "UNDER_MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter sites
  const filteredSites = sites.filter((site) => {
    const matchesSearch =
      site.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.siteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || site.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSites = filteredSites.slice(startIndex, endIndex);

  // Handlers
  const handleCreateSite = () => {
    setFormData({
      siteCode: "",
      siteName: "",
      latitude: "",
      longitude: "",
      address: "",
      district: "",
      state: "",
      country: "India",
      siteType: "",
      capacity: "",
      infrastructure: "",
      sitePhotos: [],
      status: "ACTIVE",
    });
    setIsCreateDialogOpen(true);
  };

  const handleViewSite = (site: Site) => {
    navigate(`/sites/${site.id}`);
  };

  const handleEditSite = (site: Site) => {
    setSelectedSite(site);
    setFormData({
      siteCode: site.siteCode,
      siteName: site.siteName,
      latitude: site.latitude,
      longitude: site.longitude,
      address: site.address,
      district: site.district || "",
      state: site.state || "",
      country: site.country,
      siteType: site.siteType || "",
      capacity: site.capacity || "",
      infrastructure: site.infrastructure || "",
      sitePhotos: site.sitePhotos,
      status: site.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteSite = (site: Site) => {
    setSelectedSite(site);
    setIsDeleteDialogOpen(true);
  };

  const handleAssignUser = (site: Site) => {
    setSelectedSite(site);
    setSelectedUserId("");
    setIsAssignUserDialogOpen(true);
  };

  const handleRevokeUser = (site: Site) => {
    setSelectedSite(site);
    setSelectedUserId("");
    setIsRevokeUserDialogOpen(true);
  };

  const handleSubmitCreate = () => {
    // TODO: Add API call to create site
    console.log("Creating site:", formData);
    setIsCreateDialogOpen(false);
  };

  const handleSubmitEdit = () => {
    // TODO: Add API call to update site
    console.log("Updating site:", selectedSite?.id, formData);
    setIsEditDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Add API call to delete site
    console.log("Deleting site:", selectedSite?.id);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmAssignUser = () => {
    // TODO: Add API call to assign user
    console.log("Assigning user:", selectedUserId, "to site:", selectedSite?.id);
    setIsAssignUserDialogOpen(false);
  };

  const handleConfirmRevokeUser = () => {
    // TODO: Add API call to revoke user
    console.log("Revoking user:", selectedUserId, "from site:", selectedSite?.id);
    setIsRevokeUserDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#295F58]">Artisan Pro Sites</h1>
          <p className="text-muted-foreground mt-1">
            Manage biochar production sites and user assignments
          </p>
        </div>
        <Button className="bg-[#295F58] hover:bg-[#295F58]/90" onClick={handleCreateSite}>
          <Plus className="h-4 w-4 mr-2" />
          Add Site
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <CardTitle className="text-lg">All Sites</CardTitle>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, code, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="UNDER_MAINTENANCE">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type & Capacity</TableHead>
                <TableHead>Assigned Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{site.siteName}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {site.siteCode}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                      <div className="text-sm">
                        <div>{site.district}, {site.state}</div>
                        <div className="text-xs text-muted-foreground">
                          {site.latitude}, {site.longitude}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{site.siteType || "N/A"}</div>
                      <div className="text-xs text-muted-foreground">
                        {site.capacity || "N/A"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="h-3 w-3" />
                      {site.assignedUsers?.length || 0}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(site.status)}>
                      {site.status.replace("_", " ")}
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
                        <DropdownMenuItem onClick={() => handleViewSite(site)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditSite(site)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAssignUser(site)}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign User
                        </DropdownMenuItem>
                        {site.assignedUsers && site.assignedUsers.length > 0 && (
                          <DropdownMenuItem onClick={() => handleRevokeUser(site)}>
                            <UserMinus className="h-4 w-4 mr-2" />
                            Revoke User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteSite(site)}>
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredSites.length)} of {filteredSites.length} results
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

      {/* Create Site Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Artisan Pro Site</DialogTitle>
            <DialogDescription>
              Add a new biochar production site to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="siteCode">Site Code *</Label>
              <Input
                id="siteCode"
                value={formData.siteCode}
                onChange={(e) => setFormData({ ...formData, siteCode: e.target.value })}
                placeholder="AP-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name *</Label>
              <Input
                id="siteName"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                placeholder="Enter site name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude * (5 decimals)</Label>
              <Input
                id="latitude"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="28.61394"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude * (5 decimals)</Label>
              <Input
                id="longitude"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="77.20902"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter full address"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="Enter district"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Enter state"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="India"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteType">Site Type</Label>
              <Select value={formData.siteType} onValueChange={(value) => setFormData({ ...formData, siteType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rural">Rural</SelectItem>
                  <SelectItem value="Urban">Urban</SelectItem>
                  <SelectItem value="Semi-Urban">Semi-Urban</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Production Capacity</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="e.g., 500 kg/day"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="infrastructure">Infrastructure</Label>
              <Textarea
                id="infrastructure"
                value={formData.infrastructure}
                onChange={(e) => setFormData({ ...formData, infrastructure: e.target.value })}
                placeholder="Describe available infrastructure"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="UNDER_MAINTENANCE">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#295F58] hover:bg-[#295F58]/90" onClick={handleSubmitCreate}>
              Create Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Site Dialog - Similar to Create */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Site</DialogTitle>
            <DialogDescription>
              Update site information
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-siteCode">Site Code *</Label>
              <Input
                id="edit-siteCode"
                value={formData.siteCode}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-siteName">Site Name *</Label>
              <Input
                id="edit-siteName"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                placeholder="Enter site name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-latitude">Latitude * (5 decimals)</Label>
              <Input
                id="edit-latitude"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="28.61394"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-longitude">Longitude * (5 decimals)</Label>
              <Input
                id="edit-longitude"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="77.20902"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-address">Address *</Label>
              <Textarea
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter full address"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-district">District</Label>
              <Input
                id="edit-district"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="Enter district"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-state">State</Label>
              <Input
                id="edit-state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Enter state"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-country">Country</Label>
              <Input
                id="edit-country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="India"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-siteType">Site Type</Label>
              <Select value={formData.siteType} onValueChange={(value) => setFormData({ ...formData, siteType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rural">Rural</SelectItem>
                  <SelectItem value="Urban">Urban</SelectItem>
                  <SelectItem value="Semi-Urban">Semi-Urban</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-capacity">Production Capacity</Label>
              <Input
                id="edit-capacity"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="e.g., 500 kg/day"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-infrastructure">Infrastructure</Label>
              <Textarea
                id="edit-infrastructure"
                value={formData.infrastructure}
                onChange={(e) => setFormData({ ...formData, infrastructure: e.target.value })}
                placeholder="Describe available infrastructure"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="UNDER_MAINTENANCE">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#295F58] hover:bg-[#295F58]/90" onClick={handleSubmitEdit}>
              Update Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Site Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Site Details</DialogTitle>
            <DialogDescription>
              Complete information about the artisan pro site
            </DialogDescription>
          </DialogHeader>
          {selectedSite && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Site Code</Label>
                  <p className="font-medium font-mono">{selectedSite.siteCode}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Site Name</Label>
                  <p className="font-medium">{selectedSite.siteName}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Status</Label>
                  <div>
                    <Badge className={getStatusColor(selectedSite.status)}>
                      {selectedSite.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Site Type</Label>
                  <p className="font-medium">{selectedSite.siteType || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">GPS Coordinates</Label>
                  <p className="font-medium text-sm">
                    {selectedSite.latitude}, {selectedSite.longitude}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Production Capacity</Label>
                  <p className="font-medium">{selectedSite.capacity || "N/A"}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <Label className="text-muted-foreground">Address</Label>
                  <p className="font-medium">{selectedSite.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSite.district}, {selectedSite.state}, {selectedSite.country}
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <Label className="text-muted-foreground">Infrastructure</Label>
                  <p className="font-medium">{selectedSite.infrastructure || "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Created At</Label>
                  <p className="font-medium">
                    {new Date(selectedSite.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Site ID</Label>
                  <p className="font-medium text-xs">{selectedSite.id}</p>
                </div>
              </div>

              {/* Assigned Users Section */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Assigned Users ({selectedSite.assignedUsers?.length || 0})</Label>
                {selectedSite.assignedUsers && selectedSite.assignedUsers.length > 0 ? (
                  <div className="border rounded-lg divide-y">
                    {selectedSite.assignedUsers.map((user) => (
                      <div key={user.id} className="p-3 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">{user.userCode}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center border rounded-lg">
                    No users assigned to this site
                  </p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button className="bg-[#295F58] hover:bg-[#295F58]/90" onClick={() => {
              setIsViewDialogOpen(false);
              handleEditSite(selectedSite!);
            }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Site
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
              This will permanently delete the site{" "}
              <span className="font-semibold text-foreground">
                {selectedSite?.siteName}
              </span>{" "}
              ({selectedSite?.siteCode}). All associated data including kontikis, production shifts, and records will be affected. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete Site
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Assign User Dialog */}
      <Dialog open={isAssignUserDialogOpen} onOpenChange={setIsAssignUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign User to Site</DialogTitle>
            <DialogDescription>
              Select a user to assign to {selectedSite?.siteName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="assignUser">Select User *</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a user" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.userCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#295F58] hover:bg-[#295F58]/90"
              onClick={handleConfirmAssignUser}
              disabled={!selectedUserId}
            >
              Assign User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke User Dialog */}
      <Dialog open={isRevokeUserDialogOpen} onOpenChange={setIsRevokeUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke User from Site</DialogTitle>
            <DialogDescription>
              Select a user to revoke from {selectedSite?.siteName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="revokeUser">Select User *</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a user" />
                </SelectTrigger>
                <SelectContent>
                  {selectedSite?.assignedUsers?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName} ({user.userCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRevokeUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleConfirmRevokeUser}
              disabled={!selectedUserId}
            >
              Revoke User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
