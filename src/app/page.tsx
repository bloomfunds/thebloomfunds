"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  PlusCircle,
  TrendingUp,
  Users,
  Sparkles,
  Target,
  DollarSign,
  Heart,
  Rocket,
  Star,
  Zap,
  Crown,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { getCampaigns } from "@/lib/database";
import { Campaign } from "@/lib/supabase";
import TestimonialCarousel from "@/components/ui/testimonial-carousel";

// Typewriter component
function TypewriterText({ isMounted }: { isMounted: boolean }) {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("Fund Your Business Dreams");
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    "Fund Your Business Dreams",
    "Build Your Business Empire",
    "Transform Ideas into Success",
    "Grow Your Startup Vision",
  ];

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") {
      return;
    }

    try {
      const currentFullText = texts[currentText];
      const timeout = setTimeout(
        () => {
          if (!isDeleting) {
            if (displayText.length < currentFullText.length) {
              setDisplayText(currentFullText.slice(0, displayText.length + 1));
            } else {
              setTimeout(() => setIsDeleting(true), 2500);
            }
          } else {
            if (displayText.length > 0) {
              setDisplayText(displayText.slice(0, -1));
            } else {
              setIsDeleting(false);
              setCurrentText((prev) => (prev + 1) % texts.length);
            }
          }
        },
        isDeleting ? 50 : 120,
      );

      return () => {
        if (typeof clearTimeout !== "undefined") {
          clearTimeout(timeout);
        }
      };
    } catch (error) {
      console.warn("Typewriter effect error:", error);
    }
  }, [displayText, isDeleting, currentText, texts, isMounted]);

  // Always show static text initially to prevent hydration mismatch
  const staticText = "Fund Your Business Dreams";
  const showText = isMounted ? displayText : staticText;

  return (
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-4 tracking-tight animate-slide-up min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center text-center px-4 sm:px-0 leading-tight">
      <span className="gradient-text-hero">{showText}</span>
      {isMounted && (
        <span className="border-r-2 border-primary animate-pulse ml-2 h-6 sm:h-8">
          |
        </span>
      )}
    </h1>
  );
}

// Enhanced floating particles component
function FloatingParticles({ isMounted }: { isMounted: boolean }) {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: number;
      delay: number;
      size: number;
      color: string;
      duration: number;
      opacity: number;
      blur: number;
    }>
  >([]);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") {
      return;
    }

    try {
      const colors = [
        "#0acc72",
        "#08b866",
        "#06a35a",
        "#048f4e",
        "#027a42",
        "#10b981",
        "#059669",
        "#047857",
        "#065f46",
        "#064e3b",
      ];
      // Enhanced particles with more variety
      const newParticles = Array.from({ length: 60 }, (_, i) => {
        const seed = i * 123.456;
        return {
          id: i,
          left: ((seed * 9301 + 49297) % 233280) / 2332.8,
          delay: ((seed * 1103 + 4297) % 30000) / 1000,
          size: 2 + ((seed * 7919 + 2971) % 8000) / 1000,
          color: colors[Math.floor((seed * 5471 + 1789) % colors.length)],
          duration: 20 + ((seed * 3571 + 8291) % 15000) / 1000,
          opacity: 0.3 + ((seed * 2341 + 5678) % 4000) / 10000,
          blur: 0.5 + ((seed * 4567 + 1234) % 2000) / 1000,
        };
      });
      setParticles(newParticles);
    } catch (error) {
      console.warn("Particles initialization error:", error);
    }
  }, [isMounted]);

  if (!isMounted || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}${Math.floor(particle.opacity * 255).toString(16)}, transparent 70%)`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}${Math.floor(particle.opacity * 128).toString(16)}, inset 0 0 ${particle.size}px ${particle.color}${Math.floor(particle.opacity * 64).toString(16)}`,
            filter: `blur(${particle.blur}px)`,
            animation: `elegant-float-up ${particle.duration}s ease-in-out infinite`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}

