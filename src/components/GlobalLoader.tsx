import { useDashboard } from "@/contexts/DashboardContext";
import { Loader2 } from "lucide-react";

export const GlobalLoader = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useDashboard();

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50/90 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-[#295F58]/20" />
                        <div className="absolute top-0 h-16 w-16 rounded-full border-4 border-[#295F58] border-t-transparent animate-spin" />
                        <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-[#295F58] animate-pulse" />
                    </div>
                    <p className="text-[#295F58] font-medium text-lg tracking-wide">
                        Loading dashboard data...
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
