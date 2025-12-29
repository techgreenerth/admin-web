import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  Save,
  Edit2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "../../contexts/ProfileContext";

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { profile, isLoading, updateProfile, fetchProfile } = useProfile();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    joinedDate: "",
  });

  useEffect(() => {
    if (!profile) return;

    setProfileData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      role: profile.role,
      status: profile.status,
      joinedDate: profile.createdAt,
    });
  }, [profile]);

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      await updateProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phone: profileData.phone,
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      setIsEditing(false);
    } catch {
      toast({
        title: "Update failed",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(
      0
    )}`;
  };

  const getRoleBadge = (role: string) => {
    const roleColors: Record<string, string> = {
      SUPER_ADMIN: "bg-purple-100 text-purple-800",
      ADMIN: "bg-blue-100 text-blue-800",
      SUPERVISOR: "bg-green-100 text-green-800",
      VERIFIER: "bg-orange-100 text-orange-800",
      CSI_MANAGER: "bg-indigo-100 text-green-800",
    };
    return roleColors[role] || "bg-gray-100 text-gray-800";
  };

  const getRoleDisplayName = (role: string) => {
    const roleNames: Record<string, string> = {
      SUPER_ADMIN: "Super Admin",
      ADMIN: "Admin",
      SUPERVISOR: "Implementation Partner",
      VERIFIER: "Verifier",
      CSI_MANAGER: "CSI Manager",
    };
    return roleNames[role] || role;
  };

  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-4 border-[#295F58] border-t-transparent animate-spin" />
          <p className="text-muted-foreground text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#295F58]">Profile</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your profile information
        </p>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-[#295F58] text-white text-2xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-2xl font-bold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <div className="flex gap-2">
                  <Badge className={getRoleBadge(profileData.role)}>
                    {getRoleDisplayName(profileData.role)}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    {profileData.status}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {profileData.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {profileData.phone}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(profileData.joinedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="shrink-0"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-[#295F58]" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
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

              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="bg-[#295F58] hover:bg-[#1e4540]"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">First Name</Label>
                  <p className="font-medium">{profileData.firstName}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Last Name</Label>
                  <p className="font-medium">{profileData.lastName}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{profileData.email}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium">{profileData.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Role</Label>
                  <p className="font-medium">
                    {getRoleDisplayName(profileData.role)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium">{profileData.status}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground">Joined Date</Label>
                  <p className="font-medium">
                    {new Date(profileData.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Records Verified</Label>
              <p className="text-2xl font-bold text-[#295F58]">127</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Records Rejected</Label>
              <p className="text-2xl font-bold text-orange-600">8</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Total Actions</Label>
              <p className="text-2xl font-bold text-blue-600">135</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