// Animated background component
function AnimatedBackground({ isMounted }: { isMounted: boolean }) {
  return (
    <>
      {/* Enhanced Premium Background with Green Blur Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50/30 to-white" />

      {/* Enhanced Green Blur Gradient Circles with More Intensity */}
      <div className="absolute top-10 left-5 w-[500px] h-[500px] bg-gradient-to-r from-green-500/25 to-emerald-500/18 rounded-full blur-3xl animate-float" />
      <div
        className="absolute top-32 right-10 w-[450px] h-[450px] bg-gradient-to-l from-green-600/22 to-teal-600/15 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-green-400/20 to-green-700/12 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-[350px] h-[350px] bg-gradient-to-tl from-emerald-500/15 to-green-500/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "6s" }}
      />

      {/* Floating Particles */}
      <FloatingParticles isMounted={isMounted} />

      {/* Grid pattern overlay with premium feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230acc72%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60" />
    </>
  );
}

// 3D Interactive Dashboard component
function ThreeDDashboard({ isMounted }: { isMounted: boolean }) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMounted || typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    const dashboardElement = document.getElementById("3d-dashboard");
    if (dashboardElement) {
      observer.observe(dashboardElement);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (dashboardElement) {
        observer.unobserve(dashboardElement);
      }
    };
  }, [isMounted]);

  const parallaxOffset = scrollY * 0.02;
  const rotateX = isVisible ? Math.min(scrollY * 0.005, 3) : 0;
  const rotateY = isVisible ? Math.sin(scrollY * 0.001) * 1 : 0;

  return (
    <div
      id="3d-dashboard"
      className="relative max-w-7xl mx-auto mt-16 perspective-1000"
    >
      <div
        className="dashboard-3d transform-gpu transition-all duration-700 ease-out"
        style={{
          transform: `translateY(${parallaxOffset}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Main Dashboard Container */}
        <div className="relative bg-gradient-to-br from-white via-green-50/30 to-white rounded-[2.5rem] p-8 shadow-2xl border border-green-100/50 backdrop-blur-sm">
          {/* Dashboard Image with 3D Effects */}
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <img
              src="https://i.postimg.cc/HLk2w91S/Screenshot-2025-05-07-at-12-00-07-AM.png"
              alt="Interactive Campaign Dashboard"
              className="w-full h-auto transform transition-transform duration-500 hover:scale-105"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))",
              }}
            />

            {/* Interactive Overlay Elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-green-500/5" />

            {/* Floating Interactive Elements */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg animate-pulse">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="text-xs font-semibold text-green-600">
                Live Analytics
              </div>
            </div>
          </div>

          {/* 3D Floating Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              {
                label: "Entrepreneurs Funded",
                value: "10K+",
                color: "from-green-500 to-emerald-600",
              },
              {
                label: "Average Funding",
                value: "$75K",
                color: "from-blue-500 to-cyan-600",
              },
              {
                label: "Platform Growth",
                value: "+340%",
                color: "from-purple-500 to-pink-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="stat-card-3d bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  transform: `translateZ(${20 + index * 10}px)`,
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div
                  className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Shadow */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-3xl blur-xl transform translate-y-8 -z-10"
          style={{
            transform: `translateY(20px) translateZ(-50px) rotateX(${rotateX * 0.5}deg)`,
          }}
        />
      </div>

      {/* Interactive Description */}
      <div className="text-center mt-12">
        <h3 className="text-2xl font-bold gradient-text-hero mb-3">
          Next-Generation Campaign Analytics
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Experience real-time campaign tracking with our advanced 3D dashboard.
          Monitor funding progress, analyze supporter engagement, and optimize
          your campaign performance.
        </p>
      </div>
    </div>
  );
}

// Stats counter component
function StatsCounter({ isMounted }: { isMounted: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
      <div className="glass-premium p-6 text-center hover-lift transition-all duration-300 group rounded-3xl">
        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
        <div className="text-gray-600 text-sm font-medium">
          Entrepreneurs Funded
        </div>
      </div>

      <div className="glass-premium p-6 text-center hover-lift transition-all duration-300 group rounded-3xl">
        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <div className="text-3xl font-bold gradient-text mb-2">$25M</div>
        <div className="text-gray-600 text-sm font-medium">
          Total Funds Raised
        </div>
      </div>

      <div className="glass-premium p-6 text-center hover-lift transition-all duration-300 group rounded-3xl">
        <Rocket className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <div className="text-3xl font-bold gradient-text mb-2">2.5K</div>
        <div className="text-gray-600 text-sm font-medium">
          Active Campaigns
        </div>
      </div>
    </div>
  );
}

// Floating icons component
function FloatingIcons() {
  const icons = [
    { Icon: Crown, delay: 0, position: { top: "20%", left: "10%" } },
    { Icon: Heart, delay: 1, position: { top: "30%", right: "15%" } },
    { Icon: Rocket, delay: 2, position: { top: "60%", left: "5%" } },
    { Icon: Star, delay: 3, position: { top: "70%", right: "10%" } },
    { Icon: Zap, delay: 4, position: { top: "40%", left: "85%" } },
  ];

  return (
    <>
      {icons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{
            ...position,
            animationDelay: `${delay}s`,
          }}
        >
          <div className="glass-premium p-3 rounded-full">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      ))}
    </>
  );
}

