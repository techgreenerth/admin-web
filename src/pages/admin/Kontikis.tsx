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
  Flame,
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

import { useSites } from "@/contexts/siteContext";
import { useKontikis } from "@/contexts/kontikisContext";
import { Kontiki } from "@/types/kontikis.types";

export default function Kontikis() {
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
  const [selectedKontiki, setSelectedKontiki] = useState<Kontiki | null>(null);

  const { kontikis, createKontiki,updateKontiki,deleteKontiki } = useKontikis();
 const { sites, isLoading: isSitesLoading } = useSites();
const [errors, setErrors] = useState<any>({});

  // Form state
  const [formData, setFormData] = useState({
    siteId: "",
    kontikiCode: "",
    kontikiName: "",
    capacity: "",
    specifications: "",
    status: "ACTIVE",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

   const validateForm = () => {
    const newErrors: any = {};

    // Kontikis Code
    if (!formData.kontikiCode.trim()) {
      newErrors.kontikiCode = "kontiki Code is required";
    }

    // Kontikis Name (cannot be only numbers)
    if (!formData.kontikiName.trim()) {
      newErrors.kontikiName = "kontiki Name is required";
    } else if (/^\d+$/.test(formData.kontikiName)) {
      newErrors.kontikiName = "kontiki Name cannot be only numbers";
    }
    // Capacity (number only)
    if (formData.capacity && !/^\d+(\.\d+)?$/.test(formData.capacity)) {
      newErrors.capacity = "Production capacity must be a number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Filter kontikis
  const filteredKontikis = kontikis.filter((kontiki) => {
    const matchesSearch =
      kontiki.kontikiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kontiki.kontikiCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kontiki.site.siteName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || kontiki.status === statusFilter;
    const matchesSite = siteFilter === "all" || kontiki.siteId === siteFilter;
    return matchesSearch && matchesStatus && matchesSite;
  });

  // Pagination
  const totalPages = Math.ceil(filteredKontikis.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedKontikis = filteredKontikis.slice(startIndex, endIndex);

  // Handlers
  const handleCreateKontiki = () => {
    setFormData({
      siteId: "",
      kontikiCode: "",
      kontikiName: "",
      capacity: "",
      specifications: "",
      status: "ACTIVE",
    });
     setErrors({});
    setIsCreateDialogOpen(true);
  };

  const handleViewKontiki = (kontiki: Kontiki) => {
    setSelectedKontiki(kontiki);
    setIsViewDialogOpen(true);
  };

  const handleEditKontiki = (kontiki: Kontiki) => {
    setSelectedKontiki(kontiki);
    setFormData({
      siteId: kontiki.siteId,
      kontikiCode: kontiki.kontikiCode,
      kontikiName: kontiki.kontikiName,
      capacity: kontiki.capacity || "",
      specifications: kontiki.specifications || "",
      status: kontiki.status,
    });
    setErrors({});
    setIsEditDialogOpen(true);
  };

  const handleDeleteKontiki = (kontiki: Kontiki) => {
    setSelectedKontiki(kontiki);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitCreate = async () => {
    if (!validateForm()) return;
    try {
      await createKontiki({
        siteId: formData.siteId,
        kontikiCode: formData.kontikiCode,
        kontikiName: formData.kontikiName,
        capacity: formData.capacity || undefined,
        specifications: formData.specifications || undefined,
      });

      setIsCreateDialogOpen(false);

      
    } catch (error) {
      console.error("Failed to create kontiki", error);
    }
  };

const handleSubmitEdit = async () => {
  if (!validateForm()) return;

  try {
    await updateKontiki(selectedKontiki.id, {
      
      kontikiName: formData.kontikiName,
      capacity: formData.capacity || undefined,
      specifications: formData.specifications || undefined,
      status: formData.status as "ACTIVE" | "INACTIVE" | "MAINTENANCE",
    });

    setIsEditDialogOpen(false);
    setSelectedKontiki(null);
  } catch (error) {
    console.error("Failed to update kontiki", error);
  }
};


  const handleConfirmDelete = async () => {
  if (!selectedKontiki) return;

  try {
    await deleteKontiki(selectedKontiki.id);

    setIsDeleteDialogOpen(false);
    setSelectedKontiki(null);
  } catch (error) {
    console.error("Failed to delete kontiki", error);
  }
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#295F58]">Kontikis</h1>
          <p className="text-muted-foreground mt-1">
            Manage biochar production kilns and equipment
          </p>
        </div>
        <Button
          className="bg-[#295F58] hover:bg-[#295F58]/90"
          onClick={handleCreateKontiki}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Kontiki
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <CardTitle className="text-lg">All Kontikis</CardTitle>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, code, site..."
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
                      {site.siteName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kontiki</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedKontikis.map((kontiki) => (
                <TableRow key={kontiki.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E1EFEE]">
                        <Flame className="h-4 w-4 text-[#295F58]" />
                      </div>
                      <div>
                        <div className="font-medium">{kontiki.kontikiName}</div>
                        <div className="text-xs text-muted-foreground">
                          {kontiki.kontikiCode}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{kontiki.site.siteCode}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {kontiki.site.siteCode}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{kontiki.capacity || "N/A"}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(kontiki.status)}>
                      {kontiki.status}
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
                          onClick={() => handleViewKontiki(kontiki)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditKontiki(kontiki)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteKontiki(kontiki)}
                        >
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
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredKontikis.length)} of{" "}
              {filteredKontikis.length} results
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

      {/* Create Kontiki Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Kontiki</DialogTitle>
            <DialogDescription>
              Add a new biochar production kiln
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Site */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="siteId">Site *</Label>
              <Select
                value={formData.siteId}
                onValueChange={(value) =>
                  setFormData({ ...formData, siteId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      isSitesLoading ? "Loading sites..." : "Select site"
                    }
                  />
                </SelectTrigger>

                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.siteName} ({site.siteCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Kontiki Code */}
            <div className="space-y-2">
              <Label htmlFor="kontikiCode">Kontiki Code *</Label>
              <Input
                id="kontikiCode"
                value={formData.kontikiCode}
                onChange={(e) =>
                  setFormData({ ...formData, kontikiCode: e.target.value })
                }
                placeholder="Kon-tiki 1"
              />
              {errors.kontikiCode && <p className="text-red-500 text-sm">{errors.kontikiCode}</p>}
            </div>

            {/* Kontiki Name */}
            <div className="space-y-2">
              <Label htmlFor="kontikiName">Kontiki Name *</Label>
              <Input
                id="kontikiName"
                value={formData.kontikiName}
                onChange={(e) =>
                  setFormData({ ...formData, kontikiName: e.target.value })
                }
                placeholder="Enter kontiki name"
              />
               {errors.kontikiName && <p className="text-red-500 text-sm">{errors.kontikiName}</p>}
            
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                placeholder="e.g., 200 kg/batch"
              />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
            
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as "ACTIVE" | "INACTIVE" | "MAINTENANCE",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Specifications */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="specifications">Specifications</Label>
              <Textarea
                id="specifications"
                value={formData.specifications}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: e.target.value,
                  })
                }
                placeholder="Describe kontiki specifications"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#295F58] hover:bg-[#295F58]/90"
              onClick={handleSubmitCreate}
              disabled={
                !formData.siteId ||
                !formData.kontikiCode ||
                !formData.kontikiName
              }
            >
              Create Kontiki
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Kontiki Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Kontiki</DialogTitle>
            <DialogDescription>Update kontiki information</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-siteId">Site *</Label>
              <Select
                value={formData.siteId}
                onValueChange={(value) =>
                  setFormData({ ...formData, siteId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.siteName} ({site.siteCode})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-kontikiCode">Kontiki Code *</Label>
              <Input
                id="edit-kontikiCode"
                value={formData.kontikiCode}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-kontikiName">Kontiki Name *</Label>
              <Input
                id="edit-kontikiName"
                value={formData.kontikiName}
                onChange={(e) =>
                  setFormData({ ...formData, kontikiName: e.target.value })
                }
                placeholder="Enter kontiki name"
              />
              {errors.kontikiName && <p className="text-red-500 text-sm">{errors.kontikiName}</p>}
            
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-capacity">Capacity</Label>
              <Input
                id="edit-capacity"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                placeholder="e.g., 200 kg/batch"
              />
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
            
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-specifications">Specifications</Label>
              <Textarea
                id="edit-specifications"
                value={formData.specifications}
                onChange={(e) =>
                  setFormData({ ...formData, specifications: e.target.value })
                }
                placeholder="Describe kontiki specifications"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#295F58] hover:bg-[#295F58]/90"
              onClick={handleSubmitEdit}
            >
              Update Kontiki
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Kontiki Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Kontiki Details</DialogTitle>
            <DialogDescription>
              Complete information about the kontiki
            </DialogDescription>
          </DialogHeader>
          {selectedKontiki && (
            <div className="space-y-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#E1EFEE]">
                  <Flame className="h-8 w-8 text-[#295F58]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedKontiki.kontikiName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedKontiki.kontikiCode}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Site</Label>
                  <p className="font-medium">{selectedKontiki.site.siteName}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedKontiki.site.siteCode}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Status</Label>
                  <div>
                    <Badge className={getStatusColor(selectedKontiki.status)}>
                      {selectedKontiki.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Capacity</Label>
                  <p className="font-medium">
                    {selectedKontiki.capacity || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Created At</Label>
                  <p className="font-medium">
                    {new Date(selectedKontiki.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-1 col-span-2">
                  <Label className="text-muted-foreground">
                    Specifications
                  </Label>
                  <p className="font-medium">
                    {selectedKontiki.specifications || "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Kontiki ID</Label>
                  <p className="font-medium text-xs">{selectedKontiki.id}</p>
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
            <Button
              className="bg-[#295F58] hover:bg-[#295F58]/90"
              onClick={() => {
                setIsViewDialogOpen(false);
                handleEditKontiki(selectedKontiki!);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Kontiki
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the kontiki{" "}
              <span className="font-semibold text-foreground">
                {selectedKontiki?.kontikiName}
              </span>{" "}
              ({selectedKontiki?.kontikiCode}). All associated production
              records will be affected. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete Kontiki
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
