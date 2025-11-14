import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-card-hover">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-destructive/20 p-6 mb-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
