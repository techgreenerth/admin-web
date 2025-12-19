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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userCode: string;
}

interface Site {
  siteName: string;
}

interface RevokeUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  selectedSite: Site | null;
  assignedUsers: User[];
  selectedUserId: string;
  setSelectedUserId: (id: string) => void;

  onConfirm: () => void;
  isSubmitting?: boolean;
}

export function RevokeUserDialog({
  open,
  onOpenChange,
  selectedSite,
  selectedUserId,
  setSelectedUserId,
  assignedUsers, 
  onConfirm,
  isSubmitting
}: RevokeUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke User from Site</DialogTitle>
          <DialogDescription>
            Select a user to revoke from {selectedSite?.siteName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Select User *</Label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a user" />
              </SelectTrigger>
              <SelectContent>
                {assignedUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.userCode})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
            disabled={!selectedUserId}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Revoking User...
              </>
            ) : (
              "Revoke User"
            )}
            
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
