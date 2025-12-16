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

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userCode: string;
}

interface Site {
  siteName: string;
  assignedUsers?: User[];
}

interface RevokeUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  selectedSite: Site | null;
  selectedUserId: string;
  setSelectedUserId: (id: string) => void;

  onConfirm: () => void;
}

export function RevokeUserDialog({
  open,
  onOpenChange,
  selectedSite,
  selectedUserId,
  setSelectedUserId,
  onConfirm,
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
                {selectedSite?.assignedUsers?.map((user) => (
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
            Revoke User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
