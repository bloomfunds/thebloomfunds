"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Heart,
  Menu,
  PlusCircle,
  Search,
  User,
  LogOut,
  Settings,
  X,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  DollarSign,
  Target,
  Users,
  TrendingUp,
  MessageCircle,
  Info,
  BookOpen,
  LifeBuoy,
} from "lucide-react";
import { getCurrentUser, signOut } from "@/lib/supabase";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  const checkUser = async () => {
    try {
      const { user } = await getCurrentUser();
      setUser(user);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const exploreItems = [
    {
      title: "Browse Campaigns",
      description: "Discover innovative business ideas",
      icon: <Search className="w-5 h-5 text-primary" />,
      href: "/campaigns",
    },
    {
      title: "Success Stories",
      description: "See how others achieved their goals",
      icon: <TrendingUp className="w-5 h-5 text-primary" />,
      href: "/success-stories",
    },
    {
      title: "Categories",
      description: "Explore by business category",
      icon: <Target className="w-5 h-5 text-primary" />,
      href: "/categories",
    },
  ];

  const aboutItems = [
    {
      title: "About Us",
      description: "Learn about our mission",
      icon: <Info className="w-5 h-5 text-primary" />,
      href: "/about",
    },
    {
      title: "How It Works",
      description: "Step-by-step guide to crowdfunding",
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      href: "/how-it-works",
    },

    {
      title: "FAQ",
      description: "Frequently asked questions",
      icon: <HelpCircle className="w-5 h-5 text-primary" />,
      href: "/faq",
    },
    {
      title: "Support",
      description: "Get help when you need it",
      icon: <LifeBuoy className="w-5 h-5 text-primary" />,
      href: "/support",
    },
  ];

  return (
    <nav
      className={`w-full fixed top-0 z-50 py-1 transition-all duration-300 ${
        isScrolled ? "glass-navbar scrolled" : "glass-navbar"
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-all duration-300"
          >
            <img
              src="https://i.postimg.cc/sxhQytPB/logo.png"
              alt="Bloom"
              className="h-14 w-auto"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {/* Home */}
            <Link
              href="/"
              className="nav-link-underline text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
            >
              Home
            </Link>

            {/* Explore Dropdown */}
            <DropdownMenu
              open={activeDropdown === "explore"}
              onOpenChange={(open) =>
                setActiveDropdown(open ? "explore" : null)
              }
            >
              <DropdownMenuTrigger className="nav-link-underline flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group outline-none">
                Explore
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "explore" ? "rotate-180" : ""
                  }`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="dropdown-enhanced w-80 p-4"
                align="start"
              >
                <div className="grid gap-3">
                  {exploreItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="dropdown-item-enhanced flex items-start gap-3 p-3 rounded-lg cursor-pointer group">
                        <div className="mt-1">{item.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-3" />
                <Link href="/campaigns" onClick={() => setActiveDropdown(null)}>
                  <div className="flex items-center justify-center gap-2 p-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    View All Campaigns
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* About Dropdown */}
            <DropdownMenu
              open={activeDropdown === "about"}
              onOpenChange={(open) => setActiveDropdown(open ? "about" : null)}
            >
              <DropdownMenuTrigger className="nav-link-underline flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group outline-none">
                About
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "about" ? "rotate-180" : ""
                  }`}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="dropdown-enhanced w-80 p-4"
                align="start"
              >
                <div className="grid gap-3">
                  {aboutItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="dropdown-item-enhanced flex items-start gap-3 p-3 rounded-lg cursor-pointer group">
                        <div className="mt-1">{item.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-3" />
                <Link href="/about" onClick={() => setActiveDropdown(null)}>
                  <div className="flex items-center justify-center gap-2 p-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                    Learn More About Us
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex gap-3 items-center">
            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Link href="/campaign/create">
                      <Button className="premium-button text-sm px-4 py-2">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        <span>Create Campaign</span>
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="relative h-8 w-8 rounded-full"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user.avatar_url}
                              alt={user.full_name || user.email}
                            />
                            <AvatarFallback>
                              {(user.full_name || user.email)
                                .charAt(0)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="dropdown-enhanced w-56"
                        align="end"
                        forceMount
                      >
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            {user.full_name && (
                              <p className="font-medium">{user.full_name}</p>
                            )}
                            <p className="w-[200px] truncate text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard">
                            <User className="mr-2 h-4 w-4" />
                            User Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            Profile Settings
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors nav-link-underline"
                    >
                      Sign In
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="premium-button text-sm px-5 py-2.5">
                        <span>Get Started</span>
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              {/* Mobile Explore */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-900 px-3">
                  Explore
                </div>
                {exploreItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="dropdown-item-enhanced flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary rounded-lg transition-colors">
                      {item.icon}
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile About */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-900 px-3">
                  About
                </div>
                {aboutItems.slice(0, 3).map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="dropdown-item-enhanced flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary rounded-lg transition-colors">
                      {item.icon}
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link href="/campaign/create">
                      <Button className="w-full premium-button text-sm py-2.5">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        <span>Create Campaign</span>
                      </Button>
                    </Link>
                    <div className="px-3">
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full text-sm py-2 text-gray-700 hover:text-gray-900"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin">
                      <Button
                        variant="ghost"
                        className="w-full text-sm py-2 text-gray-700 hover:text-gray-900"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full premium-button text-sm py-2.5">
                        <span>Get Started</span>
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
