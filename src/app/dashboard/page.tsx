"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Target,
  Award,
  Settings,
  Plus,
  Edit3,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Mock data for dashboard
const mockCampaigns = [
  {
    id: 1,
    title: "Revolutionary AI-Powered Coffee Roastery",
    status: "active",
    current_funding: 190000,
    funding_goal: 200000,
    backers: 1900,
    days_remaining: 15,
    cover_image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    title: "Sustainable Urban Garden Kit",
    status: "completed",
    current_funding: 85000,
    funding_goal: 75000,
    backers: 850,
    days_remaining: 0,
    cover_image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    created_at: "2023-11-20",
  },
  {
    id: 3,
    title: "Smart Home Security System",
    status: "draft",
    current_funding: 0,
    funding_goal: 150000,
    backers: 0,
    days_remaining: 30,
    cover_image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    created_at: "2024-02-01",
  },
];

const analyticsData = [
  { name: "Jan", funding: 12000, backers: 120 },
  { name: "Feb", funding: 19000, backers: 190 },
  { name: "Mar", funding: 25000, backers: 250 },
  { name: "Apr", funding: 35000, backers: 350 },
  { name: "May", funding: 45000, backers: 450 },
  { name: "Jun", funding: 65000, backers: 650 },
];

const pieData = [
  { name: "Technology", value: 45, color: "#0ea5e9" },
  { name: "Food & Beverage", value: 30, color: "#10b981" },
  { name: "Arts & Crafts", value: 15, color: "#f59e0b" },
  { name: "Other", value: 10, color: "#ef4444" },
];

const recentActivity = [
  {
    type: "donation",
    message: "Sarah Martinez backed your campaign with $500",
    time: "2 hours ago",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
  },
  {
    type: "milestone",
    message: "Your campaign reached 95% of funding goal!",
    time: "5 hours ago",
    avatar: null,
  },
  {
    type: "comment",
    message: "Michael Chen left a comment on your campaign",
    time: "1 day ago",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    type: "share",
    message: "Your campaign was shared 25 times today",
    time: "2 days ago",
    avatar: null,
  },
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const totalFunding = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.current_funding,
    0,
  );
  const totalBackers = mockCampaigns.reduce(
    (sum, campaign) => sum + campaign.backers,
    0,
  );
  const activeCampaigns = mockCampaigns.filter(
    (c) => c.status === "active",
  ).length;
  const completedCampaigns = mockCampaigns.filter(
    (c) => c.status === "completed",
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-green-50/20 to-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg font-medium text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/20 to-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Button
                    variant="default"
                    className="w-full justify-start premium-button"
                  >
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Overview
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-green-50"
                    asChild
                  >
                    <Link href="/dashboard/campaigns">
                      <Target className="w-4 h-4 mr-3" />
                      My Campaigns
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-green-50"
                    asChild
                  >
                    <Link href="/dashboard/pledges">
                      <Heart className="w-4 h-4 mr-3" />
                      My Pledges
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-green-50"
                    asChild
                  >
                    <Link href="/dashboard/rewards">
                      <Award className="w-4 h-4 mr-3" />
                      Claim Rewards
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-green-50"
                    asChild
                  >
                    <Link href="/dashboard/settings">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-4xl font-bold gradient-text-hero mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-lg text-muted-foreground">
                  Welcome back! Here's what's happening with your campaigns.
                </p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button className="premium-button" asChild>
                  <Link href="/campaign/create">
                    <Plus className="w-4 h-4 mr-2" />
                    New Campaign
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Total Raised
                      </p>
                      <p className="text-3xl font-bold gradient-text">
                        ${(totalFunding / 1000).toFixed(0)}K
                      </p>
                      <div className="flex items-center mt-2 text-sm text-green-600">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        <span>+12.5% from last month</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Total Backers
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {totalBackers.toLocaleString()}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-blue-600">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        <span>+8.2% from last month</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Active Campaigns
                      </p>
                      <p className="text-3xl font-bold text-orange-600">
                        {activeCampaigns}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-orange-600">
                        <Activity className="w-4 h-4 mr-1" />
                        <span>{completedCampaigns} completed</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Success Rate
                      </p>
                      <p className="text-3xl font-bold text-purple-600">94%</p>
                      <div className="flex items-center mt-2 text-sm text-purple-600">
                        <Star className="w-4 h-4 mr-1" />
                        <span>Above average</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Content */}
            <div className="space-y-8">
              {/* Analytics Chart */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        Analytics Overview
                      </CardTitle>
                      <CardDescription className="text-base">
                        Track your campaign performance over time
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={
                          selectedPeriod === "7d" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedPeriod("7d")}
                      >
                        7D
                      </Button>
                      <Button
                        variant={
                          selectedPeriod === "30d" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedPeriod("30d")}
                      >
                        30D
                      </Button>
                      <Button
                        variant={
                          selectedPeriod === "90d" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedPeriod("90d")}
                      >
                        90D
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="funding"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign Management */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        Your Campaigns
                      </CardTitle>
                      <CardDescription className="text-base">
                        Manage and track all your campaigns
                      </CardDescription>
                    </div>
                    <Button className="premium-button" asChild>
                      <Link href="/campaign/create">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mockCampaigns.map((campaign) => {
                    const fundingPercentage = Math.min(
                      Math.round(
                        (campaign.current_funding / campaign.funding_goal) *
                          100,
                      ),
                      100,
                    );

                    return (
                      <div
                        key={campaign.id}
                        className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-50/50 to-transparent hover:from-gray-50 transition-all duration-300 border border-gray-100/50"
                      >
                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                          <img
                            src={campaign.cover_image}
                            alt={campaign.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg truncate">
                              {campaign.title}
                            </h3>
                            <Badge
                              variant={
                                campaign.status === "active"
                                  ? "default"
                                  : campaign.status === "completed"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={
                                campaign.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : campaign.status === "completed"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                              }
                            >
                              {campaign.status === "active" ? (
                                <>
                                  <Activity className="w-3 h-3 mr-1" />
                                  Active
                                </>
                              ) : campaign.status === "completed" ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3 mr-1" />
                                  Draft
                                </>
                              )}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Raised
                              </p>
                              <p className="font-semibold">
                                ${(campaign.current_funding / 1000).toFixed(0)}K
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Backers
                              </p>
                              <p className="font-semibold">
                                {campaign.backers}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Days Left
                              </p>
                              <p className="font-semibold">
                                {campaign.days_remaining}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{fundingPercentage}% funded</span>
                              <span className="text-muted-foreground">
                                Goal: $
                                {(campaign.funding_goal / 1000).toFixed(0)}K
                              </span>
                            </div>
                            <Progress
                              value={fundingPercentage}
                              className="h-2"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/campaigns/${campaign.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Activity className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50/50 transition-colors"
                    >
                      {activity.avatar ? (
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={activity.avatar} />
                          <AvatarFallback>
                            {activity.message.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          {activity.type === "milestone" && (
                            <Target className="w-5 h-5 text-white" />
                          )}
                          {activity.type === "share" && (
                            <Share2 className="w-5 h-5 text-white" />
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-relaxed">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Category Performance */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Category Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "none",
                            borderRadius: "12px",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3 mt-4">
                    {pieData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Zap className="w-5 h-5 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    asChild
                  >
                    <Link href="/campaign/create">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Campaign
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message Backers
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Campaign
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    asChild
                  >
                    <Link href="/dashboard/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
