import { useState, useEffect } from "react";
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
  Loader2,
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
import { useSites } from "@/contexts/siteContext";
import { Site, SiteDocument, DocumentType } from "@/types/site.types";
import { sitesService } from "@/lib/api/sites.service";
import { toast } from "react-hot-toast";

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
  documentType: DocumentType;
  required: boolean;
  files: UploadedFile[];
}

export default function SiteDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSiteById, updateSite, isLoading } = useSites();
  const [site, setSite] = useState<Site | null>(null);
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Upload folders with initial data
  const [uploadFolders, setUploadFolders] = useState<UploadFolder[]>([
    {
      id: "1",
      name: "Training Video",
      documentType: "TRAINING_VIDEO",
      required: true,
      files: [],
    },
    {
      id: "2",
      name: "Site Video",
      documentType: "SITE_VIDEO",
      required: true,
      files: [],
    },
    {
      id: "3",
      name: "Monitoring Video",
      documentType: "MONITORING_VIDEO",
      required: true,
      files: [],
    },
    {
      id: "4",
      name: "Bulk Density Video",
      documentType: "BULK_DENSITY_VIDEO",
      required: true,
      files: [],
    },
    {
      id: "5",
      name: "Labor List",
      documentType: "LABOR_LIST",
      required: true,
      files: [],
    },
    {
      id: "6",
      name: "Internal Inspection Report",
      documentType: "INTERNAL_INSPECTION_REPORT",
      required: true,
      files: [],
    },
    {
      id: "7",
      name: "Farmer Declaration Form",
      documentType: "FARMER_DECLARATION_FORM",
      required: true,
      files: [],
    },
    {
      id: "8",
      name: "Labor Payment Proofs",
      documentType: "LABOR_PAYMENT_PROOFS",
      required: true,
      files: [],
    },
    {
      id: "9",
      name: "Biochar Distribution List",
      documentType: "BIOCHAR_DISTRIBUTION_LIST",
      required: true,
      files: [],
    },
    {
      id: "10",
      name: "Biochar Distribution Photos",
      documentType: "BIOCHAR_DISTRIBUTION_PHOTOS",
      required: true,
      files: [],
    },
    {
      id: "11",
      name: "Labor Consent Forms",
      documentType: "LABOR_CONSENT_FORMS",
      required: true,
      files: [],
    },
  ]);

  // Training folders
  const [trainingFolders, setTrainingFolders] = useState<UploadFolder[]>([
    {
      id: "t1",
      name: "Biochar Production Training",
      documentType: "BIOCHAR_PRODUCTION_TRAINING",
      required: true,
      files: [],
    },
    {
      id: "t2",
      name: "DMRV Training",
      documentType: "DMRV_TRAINING",
      required: true,
      files: [],
    },
    {
      id: "t3",
      name: "Safety Training",
      documentType: "SAFETY_TRAINING",
      required: true,
      files: [],
    },
    {
      id: "t4",
      name: "Training Complete Declaration",
      documentType: "TRAINING_COMPLETE_DECLARATION",
      required: true,
      files: [],
    },
  ]);

  // Internal uploads folder
  const [internalUploadsFolders, setInternalUploadsFolders] = useState<
    UploadFolder[]
  >([
    {
      id: "i1",
      name: "Internal Uploads",
      documentType: "INTERNAL_UPLOADS",
      required: true,
      files: [],
    },
  ]);

  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);

const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
const [selectedFolderType, setSelectedFolderType] = useState<
  "upload" | "training" | "internal"
>("upload");


const selectedFolder = (() => {
  if (!selectedFolderId) return null;

  const source =
    selectedFolderType === "upload"
      ? uploadFolders
      : selectedFolderType === "training"
      ? trainingFolders
      : internalUploadsFolders;

  return source.find((f) => f.id === selectedFolderId) ?? null;
})();

