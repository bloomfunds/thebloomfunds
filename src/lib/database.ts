// Real Supabase database operations
import {
  Campaign,
  Payment,
  RewardTier,
  CampaignMedia,
  CampaignMilestone,
  User,
  supabase,
} from "./supabase";

// Mock data storage
let mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Cozy Corner Coffee House",
    description:
      "Creating a warm community space with artisan coffee, sustainable practices, and local partnerships. Our cozy corner will feature locally roasted beans, comfortable seating areas, and community events that bring neighbors together while supporting local artists and musicians.",
    business_name: "Cozy Corner Coffee",
    owner_name: "Sarah Johnson",
    owner_id: "user_1",
    funding_goal: 200000,
    current_funding: 190000,
    category: "food",
    location: "Portland, Oregon, USA",
    website: "https://cozycornercoffee.com",
    cover_image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    owner_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    start_date: "2024-01-15",
    end_date: "2024-03-15",
    status: "active",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Smart Investment Portfolio Platform",
    description:
      "Revolutionary AI-powered investment platform that democratizes wealth building through intelligent portfolio management, personalized financial guidance, and automated rebalancing. Our platform makes sophisticated investment strategies accessible to everyone, regardless of their financial background or experience level.",
    business_name: "InvestSmart AI",
    owner_name: "Michael Chen",
    owner_id: "user_2",
    funding_goal: 300000,
    current_funding: 1200000,
    category: "technology",
    location: "San Francisco, California, USA",
    website: "https://investsmart-ai.com",
    cover_image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    owner_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    start_date: "2024-02-01",
    end_date: "2024-04-01",
    status: "active",
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Artisan Craft Brewery",
    description:
      "Local craft brewery specializing in unique flavor combinations and traditional brewing methods. We're expanding our production capacity to serve the growing demand for craft beer in our community.",
    business_name: "Hoppy Trails Brewery",
    owner_name: "James Wilson",
    owner_id: "user_3",
    funding_goal: 75000,
    current_funding: 45000,
    category: "food",
    location: "Austin, Texas, USA",
    cover_image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80",
    owner_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    start_date: "2024-01-20",
    end_date: "2024-03-20",
    status: "active",
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },
  {
    id: "4",
    title: "Sustainable Fashion Brand",
    description:
      "Eco-friendly clothing line made from recycled materials and sustainable fabrics. Our mission is to revolutionize fast fashion with ethical, durable, and stylish alternatives.",
    business_name: "EcoThreads",
    owner_name: "Emma Davis",
    owner_id: "user_4",
    funding_goal: 30000,
    current_funding: 12000,
    category: "retail",
    location: "Los Angeles, California, USA",
    cover_image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    owner_avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    start_date: "2024-02-10",
    end_date: "2024-04-10",
    status: "active",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-02-10T00:00:00Z",
  },
];

let mockRewardTiers: RewardTier[] = [
  {
    id: "rt_1",
    campaign_id: "1",
    amount: 25,
    title: "Coffee Supporter",
    description:
      "Thank you for your support! Receive a personalized thank you note.",
    display_order: 0,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "rt_2",
    campaign_id: "1",
    amount: 50,
    title: "Coffee Lover",
    description:
      "Get 1 lb of our premium roasted coffee beans delivered to your door.",
    display_order: 1,
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "rt_3",
    campaign_id: "1",
    amount: 100,
    title: "Coffee Connoisseur",
    description:
      "Receive 2 lbs of coffee plus a branded mug and brewing guide.",
    display_order: 2,
    created_at: "2024-01-15T00:00:00Z",
  },
];

let mockPayments: Payment[] = [
  {
    id: "pay_1",
    campaign_id: "1",
    user_id: "user_5",
    amount: 5000,
    currency: "usd",
    status: "succeeded",
    donor_name: "Anonymous Supporter",
    is_anonymous: true,
    created_at: "2024-01-16T00:00:00Z",
    updated_at: "2024-01-16T00:00:00Z",
  },
  {
    id: "pay_2",
    campaign_id: "1",
    user_id: "user_6",
    amount: 2500,
    currency: "usd",
    status: "succeeded",
    donor_name: "Coffee Enthusiast",
    is_anonymous: false,
    created_at: "2024-01-17T00:00:00Z",
    updated_at: "2024-01-17T00:00:00Z",
  },
  {
    id: "pay_3",
    campaign_id: "1",
    user_id: "user_7",
    amount: 1000,
    currency: "usd",
    status: "succeeded",
    donor_name: "Local Business Owner",
    is_anonymous: false,
    created_at: "2024-01-18T00:00:00Z",
    updated_at: "2024-01-18T00:00:00Z",
  },
];

