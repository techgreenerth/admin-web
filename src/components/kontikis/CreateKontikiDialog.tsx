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

import { SiteSummary } from "../../types/kontikis.types"

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;

  errors: Record<string, string>;
  sites: SiteSummary[];
  isSitesLoading: boolean;

  onSubmit: () => void;
}

export function CreateKontikiDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  errors,
  sites,
  isSitesLoading,
  onSubmit,
}: Props) {
  return (
    // <Dialog open={open} onOpenChange={onOpenChange}>
    //   <DialogContent className="max-w-2xl">
    //     <DialogHeader>
    //       <DialogTitle>Create New Kontiki</DialogTitle>
    //       <DialogDescription>
    //         Add a new biochar production kiln
    //       </DialogDescription>
    //     </DialogHeader>

    //     <div className="grid grid-cols-2 gap-4 py-4">
    //       {/* Site */}
    //       <div className="space-y-2 col-span-2">
    //         <Label>Site *</Label>
    //         <Select
    //           value={formData.siteId}
    //           onValueChange={(value) =>
    //             setFormData({ ...formData, siteId: value })
    //           }
    //         >
    //           <SelectTrigger>
    //             <SelectValue
    //               placeholder={
    //                 isSitesLoading
    //                   ? "Loading sites..."
    //                   : "Select site"
    //               }
    //             />
    //           </SelectTrigger>
    //           <SelectContent>
    //             {sites.map((site) => (
    //               <SelectItem key={site.id} value={site.id}>
    //                 {site.siteName} ({site.siteCode})
    //               </SelectItem>
    //             ))}
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       {/* Kontiki Code */}
    //       <div className="space-y-2">
    //         <Label>Kontiki Code *</Label>
    //         <Input
    //           value={formData.kontikiCode}
    //           onChange={(e) =>
    //             setFormData({
    //               ...formData,
    //               kontikiCode: e.target.value,
    //             })
    //           }
    //           placeholder="Kon-tiki 1"
    //         />
    //         {errors.kontikiCode && (
    //           <p className="text-red-500 text-sm">
    //             {errors.kontikiCode}
    //           </p>
    //         )}
    //       </div>

    //       {/* Kontiki Name */}
    //       <div className="space-y-2">
    //         <Label>Kontiki Name *</Label>
    //         <Input
    //           value={formData.kontikiName}
    //           onChange={(e) =>
    //             setFormData({
    //               ...formData,
    //               kontikiName: e.target.value,
    //             })
    //           }
    //           placeholder="Enter kontiki name"
    //         />
    //         {errors.kontikiName && (
    //           <p className="text-red-500 text-sm">
    //             {errors.kontikiName}
    //           </p>
    //         )}
    //       </div>

    //       {/* Capacity */}
    //       <div className="space-y-2">
    //         <Label>Capacity</Label>
    //         <Input
    //           value={formData.capacity}
    //           onChange={(e) =>
    //             setFormData({
    //               ...formData,
    //               capacity: e.target.value,
    //             })
    //           }
    //           placeholder="e.g., 200 kg/batch"
    //         />
    //         {errors.capacity && (
    //           <p className="text-red-500 text-sm">
    //             {errors.capacity}
    //           </p>
    //         )}
    //       </div>

    //       {/* Status */}
    //       <div className="space-y-2">
    //         <Label>Status *</Label>
    //         <Select
    //           value={formData.status}
    //           onValueChange={(value) =>
    //             setFormData({
    //               ...formData,
    //               status: value,
    //             })
    //           }
    //         >
    //           <SelectTrigger>
    //             <SelectValue />
    //           </SelectTrigger>
    //           <SelectContent>
    //             <SelectItem value="ACTIVE">Active</SelectItem>
    //             <SelectItem value="INACTIVE">Inactive</SelectItem>
    //             <SelectItem value="MAINTENANCE">
    //               Maintenance
    //             </SelectItem>
    //           </SelectContent>
    //         </Select>
    //       </div>

    //       {/* Specifications */}
    //       <div className="space-y-2 col-span-2">
    //         <Label>Specifications</Label>
    //         <Textarea
    //           value={formData.specifications}
    //           onChange={(e) =>
    //             setFormData({
    //               ...formData,
    //               specifications: e.target.value,
    //             })
    //           }
    //           placeholder="Describe kontiki specifications"
    //           rows={3}
    //         />
    //       </div>
    //     </div>

    //     <DialogFooter>
    //       <Button
    //         variant="outline"
    //         onClick={() => onOpenChange(false)}
    //       >
    //         Cancel
    //       </Button>
    //       <Button
    //         className="bg-[#295F58] hover:bg-[#295F58]/90"
    //         onClick={onSubmit}
    //         disabled={
    //           !formData.siteId ||
    //           !formData.kontikiCode ||
    //           !formData.kontikiName
    //         }
    //       >
    //         Create Kontiki
    //       </Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              {errors.kontikiCode && (
                <p className="text-red-500 text-sm">{errors.kontikiCode}</p>
              )}
            </div>

            
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
              {errors.kontikiName && (
                <p className="text-red-500 text-sm">{errors.kontikiName}</p>
              )}
            </div>

            
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
              {errors.capacity && (
                <p className="text-red-500 text-sm">{errors.capacity}</p>
              )}
            </div>

            
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
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#295F58] hover:bg-[#295F58]/90"
              onClick={onSubmit}
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

  );
}
