// components/sites/ViewSiteDetailsDialog.tsx

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";

interface AssignedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userCode: string;
}

interface Site {
  id: string;
  siteCode: string;
  siteName: string;
  status: string;
  siteType?: string;
  latitude?: string;
  longitude?: string;
  capacity?: string;
  address?: string;
  district?: string;
  state?: string;
  country?: string;
  infrastructure?: string;
  createdAt: string;
  assignedUsers?: AssignedUser[];
}

interface ViewSiteDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  site: Site | null;

  getStatusColor: (status: string) => string;

  onClose: () => void;
  onEdit: () => void;
}

export function ViewSiteDetailsDialog({
  open,
  onOpenChange,
  site,
  getStatusColor,
  onClose,
  onEdit,
}: ViewSiteDetailsDialogProps) {
  if (!site) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Site Details</DialogTitle>
          <DialogDescription>
            Complete information about the artisan pro site
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            <Detail label="Site Code" mono value={site.siteCode} />
            <Detail label="Site Name" value={site.siteName} />

            <div className="space-y-1">
              <Label className="text-muted-foreground">Status</Label>
              <Badge className={getStatusColor(site.status)}>
                {site.status.replace("_", " ")}
              </Badge>
            </div>

            <Detail label="Site Type" value={site.siteType || "N/A"} />
            <Detail
              label="GPS Coordinates"
              value={`${site.latitude}, ${site.longitude}`}
            />
            <Detail
              label="Production Capacity"
              value={site.capacity || "N/A"}
            />

            <div className="space-y-1 col-span-2">
              <Label className="text-muted-foreground">Address</Label>
              <p className="font-medium">{site.address}</p>
              <p className="text-sm text-muted-foreground">
                {site.district}, {site.state}, {site.country}
              </p>
            </div>

            <Detail
              label="Infrastructure"
              value={site.infrastructure || "N/A"}
              colSpan={2}
            />

            <Detail
              label="Created At"
              value={new Date(site.createdAt).toLocaleString()}
            />
            <Detail label="Site ID" value={site.id} small />
          </div>

          {/* Assigned Users */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">
              Assigned Users ({site.assignedUsers?.length || 0})
            </Label>

            {site.assignedUsers?.length ? (
              <div className="border rounded-lg divide-y">
                {site.assignedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {user.userCode}
                    </span>
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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            className="bg-[#295F58] hover:bg-[#295F58]/90"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* Small helper */
function Detail({
  label,
  value,
  mono,
  small,
  colSpan,
}: {
  label: string;
  value?: string;
  mono?: boolean;
  small?: boolean;
  colSpan?: number;
}) {
  return (
    <div className={`space-y-1 ${colSpan ? `col-span-${colSpan}` : ""}`}>
      <Label className="text-muted-foreground">{label}</Label>
      <p
        className={`font-medium ${
          mono ? "font-mono" : ""
        } ${small ? "text-xs" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
