import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, Upload, Eye, Download, X } from "lucide-react";

interface FolderFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

interface Folder {
  id: string;
  name: string;
  files: FolderFile[];
}

interface FolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folder: Folder | null;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onViewFile: (file: FolderFile) => void;
  onDownloadFile: (file: FolderFile) => void;
  onDeleteFile: (fileId: string) => void;
}

export function FolderDialog({
  open,
  onOpenChange,
  folder,
  onUpload,
  onViewFile,
  onDownloadFile,
  onDeleteFile,
}: FolderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5 text-[#295F58]" />
            {folder?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Upload Section */}
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <p className="text-sm font-medium">
                {folder?.files.length || 0} file(s) uploaded
              </p>
              <p className="text-xs text-muted-foreground">
                Upload images, videos, or documents
              </p>
            </div>

            <div className="relative">
              <Input
                type="file"
                multiple
                onChange={onUpload}
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
          {folder && folder.files.length > 0 ? (
            <div className="space-y-2">
              {folder.files.map((file) => (
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
                      onClick={() => onViewFile(file)}
                      className="hover:bg-[#295F58]/10"
                    >
                      <Eye className="h-4 w-4 text-[#295F58]" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDownloadFile(file)}
                      className="hover:bg-[#295F58]/10"
                    >
                      <Download className="h-4 w-4 text-[#295F58]" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteFile(file.id)}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