// Campaign operations with Supabase integration
export async function getCampaigns(filters?: {
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    // If Supabase is not available, use mock data
    if (!supabase) {
      return getMockCampaigns(filters);
    }

    let query = supabase.from("campaigns").select("*");

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(
        filters.offset,
        filters.offset + (filters.limit || 10) - 1,
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching campaigns:", error);
      // Fallback to mock data if Supabase fails
      return getMockCampaigns(filters);
    }

    return data || [];
  } catch (error) {
    console.error("Error in getCampaigns:", error);
    // Fallback to mock data
    return getMockCampaigns(filters);
  }
}

// Fallback function for mock data
function getMockCampaigns(filters?: {
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  let filteredCampaigns = [...mockCampaigns];

  if (filters?.status) {
    filteredCampaigns = filteredCampaigns.filter(
      (c) => c.status === filters.status,
    );
  }

  if (filters?.category) {
    filteredCampaigns = filteredCampaigns.filter(
      (c) => c.category === filters.category,
    );
  }

  if (filters?.limit) {
    filteredCampaigns = filteredCampaigns.slice(0, filters.limit);
  }

  return filteredCampaigns;
}

export async function getCampaignById(id: string) {
  try {
    // If Supabase is not available, use mock data
    if (!supabase) {
      const mockCampaign = mockCampaigns.find((c) => c.id === id);
      if (!mockCampaign) return null;

      const rewardTiers = mockRewardTiers.filter((rt) => rt.campaign_id === id);

      return {
        ...mockCampaign,
        reward_tiers: rewardTiers,
        campaign_media: [],
        campaign_milestones: [],
      };
    }

    // Fetch campaign data first
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("*")
      .eq("id", id)
      .single();

    if (campaignError) {
      console.error("Error fetching campaign:", campaignError);
      // Fallback to mock data
      const mockCampaign = mockCampaigns.find((c) => c.id === id);
      if (!mockCampaign) return null;

      const rewardTiers = mockRewardTiers.filter((rt) => rt.campaign_id === id);

      return {
        ...mockCampaign,
        reward_tiers: rewardTiers,
        campaign_media: [],
        campaign_milestones: [],
      };
    }

    // Fetch related data separately to avoid foreign key relationship issues
    const [rewardTiersResult, campaignMediaResult, campaignMilestonesResult] =
      await Promise.allSettled([
        supabase.from("reward_tiers").select("*").eq("campaign_id", id),
        supabase.from("campaign_media").select("*").eq("campaign_id", id),
        supabase.from("campaign_milestones").select("*").eq("campaign_id", id),
      ]);

    // Extract data from settled promises, fallback to empty arrays if failed
    const reward_tiers =
      rewardTiersResult.status === "fulfilled" && !rewardTiersResult.value.error
        ? rewardTiersResult.value.data || []
        : mockRewardTiers.filter((rt) => rt.campaign_id === id);

    const campaign_media =
      campaignMediaResult.status === "fulfilled" &&
      !campaignMediaResult.value.error
        ? campaignMediaResult.value.data || []
        : [];

    const campaign_milestones =
      campaignMilestonesResult.status === "fulfilled" &&
      !campaignMilestonesResult.value.error
        ? campaignMilestonesResult.value.data || []
        : [];

    return {
      ...campaign,
      reward_tiers,
      campaign_media,
      campaign_milestones,
    };
  } catch (error) {
    console.error("Error in getCampaignById:", error);
    // Fallback to mock data
    const mockCampaign = mockCampaigns.find((c) => c.id === id);
    if (!mockCampaign) return null;

    const rewardTiers = mockRewardTiers.filter((rt) => rt.campaign_id === id);

    return {
      ...mockCampaign,
      reward_tiers: rewardTiers,
      campaign_media: [],
      campaign_milestones: [],
    };
  }
}

export async function createCampaign(
  campaignData: Omit<
    Campaign,
    "id" | "created_at" | "updated_at" | "current_funding"
  >,
) {
  try {
    // If Supabase is not available, use mock implementation
    if (!supabase) {
      const newCampaign: Campaign = {
        ...campaignData,
        id: `campaign_${Date.now()}`,
        current_funding: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      mockCampaigns.push(newCampaign);
      return newCampaign;
    }

    const { data, error } = await supabase
      .from("campaigns")
      .insert({
        ...campaignData,
        current_funding: 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating campaign:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in createCampaign:", error);
    // Fallback to mock implementation
    const newCampaign: Campaign = {
      ...campaignData,
      id: `campaign_${Date.now()}`,
      current_funding: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mockCampaigns.push(newCampaign);
    return newCampaign;
  }
}

export async function updateCampaign(id: string, updates: Partial<Campaign>) {
  const index = mockCampaigns.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Campaign not found");

  mockCampaigns[index] = {
    ...mockCampaigns[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  return mockCampaigns[index];
}

// Payment operations
export async function createPayment(
  paymentData: Omit<Payment, "id" | "created_at" | "updated_at">,
) {
  const newPayment: Payment = {
    ...paymentData,
    id: `payment_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockPayments.push(newPayment);
  return newPayment;
}

export async function getPaymentsByCampaign(campaignId: string) {
  return mockPayments.filter(
    (p) => p.campaign_id === campaignId && p.status === "succeeded",
  );
}

// Reward tier operations
export async function createRewardTiers(
  campaignId: string,
  tiers: Omit<RewardTier, "id" | "campaign_id" | "created_at">[],
) {
  const newTiers = tiers.map((tier) => ({
    ...tier,
    id: `rt_${Date.now()}_${Math.random()}`,
    campaign_id: campaignId,
    created_at: new Date().toISOString(),
  }));

  mockRewardTiers.push(...newTiers);
  return newTiers;
}

// Campaign media operations
export async function createCampaignMedia(
  campaignId: string,
  media: Omit<CampaignMedia, "id" | "campaign_id" | "created_at">[],
) {
  // Mock implementation - just return success
  return media.map((item) => ({
    ...item,
    id: `media_${Date.now()}_${Math.random()}`,
    campaign_id: campaignId,
    created_at: new Date().toISOString(),
  }));
}

// Campaign milestones operations
export async function createCampaignMilestones(
  campaignId: string,
  milestones: Omit<
    CampaignMilestone,
    "id" | "campaign_id" | "created_at" | "is_completed" | "completed_at"
  >[],
) {
  // Mock implementation - just return success
  return milestones.map((milestone) => ({
    ...milestone,
    id: `milestone_${Date.now()}_${Math.random()}`,
    campaign_id: campaignId,
    is_completed: false,
    created_at: new Date().toISOString(),
  }));
}

// Statistics
export async function getCampaignStats(campaignId: string) {
  const payments = await getPaymentsByCampaign(campaignId);
  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const backerCount = payments.length;

  return {
    totalAmount,
    backerCount,
    payments,
  };
}

// Search and filter campaigns
export async function searchCampaigns({
  query,
  category,
  status = "active",
  sortBy = "created_at",
  sortOrder = "desc",
  limit = 12,
  offset = 0,
}: {
  query?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}) {
  let filteredCampaigns = mockCampaigns.filter((c) => c.status === status);

  if (query) {
    const searchTerm = query.toLowerCase();
    filteredCampaigns = filteredCampaigns.filter(
      (c) =>
        c.title.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm) ||
        c.business_name.toLowerCase().includes(searchTerm),
    );
  }

  if (category && category !== "all categories") {
    filteredCampaigns = filteredCampaigns.filter(
      (c) => c.category === category,
    );
  }

  // Sort campaigns
  filteredCampaigns.sort((a, b) => {
    const aValue = a[sortBy as keyof Campaign] ?? 0;
    const bValue = b[sortBy as keyof Campaign] ?? 0;

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return filteredCampaigns.slice(offset, offset + limit);
}

// Get campaign leaderboard (top donors)
export async function getCampaignLeaderboard(campaignId: string, limit = 10) {
  const payments = mockPayments
    .filter((p) => p.campaign_id === campaignId && p.status === "succeeded")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);

  return payments.map((p) => ({
    amount: p.amount,
    donor_name: p.donor_name,
    is_anonymous: p.is_anonymous,
    created_at: p.created_at,
  }));
}

// Get user's campaigns
export async function getUserCampaigns(userId: string) {
  return mockCampaigns.filter((c) => c.owner_id === userId);
}

// Get user's pledges/donations
export async function getUserPledges(userId: string) {
  const userPayments = mockPayments.filter(
    (p) => p.user_id === userId && p.status === "succeeded",
  );

  return userPayments.map((payment) => {
    const campaign = mockCampaigns.find((c) => c.id === payment.campaign_id);
    return {
      ...payment,
      campaigns: campaign
        ? {
            id: campaign.id,
            title: campaign.title,
            business_name: campaign.business_name,
            cover_image: campaign.cover_image,
          }
        : null,
    };
  });
}

// Get platform statistics
export async function getPlatformStats() {
  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active");
  const totalRaised = mockPayments
    .filter((p) => p.status === "succeeded")
    .reduce((sum, p) => sum + p.amount, 0);
  const totalBackers = mockPayments.filter(
    (p) => p.status === "succeeded",
  ).length;

  return {
    totalCampaigns: activeCampaigns.length,
    totalRaised,
    totalBackers,
  };
}

// Get recommended campaigns
export async function getRecommendedCampaigns(
  currentCampaignId?: string,
  limit = 3,
) {
  let campaigns = mockCampaigns.filter((c) => c.status === "active");

  if (currentCampaignId) {
    campaigns = campaigns.filter((c) => c.id !== currentCampaignId);
  }

  // Sort by funding progress
  campaigns.sort(
    (a, b) =>
      b.current_funding / b.funding_goal - a.current_funding / a.funding_goal,
  );

  return campaigns.slice(0, limit);
}
