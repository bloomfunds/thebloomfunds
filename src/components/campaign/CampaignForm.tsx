"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  CheckCircle,
  Upload,
  X,
  Plus,
  Trash2,
  Eye,
  Rocket,
  Target,
  Calendar,
  Gift,
  FileText,
  Tag,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MediaUploader from "./MediaUploader";
import CampaignPreview from "./CampaignPreview";
import {
  createCampaign,
  createRewardTiers,
  createCampaignMedia,
  createCampaignMilestones,
} from "@/lib/database";
import { getCurrentUser } from "@/lib/supabase";

type FormData = {
  title: string;
  subtitle: string;
  businessName: string;
  businessDescription: string;
  businessCategory: string;
  location: string;
  website?: string;
  fundingGoal: number;
  minContribution: number;
  campaignDuration: number;
  rewardTiers: {
    amount: number;
    title: string;
    description: string;
  }[];
  media: {
    type: "image" | "video";
    url: string;
    caption?: string;
  }[];
};

const defaultFormData: FormData = {
  title: "",
  subtitle: "",
  businessName: "",
  businessDescription: "",
  businessCategory: "",
  location: "",
  website: "",
  fundingGoal: 5000,
  minContribution: 10,
  campaignDuration: 30,
  rewardTiers: [],
  media: [],
};

const steps = [
  {
    id: "category",
    title: "Campaign Category",
    description: "Choose the category that best fits your business",
    icon: Tag,
  },
  {
    id: "basics",
    title: "Campaign Basics",
    description: "Tell us about your business and campaign",
    icon: FileText,
  },
  {
    id: "media",
    title: "Upload Media",
    description: "Add images and videos to showcase your business",
    icon: Upload,
  },
  {
    id: "goal",
    title: "Goal & Duration",
    description: "Set your funding goal and campaign timeline",
    icon: Target,
  },
  {
    id: "rewards",
    title: "Reward Tiers",
    description: "Create reward tiers for your supporters",
    icon: Gift,
  },
  {
    id: "review",
    title: "Review & Publish",
    description: "Review your campaign and launch it",
    icon: Rocket,
  },
];

