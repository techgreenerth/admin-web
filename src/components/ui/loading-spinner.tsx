import { cn } from "@/lib/utils/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  message?: string;
}

export function LoadingSpinner({
  size = "md",
  className,
  message,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-solid border-[#295F58] border-r-transparent",
          sizeClasses[size]
        )}
      />
      {message && (
        <p className="text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
}

interface FullPageLoaderProps {
  message?: string;
}

export function FullPageLoader({ message = "Loading..." }: FullPageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-[#295F58] font-medium">{message}</p>
      </div>
    </div>
  );
}

interface LoadingOverlayProps {
  message?: string;
  show: boolean;
}

export function LoadingOverlay({ message = "Loading...", show }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-[#295F58] font-medium">{message}</p>
      </div>
    </div>
  );
}
