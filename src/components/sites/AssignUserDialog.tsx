
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

interface AssignUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  siteName?: string;

  availableUsers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    userCode: string;
  }>;

  selectedUserId: string;
  onUserChange: (userId: string) => void;

  onCancel: () => void;
  onConfirm: () => void;
}

export function AssignUserDialog({
  open,
  onOpenChange,
  siteName,
  availableUsers,
  selectedUserId,
  onUserChange,
  onCancel,
  onConfirm,
}: AssignUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign User to Site</DialogTitle>
          <DialogDescription>
            Select a user to assign to {siteName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="assignUser">Select User *</Label>
            <Select value={selectedUserId} onValueChange={onUserChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a user" />
              </SelectTrigger>
              <SelectContent>
                {availableUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName} ({user.userCode})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="bg-[#295F58] hover:bg-[#295F58]/90"
            onClick={onConfirm}
            disabled={!selectedUserId}
          >
            Assign User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
