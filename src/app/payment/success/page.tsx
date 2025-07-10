"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<{
    paymentIntentId: string;
    campaignId: string;
  } | null>(null);

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");
    const campaignId = searchParams.get("campaign_id");

    if (paymentIntentId && campaignId) {
      setPaymentDetails({ paymentIntentId, campaignId });
    }
  }, [searchParams]);

  const handleShare = () => {
    if (paymentDetails?.campaignId) {
      const campaignUrl = `${window.location.origin}/campaigns/${paymentDetails.campaignId}`;

      if (navigator.share) {
        navigator.share({
          title: "I just supported this campaign!",
          text: "Check out this amazing campaign I just supported.",
          url: campaignUrl,
        });
      } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(campaignUrl);
        alert("Campaign link copied to clipboard!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Thank you for your generous contribution! Your payment has been
              processed successfully.
            </p>
            <p className="text-sm text-muted-foreground">
              You should receive a confirmation email shortly with your receipt.
            </p>
          </div>

          {paymentDetails && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium">Payment Details</p>
              <p className="text-xs text-muted-foreground">
                Payment ID: {paymentDetails.paymentIntentId}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {paymentDetails?.campaignId && (
              <Button asChild className="w-full">
                <Link href={`/campaigns/${paymentDetails.campaignId}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Campaign
                </Link>
              </Button>
            )}

            <Button variant="outline" onClick={handleShare} className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Share Campaign
            </Button>

            <Button variant="ghost" asChild className="w-full">
              <Link href="/">Explore More Campaigns</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
