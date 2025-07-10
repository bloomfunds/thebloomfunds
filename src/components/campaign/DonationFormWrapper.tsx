"use client";

import { useRouter } from "next/navigation";
import DonationForm from "./DonationForm";
import { RewardTier } from "@/lib/supabase";

interface DonationFormWrapperProps {
  campaignId: string;
  campaignTitle: string;
  rewardTiers: RewardTier[];
}

export default function DonationFormWrapper({
  campaignId,
  campaignTitle,
  rewardTiers,
}: DonationFormWrapperProps) {
  const router = useRouter();

  const handleSuccess = (paymentIntentId: string) => {
    // Redirect to success page
    router.push(
      `/payment/success?payment_intent=${paymentIntentId}&campaign_id=${campaignId}`,
    );
  };

  return (
    <DonationForm
      campaignId={campaignId}
      campaignTitle={campaignTitle}
      rewardTiers={rewardTiers}
      onSuccess={handleSuccess}
    />
  );
}