export default function CampaignForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const { user } = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const step = steps[stepIndex];
    switch (step.id) {
      case "category":
        return !!formData.businessCategory;
      case "basics":
        return !!(
          formData.title.trim() &&
          formData.subtitle.trim() &&
          formData.businessName.trim() &&
          formData.businessDescription.trim() &&
          formData.location.trim()
        );
      case "media":
        return formData.media.length > 0;
      case "goal":
        return (
          formData.fundingGoal > 0 &&
          formData.minContribution > 0 &&
          formData.campaignDuration > 0
        );
      case "rewards":
        return true; // Rewards are optional
      case "review":
        return true;
      default:
        return false;
    }
  };

  const getStepErrors = (stepIndex: number): string[] => {
    const step = steps[stepIndex];
    const errors: string[] = [];

    switch (step.id) {
      case "category":
        if (!formData.businessCategory)
          errors.push("Please select a business category");
        break;
      case "basics":
        if (!formData.title.trim()) errors.push("Campaign title is required");
        if (!formData.subtitle.trim())
          errors.push("Campaign subtitle is required");
        if (!formData.businessName.trim())
          errors.push("Business name is required");
        if (!formData.businessDescription.trim())
          errors.push("Business description is required");
        if (!formData.location.trim()) errors.push("Location is required");
        break;
      case "media":
        if (formData.media.length === 0)
          errors.push("At least one media item is required");
        break;
      case "goal":
        if (!formData.fundingGoal || formData.fundingGoal <= 0)
          errors.push("Valid funding goal is required");
        if (!formData.minContribution || formData.minContribution <= 0)
          errors.push("Valid minimum contribution is required");
        if (!formData.campaignDuration || formData.campaignDuration <= 0)
          errors.push("Valid campaign duration is required");
        break;
    }
    return errors;
  };

  const handleNext = () => {
    const currentStepValid = validateStep(currentStep);
    if (!currentStepValid) {
      const errors = getStepErrors(currentStep);
      setFormErrors(errors);
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setFormErrors([]);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setFormErrors([]);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  const handleMediaUpdate = (mediaFiles: any[]) => {
    const media = mediaFiles.map((file) => ({
      type: file.type as "image" | "video",
      url: file.preview,
      caption: file.file.name,
    }));
    setFormData({ ...formData, media });
  };

  const addRewardTier = () => {
    setFormData({
      ...formData,
      rewardTiers: [
        ...formData.rewardTiers,
        { amount: 0, title: "", description: "" },
      ],
    });
  };

  const updateRewardTier = (index: number, field: string, value: any) => {
    const updatedTiers = [...formData.rewardTiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    setFormData({ ...formData, rewardTiers: updatedTiers });
  };

  const removeRewardTier = (index: number) => {
    const updatedTiers = formData.rewardTiers.filter((_, i) => i !== index);
    setFormData({ ...formData, rewardTiers: updatedTiers });
  };

  const handleFormSubmit = async () => {
    if (!currentUser) {
      setFormErrors(["You must be signed in to create a campaign."]);
      return;
    }

    // Validate all steps
    const allErrors: string[] = [];
    for (let i = 0; i < steps.length - 1; i++) {
      if (!validateStep(i)) {
        allErrors.push(...getStepErrors(i));
      }
    }

    if (allErrors.length > 0) {
      setFormErrors(allErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const ownerName =
        currentUser.full_name ||
        currentUser.email?.split("@")[0] ||
        "Campaign Owner";

      // Calculate end date based on duration
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + formData.campaignDuration);

      const campaignData = {
        title: formData.title.trim(),
        description: formData.businessDescription.trim(),
        business_name: formData.businessName.trim(),
        owner_name: ownerName,
        owner_id: currentUser.id,
        funding_goal: Math.round(formData.fundingGoal),
        category: formData.businessCategory.toLowerCase(),
        location: formData.location.trim(),
        website: formData.website?.trim() || undefined,
        cover_image:
          formData.media.find((m) => m.type === "image")?.url || undefined,
        owner_avatar: currentUser.avatar_url || undefined,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        status: "active" as const,
      };

      const campaign = await createCampaign(campaignData);

      // Create reward tiers
      if (formData.rewardTiers.length > 0) {
        const rewardTiersData = formData.rewardTiers
          .filter((tier) => tier.amount > 0 && tier.title.trim())
          .map((tier, index) => ({
            amount: Math.round(tier.amount),
            title: tier.title.trim(),
            description: tier.description.trim() || tier.title.trim(),
            display_order: index,
          }));

        if (rewardTiersData.length > 0) {
          await createRewardTiers(campaign.id, rewardTiersData);
        }
      }

      // Create campaign media
      if (formData.media.length > 0) {
        const mediaData = formData.media.map((media, index) => ({
          media_type: media.type,
          media_url: media.url,
          caption: media.caption || null,
          display_order: index,
        }));

        await createCampaignMedia(campaign.id, mediaData);
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        router.push(`/campaigns/${campaign.id}`);
      }, 2000);
    } catch (error) {
      console.error("Campaign creation error:", error);
      setFormErrors(["Failed to create campaign. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-green-50/20 to-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mr-2 text-primary" />
            <span className="text-lg font-medium">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/20 to-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text-hero mb-2">
            Create Your Campaign
          </h1>
          <p className="text-lg text-muted-foreground">
            Transform your business idea into reality with community support
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isAccessible = index <= currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-primary bg-primary text-white shadow-lg"
                        : isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : isAccessible
                            ? "border-muted-foreground/30 bg-background text-muted-foreground"
                            : "border-muted-foreground/20 bg-muted text-muted-foreground/50"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-colors duration-300 ${
                        isCompleted ? "bg-green-500" : "bg-muted-foreground/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <currentStepData.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {currentStepData.title}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {currentStepData.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {formErrors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {formErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {submitSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Campaign created successfully! Redirecting to your campaign
                  page...
                </AlertDescription>
              </Alert>
            )}

            {/* Step Content */}
            {currentStepData.id === "category" && (
              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="businessCategory"
                    className="text-base font-semibold"
                  >
                    Business Category *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Choose the category that best describes your business
                  </p>
                  <Select
                    value={formData.businessCategory}
                    onValueChange={(value) =>
                      handleInputChange("businessCategory", value)
                    }
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">
                        Technology & Software
                      </SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="retail">
                        Retail & E-commerce
                      </SelectItem>
                      <SelectItem value="services">
                        Professional Services
                      </SelectItem>
                      <SelectItem value="manufacturing">
                        Manufacturing
                      </SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="sustainability">
                        Sustainability
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStepData.id === "basics" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title" className="text-base font-semibold">
                      Campaign Title *
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      A compelling title for your campaign
                    </p>
                    <Input
                      id="title"
                      placeholder="e.g., Revolutionary Coffee Roastery"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="subtitle"
                      className="text-base font-semibold"
                    >
                      Campaign Subtitle *
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      A brief tagline or subtitle
                    </p>
                    <Input
                      id="subtitle"
                      placeholder="e.g., Artisan coffee meets AI precision"
                      value={formData.subtitle}
                      onChange={(e) =>
                        handleInputChange("subtitle", e.target.value)
                      }
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="businessName"
                    className="text-base font-semibold"
                  >
                    Business Name *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    The official name of your business
                  </p>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-base font-semibold">
                    Location *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Where is your business located?
                  </p>
                  <Input
                    id="location"
                    placeholder="City, State/Province, Country"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="h-12 text-base"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="businessDescription"
                    className="text-base font-semibold"
                  >
                    Business Description *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Describe your business, what makes it unique, and why people
                    should support it
                  </p>
                  <Textarea
                    id="businessDescription"
                    placeholder="Tell your story... What problem does your business solve? What makes it special?"
                    className="min-h-[150px] text-base"
                    value={formData.businessDescription}
                    onChange={(e) =>
                      handleInputChange("businessDescription", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="website" className="text-base font-semibold">
                    Website (Optional)
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your business website or social media page
                  </p>
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="h-12 text-base"
                  />
                </div>
              </div>
            )}

            {currentStepData.id === "media" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload Media</h3>
                  <p className="text-muted-foreground mb-4">
                    Add high-quality images and videos that showcase your
                    business. The first image will be used as your campaign
                    cover.
                  </p>
                  <MediaUploader
                    onMediaChange={handleMediaUpdate}
                    maxFiles={10}
                    acceptedFileTypes={[
                      "image/jpeg",
                      "image/png",
                      "image/gif",
                      "video/mp4",
                    ]}
                  />
                </div>
              </div>
            )}

            {currentStepData.id === "goal" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="fundingGoal"
                      className="text-base font-semibold"
                    >
                      Funding Goal ($) *
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      How much money do you need to raise?
                    </p>
                    <Input
                      id="fundingGoal"
                      type="number"
                      min="1"
                      placeholder="5000"
                      value={formData.fundingGoal}
                      onChange={(e) =>
                        handleInputChange("fundingGoal", Number(e.target.value))
                      }
                      className="h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="minContribution"
                      className="text-base font-semibold"
                    >
                      Minimum Contribution ($) *
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Smallest amount supporters can contribute
                    </p>
                    <Input
                      id="minContribution"
                      type="number"
                      min="1"
                      placeholder="10"
                      value={formData.minContribution}
                      onChange={(e) =>
                        handleInputChange(
                          "minContribution",
                          Number(e.target.value),
                        )
                      }
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="campaignDuration"
                    className="text-base font-semibold"
                  >
                    Campaign Duration (Days) *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    How long should your campaign run? (Recommended: 30-60 days)
                  </p>
                  <Select
                    value={formData.campaignDuration.toString()}
                    onValueChange={(value) =>
                      handleInputChange("campaignDuration", Number(value))
                    }
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 days</SelectItem>
                      <SelectItem value="30">30 days (Recommended)</SelectItem>
                      <SelectItem value="45">45 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStepData.id === "rewards" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Reward Tiers</h3>
                    <p className="text-muted-foreground">
                      Create reward tiers to incentivize larger contributions
                      (Optional)
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addRewardTier}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Reward Tier
                  </Button>
                </div>

                {formData.rewardTiers.length === 0 ? (
                  <Card className="p-8 text-center border-dashed border-2">
                    <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold text-lg mb-2">
                      No reward tiers yet
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      Reward tiers are optional but can help incentivize larger
                      contributions
                    </p>
                    <Button onClick={addRewardTier} variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Reward Tier
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {formData.rewardTiers.map((tier, index) => (
                      <Card key={index} className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-lg">
                            Reward Tier {index + 1}
                          </h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRewardTier(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label
                              htmlFor={`tierAmount-${index}`}
                              className="font-medium"
                            >
                              Amount ($)
                            </Label>
                            <Input
                              id={`tierAmount-${index}`}
                              type="number"
                              min="1"
                              value={tier.amount}
                              onChange={(e) =>
                                updateRewardTier(
                                  index,
                                  "amount",
                                  Number(e.target.value),
                                )
                              }
                              className="h-10"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor={`tierTitle-${index}`}
                              className="font-medium"
                            >
                              Title
                            </Label>
                            <Input
                              id={`tierTitle-${index}`}
                              value={tier.title}
                              onChange={(e) =>
                                updateRewardTier(index, "title", e.target.value)
                              }
                              placeholder="e.g., Early Bird Special"
                              className="h-10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label
                            htmlFor={`tierDescription-${index}`}
                            className="font-medium"
                          >
                            Description
                          </Label>
                          <Textarea
                            id={`tierDescription-${index}`}
                            value={tier.description}
                            onChange={(e) =>
                              updateRewardTier(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="Describe what supporters get for this contribution level"
                            className="min-h-[80px]"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStepData.id === "review" && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Review Your Campaign
                  </h3>
                  <p className="text-muted-foreground">
                    Take a final look at your campaign before publishing it to
                    the world
                  </p>
                </div>

                <CampaignPreview
                  title={formData.title}
                  description={formData.businessDescription}
                  businessName={formData.businessName}
                  ownerName={
                    currentUser?.full_name ||
                    currentUser?.email?.split("@")[0] ||
                    "Campaign Owner"
                  }
                  fundingGoal={formData.fundingGoal}
                  currentFunding={0}
                  daysRemaining={formData.campaignDuration}
                  backerCount={0}
                  category={formData.businessCategory}
                  coverImage={
                    formData.media.find((m) => m.type === "image")?.url
                  }
                />

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">
                        Ready to Launch!
                      </h4>
                      <p className="text-green-800 text-sm">
                        Your campaign looks great! Once you publish, it will be
                        live and visible to potential supporters. You can still
                        make updates after publishing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Navigation */}
          <div className="px-6 pb-6">
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0 || isSubmitting}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleFormSubmit}
                  disabled={isSubmitting || submitSuccess || !currentUser}
                  className="flex items-center gap-2 premium-button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      Published!
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Publish Campaign
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting || !validateStep(currentStep)}
                  className="flex items-center gap-2 premium-button"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
