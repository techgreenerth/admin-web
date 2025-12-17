import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SiteSummary } from "../../types/kontikis.types"

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  formData: any; // keep same type you already use
  setFormData: React.Dispatch<React.SetStateAction<any>>;

  errors: Record<string, string>;
  sites: SiteSummary[];

  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function EditKontikiDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  errors,
  sites,
  onSubmit,
  isSubmitting = false,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Kontiki</DialogTitle>
          <DialogDescription>
            Update kontiki information
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2 col-span-2">
            <Label>Site *</Label>
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
            <Label>Kontiki Code *</Label>
            <Input
              value={formData.kontikiCode}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Kontiki Name *</Label>
            <Input
              value={formData.kontikiName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  kontikiName: e.target.value,
                })
              }
              placeholder="Enter kontiki name"
            />
            {errors.kontikiName && (
              <p className="text-red-500 text-sm">
                {errors.kontikiName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Capacity</Label>
            <Input
              value={formData.capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: e.target.value,
                })
              }
              placeholder="e.g., 200 kg/batch"
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm">
                {errors.capacity}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Status *</Label>
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
                <SelectItem value="MAINTENANCE">
                  Maintenance
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Specifications</Label>
            <Textarea
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
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#295F58] hover:bg-[#295F58]/90"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Kontiki...
              </>
            ) : (
              "Update Kontiki"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
