"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Bell,
  CreditCard,
  Shield,
  Camera,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Globe,
  MapPin,
  Phone,
  Calendar,
  Briefcase,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  );
  const [formData, setFormData] = useState({
    fullName: "John Entrepreneur",
    email: "john@example.com",
    bio: "Passionate entrepreneur building the future of sustainable technology.",
    location: "San Francisco, CA",
    website: "https://johnentrepreneur.com",
    phone: "+1 (555) 123-4567",
    company: "GreenTech Innovations",
    twitter: "@johnentrepreneur",
    linkedin: "john-entrepreneur",
    instagram: "johnentrepreneur",
  });
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    campaignAlerts: true,
    backerMessages: true,
    marketingEmails: false,
    weeklyDigest: true,
    mobileNotifications: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessages: true,
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold gradient-text-hero">
              Account Settings
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your account preferences and profile information
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <TabsTrigger value="profile" className="rounded-xl">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-xl">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-xl">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="rounded-xl">
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-xl hidden lg:flex">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">
                  Profile Information
                </CardTitle>
                <CardDescription className="text-base">
                  Update your personal information and public profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                      <AvatarImage src={profileImage} />
                      <AvatarFallback className="text-2xl font-bold">
                        {formData.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
                      <Camera className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {formData.fullName}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {formData.email}
                    </p>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified Account
                    </Badge>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-base font-semibold"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="text-base font-semibold"
                    >
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="h-12 text-base"
                      placeholder="City, State, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="company"
                      className="text-base font-semibold"
                    >
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="website"
                      className="text-base font-semibold"
                    >
                      Website
                    </Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="h-12 text-base"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-base font-semibold">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    className="min-h-[120px] text-base"
                    placeholder="Tell us about yourself and your entrepreneurial journey..."
                  />
                  <p className="text-sm text-muted-foreground">
                    {formData.bio.length}/500 characters
                  </p>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Media Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Twitter className="w-4 h-4 text-blue-500" />
                        Twitter
                      </Label>
                      <Input
                        value={formData.twitter}
                        onChange={(e) =>
                          setFormData({ ...formData, twitter: e.target.value })
                        }
                        placeholder="@username"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-blue-700" />
                        LinkedIn
                      </Label>
                      <Input
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                        placeholder="username"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-base font-medium flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-pink-500" />
                        Instagram
                      </Label>
                      <Input
                        value={formData.instagram}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instagram: e.target.value,
                          })
                        }
                        placeholder="@username"
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="premium-button px-8 py-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-base">
                  Choose how you want to be notified about your campaigns and
                  account activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                      <div>
                        <h4 className="font-medium">Campaign Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Get notified about new backers, comments, and
                          milestones
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            emailUpdates: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                      <div>
                        <h4 className="font-medium">Campaign Alerts</h4>
                        <p className="text-sm text-muted-foreground">
                          Important alerts about your campaign status and
                          deadlines
                        </p>
                      </div>
                      <Switch
                        checked={notifications.campaignAlerts}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            campaignAlerts: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                      <div>
                        <h4 className="font-medium">Backer Messages</h4>
                        <p className="text-sm text-muted-foreground">
                          Messages and questions from your campaign backers
                        </p>
                      </div>
                      <Switch
                        checked={notifications.backerMessages}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            backerMessages: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                      <div>
                        <h4 className="font-medium">Weekly Digest</h4>
                        <p className="text-sm text-muted-foreground">
                          Weekly summary of your campaign performance
                        </p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            weeklyDigest: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                      <div>
                        <h4 className="font-medium">Marketing Emails</h4>
                        <p className="text-sm text-muted-foreground">
                          Tips, success stories, and platform updates
                        </p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            marketingEmails: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Push Notifications</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                    <div>
                      <h4 className="font-medium">Mobile Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications on your mobile device
                      </p>
                    </div>
                    <Switch
                      checked={notifications.mobileNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          mobileNotifications: checked,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="premium-button px-8 py-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">
                  Privacy Settings
                </CardTitle>
                <CardDescription className="text-base">
                  Control who can see your information and how others can
                  contact you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Profile Visibility
                    </Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) =>
                        setPrivacy({ ...privacy, profileVisibility: value })
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          Public - Anyone can view
                        </SelectItem>
                        <SelectItem value="backers">
                          Backers Only - Only people who backed your campaigns
                        </SelectItem>
                        <SelectItem value="private">
                          Private - Only you can view
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                    <div>
                      <h4 className="font-medium">Show Email Address</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your email address on your profile
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, showEmail: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                    <div>
                      <h4 className="font-medium">Show Phone Number</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow others to see your phone number on your profile
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showPhone}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, showPhone: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                    <div>
                      <h4 className="font-medium">Allow Direct Messages</h4>
                      <p className="text-sm text-muted-foreground">
                        Let backers and other users send you direct messages
                      </p>
                    </div>
                    <Switch
                      checked={privacy.allowMessages}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, allowMessages: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="premium-button px-8 py-3"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">
                  Billing & Payments
                </CardTitle>
                <CardDescription className="text-base">
                  Manage your payment methods and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Your account is in good standing. Platform fees are
                    automatically deducted from successful campaigns.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Methods</h3>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">
                      No payment methods added
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      Add a payment method to receive funds from your campaigns
                    </p>
                    <Button className="premium-button">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Billing History</h3>
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No billing history available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">
                  Security Settings
                </CardTitle>
                <CardDescription className="text-base">
                  Keep your account secure with these security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          className="h-12 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        className="h-12"
                      />
                    </div>
                  </div>
                  <Button className="premium-button">Update Password</Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50">
                    <div>
                      <h4 className="font-medium">Enable 2FA</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">
                    Danger Zone
                  </h3>
                  <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50/50">
                    <h4 className="font-semibold text-red-800 mb-2">
                      Delete Account
                    </h4>
                    <p className="text-red-700 mb-4">
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
