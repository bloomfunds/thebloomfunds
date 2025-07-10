import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";

const successStories = [
  {
    id: 1,
    title: "Artisan Bakery Dreams Come True",
    businessName: "Sweet Beginnings Bakery",
    founder: "Sarah Johnson",
    location: "Portland, Oregon",
    category: "Food & Beverage",
    fundingGoal: 450000,
    amountRaised: 680000,
    backers: 1287,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    story:
      "Our campaign helped us purchase new equipment and open our first storefront. We're now serving over 200 customers daily and have hired 5 new employees. The community support was incredible!",
    achievements: [
      "Opened first physical location",
      "Hired 5 full-time employees",
      "Serving 200+ customers daily",
      "Featured in local food magazine",
    ],
    launchDate: "2023-03-15",
    completedDate: "2023-05-20",
  },
  {
    id: 2,
    title: "Tech Innovation Breakthrough",
    businessName: "EcoTech Solutions",
    founder: "Michael Chen",
    location: "San Francisco, CA",
    category: "Technology",
    fundingGoal: 800000,
    amountRaised: 1200000,
    backers: 2456,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    story:
      "The funds we raised helped us develop our prototype and secure additional venture capital. We've now expanded to a team of 15 and launched our product to market.",
    achievements: [
      "Developed working prototype",
      "Secured Series A funding",
      "Expanded to 15 team members",
      "Launched product to market",
    ],
    launchDate: "2023-01-10",
    completedDate: "2023-04-15",
  },
  {
    id: 3,
    title: "Premium Coffee House Revolution",
    businessName: "Artisan Coffee Collective",
    founder: "Maria Santos",
    location: "Seattle, Washington",
    category: "Food & Beverage",
    fundingGoal: 350000,
    amountRaised: 520000,
    backers: 1823,
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    story:
      "Our community-backed campaign allowed us to create a premium coffee experience with ethically sourced beans and state-of-the-art equipment. We're now the go-to destination for coffee enthusiasts.",
    achievements: [
      "Opened flagship coffee house",
      "Direct trade partnerships",
      "Award-winning roasting facility",
      "Expanded to 3 locations",
    ],
    launchDate: "2023-02-01",
    completedDate: "2023-06-30",
  },
  {
    id: 4,
    title: "Sustainable Fashion Revolution",
    businessName: "Green Threads",
    founder: "Emma Rodriguez",
    location: "New York, NY",
    category: "Fashion",
    fundingGoal: 600000,
    amountRaised: 950000,
    backers: 3892,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    story:
      "With community support, we launched our sustainable clothing line and partnered with ethical manufacturers. Our eco-friendly approach resonated with conscious consumers worldwide.",
    achievements: [
      "Launched sustainable clothing line",
      "Partnered with ethical manufacturers",
      "International shipping available",
      "Featured in fashion magazines",
    ],
    launchDate: "2023-04-01",
    completedDate: "2023-07-15",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl gradient-text-hero">
                Success Stories
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover how entrepreneurs transformed their dreams into
                thriving businesses with community support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story) => {
              const fundingPercentage = Math.round(
                (story.amountRaised / story.fundingGoal) * 100,
              );

              return (
                <Card key={story.id} className="overflow-hidden hover-lift">
                  <div className="aspect-video relative">
                    <img
                      src={story.image}
                      alt={story.businessName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary">{story.category}</Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="text-white font-medium">
                        {fundingPercentage}% Funded • $
                        {story.amountRaised.toLocaleString()} Raised
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {story.location}
                    </div>
                    <CardTitle className="text-xl">{story.title}</CardTitle>
                    <CardDescription className="text-base">
                      <span className="font-semibold">
                        {story.businessName}
                      </span>{" "}
                      by {story.founder}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Funding Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-lg font-bold">
                          ${story.amountRaised.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Raised
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-lg font-bold">{story.backers}</div>
                        <div className="text-xs text-muted-foreground">
                          Backers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="text-lg font-bold">
                          {fundingPercentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Success
                        </div>
                      </div>
                    </div>

                    {/* Story Quote */}
                    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                      "{story.story}"
                    </blockquote>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-1">
                        {story.achievements.map((achievement, index) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Started:{" "}
                        {new Date(story.launchDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Completed:{" "}
                        {new Date(story.completedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Write Your Success Story?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Join these successful entrepreneurs and turn your business idea
                into reality with community support.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/campaign/create">Start Your Campaign</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/campaigns">Explore Campaigns</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