const handleOpenFolder = (
  folder: UploadFolder,
  folderType: "upload" | "training" | "internal"
) => {
  setSelectedFolderId(folder.id);
  setSelectedFolderType(folderType);
  setIsFolderDialogOpen(true);
};

  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isViewFileDialogOpen, setIsViewFileDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
    siteCode: "",
    siteName: "",
    latitude: "",
    longitude: "",
    address: "",
    district: "",
    state: "",
    country: "",
    siteType: "",
    capacity: "",
    infrastructure: "",
    status: "",
  });

  // Helper function to convert SiteDocument to UploadedFile
  const convertToUploadedFile = (doc: SiteDocument): UploadedFile => {
    const getFileType = (fileName: string): "image" | "video" | "document" => {
      const ext = fileName.toLowerCase().split(".").pop() || "";
      if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
      if (["mp4", "avi", "mov", "wmv"].includes(ext)) return "video";
      return "document";
    };

    // Handle uploadedAt which might be an object or string
    const uploadedAtStr =
      typeof doc.uploadedAt === "string"
        ? doc.uploadedAt
        : new Date().toISOString();

    // Handle uploadedBy which is an object
    const uploadedByStr = doc.uploadedBy
      ? `${doc.uploadedBy.firstName} ${doc.uploadedBy.lastName}`
      : "System";

    return {
      id: doc.id,
      name: doc.fileName,
      size: doc.fileSize ? `${(doc.fileSize / 1024).toFixed(2)} KB` : "Unknown",
      uploadedAt: uploadedAtStr,
      uploadedBy: uploadedByStr,
      url: doc.fileUrl,
      type: getFileType(doc.fileName),
    };
  };

  // Load site documents
  const loadSiteDocuments = async (siteId: string) => {
    try {
      setIsLoadingDocuments(true);
      const documents = await sitesService.getSiteDocuments({ siteId });

      // Group documents by type
      const documentsByType = documents.reduce((acc, doc) => {
        if (!acc[doc.documentType]) acc[doc.documentType] = [];
        acc[doc.documentType].push(convertToUploadedFile(doc));
        return acc;
      }, {} as Record<DocumentType, UploadedFile[]>);

      // Update upload folders
      setUploadFolders((prev) =>
        prev.map((folder) => ({
          ...folder,
          files: documentsByType[folder.documentType] || [],
        }))
      );

      // Update training folders
      setTrainingFolders((prev) =>
        prev.map((folder) => ({
          ...folder,
          files: documentsByType[folder.documentType] || [],
        }))
      );

      // Update internal folders
      setInternalUploadsFolders((prev) =>
        prev.map((folder) => ({
          ...folder,
          files: documentsByType[folder.documentType] || [],
        }))
      );
    } catch (error) {
      console.error("Failed to load site documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getSiteById(id);
      setSite(data);
      setFormData({
        siteCode: data.siteCode,
        siteName: data.siteName,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        district: data.district ?? "",
        state: data.state ?? "",
        country: data.country,
        siteType: data.siteType ?? "",
        capacity: data.capacity ?? "",
        infrastructure: data.infrastructure ?? "",
        status: data.status,
      });

      // Load documents
      await loadSiteDocuments(id);
    })();
  }, [id]);

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



  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!selectedFolder || !event.target.files || !site) return;

    const files = Array.from(event.target.files);

    try {
      setIsUploadingFiles(true);
      toast.loading(`Uploading ${files.length} file(s)...`, {
        id: "upload-docs",
      });

      // Upload files to API
      const uploadPromises = files.map((file) =>
        sitesService.uploadSiteDocument(
          site.id,
          selectedFolder.documentType,
          file
        )
      );

      await Promise.all(uploadPromises);

      // Reload documents from API
      await loadSiteDocuments(site.id);

      // Update selected folder with new files
      const updatedFolder = [
        ...uploadFolders,
        ...trainingFolders,
        ...internalUploadsFolders,
      ].find((f) => f.id === selectedFolder.id);
     

      toast.success("Files uploaded successfully!", { id: "upload-docs" });

      // Reset file input
      event.target.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload files", { id: "upload-docs" });
    } finally {
      setIsUploadingFiles(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!selectedFolder || !site) return;

    try {
      toast.loading("Deleting file...", { id: "delete-doc" });

      // Delete from API
      await sitesService.deleteSiteDocument(fileId);

      // Reload documents
      await loadSiteDocuments(site.id);

      // Update selected folder with remaining files
      const updatedFolder = [
        ...uploadFolders,
        ...trainingFolders,
        ...internalUploadsFolders,
      ].find((f) => f.id === selectedFolder.id);


      toast.success("File deleted successfully!", { id: "delete-doc" });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete file", { id: "delete-doc" });
    }
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

  const handleSubmitEdit = async () => {
    if (!site) return;
    await updateSite(site.id, formData);
    const refreshed = await getSiteById(site.id);
    setSite(refreshed);
    setIsEditDialogOpen(false);
  };

  if (isLoading || !site) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-[#295F58] border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">
            Loading site details...
          </p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-[#295F58]">
              {site.siteName}
            </h1>
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
              <Label className="text-muted-foreground text-xs">
                Production Capacity
              </Label>
              <p className="font-medium text-sm">{site.capacity || "N/A"}</p>
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-muted-foreground text-xs">
                GPS Coordinates
              </Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium text-sm font-mono">
                  {site.latitude}, {site.longitude}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">
                Created At
              </Label>
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
              <Label className="text-muted-foreground text-xs">
                Infrastructure
              </Label>
              <p className="font-medium text-sm">
                {site.infrastructure || "N/A"}
              </p>
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
              Assigned Users ({site.userAssignments?.length ?? 0})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {site.userAssignments && site.userAssignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {site.userAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="border rounded-lg p-3 flex justify-between"
                >
                  <div>
                    <p className="font-medium text-sm">
                      {assignment.user.firstName} {assignment.user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {assignment.user.email}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {assignment.user.userCode}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
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
                  onClick={() => handleOpenFolder(folder, "upload")}
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
                          {folder.files.length} file
                          {folder.files.length !== 1 ? "s" : ""} uploaded
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

      {/* Training Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#295F58]" />
            Training Documentation
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            All training materials are mandatory. Click on a folder to upload
            files.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainingFolders.map((folder) => {
              const isUploaded = folder.files.length > 0;
              return (
                <div
                  key={folder.id}
                  onClick={() => handleOpenFolder(folder, "training")}
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
                          {folder.files.length} file
                          {folder.files.length !== 1 ? "s" : ""} uploaded
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

      {/* Internal Uploads Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="h-5 w-5 text-[#295F58]" />
            Internal Uploads (Greenerth Team)
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Internal documentation uploaded by Greenerth team.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {internalUploadsFolders.map((folder) => {
              const isUploaded = folder.files.length > 0;
              return (
                <div
                  key={folder.id}
                  onClick={() => handleOpenFolder(folder, "internal")}
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
                          {folder.files.length} file
                          {folder.files.length !== 1 ? "s" : ""} uploaded
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
              <div>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
                  disabled={isUploadingFiles}
                  id="file-upload-input"
                />
                <Button
                  className="bg-[#295F58] hover:bg-[#295F58]/90"
                  disabled={isUploadingFiles}
                  onClick={() =>
                    document.getElementById("file-upload-input")?.click()
                  }
                  type="button"
                >
                  {isUploadingFiles ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </>
                  )}
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
                        {file.size} • Uploaded{" "}
                        {new Date(file.uploadedAt).toLocaleString()} by{" "}
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
                <p className="text-sm text-muted-foreground">
                  No files uploaded yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click "Upload Files" to add documents
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFolderDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View File Dialog */}
      <Dialog
        open={isViewFileDialogOpen}
        onOpenChange={setIsViewFileDialogOpen}
      >
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
            <Button
              variant="outline"
              onClick={() => setIsViewFileDialogOpen(false)}
            >
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
                onChange={(e) =>
                  setFormData({ ...formData, siteName: e.target.value })
                }
                placeholder="Enter site name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-latitude">Latitude * (5 decimals)</Label>
              <Input
                id="edit-latitude"
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
                placeholder="28.61394"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-longitude">Longitude * (5 decimals)</Label>
              <Input
                id="edit-longitude"
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
                placeholder="77.20902"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-address">Address *</Label>
              <Textarea
                id="edit-address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="Enter full address"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-district">District</Label>
              <Input
                id="edit-district"
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                placeholder="Enter district"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-state">State</Label>
              <Input
                id="edit-state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                placeholder="Enter state"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-country">Country</Label>
              <Input
                id="edit-country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                placeholder="India"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-siteType">Site Type</Label>
              <Select
                value={formData.siteType}
                onValueChange={(value) =>
                  setFormData({ ...formData, siteType: value })
                }
              >
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
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                placeholder="e.g., 500 kg/day"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-infrastructure">Infrastructure</Label>
              <Textarea
                id="edit-infrastructure"
                value={formData.infrastructure}
                onChange={(e) =>
                  setFormData({ ...formData, infrastructure: e.target.value })
                }
                placeholder="Describe available infrastructure"
                rows={2}
              />
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
                  <SelectItem value="UNDER_MAINTENANCE">
                    Under Maintenance
                  </SelectItem>
                </SelectContent>
              </Select>
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
              Update Site
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
