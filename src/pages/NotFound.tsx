import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#E1EFEE] rounded-full mb-3">
            <Search className="h-12 w-12 text-[#295F58]" />
          </div>
          <h1 className="text-5xl font-bold text-[#295F58] mb-2">404</h1>
          <div className="h-1 w-20 bg-[#295F58] mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="space-y-2 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-sm text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-[#295F58] hover:bg-[#295F58]/90 gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-6">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}
