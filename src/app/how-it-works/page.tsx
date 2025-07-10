import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Users,
  TrendingUp,
  Search,
  Heart,
  Share2,
  CheckCircle,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                How It Works
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Learn how FundMyBusiness connects entrepreneurs with supporters
                to bring great business ideas to life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Tabs */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="entrepreneurs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="entrepreneurs">For Entrepreneurs</TabsTrigger>
              <TabsTrigger value="supporters">For Supporters</TabsTrigger>
            </TabsList>

            <TabsContent value="entrepreneurs" className="mt-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                  Launch Your Campaign
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Follow these simple steps to create and launch your
                  fundraising campaign.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      1
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <PlusCircle className="h-5 w-5" />
                      Create Campaign
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Set up your campaign with business details, funding goals,
                      timeline, and compelling media.
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      2
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Share & Promote
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Share your campaign with friends, family, and social
                      networks to build momentum.
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      3
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Track Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Monitor your funding progress, engage with supporters, and
                      provide updates.
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      4
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Launch Business
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Receive your funds and bring your business idea to life
                      with community support.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Button size="lg" asChild>
                  <Link href="/campaign/create">
                    Start Your Campaign <PlusCircle className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="supporters" className="mt-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                  Support Great Ideas
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Discover and support innovative business ideas that inspire
                  you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      1
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <Search className="h-5 w-5" />
                      Discover Campaigns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Browse campaigns by category, search for specific
                      businesses, or explore featured projects.
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      2
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <Heart className="h-5 w-5" />
                      Choose Your Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Select a contribution amount and optional reward tier that
                      matches your support level.
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      3
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Make Contribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Complete your secure payment and optionally leave a
                      message of support for the entrepreneur.
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      4
                    </div>
                    <CardTitle className="flex items-center justify-center gap-2">
                      <Users className="h-5 w-5" />
                      Stay Connected
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      Follow campaign progress, receive updates, and celebrate
                      the business's success.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-12">
                <Button size="lg" asChild>
                  <Link href="/campaigns">
                    Explore Campaigns <Search className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get answers to common questions about using FundMyBusiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>How much does it cost?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Creating a campaign is free. We only charge a small platform
                  fee (5%) on successfully funded campaigns to keep our platform
                  running.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What happens if I don't reach my goal?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use a flexible funding model. You keep whatever funds you
                  raise, even if you don't reach your full goal, minus our
                  platform fee.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How do I receive the funds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Funds are transferred directly to your bank account within 5-7
                  business days after your campaign ends or reaches its goal.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can I edit my campaign after launching?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, you can update your campaign description, add new media,
                  and post updates to keep your supporters informed throughout
                  the campaign.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Join thousands of entrepreneurs and supporters who are making
                business dreams come true.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/campaign/create">Start a Campaign</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/campaigns">Browse Campaigns</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
