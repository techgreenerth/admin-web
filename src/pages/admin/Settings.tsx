import { useState } from "react";
import { User, Lock, Bell, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@techgreenerth.com",
    phone: "+91 123 456 7890",
  });

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    recordSubmissions: true,
    recordVerifications: false,
    systemUpdates: true,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to update profile
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    // TODO: Add API call to change password
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSaveNotifications = () => {
    // TODO: Add API call to update notification preferences
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#295F58]">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-[#295F58]" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <Button type="submit" className="bg-[#295F58] hover:bg-[#1e4540]">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="h-5 w-5 text-[#295F58]" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <Button type="submit" className="bg-[#295F58] hover:bg-[#1e4540]">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-[#295F58]" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={notifications.emailNotifications}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, emailNotifications: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="recordSubmissions">Record Submissions</Label>
              <p className="text-sm text-muted-foreground">
                Notify when new records are submitted
              </p>
            </div>
            <Switch
              id="recordSubmissions"
              checked={notifications.recordSubmissions}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, recordSubmissions: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="recordVerifications">Record Verifications</Label>
              <p className="text-sm text-muted-foreground">
                Notify when records are verified or rejected
              </p>
            </div>
            <Switch
              id="recordVerifications"
              checked={notifications.recordVerifications}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, recordVerifications: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="systemUpdates">System Updates</Label>
              <p className="text-sm text-muted-foreground">
                Notify about system maintenance and updates
              </p>
            </div>
            <Switch
              id="systemUpdates"
              checked={notifications.systemUpdates}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, systemUpdates: checked })
              }
            />
          </div>
          <Button
            onClick={handleSaveNotifications}
            className="bg-[#295F58] hover:bg-[#1e4540] mt-4"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
