import { Edit, Flame } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import { Kontiki } from "@/types/kontikis.types";


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kontiki: Kontiki | null;
  onEdit: (kontiki: Kontiki) => void;
}

export function ViewKontikiDialog({
  open,
  onOpenChange,
  kontiki,
  onEdit,
}: Props) {
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Kontiki Details</DialogTitle>
          <DialogDescription>
            Complete information about the kontiki
          </DialogDescription>
        </DialogHeader>

        {kontiki && (
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#E1EFEE]">
                <Flame className="h-8 w-8 text-[#295F58]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {kontiki.kontikiName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {kontiki.kontikiCode}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label className="text-muted-foreground">Site</Label>
                <p className="font-medium">{kontiki.site.siteName}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {kontiki.site.siteCode}
                </p>
              </div>

              <div className="space-y-1">
                <Label className="text-muted-foreground">Status</Label>
                <Badge className={getStatusColor(kontiki.status)}>
                  {kontiki.status}
                </Badge>
              </div>

              <div className="space-y-1">
                <Label className="text-muted-foreground">Capacity</Label>
                <p className="font-medium">{kontiki.capacity || "N/A"}</p>
              </div>

              <div className="space-y-1">
                <Label className="text-muted-foreground">Created At</Label>
                <p className="font-medium">
                  {new Date(kontiki.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="space-y-1 col-span-2">
                <Label className="text-muted-foreground">
                  Specifications
                </Label>
                <p className="font-medium">
                  {kontiki.specifications || "N/A"}
                </p>
              </div>

              <div className="space-y-1">
                <Label className="text-muted-foreground">Kontiki ID</Label>
                <p className="font-medium text-xs">{kontiki.id}</p>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          {kontiki && (
            <Button
              className="bg-[#295F58] hover:bg-[#295F58]/90"
              onClick={() => {
                onOpenChange(false);
                onEdit(kontiki);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Kontiki
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
