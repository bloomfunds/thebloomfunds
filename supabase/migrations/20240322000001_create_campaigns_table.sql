CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  funding_goal BIGINT NOT NULL CHECK (funding_goal > 0),
  current_funding BIGINT DEFAULT 0 CHECK (current_funding >= 0),
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  website TEXT,
  cover_image TEXT,
  owner_avatar TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  amount BIGINT NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled')),
  receipt_email TEXT,
  donor_name TEXT,
  donor_message TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reward_tiers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  amount BIGINT NOT NULL CHECK (amount > 0),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.campaign_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.campaign_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaigns_status ON public.campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON public.campaigns(category);
CREATE INDEX IF NOT EXISTS idx_campaigns_owner_id ON public.campaigns(owner_id);
CREATE INDEX IF NOT EXISTS idx_payments_campaign_id ON public.payments(campaign_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_reward_tiers_campaign_id ON public.reward_tiers(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_media_campaign_id ON public.campaign_media(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_milestones_campaign_id ON public.campaign_milestones(campaign_id);

alter publication supabase_realtime add table campaigns;
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table payments;
alter publication supabase_realtime add table reward_tiers;
alter publication supabase_realtime add table campaign_media;
alter publication supabase_realtime add table campaign_milestones;

INSERT INTO public.campaigns (id, title, description, business_name, owner_name, owner_id, funding_goal, current_funding, category, location, website, cover_image, owner_avatar, start_date, end_date, status) VALUES
('1', 'Cozy Corner Coffee House', 'Creating a warm community space with artisan coffee, sustainable practices, and local partnerships. Our cozy corner will feature locally roasted beans, comfortable seating areas, and community events that bring neighbors together while supporting local artists and musicians.', 'Cozy Corner Coffee', 'Sarah Johnson', '00000000-0000-0000-0000-000000000001', 200000, 190000, 'food', 'Portland, Oregon, USA', 'https://cozycornercoffee.com', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', '2024-01-15T00:00:00Z', '2024-03-15T00:00:00Z', 'active'),
('2', 'Smart Investment Portfolio Platform', 'Revolutionary AI-powered investment platform that democratizes wealth building through intelligent portfolio management, personalized financial guidance, and automated rebalancing. Our platform makes sophisticated investment strategies accessible to everyone, regardless of their financial background or experience level.', 'InvestSmart AI', 'Michael Chen', '00000000-0000-0000-0000-000000000002', 300000, 1200000, 'technology', 'San Francisco, California, USA', 'https://investsmart-ai.com', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael', '2024-02-01T00:00:00Z', '2024-04-01T00:00:00Z', 'active'),
('3', 'Artisan Craft Brewery', 'Local craft brewery specializing in unique flavor combinations and traditional brewing methods. We are expanding our production capacity to serve the growing demand for craft beer in our community.', 'Hoppy Trails Brewery', 'James Wilson', '00000000-0000-0000-0000-000000000003', 75000, 45000, 'food', 'Austin, Texas, USA', NULL, 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80', 'https://api.dicebear.com/7.x/avataaars/svg?seed=james', '2024-01-20T00:00:00Z', '2024-03-20T00:00:00Z', 'active'),
('4', 'Sustainable Fashion Brand', 'Eco-friendly clothing line made from recycled materials and sustainable fabrics. Our mission is to revolutionize fast fashion with ethical, durable, and stylish alternatives.', 'EcoThreads', 'Emma Davis', '00000000-0000-0000-0000-000000000004', 30000, 12000, 'retail', 'Los Angeles, California, USA', NULL, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma', '2024-02-10T00:00:00Z', '2024-04-10T00:00:00Z', 'active');

INSERT INTO public.reward_tiers (id, campaign_id, amount, title, description, display_order) VALUES
('rt_1', '1', 2500, 'Coffee Supporter', 'Thank you for your support! Receive a personalized thank you note.', 0),
('rt_2', '1', 5000, 'Coffee Lover', 'Get 1 lb of our premium roasted coffee beans delivered to your door.', 1),
('rt_3', '1', 10000, 'Coffee Connoisseur', 'Receive 2 lbs of coffee plus a branded mug and brewing guide.', 2);
