import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ViewFileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: {
    name: string;
    url: string;
    type: "image" | "video" | "document";
  } | null;
  onDownload: (file: any) => void;
}

export function ViewFileDialog({
  open,
  onOpenChange,
  file,
  onDownload,
}: ViewFileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{file?.name}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {file && (
            <div className="space-y-4">
              {file.type === "image" ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-auto rounded-lg border"
                />
              ) : file.type === "video" ? (
                <video
                  controls
                  className="w-full h-auto rounded-lg border"
                  src={file.url}
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
                    onClick={() => onDownload(file)}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {file && (
            <Button
              className="bg-[#295F58] hover:bg-[#295F58]/90"
              onClick={() => onDownload(file)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
