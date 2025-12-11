import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Info,
  HelpCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setError(null);
    setIsLoading(true);

    try {
      await login(formData);
      toast.success("Login successful!");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Title Section */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-20 w-20 flex items-center justify-center bg-white rounded-2xl shadow-lg p-3">
            <img
              src="/logo.png"
              alt="Greenerth"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#295F58]">Greenerth</h1>
            <p className="text-sm text-muted-foreground">Admin Portal</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-[#295F58]/10">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-[#295F58]">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-[#295F58]" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-11 border-[#295F58]/20 focus-visible:ring-[#295F58]"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Lock className="h-4 w-4 text-[#295F58]" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="h-11 border-[#295F58]/20 focus-visible:ring-[#295F58] pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#295F58] hover:underline font-medium"
                  onClick={() => setShowForgotPasswordDialog(true)}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 bg-[#295F58] hover:bg-[#295F58]/90 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {/* Info Alert */}
              <Alert className="border-[#295F58]/20 bg-[#E1EFEE]/30">
                <Info className="h-4 w-4 text-[#295F58]" />
                <AlertDescription className="text-xs text-muted-foreground ml-2">
                  Accounts are created by system administrators. Please contact
                  your admin if you need access.
                </AlertDescription>
              </Alert>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          © 2024 Greenerth. All rights reserved.
        </p>

        {/* Forgot Password Dialog */}
        <Dialog
          open={showForgotPasswordDialog}
          onOpenChange={setShowForgotPasswordDialog}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-[#295F58]">
                <HelpCircle className="h-5 w-5" />
                Forgot Password?
              </DialogTitle>
              <DialogDescription className="pt-4 space-y-4">
                <p>
                  Password reset requests must be handled by system
                  administrators for security purposes.
                </p>
                <div className="bg-[#E1EFEE]/50 p-4 rounded-lg space-y-3">
                  <p className="font-medium text-foreground">
                    Please contact your administrator:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#295F58]" />
                      <a
                        href="mailto:support@techgreenerth.com"
                        className="text-[#295F58] hover:underline font-medium"
                      >
                        support@techgreenerth.com
                      </a>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Make sure to include your registered email address in your
                  request.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => setShowForgotPasswordDialog(false)}
                className="bg-[#295F58] hover:bg-[#295F58]/90"
              >
                Got it
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
