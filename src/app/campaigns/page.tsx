"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { searchCampaigns } from "@/lib/database";
import { Campaign } from "@/lib/supabase";

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "most_funded" | "ending_soon";

const categories = [
  "All Categories",
  "Technology",
  "Food & Beverage",
  "Retail",
  "Services",
  "Manufacturing",
  "Other",
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, [searchQuery, selectedCategory, sortBy]);

  const loadCampaigns = async () => {
    setIsLoading(true);
    try {
      const sortMapping = {
        newest: { sortBy: "created_at", sortOrder: "desc" as const },
        oldest: { sortBy: "created_at", sortOrder: "asc" as const },
        most_funded: { sortBy: "current_funding", sortOrder: "desc" as const },
        ending_soon: { sortBy: "end_date", sortOrder: "asc" as const },
      };

      const { sortBy: sortField, sortOrder } = sortMapping[sortBy];

      const data = await searchCampaigns({
        query: searchQuery || undefined,
        category:
          selectedCategory === "All Categories"
            ? undefined
            : selectedCategory.toLowerCase(),
        sortBy: sortField,
        sortOrder,
        limit: 24,
      });

      setCampaigns(data);
    } catch (error) {
      console.error("Error loading campaigns:", error);
      // Fallback to empty array for mock implementation
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const calculateFundingPercentage = (current: number, goal: number) => {
    return Math.min(Math.round((current / goal) * 100), 100);
  };

  const [locationFilter, setLocationFilter] = useState("");
  const [minGoal, setMinGoal] = useState("");
  const [maxGoal, setMaxGoal] = useState("");
  const [fundingStatus, setFundingStatus] = useState("all");
  const [timeRemaining, setTimeRemaining] = useState("all");

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-3">Sort By</h3>
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="most_funded">Most Funded</SelectItem>
            <SelectItem value="ending_soon">Ending Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const AdvancedFilterContent = () => (
    <div className="space-y-6 mt-6">
      <div>
        <h3 className="font-medium mb-3">Location</h3>
        <Input
          placeholder="Enter city, state, or country"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-medium mb-3">Funding Goal Range</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Min Goal
            </label>
            <Input
              placeholder="$0"
              value={minGoal}
              onChange={(e) => setMinGoal(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">
              Max Goal
            </label>
            <Input
              placeholder="$1,000,000"
              value={maxGoal}
              onChange={(e) => setMaxGoal(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Funding Status</h3>
        <Select value={fundingStatus} onValueChange={setFundingStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="under_25">Under 25% Funded</SelectItem>
            <SelectItem value="25_50">25-50% Funded</SelectItem>
            <SelectItem value="50_75">50-75% Funded</SelectItem>
            <SelectItem value="75_100">75-100% Funded</SelectItem>
            <SelectItem value="overfunded">Overfunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-3">Time Remaining</h3>
        <Select value={timeRemaining} onValueChange={setTimeRemaining}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Time</SelectItem>
            <SelectItem value="ending_soon">Less than 7 days</SelectItem>
            <SelectItem value="two_weeks">Less than 2 weeks</SelectItem>
            <SelectItem value="one_month">Less than 1 month</SelectItem>
            <SelectItem value="more_month">More than 1 month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-medium mb-3">Category</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 border-t">
        <Button
          onClick={() => {
            setLocationFilter("");
            setMinGoal("");
            setMaxGoal("");
            setFundingStatus("all");
            setTimeRemaining("all");
            setSelectedCategory("All Categories");
            setSearchQuery("");
          }}
          variant="outline"
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  const CampaignCard = ({
    campaign,
    isListView = false,
  }: {
    campaign: Campaign;
    isListView?: boolean;
  }) => {
    const daysRemaining = calculateDaysRemaining(campaign.end_date);
    const fundingPercentage = calculateFundingPercentage(
      campaign.current_funding,
      campaign.funding_goal,
    );

    if (isListView) {
      return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="flex">
            <div className="w-48 h-32 flex-shrink-0">
              <img
                src={
                  campaign.cover_image ||
                  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80"
                }
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{campaign.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {campaign.location}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {campaign.description}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">
                    by {campaign.business_name}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold">
                    ${campaign.current_funding.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of ${campaign.funding_goal.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {daysRemaining} days left
                  </div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-3">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${fundingPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {fundingPercentage}% funded
                </div>
                <Button asChild size="sm">
                  <Link href={`/campaigns/${campaign.id}`}>View Campaign</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card
        className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] transform"
        style={{
          boxShadow:
            "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="aspect-video relative">
          <img
            src={
              campaign.cover_image ||
              "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80"
            }
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="shadow-lg">
              {campaign.category}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="text-white font-medium">
              {fundingPercentage}% Funded
            </div>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            {campaign.location}
          </div>
          <CardTitle className="line-clamp-2">{campaign.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {campaign.description}
          </CardDescription>
          <p className="text-sm font-medium text-muted-foreground">
            by {campaign.business_name}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${fundingPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-bold">
                ${campaign.current_funding.toLocaleString()}
              </span>
              <span className="text-muted-foreground">
                Goal: ${campaign.funding_goal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {daysRemaining} days left
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />0 backers
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={`/campaigns/${campaign.id}`}>View Campaign</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Campaigns</h1>
          <p className="text-muted-foreground">
            Discover innovative businesses looking for support
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
          </div>

          {/* Category Filter - Desktop */}
          <div className="hidden sm:block">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger
                className="w-48 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort - Desktop */}
          <div className="hidden sm:block">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger
                className="w-40 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="most_funded">Most Funded</SelectItem>
                <SelectItem value="ending_soon">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters Button - Desktop */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="hidden sm:flex shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>
                  Refine your search with detailed filtering options
                </SheetDescription>
              </SheetHeader>
              <AdvancedFilterContent />
            </SheetContent>
          </Sheet>

          {/* View Mode Toggle */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Campaigns</SheetTitle>
                <SheetDescription>
                  Refine your search to find the perfect campaigns
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all campaigns
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {campaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    isListView
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
