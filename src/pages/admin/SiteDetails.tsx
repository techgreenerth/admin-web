import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  MapPin,
  Users,
  Upload,
  Download,
  Eye,
  Folder,
  FolderOpen,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  createdAt: string;
  assignedUsers?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    userCode: string;
  }>;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  type: "image" | "video" | "document";
}

interface UploadFolder {
  id: string;
  name: string;
  required: boolean;
  files: UploadedFile[];
}

export default function SiteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - Replace with API call
  const site: Site = {
    id: id || "1",
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
  };

  // Upload folders with initial data
  const [uploadFolders, setUploadFolders] = useState<UploadFolder[]>([
    { id: "1", name: "Training Video", required: true, files: [] },
    { id: "2", name: "Site Video", required: true, files: [] },
    { id: "3", name: "Monitoring Video", required: true, files: [] },
    { id: "4", name: "Bulk Density Video", required: true, files: [] },
    { id: "5", name: "Labor List", required: true, files: [] },
    { id: "6", name: "Internal Inspection Report", required: true, files: [] },
    { id: "7", name: "Farmer Declaration Form", required: true, files: [] },
    { id: "8", name: "Labor Payment Proofs", required: true, files: [] },
    { id: "9", name: "Biochar Distribution List", required: true, files: [] },
    { id: "10", name: "Biochar Distribution Photos", required: true, files: [] },
    { id: "11", name: "Labor Consent Forms", required: true, files: [] },
  ]);

  const [selectedFolder, setSelectedFolder] = useState<UploadFolder | null>(null);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isViewFileDialogOpen, setIsViewFileDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
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
    status: site.status,
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

  const handleOpenFolder = (folder: UploadFolder) => {
    setSelectedFolder(folder);
    setIsFolderDialogOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedFolder || !event.target.files) return;

    const files = Array.from(event.target.files);
    const newFiles: UploadedFile[] = files.map((file, index) => ({
      id: `${selectedFolder.id}-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      uploadedAt: new Date().toISOString(),
      uploadedBy: "Current User",
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
        ? "video"
        : "document",
    }));

    setUploadFolders((prev) =>
      prev.map((folder) =>
        folder.id === selectedFolder.id
          ? { ...folder, files: [...folder.files, ...newFiles] }
          : folder
      )
    );
  };

  const handleDeleteFile = (fileId: string) => {
    if (!selectedFolder) return;

    setUploadFolders((prev) =>
      prev.map((folder) =>
        folder.id === selectedFolder.id
          ? { ...folder, files: folder.files.filter((f) => f.id !== fileId) }
          : folder
      )
    );

    setSelectedFolder((prev) =>
      prev ? { ...prev, files: prev.files.filter((f) => f.id !== fileId) } : null
    );
  };

  const handleViewFile = (file: UploadedFile) => {
    setSelectedFile(file);
    setIsViewFileDialogOpen(true);
  };

  const handleDownloadFile = (file: UploadedFile) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    link.click();
  };

  const handleSubmitEdit = () => {
    // TODO: Add API call to update site
    console.log("Updating site:", site.id, formData);
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/sites")}
            className="hover:bg-[#295F58]/10"
          >
            <ArrowLeft className="h-5 w-5 text-[#295F58]" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#295F58]">{site.siteName}</h1>
            <p className="text-muted-foreground mt-1">
              Site Code: <span className="font-mono">{site.siteCode}</span>
            </p>
          </div>
        </div>
        <Button
          className="bg-[#295F58] hover:bg-[#295F58]/90"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Site
        </Button>
      </div>

      {/* Site Details Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Site Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Status</Label>
              <div>
                <Badge className={getStatusColor(site.status)}>
                  {site.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Site Type</Label>
              <p className="font-medium text-sm">{site.siteType || "N/A"}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Production Capacity</Label>
              <p className="font-medium text-sm">{site.capacity || "N/A"}</p>
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-muted-foreground text-xs">GPS Coordinates</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium text-sm font-mono">
                  {site.latitude}, {site.longitude}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Created At</Label>
              <p className="font-medium text-sm">
                {new Date(site.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-1 col-span-3">
              <Label className="text-muted-foreground text-xs">Address</Label>
              <p className="font-medium text-sm">{site.address}</p>
              <p className="text-sm text-muted-foreground">
                {site.district}, {site.state}, {site.country}
              </p>
            </div>
            <div className="space-y-1 col-span-3">
              <Label className="text-muted-foreground text-xs">Infrastructure</Label>
              <p className="font-medium text-sm">{site.infrastructure || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assigned Users Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-[#295F58]" />
              Assigned Users ({site.assignedUsers?.length || 0})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {site.assignedUsers && site.assignedUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {site.assignedUsers.map((user) => (
                <div
                  key={user.id}
                  className="border rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {user.userCode}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No users assigned to this site
            </p>
          )}
        </CardContent>
      </Card>

      {/* Required Uploads Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#295F58]" />
            Required Document Uploads
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            All uploads are mandatory. Click on a folder to upload files.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadFolders.map((folder) => {
              const isUploaded = folder.files.length > 0;
              return (
                <div
                  key={folder.id}
                  onClick={() => handleOpenFolder(folder)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                    isUploaded
                      ? "border-green-500 bg-green-50 hover:bg-green-100"
                      : "border-red-500 bg-red-50 hover:bg-red-100"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {isUploaded ? (
                        <FolderOpen className="h-6 w-6 text-green-600 mt-0.5" />
                      ) : (
                        <Folder className="h-6 w-6 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{folder.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {folder.files.length} file{folder.files.length !== 1 ? "s" : ""}{" "}
                          uploaded
                        </p>
                      </div>
                    </div>
                    {isUploaded ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Folder Dialog */}
      <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-[#295F58]" />
              {selectedFolder?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Upload Button */}
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-sm font-medium">
                  {selectedFolder?.files.length || 0} file(s) uploaded
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload images, videos, or documents
                </p>
              </div>
              <div className="relative">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
                />
                <Button className="bg-[#295F58] hover:bg-[#295F58]/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </div>

            {/* Files List */}
            {selectedFolder && selectedFolder.files.length > 0 ? (
              <div className="space-y-2">
                {selectedFolder.files.map((file) => (
                  <div
                    key={file.id}
                    className="border rounded-lg p-3 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.size} • Uploaded {new Date(file.uploadedAt).toLocaleString()} by{" "}
                        {file.uploadedBy}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewFile(file)}
                        className="hover:bg-[#295F58]/10"
                      >
                        <Eye className="h-4 w-4 text-[#295F58]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadFile(file)}
                        className="hover:bg-[#295F58]/10"
                      >
                        <Download className="h-4 w-4 text-[#295F58]" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFile(file.id)}
                        className="hover:bg-red-50"
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed rounded-lg">
                <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No files uploaded yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click "Upload Files" to add documents
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFolderDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View File Dialog */}
      <Dialog open={isViewFileDialogOpen} onOpenChange={setIsViewFileDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {selectedFile && (
              <div className="space-y-4">
                {selectedFile.type === "image" ? (
                  <img
                    src={selectedFile.url}
                    alt={selectedFile.name}
                    className="w-full h-auto rounded-lg border"
                  />
                ) : selectedFile.type === "video" ? (
                  <video
                    controls
                    className="w-full h-auto rounded-lg border"
                    src={selectedFile.url}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Preview not available for this file type
                    </p>
                    <Button
                      className="mt-4 bg-[#295F58] hover:bg-[#295F58]/90"
                      onClick={() => handleDownloadFile(selectedFile)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download File
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewFileDialogOpen(false)}>
              Close
            </Button>
            {selectedFile && (
              <Button
                className="bg-[#295F58] hover:bg-[#295F58]/90"
                onClick={() => handleDownloadFile(selectedFile)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Site Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Site</DialogTitle>
            <DialogDescription>Update site information</DialogDescription>
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
    </div>
  );
}
