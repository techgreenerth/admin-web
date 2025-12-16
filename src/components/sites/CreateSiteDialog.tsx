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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateSiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  formData: any;
  setFormData: (data: any) => void;
  errors: Record<string, string>;

  onSubmit: () => void;
}

export function CreateSiteDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  errors,
  onSubmit,
}: CreateSiteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Artisan Pro Site</DialogTitle>
          <DialogDescription>
            Add a new biochar production site to the platform
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <Field label="Site Code *" error={errors.siteCode}>
            <Input
              value={formData.siteCode}
              onChange={(e) =>
                setFormData({ ...formData, siteCode: e.target.value })
              }
              placeholder="AP-001"
            />
          </Field>

          <Field label="Site Name *" error={errors.siteName}>
            <Input
              value={formData.siteName}
              onChange={(e) =>
                setFormData({ ...formData, siteName: e.target.value })
              }
            />
          </Field>

          <Field label="Latitude * (5 decimals)" error={errors.latitude}>
            <Input
              value={formData.latitude}
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
            />
          </Field>

          <Field label="Longitude * (5 decimals)" error={errors.longitude}>
            <Input
              value={formData.longitude}
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
            />
          </Field>

          <Field label="Address *" error={errors.address} colSpan={2}>
            <Textarea
              rows={2}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </Field>

          <Field label="District">
            <Input
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
            />
          </Field>

          <Field label="State">
            <Input
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            />
          </Field>

          <Field label="Country">
            <Input
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
          </Field>

          <Field label="Site Type">
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
          </Field>

          <Field label="Production Capacity" error={errors.capacity}>
            <Input
              value={formData.capacity}
              onChange={(e) =>
                setFormData({ ...formData, capacity: e.target.value })
              }
            />
          </Field>

          <Field label="Infrastructure" colSpan={2}>
            <Textarea
              rows={2}
              value={formData.infrastructure}
              onChange={(e) =>
                setFormData({ ...formData, infrastructure: e.target.value })
              }
            />
          </Field>

          <Field label="Status *">
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
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-[#295F58] hover:bg-[#295F58]/90"
            onClick={onSubmit}
          >
            Create Site
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  error,
  colSpan,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  colSpan?: number;
}) {
  return (
    <div className={`space-y-2 ${colSpan ? `col-span-${colSpan}` : ""}`}>
      <Label>{label}</Label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
