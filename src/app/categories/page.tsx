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
  Laptop,
  Coffee,
  ShoppingBag,
  Wrench,
  Factory,
  Palette,
  Heart,
  Gamepad2,
  Leaf,
  Music,
  Camera,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: "technology",
    name: "Technology",
    description: "Software, hardware, apps, and innovative tech solutions",
    icon: Laptop,
    color: "from-blue-500 to-cyan-600",
    campaigns: 342,
    totalFunded: "$8.2M",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    examples: [
      "Mobile Apps",
      "SaaS Platforms",
      "Hardware Devices",
      "AI Solutions",
    ],
  },
  {
    id: "food-beverage",
    name: "Food & Beverage",
    description: "Restaurants, cafes, food products, and culinary innovations",
    icon: Coffee,
    color: "from-orange-500 to-red-600",
    campaigns: 289,
    totalFunded: "$5.7M",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    examples: [
      "Restaurants",
      "Food Products",
      "Beverages",
      "Catering Services",
    ],
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    description: "Online stores, physical retail, and consumer products",
    icon: ShoppingBag,
    color: "from-purple-500 to-pink-600",
    campaigns: 256,
    totalFunded: "$4.3M",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    examples: ["Fashion", "Electronics", "Home Goods", "Specialty Products"],
  },
  {
    id: "services",
    name: "Services",
    description:
      "Professional services, consulting, and service-based businesses",
    icon: Wrench,
    color: "from-green-500 to-emerald-600",
    campaigns: 198,
    totalFunded: "$3.1M",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
    examples: ["Consulting", "Marketing", "Design", "Professional Services"],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Production, manufacturing, and industrial businesses",
    icon: Factory,
    color: "from-gray-500 to-slate-600",
    campaigns: 167,
    totalFunded: "$6.8M",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    examples: [
      "Product Manufacturing",
      "Industrial Equipment",
      "Custom Production",
      "Supply Chain",
    ],
  },
  {
    id: "arts-culture",
    name: "Arts & Culture",
    description: "Creative projects, art, music, and cultural initiatives",
    icon: Palette,
    color: "from-pink-500 to-rose-600",
    campaigns: 145,
    totalFunded: "$2.4M",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
    examples: [
      "Art Galleries",
      "Music Venues",
      "Creative Studios",
      "Cultural Events",
    ],
  },
  {
    id: "health-wellness",
    name: "Health & Wellness",
    description: "Healthcare, fitness, wellness, and medical innovations",
    icon: Heart,
    color: "from-red-500 to-pink-600",
    campaigns: 134,
    totalFunded: "$4.9M",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    examples: [
      "Fitness Centers",
      "Health Products",
      "Wellness Services",
      "Medical Devices",
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Gaming, entertainment venues, and recreational businesses",
    icon: Gamepad2,
    color: "from-indigo-500 to-purple-600",
    campaigns: 112,
    totalFunded: "$3.6M",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    examples: ["Gaming", "Entertainment Venues", "Events", "Recreation"],
  },
  {
    id: "sustainability",
    name: "Sustainability",
    description: "Eco-friendly businesses and environmental solutions",
    icon: Leaf,
    color: "from-green-500 to-teal-600",
    campaigns: 98,
    totalFunded: "$2.8M",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    examples: [
      "Green Energy",
      "Sustainable Products",
      "Environmental Services",
      "Eco Solutions",
    ],
  },
];

export default function CategoriesPage() {
  const totalCampaigns = categories.reduce(
    (sum, cat) => sum + cat.campaigns,
    0,
  );
  const totalFunding = categories.reduce((sum, cat) => {
    const amount = parseFloat(
      cat.totalFunded.replace("$", "").replace("M", ""),
    );
    return sum + amount;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl gradient-text-hero">
                Explore Categories
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover innovative businesses across diverse industries and
                find the perfect campaign to support.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {totalCampaigns.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Campaigns
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  ${totalFunding.toFixed(1)}M+
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Funded
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">
                  {categories.length}
                </div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;

              return (
                <Card
                  key={category.id}
                  className="overflow-hidden hover-lift group cursor-pointer"
                >
                  <div className="aspect-video relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}
                        >
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-white">
                          <div className="font-semibold">
                            {category.campaigns} campaigns
                          </div>
                          <div className="text-sm opacity-90">
                            {category.totalFunded} funded
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Examples */}
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Popular Types:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {category.examples.map((example, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Button asChild className="w-full">
                        <Link href={`/campaigns?category=${category.id}`}>
                          Explore {category.name} Campaigns
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Trending Categories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These categories are seeing the most activity and success rates
              this month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category, index) => {
              const IconComponent = category.icon;
              const badges = [
                "🔥 Trending",
                "⭐ High Success Rate",
                "💰 Well Funded",
              ];

              return (
                <Card key={category.id} className="text-center hover-lift">
                  <CardHeader>
                    <div
                      className={`mx-auto mb-4 p-4 rounded-full bg-gradient-to-r ${category.color} w-16 h-16 flex items-center justify-center`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="mb-2">{badges[index]}</Badge>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-2xl font-bold">
                          {category.campaigns}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Campaigns
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          {category.totalFunded}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Funded
                        </div>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/campaigns?category=${category.id}`}>
                        View Campaigns
                      </Link>
                    </Button>
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
                Don't See Your Category?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                We welcome businesses from all industries. Start your campaign
                today and join our diverse community of entrepreneurs.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/campaign/create">Start Your Campaign</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/campaigns">Browse All Campaigns</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
