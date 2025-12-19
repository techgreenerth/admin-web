import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSites } from "@/contexts/siteContext";
import { userService } from "@/lib/api/user.service";
import { Site, AssignedUser } from "@/types/site.types";
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
import { AssignUserDialog } from "@/components/sites/AssignUserDialog";
import { ViewSiteDetailsDialog } from "@/components/sites/ViewSiteDetailsDialog";
import { EditSiteDialog } from "@/components/sites/EditSiteDialog";
import { CreateSiteDialog } from "@/components/sites/CreateSiteDialog";
import { RevokeUserDialog } from "@/components/sites/RevokeUserDialog";
import { log } from "console";

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
  const [errors, setErrors] = useState<any>({});
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fixed: Changed type to match AssignedUser interface
  const [assignedUsers, setAssignedUsers] = useState<AssignedUser[]>([]);

  const [availableUsers, setAvailableUsers] = useState<any[]>([]);

  const {
    sites,
    isLoading,
    createSite,
    deleteSite,
    assignUserToSite,
    revokeUserFromSite,
    updateSite,
    fetchSites,
    getSiteById
  } = useSites();

  // Refresh data when navigating to this page
  useEffect(() => {
    fetchSites();
  }, []);

  // Fetch Users in Drop Down for Assigning
  const fetchUsersForAssignment = async () => {
    try {
      const response = await userService.getAll({
        page: 1,
        limit: 100, // enough for dropdown
        status: "ACTIVE",
      });

      setAvailableUsers(response.data);
    } catch (error: any) {
      console.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  // Fixed: Changed setAssignedUsers(user) to setAssignedUsers(users)
  const fetchAssignedUsers = async (siteId: string) => {
    try {
      const site = await getSiteById(siteId);

      const users =
        site.userAssignments?.map((ua) => ua.user) ?? [];

      setAssignedUsers(users);
      console.log("Mapped users:", users);
      console.log(assignedUsers) // Fixed: was setAssignedUsers(user)
    } catch (error: any) {
      console.error(
        error.response?.data?.message || "Failed to fetch assigned users"
      );
    }
  };

 
  useEffect(() => {
    if (isAssignUserDialogOpen) {
      fetchUsersForAssignment();
    }
  }, [isAssignUserDialogOpen]);



  const validateForm = () => {
    const newErrors: any = {};

    // Site Code
    if (!formData.siteCode.trim()) {
      newErrors.siteCode = "Site Code is required";
    }

    // Site Name (cannot be only numbers)
    if (!formData.siteName.trim()) {
      newErrors.siteName = "Site Name is required";
    } else if (/^\d+$/.test(formData.siteName)) {
      newErrors.siteName = "Site Name cannot be only numbers";
    }

    // Latitude
    if (!formData.latitude) {
      newErrors.latitude = "Latitude is required";
    } else if (!/^-?\d+(\.\d{1,5})?$/.test(formData.latitude)) {
      newErrors.latitude = "Latitude must be a decimal with up to 5 places";
    }

    // Longitude
    if (!formData.longitude) {
      newErrors.longitude = "Longitude is required";
    } else if (!/^-?\d+(\.\d{1,5})?$/.test(formData.longitude)) {
      newErrors.longitude = "Longitude must be a decimal with up to 5 places";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Capacity (number only)
    if (formData.capacity && !/^\d+(\.\d+)?$/.test(formData.capacity)) {
      newErrors.capacity = "Production capacity must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const normalizeLower = (value: unknown) => {
    if (typeof value === "string") return value.toLowerCase();
    if (value == null) return "";
    return String(value).toLowerCase();
  };

  // Filter sites
  const filteredSites = sites.filter((site) => {
    const q = searchQuery.trim().toLowerCase();

    const matchesSearch =
      q.length === 0 ||
      normalizeLower(site.siteName).includes(q) ||
      normalizeLower(site.siteCode).includes(q) ||
      normalizeLower(site.address).includes(q);

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
    setErrors({});
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
    setErrors({});
    setIsEditDialogOpen(true);
  };

  const handleSubmitEdit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await updateSite(selectedSite.id, {
        siteName: formData.siteName,
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address,
        district: formData.district,
        state: formData.state,
        country: formData.country,
        siteType: formData.siteType,
        capacity: formData.capacity,
        infrastructure: formData.infrastructure,
        sitePhotos: formData.sitePhotos,
        status: formData.status,
      });

      setIsEditDialogOpen(false);
      setSelectedSite(null);
      // Page will auto-refresh via context
    } catch (error: any) {
      console.error(error.response?.data?.message || "Failed to update site");
    } finally {
      setIsSubmitting(false);
    }
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

  const handleRevokeUser = async (site: Site) => {
    setSelectedSite(site);
    setSelectedUserId("");
    await fetchAssignedUsers(site.id);
    setIsRevokeUserDialogOpen(true);
  };

  const handleSubmitCreate = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await createSite(formData);
      setIsCreateDialogOpen(false);
      setErrors({});
      // Page will auto-refresh via context
    } catch (error) {
      console.error("Failed to create site", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSite(selectedSite.id);
      setIsDeleteDialogOpen(false);
      setSelectedSite(null);
    } catch (error: any) {
    console.error("Failed to delete site:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
  };

  const handleConfirmAssignUser = async () => {
    try {
      setIsSubmitting(true);
      await assignUserToSite(selectedSite.id, {
        userId: selectedUserId,
      });
      setIsAssignUserDialogOpen(false);
      setSelectedUserId("");
      setSelectedSite(null);
    } catch (error) {
      console.error("Failed to assign user", error);
    }
    finally {
    setIsSubmitting(false);
  }
  };

  const handleConfirmRevokeUser = async () => {
    try {
      setIsSubmitting(true);
      await revokeUserFromSite(selectedSite.id, {
        userId: selectedUserId,
      });
      setIsRevokeUserDialogOpen(false);
      setSelectedUserId("");
      setSelectedSite(null);
      // Refresh sites to update the count
      await fetchSites();
    } catch (error) {
      console.error("Failed to revoke user", error);
    }
    finally {
    setIsSubmitting(false);
  }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#295F58]">
           Artisan Pro Sites
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
           Manage biochar production sites and user assignments
          </p>
        </div>

        {/* Fixed: Changed button text from "Add User" to "Add Site" */}
        <Button
          onClick={handleCreateSite}
          className="w-full md:w-auto bg-[#295F58] hover:bg-[#295F58]/90"
        >
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
                  <SelectItem value="UNDER_MAINTENANCE">
                    Under Maintenance
                  </SelectItem>
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
                <TableHead>No. of Kon Tikis</TableHead>
                <TableHead>Assigned Users</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Loading Sites...
                  </TableCell>
                </TableRow>
              ) : sites.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No Sites found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSites.map((site) => (
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
                          <div>
                            {site.district}, {site.state}
                          </div>
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
                      <div className="text-sm font-medium">
                        {site._count?.kontikis ?? 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-3 w-3" />
                        {site._count?.userAssignments ?? 0}
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
                          <DropdownMenuItem
                            onClick={() => handleViewSite(site)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditSite(site)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAssignUser(site)}
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Assign User
                          </DropdownMenuItem>
                          {site._count?.userAssignments > 0 && (
                              <DropdownMenuItem
                                onClick={() => handleRevokeUser(site)}
                              >
                                <UserMinus className="h-4 w-4 mr-2" />
                                Revoke User
                              </DropdownMenuItem>
                            )}
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteSite(site)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredSites.length)} of{" "}
              {filteredSites.length} results
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

      {/* Create Site Dialog */}
      <CreateSiteDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onSubmit={handleSubmitCreate}
        isSubmitting={isSubmitting}
      />

      {/* Edit Site Dialog  */}
      <EditSiteDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        onCancel={() => setIsEditDialogOpen(false)}
        onSubmit={handleSubmitEdit}
        isSubmitting={isSubmitting}
      />

      {/* View Site Details Dialog */}
      <ViewSiteDetailsDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        site={selectedSite}
        getStatusColor={getStatusColor}
        onClose={() => setIsViewDialogOpen(false)}
        onEdit={() => {
          setIsViewDialogOpen(false);
          handleEditSite(selectedSite!);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the site{" "}
              <span className="font-semibold text-foreground">
                {selectedSite?.siteName}
              </span>{" "}
              ({selectedSite?.siteCode}). All associated data including
              kontikis, production shifts, and records will be affected. This
              action cannot be undone.
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
      <AssignUserDialog
        open={isAssignUserDialogOpen}
        onOpenChange={setIsAssignUserDialogOpen}
        siteName={selectedSite?.siteName}
        availableUsers={availableUsers}
        selectedUserId={selectedUserId}
        onUserChange={setSelectedUserId}
        onCancel={() => setIsAssignUserDialogOpen(false)}
        onConfirm={handleConfirmAssignUser}
        isSubmitting={isSubmitting}
      />

      {/* Revoke User Dialog */}
      <RevokeUserDialog
        open={isRevokeUserDialogOpen}
        onOpenChange={setIsRevokeUserDialogOpen}
        selectedSite={selectedSite}
        assignedUsers={assignedUsers} 
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        onConfirm={handleConfirmRevokeUser}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}