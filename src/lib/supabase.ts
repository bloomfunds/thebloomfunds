import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock types for development
export interface Campaign {
  id: string;
  title: string;
  description: string;
  business_name: string;
  owner_name: string;
  owner_id: string;
  funding_goal: number;
  current_funding: number;
  category: string;
  location: string;
  website?: string;
  cover_image?: string;
  owner_avatar?: string;
  start_date: string;
  end_date: string;
  status: "draft" | "active" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  campaign_id: string;
  user_id?: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "cancelled";
  receipt_email?: string;
  donor_name?: string;
  donor_message?: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface RewardTier {
  id: string;
  campaign_id: string;
  amount: number;
  title: string;
  description: string;
  display_order: number;
  created_at: string;
}

export interface CampaignMedia {
  id: string;
  campaign_id: string;
  media_type: "image" | "video";
  media_url: string;
  caption?: string;
  display_order: number;
  created_at: string;
}

export interface CampaignMilestone {
  id: string;
  campaign_id: string;
  title: string;
  description: string;
  target_date: string;
  is_completed: boolean;
  completed_at?: string;
  display_order: number;
  created_at: string;
}

// Real Supabase authentication functions
export async function signUp(
  email: string,
  password: string,
  fullName?: string,
) {
  if (!supabase) {
    return { data: null, error: { message: "Supabase client not initialized" } };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { data: null, error };
  }

  // Create user profile in public.users table
  if (data.user) {
    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      email: data.user.email,
      full_name: fullName,
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    });

    if (profileError) {
      console.error("Error creating user profile:", profileError);
    }
  }

  return { data, error: null };
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    return { data: null, error: { message: "Supabase client not initialized" } };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOut() {
  if (!supabase) {
    return { error: { message: "Supabase client not initialized" } };
  }

  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  if (!supabase) {
    return { user: null, error: { message: "Supabase client not initialized" } };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
}

export async function resetPassword(email: string) {
  if (!supabase) {
    return { data: null, error: { message: "Supabase client not initialized" } };
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
}
