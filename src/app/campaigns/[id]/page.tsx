import React from "react";
import { notFound } from "next/navigation";
import { getCampaignById } from "@/lib/database";
import { CampaignMedia, RewardTier } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  MapPin,
  Globe,
  Target,
  Clock,
  Users,
  Heart,
  Share2,
  Flag,
  Award,
  TrendingUp,
  DollarSign,
  Eye,
  MessageCircle,
  Star,
  Gift,
  CheckCircle,
  ArrowRight,
  Play,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ExternalLink,
  Calendar,
  Building,
  Mail,
  Phone,
  Verified,
  Shield,
  TrendingDown,
  AlertTriangle,
  Info,
  ChevronRight,
  Plus,
  Minus,
  CreditCard,
  Lock,
  Crown,
  Trophy,
  Medal,
} from "lucide-react";
import Link from "next/link";

interface CampaignPageProps {
  params: {
    id: string;
  };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  try {
    const campaign = await getCampaignById(params.id);

    if (!campaign) {
      notFound();
    }

    // Calculate days remaining
    const endDate = new Date(campaign.end_date);
    const today = new Date();
    const daysRemaining = Math.max(
      0,
      Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
    );

    // Calculate funding percentage
    const fundingPercentage = Math.min(
      Math.round((campaign.current_funding / campaign.funding_goal) * 100),
      100,
    );

    // Enhanced mock data for premium experience
    const topDonators = [
      {
        name: "Sarah Martinez",
        amount: 5000,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
        message:
          "Excited to support this amazing venture! Can't wait to see the impact.",
        verified: true,
        timeAgo: "2 hours ago",
      },
      {
        name: "Michael Chen",
        amount: 3500,
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
        message:
          "This is exactly what our community needs. Proud to be part of this journey!",
        verified: true,
        timeAgo: "5 hours ago",
      },
      {
        name: "Emily Johnson",
        amount: 2500,
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
        message:
          "Supporting innovation and entrepreneurship. Keep up the great work!",
        verified: false,
        timeAgo: "1 day ago",
      },
      {
        name: "David Rodriguez",
        amount: 2000,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
        message:
          "Believe in the vision and the team behind it. Let's make this happen!",
        verified: true,
        timeAgo: "2 days ago",
      },
    ];

    const campaignUpdates = [
      {
        id: 1,
        title: "Major Milestone Reached - 90% Funded!",
        content:
          "We're thrilled to announce that we've reached 90% of our funding goal! Thank you to all our amazing backers who have made this possible.",
        date: "2024-01-15",
        likes: 234,
        comments: 45,
      },
      {
        id: 2,
        title: "New Partnership Announcement",
        content:
          "We're excited to share that we've partnered with industry leaders to bring you even more value. This collaboration will enhance our product significantly.",
        date: "2024-01-10",
        likes: 189,
        comments: 32,
      },
      {
        id: 3,
        title: "Behind the Scenes: Development Progress",
        content:
          "Take a look at our latest development progress. Our team has been working tirelessly to bring this vision to life.",
        date: "2024-01-05",
        likes: 156,
        comments: 28,
      },
    ];

    const recommendedCampaigns = [
      {
        id: 2,
        title: "Sustainable Fashion Revolution",
        current_funding: 45000,
        funding_goal: 75000,
        cover_image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
        category: "Fashion",
        backers: 342,
        daysLeft: 23,
      },
      {
        id: 3,
        title: "Smart Urban Garden System",
        current_funding: 28000,
        funding_goal: 50000,
        cover_image:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
        category: "Technology",
        backers: 198,
        daysLeft: 15,
      },
      {
        id: 4,
        title: "Community Art Space",
        current_funding: 15000,
        funding_goal: 30000,
        cover_image:
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=80",
        category: "Arts",
        backers: 89,
        daysLeft: 31,
      },
    ];

    const backerCount = 1267; // Enhanced backer count
    const averageDonation = Math.round(campaign.current_funding / backerCount);

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-green-50/5 to-background">
        {/* Premium Hero Header */}
        <div className="relative overflow-hidden">
          <div className="aspect-[21/9] w-full relative">
            <img
              src={
                campaign.cover_image ||
                "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80"
              }
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Floating Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-3">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
              >
                <Flag className="w-4 h-4" />
              </Button>
            </div>

            {/* Campaign Status Badge */}
            <div className="absolute top-6 left-6">
              <Badge className="bg-green-500/90 text-white backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                Active Campaign
              </Badge>
            </div>
          </div>

          {/* Hero Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto max-w-7xl">
              <div className="flex items-center gap-4 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                >
                  {campaign.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <MapPin className="w-4 h-4" />
                  {campaign.location}
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                {campaign.title}
              </h1>
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-white/50">
                  <AvatarImage src={campaign.owner_avatar} />
                  <AvatarFallback className="text-lg font-bold">
                    {campaign.owner_name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-xl">
                    by {campaign.owner_name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Verified className="w-4 h-4 text-blue-400" />
                    <span>Verified Creator</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Premium Progress Section - Single Consolidated Display */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold gradient-text mb-2">
                        $
                        {campaign.current_funding >= 1000000
                          ? `${(campaign.current_funding / 1000000).toFixed(1)}M`
                          : `${(campaign.current_funding / 1000).toFixed(0)}K`}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        raised of $
                        {campaign.funding_goal >= 1000000
                          ? `${(campaign.funding_goal / 1000000).toFixed(1)}M`
                          : `${(campaign.funding_goal / 1000).toFixed(0)}K`}{" "}
                        goal
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-blue-600 mb-2">
                        {backerCount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        backers
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-orange-600 mb-2">
                        {daysRemaining}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        days left
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-purple-600 mb-2">
                        {fundingPercentage}%
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        funded
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-4 mb-8">
                    <Progress
                      value={fundingPercentage}
                      className="h-6 rounded-full shadow-inner bg-gray-100"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        Started{" "}
                        {new Date(campaign.start_date).toLocaleDateString()}
                      </span>
                      <span>
                        Ends {new Date(campaign.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mb-8">
                    <Button
                      size="lg"
                      className="flex-1 premium-button rounded-2xl py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Back This Project
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl px-6 border-2 hover:bg-gray-50"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-2xl px-6 border-2 hover:bg-gray-50"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Top 3 Donators Leaderboard */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <div className="flex items-center gap-3 mb-6">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-xl font-bold text-gray-900">
                        Top Supporters
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {topDonators.slice(0, 3).map((backer, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-yellow-100"
                        >
                          <div className="relative">
                            <Avatar className="w-12 h-12 border-2 border-yellow-300">
                              <AvatarImage src={backer.avatar} />
                              <AvatarFallback className="text-sm font-bold">
                                {backer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {index === 0 && (
                              <Crown className="w-5 h-5 text-yellow-500 absolute -top-2 -right-1" />
                            )}
                            {index === 1 && (
                              <Medal className="w-4 h-4 text-gray-400 absolute -top-1 -right-1" />
                            )}
                            {index === 2 && (
                              <Award className="w-4 h-4 text-orange-500 absolute -top-1 -right-1" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm truncate">
                                {backer.name}
                              </p>
                              {backer.verified && (
                                <Verified className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                            <p className="text-xs text-green-600 font-bold">
                              ${backer.amount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Tabbed Content */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                <Tabs defaultValue="story" className="w-full">
                  <div className="border-b border-gray-200">
                    <TabsList className="grid w-full grid-cols-4 bg-transparent h-auto p-0">
                      <TabsTrigger
                        value="story"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4 px-6 font-semibold"
                      >
                        Story
                      </TabsTrigger>
                      <TabsTrigger
                        value="updates"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4 px-6 font-semibold"
                      >
                        Updates{" "}
                        <Badge variant="secondary" className="ml-2">
                          3
                        </Badge>
                      </TabsTrigger>
                      <TabsTrigger
                        value="comments"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4 px-6 font-semibold"
                      >
                        Comments{" "}
                        <Badge variant="secondary" className="ml-2">
                          127
                        </Badge>
                      </TabsTrigger>
                      <TabsTrigger
                        value="backers"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-4 px-6 font-semibold"
                      >
                        Backers
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="story" className="p-8 space-y-8">
                    <div className="prose prose-lg max-w-none">
                      <h2 className="text-3xl font-bold mb-6">
                        About This Project
                      </h2>
                      <p className="text-lg leading-relaxed text-gray-700 mb-6">
                        {campaign.description}
                      </p>

                      {/* Enhanced Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Target className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">
                                Our Mission
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                We're committed to creating innovative solutions
                                that make a real difference in people's lives.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">
                                Community Impact
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                This project will directly benefit our local
                                community and create lasting positive change.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Award className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">
                                Quality Assurance
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                We maintain the highest standards of quality and
                                transparency throughout our process.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Shield className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg mb-2">
                                Trust & Security
                              </h4>
                              <p className="text-gray-600 leading-relaxed">
                                Your investment is protected with our
                                comprehensive security measures and guarantees.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Media Gallery */}
                    {campaign.campaign_media &&
                      campaign.campaign_media.length > 0 && (
                        <div className="space-y-6">
                          <h3 className="text-2xl font-bold">
                            Project Gallery
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {campaign.campaign_media
                              .sort((a: CampaignMedia, b: CampaignMedia) => a.display_order - b.display_order)
                              .map((media: CampaignMedia) => (
                                <div key={media.id} className="space-y-3">
                                  {media.media_type === "image" ? (
                                    <img
                                      src={media.media_url}
                                      alt={media.caption || "Campaign media"}
                                      className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    />
                                  ) : (
                                    <div className="relative">
                                      <video
                                        src={media.media_url}
                                        controls
                                        className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <Play className="w-12 h-12 text-white bg-black/50 rounded-full p-3" />
                                      </div>
                                    </div>
                                  )}
                                  {media.caption && (
                                    <p className="text-sm text-muted-foreground italic">
                                      {media.caption}
                                    </p>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                  </TabsContent>

                  <TabsContent value="updates" className="p-8">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold mb-6">
                        Project Updates
                      </h2>
                      {campaignUpdates.map((update) => (
                        <Card
                          key={update.id}
                          className="border-l-4 border-l-primary"
                        >
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-semibold">
                                {update.title}
                              </h3>
                              <span className="text-sm text-muted-foreground">
                                {new Date(update.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {update.content}
                            </p>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4" />
                                <span>{update.likes} likes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                <span>{update.comments} comments</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="comments" className="p-8">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold mb-6">
                        Community Comments
                      </h2>
                      <div className="bg-gray-50 rounded-2xl p-6 text-center">
                        <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Comments section coming soon. Join the conversation!
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="backers" className="p-8">
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold mb-6">
                        Our Amazing Backers
                      </h2>
                      <div className="space-y-4">
                        {topDonators.map((backer, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-green-50/50 to-transparent hover:from-green-50 transition-all duration-300 border border-green-100/50"
                          >
                            <Avatar className="w-14 h-14 border-2 border-white shadow-md">
                              <AvatarImage src={backer.avatar} />
                              <AvatarFallback className="text-lg font-bold">
                                {backer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-bold text-lg">
                                  {backer.name}
                                </h4>
                                {backer.verified && (
                                  <Verified className="w-5 h-5 text-blue-500" />
                                )}
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-700 font-bold"
                                >
                                  ${backer.amount.toLocaleString()}
                                </Badge>
                              </div>
                              <p className="text-gray-700 leading-relaxed mb-2">
                                {backer.message}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {backer.timeAgo}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>

              {/* Recommended Campaigns */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    You Might Also Like
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendedCampaigns.map((recCampaign) => {
                      const recFundingPercentage = Math.round(
                        (recCampaign.current_funding /
                          recCampaign.funding_goal) *
                          100,
                      );

                      return (
                        <Card
                          key={recCampaign.id}
                          className="overflow-hidden hover-lift transition-all duration-300 border-0 shadow-lg hover:shadow-xl group"
                        >
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={recCampaign.cover_image}
                              alt={recCampaign.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
                              {recCampaign.category}
                            </Badge>
                            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                              {recCampaign.daysLeft} days left
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                              {recCampaign.title}
                            </h4>
                            <div className="space-y-3">
                              <Progress
                                value={recFundingPercentage}
                                className="h-2"
                              />
                              <div className="flex justify-between text-sm">
                                <span className="font-bold text-primary">
                                  $
                                  {(recCampaign.current_funding / 1000).toFixed(
                                    0,
                                  )}
                                  K
                                </span>
                                <span className="text-muted-foreground">
                                  {recFundingPercentage}% funded
                                </span>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{recCampaign.backers} backers</span>
                                <span>
                                  Goal: $
                                  {(recCampaign.funding_goal / 1000).toFixed(0)}
                                  K
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="w-full mt-4 premium-button group-hover:shadow-lg transition-shadow"
                              asChild
                            >
                              <Link href={`/campaigns/${recCampaign.id}`}>
                                View Campaign
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Premium Right Sidebar */}
            <div className="space-y-6">
              {/* Available Rewards Section */}
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl sticky top-8">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Gift className="w-6 h-6 text-primary" />
                    Available Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                  {campaign.reward_tiers && campaign.reward_tiers.length > 0 ? (
                    campaign.reward_tiers
                      .sort((a: RewardTier, b: RewardTier) => a.display_order - b.display_order)
                      .map((tier: RewardTier) => (
                        <div
                          key={tier.id}
                          className="border-2 border-green-200 rounded-2xl p-5 hover:border-green-300 transition-all duration-300 cursor-pointer group hover:shadow-lg bg-gradient-to-br from-white to-green-50/30"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700 font-bold text-lg px-4 py-2"
                            >
                              ${tier.amount}
                            </Badge>
                            <div className="flex items-center gap-2">
                              <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-semibold">
                                Limited
                              </div>
                              <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-semibold">
                                {Math.floor(Math.random() * 50) + 10} left
                              </div>
                            </div>
                          </div>
                          <h4 className="font-bold text-lg mb-3 group-hover:text-green-700 transition-colors">
                            {tier.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {tier.description}
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs text-green-600">
                              <CheckCircle className="w-3 h-3" />
                              <span>Estimated delivery: 3-6 months</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-blue-600">
                              <Shield className="w-3 h-3" />
                              <span>Satisfaction guaranteed</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-purple-600">
                              <Star className="w-3 h-3" />
                              <span>Exclusive backer perks included</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="w-full premium-button group-hover:shadow-md transition-shadow"
                          >
                            Select This Reward
                          </Button>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-12">
                      <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg">
                        No reward tiers available.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Support this campaign with any amount!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading campaign:", error);
    notFound();
  }
}