// Main HomePage component
export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [featuredCampaigns, setFeaturedCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Fetch featured campaigns
    const fetchCampaigns = async () => {
      try {
        const campaigns = await getCampaigns({
          status: "active",
          limit: 3,
        });
        setFeaturedCampaigns(campaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setFeaturedCampaigns([]);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden hero-gradient">
        <AnimatedBackground isMounted={isMounted} />
        <FloatingIcons />

        <div className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-6xl mx-auto">
              {/* Premium Badge */}
              <div className="inline-flex items-center px-6 py-3 glass-premium mb-8 animate-fade-in hover-lift rounded-3xl">
                <Sparkles className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-gray-800 text-sm font-medium">
                  The #1 Crowdfunding Platform
                </span>
              </div>

              {/* Enhanced Typewriter Headline */}
              <div className="mb-6">
                <TypewriterText isMounted={isMounted} />
              </div>

              {/* Enhanced Premium Subheadline */}
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-8 sm:mb-10 max-w-5xl mx-auto leading-relaxed animate-slide-up px-4 sm:px-0"
                style={{ animationDelay: "200ms" }}
              >
                Transform your{" "}
                <span className="gradient-text-subheader font-medium">
                  business idea
                </span>{" "}
                into reality with community-driven crowdfunding. Create
                campaigns, raise funds, and build your entrepreneurial success.
              </p>

              {/* Enhanced CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12 animate-slide-up px-4 sm:px-0"
                style={{ animationDelay: "400ms" }}
              >
                <Link
                  href="/campaign/create"
                  className="group relative w-full sm:w-auto px-7 py-3.5 sm:py-3.5 text-white font-semibold text-base sm:text-base rounded-2xl shadow-lg hover-lift overflow-hidden transition-all duration-300 min-h-[48px] flex items-center justify-center premium-button mobile-button"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>

                <Link
                  href="/campaigns"
                  className="group glass-premium w-full sm:w-auto px-8 py-4 sm:py-4 text-gray-800 font-semibold text-base sm:text-base transition-all duration-300 hover:bg-white/60 flex items-center justify-center gap-3 hover-lift rounded-xl min-h-[52px]"
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <span>Explore Campaigns</span>
                </Link>
              </div>

              {/* Enhanced Stats */}
              <div
                className="animate-slide-up mb-16"
                style={{ animationDelay: "600ms" }}
              >
                <StatsCounter isMounted={isMounted} />
              </div>

              {/* 3D Interactive Dashboard */}
              <div
                className="animate-slide-up mb-12"
                style={{ animationDelay: "800ms" }}
              >
                <ThreeDDashboard isMounted={isMounted} />
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-gray-600 text-sm">
                <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-full hover-lift">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-medium">Secure & Trusted</span>
                </div>
                <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-full hover-lift">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Campaigns */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-br from-background via-green-50/20 to-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center px-6 py-3 bg-green-100/80 backdrop-blur-sm rounded-full mb-4">
                <Target className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-green-700 text-sm font-semibold">
                  Featured Campaigns
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl gradient-text-hero">
                Discover Campaigns
              </h2>
              <p className="mx-auto max-w-[800px] text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0">
                Explore some of our business ideas from passionate entrepreneurs
                that was once everyday people like you.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Mock campaigns with updated images and amounts */}
            {[
              {
                id: 1,
                title: "Cozy Corner Coffee House",
                description:
                  "Creating a warm community space with artisan coffee, sustainable practices, and local partnerships to bring people together.",
                current_funding: 190000,
                funding_goal: 200000,
                cover_image:
                  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
              },
              {
                id: 2,
                title: "Smart Investment Portfolio Platform",
                description:
                  "Revolutionary AI-powered investment platform that democratizes wealth building through intelligent portfolio management and personalized financial guidance.",
                current_funding: 1200000,
                funding_goal: 300000,
                cover_image:
                  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
              },
              {
                id: 3,
                title: "Artisan Craft Brewery",
                description:
                  "Traditional brewing meets modern innovation in our community-focused craft brewery with locally sourced ingredients.",
                current_funding: 720000,
                funding_goal: 950000,
                cover_image:
                  "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800&q=80",
              },
            ].map((campaign: any) => {
              const fundingPercentage = Math.min(
                Math.round(
                  (campaign.current_funding / campaign.funding_goal) * 100,
                ),
                100,
              );

              const daysRemaining = 45; // Mock days remaining
              const backerCount = Math.floor(campaign.current_funding / 150); // Calculate backers based on funding

              return (
                <Card
                  key={campaign.id}
                  className="overflow-hidden hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl group transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]"
                  style={{
                    boxShadow:
                      "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.05)",
                  }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={campaign.cover_image}
                      alt={campaign.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                        <span className="text-white font-semibold text-sm">
                          {fundingPercentage}% Funded
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="line-clamp-2 text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                      {campaign.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-gray-600 text-base leading-relaxed mt-2">
                      {campaign.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="space-y-4">
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${fundingPercentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-3xl font-bold gradient-text">
                            {campaign.current_funding >= 1000000
                              ? `${(campaign.current_funding / 1000000).toFixed(1)}M`
                              : `${(campaign.current_funding / 1000).toFixed(0)}K`}
                          </p>
                          <p className="text-sm text-gray-500">raised</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-semibold text-gray-700">
                            {campaign.funding_goal >= 1000000
                              ? `${(campaign.funding_goal / 1000000).toFixed(1)}M`
                              : `${(campaign.funding_goal / 1000).toFixed(0)}K`}
                          </p>
                          <p className="text-sm text-gray-500">goal</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="mr-2 h-4 w-4" />
                          <span className="font-medium">
                            {backerCount.toLocaleString()} backers
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium">
                            {daysRemaining} days left
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full premium-button rounded-2xl py-3 font-semibold shadow-lg"
                      asChild
                    >
                      <Link href={`/campaigns/${campaign.id}`}>
                        View Campaign <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="rounded-2xl px-8 py-3 font-semibold border-2 border-green-200 hover:border-green-300 hover:bg-green-50"
              asChild
            >
              <Link href="/campaigns">
                View All Campaigns <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center px-6 py-3 bg-green-100/80 backdrop-blur-sm rounded-full mb-4">
                <Rocket className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-green-700 text-sm font-semibold">
                  Simple Process
                </span>
              </div>
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-text-hero">
                How It Works
              </h2>
              <p className="mx-auto max-w-[800px] text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0">
                Four simple steps to transform your business idea into a funded
                reality through our streamlined crowdfunding process.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4 sm:px-0">
            <Card className="hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl sm:rounded-3xl group transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden mobile-card">
              {/* Step Number */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <CardHeader className="p-6 sm:p-8 pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-gentle">
                  <PlusCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                  Create Your Campaign
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Build a compelling campaign page with your business story,
                  funding goals, timeline, and visual content.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl sm:rounded-3xl group transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden mobile-card">
              {/* Step Number */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <CardHeader className="p-6 sm:p-8 pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-gentle">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  Share With Your Network
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Start by sharing your campaign to everyone and telling them
                  about this amazing idea that you've always wanted to create.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl sm:rounded-3xl group transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden mobile-card">
              {/* Step Number */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <CardHeader className="p-6 sm:p-8 pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-gentle">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                  Reach Donors
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Connect with supporters who believe in your vision and are
                  ready to help fund your entrepreneurial journey.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl sm:rounded-3xl group transition-all duration-500 hover:shadow-2xl hover:scale-105 relative overflow-hidden mobile-card">
              {/* Step Number */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">4</span>
              </div>
              <CardHeader className="p-6 sm:p-8 pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-gentle">
                  <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                  Receive Funding
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 sm:px-8 pb-6 sm:pb-8">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Monitor your progress with real-time analytics, engage with
                  backers, and collect funds to bring your vision to life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories - Testimonial Carousel */}
      <section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-green-50/20 to-slate-50 relative overflow-hidden">
        {/* Luxurious Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-green-400/8 to-emerald-400/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-green-500/8 to-teal-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/5 to-green-400/4 rounded-full blur-3xl" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-4">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100/80 to-emerald-100/80 backdrop-blur-sm rounded-full mb-4 border border-green-200/50">
                <Star className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-green-700 text-sm font-semibold">
                  Success Stories
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text-hero">
                Ready to Write Your Success Story?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0">
                See how entrepreneurs have transformed their dreams into
                thriving businesses with our platform
              </p>
            </div>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center max-w-4xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-white mr-2" />
                <span className="text-white text-sm font-semibold">
                  Start Your Journey
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl px-4 sm:px-0">
                Ready to Start Your Campaign?
              </h2>
              <p className="mx-auto max-w-[800px] text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-4 sm:px-0">
                Join thousands of successful entrepreneurs who have transformed
                their business dreams into reality through our platform.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 my-8 sm:my-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                  10K+
                </div>
                <div className="text-white/80 text-xs sm:text-sm md:text-base">
                  Success Stories
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                  $25M+
                </div>
                <div className="text-white/80 text-xs sm:text-sm md:text-base">
                  Funds Raised
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                  94%
                </div>
                <div className="text-white/80 text-xs sm:text-sm md:text-base">
                  Success Rate
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-green-700 hover:bg-gray-100 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto mobile-button"
                asChild
              >
                <Link href="/campaign/create">
                  Create Campaign{" "}
                  <PlusCircle className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 font-semibold text-base sm:text-lg backdrop-blur-sm w-full sm:w-auto mobile-button"
                asChild
              >
                <Link href="/campaigns">
                  Explore Campaigns{" "}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
