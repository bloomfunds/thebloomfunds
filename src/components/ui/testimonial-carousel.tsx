"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Verified,
  Users,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "./button";

interface Testimonial {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  content: string;
  metrics: {
    funded: string;
    growth: string;
    platform: string;
  };
  verified: boolean;
  rating: number;
}

// 25 testimonials for 5 slides with 5 reviews each - adapted for crowdfunding
const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Martinez",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content:
      "Bloom helped me raise $45K for my artisan bakery in just 3 months. The platform made it easy to connect with supporters who believed in my vision!",
    metrics: {
      funded: "$45K",
      growth: "+320%",
      platform: "Food & Beverage",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "2",
    name: "Taylor Johnson",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&q=80",
    content:
      "My sustainable fashion startup raised $78K through Bloom. The community support was incredible and helped us launch our eco-friendly clothing line!",
    metrics: {
      funded: "$78K",
      growth: "+180%",
      platform: "Retail",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "3",
    name: "Casey Thompson",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    content:
      "As a photographer, I needed equipment funding. Bloom's platform helped me raise $32K to upgrade my studio and now I'm booking clients months in advance!",
    metrics: {
      funded: "$32K",
      growth: "+85%",
      platform: "Creative Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "4",
    name: "Riley Anderson",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content:
      "The campaign analytics on Bloom are incredible! I raised $95K for my tech startup and the insights helped me optimize my pitch throughout the campaign.",
    metrics: {
      funded: "$95K",
      growth: "+95%",
      platform: "Technology",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "5",
    name: "Morgan Davis",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    content:
      "Bloom helped me diversify my wellness business beyond just yoga classes. I raised $67K to open a holistic wellness center. Revenue is up 400%!",
    metrics: {
      funded: "$67K",
      growth: "+150%",
      platform: "Health & Wellness",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "6",
    name: "Alex Rivera",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    content:
      "The fintech tools I developed needed initial funding. Bloom's community helped me raise $120K and my financial app now serves thousands of users!",
    metrics: {
      funded: "$120K",
      growth: "+650%",
      platform: "Technology",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "7",
    name: "Sam Wilson",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    content:
      "My minimalist furniture designs needed production funding. Through Bloom, I raised $89K and now my furniture line is sold in stores nationwide!",
    metrics: {
      funded: "$89K",
      growth: "+120%",
      platform: "Manufacturing",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "8",
    name: "Jamie Chen",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&q=80",
    content:
      "Bloom revolutionized how I funded my fitness equipment startup. Raised $156K in 8 months and now we're the go-to brand for home gym equipment!",
    metrics: {
      funded: "$156K",
      growth: "+87%",
      platform: "Health & Wellness",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "9",
    name: "Blake Parker",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80",
    content:
      "My business consulting firm needed initial capital. Bloom's platform helped me raise $52K and I'm now helping other entrepreneurs scale their businesses!",
    metrics: {
      funded: "$52K",
      growth: "+200%",
      platform: "Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "10",
    name: "Avery Kim",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&q=80",
    content:
      "My travel gear startup took off thanks to Bloom! Raised $91K for product development and now our backpacks are used by adventurers worldwide!",
    metrics: {
      funded: "$91K",
      growth: "+204%",
      platform: "Retail",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "11",
    name: "Dakota Smith",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&q=80",
    content:
      "Transitioning from gaming to educational tech was seamless with Bloom's support. Raised $67K and my learning app now helps thousands of students!",
    metrics: {
      funded: "$67K",
      growth: "+145%",
      platform: "Technology",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "12",
    name: "Phoenix Lee",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&q=80",
    content:
      "My specialty coffee roastery went from idea to reality thanks to Bloom. Raised $42K in 3 months and now we supply cafes across three states!",
    metrics: {
      funded: "$42K",
      growth: "+746%",
      platform: "Food & Beverage",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "13",
    name: "River Brown",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    content:
      "My sustainable fashion brand needed funding for ethical production. Bloom's community helped me raise $89K and we're now carbon-neutral!",
    metrics: {
      funded: "$89K",
      growth: "+234%",
      platform: "Retail",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "14",
    name: "Sage Miller",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    content:
      "Pet care products were my passion project. Through Bloom, I raised $134K and now my organic pet food line is in stores nationwide!",
    metrics: {
      funded: "$134K",
      growth: "+567%",
      platform: "Retail",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "15",
    name: "Rowan Taylor",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&q=80",
    content:
      "DIY craft kits became my business thanks to Bloom's funding platform. Raised $73K and now my craft tutorials reach makers worldwide!",
    metrics: {
      funded: "$73K",
      growth: "+189%",
      platform: "Creative Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "16",
    name: "Ember Wilson",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
    content:
      "Music production equipment was expensive until Bloom helped me raise $61K. Now my home studio produces beats for artists across the country!",
    metrics: {
      funded: "$61K",
      growth: "+298%",
      platform: "Creative Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "17",
    name: "Storm Garcia",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&q=80",
    content:
      "My comedy club needed renovation funding. Bloom's community raised $83K and now we're the premier entertainment venue in our city!",
    metrics: {
      funded: "$83K",
      growth: "+407%",
      platform: "Entertainment",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "18",
    name: "Ocean Martinez",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&q=80",
    content:
      "Plant care and gardening supplies flourished with Bloom's support. Raised $56K and now my nursery serves plant parents across the region!",
    metrics: {
      funded: "$56K",
      growth: "+223%",
      platform: "Retail",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "19",
    name: "Sky Anderson",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&q=80",
    content:
      "My independent bookstore got a second life through Bloom. Raised $44K for renovations and now we're the community's favorite literary hub!",
    metrics: {
      funded: "$44K",
      growth: "+312%",
      platform: "Retail",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "20",
    name: "Luna Rodriguez",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80",
    content:
      "Art supplies and tutorials became my business through Bloom's funding. Raised $72K and now my creative workshops inspire artists worldwide!",
    metrics: {
      funded: "$72K",
      growth: "+267%",
      platform: "Creative Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "21",
    name: "Sage Thompson",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80",
    content:
      "My travel planning service needed initial funding. Bloom helped me raise $89K and now I help adventurers plan trips around the world!",
    metrics: {
      funded: "$89K",
      growth: "+245%",
      platform: "Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "22",
    name: "River Kim",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&q=80",
    content:
      "Tech repair services became profitable with Bloom's support. Raised $140K and now my repair shops serve customers across multiple cities!",
    metrics: {
      funded: "$140K",
      growth: "+189%",
      platform: "Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "23",
    name: "Phoenix Davis",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&q=80",
    content:
      "Home decor and interior design flourished with Bloom's funding. Raised $67K and now my design consultancy transforms homes nationwide!",
    metrics: {
      funded: "$67K",
      growth: "+156%",
      platform: "Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "24",
    name: "Ocean Wilson",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=150&q=80",
    content:
      "Parenting resources got a boost from Bloom's community. Raised $110K and now my parenting workshops help families across the country!",
    metrics: {
      funded: "$110K",
      growth: "+278%",
      platform: "Services",
    },
    verified: true,
    rating: 5,
  },
  {
    id: "25",
    name: "Storm Lee",
    handle: "",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&q=80",
    content:
      "Educational content creation became effortless with Bloom's funding. Raised $95K and now my science kits make learning accessible to thousands!",
    metrics: {
      funded: "$95K",
      growth: "+234%",
      platform: "Education",
    },
    verified: true,
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="bg-white rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-green-100/50 h-full flex flex-col aspect-[4/5] hover-target interactive-element card transform hover:scale-105 hover:-translate-y-2 backdrop-blur-sm bg-white/95"
      data-interactive="true"
      data-card="true"
      data-testimonial-card="true"
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
          />
          {testimonial.verified && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <Verified className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <h4 className="font-semibold text-gray-900 text-sm truncate">
              {testimonial.name}
            </h4>
            {testimonial.verified && (
              <Verified className="w-3 h-3 text-green-500 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 leading-relaxed mb-4 flex-1 text-sm">
        "{testimonial.content}"
      </blockquote>

      {/* Metrics */}
      <div className="pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-green-500" />
              <span className="font-semibold text-gray-900 text-xs">
                {testimonial.metrics.funded}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="font-semibold text-green-600 text-xs">
                {testimonial.metrics.growth}
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-semibold text-center">
          {testimonial.metrics.platform}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const totalTestimonials = testimonials.length;
  const cardWidth = 320; // Approximate card width including gap

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Continuous scrolling effect
  useEffect(() => {
    if (!isMounted || isPaused) return;

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const maxScroll = totalTestimonials * cardWidth;
        const newPosition = prev + 1;
        return newPosition >= maxScroll ? 0 : newPosition;
      });
    }, 50); // Smooth slow scrolling

    return () => clearInterval(interval);
  }, [isMounted, isPaused, totalTestimonials]);

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {testimonials.slice(0, 5).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    );
  }

  // Create duplicated testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div
      className="max-w-7xl mx-auto relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Scrolling Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Cards */}
        <div
          className="flex gap-6 transition-transform duration-75 ease-linear"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            width: `${duplicatedTestimonials.length * cardWidth}px`,
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-80"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div
          className="hover-target interactive-element card"
          data-interactive="true"
          data-card="true"
        >
          <div className="text-3xl font-bold text-green-600 mb-2">2.5K+</div>
          <div className="text-gray-600 font-medium">Successful Campaigns</div>
        </div>
        <div
          className="hover-target interactive-element card"
          data-interactive="true"
          data-card="true"
        >
          <div className="text-3xl font-bold text-green-600 mb-2">$25M+</div>
          <div className="text-gray-600 font-medium">Total Funds Raised</div>
        </div>
        <div
          className="hover-target interactive-element card"
          data-interactive="true"
          data-card="true"
        >
          <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
          <div className="text-gray-600 font-medium">Success Rate</div>
        </div>
        <div
          className="hover-target interactive-element card"
          data-interactive="true"
          data-card="true"
        >
          <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
          <div className="text-gray-600 font-medium">Happy Entrepreneurs</div>
        </div>
      </div>
    </div>
  );
}
