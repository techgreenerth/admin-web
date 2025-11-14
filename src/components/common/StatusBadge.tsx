import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "pending" | "approved" | "rejected" | "active" | "inactive" | "completed";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const, className: "bg-warning/20 text-warning-foreground border-warning" },
  approved: { label: "Approved", variant: "secondary" as const, className: "bg-success/20 text-success-foreground border-success" },
  rejected: { label: "Rejected", variant: "destructive" as const, className: "bg-destructive/20 text-destructive border-destructive" },
  active: { label: "Active", variant: "secondary" as const, className: "bg-success/20 text-success-foreground border-success" },
  inactive: { label: "Inactive", variant: "secondary" as const, className: "bg-muted text-muted-foreground border-border" },
  completed: { label: "Completed", variant: "secondary" as const, className: "bg-primary/20 text-primary border-primary" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
