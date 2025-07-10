"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const [campaignId, setCampaignId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("campaign_id");
    if (id) {
      setCampaignId(id);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Your payment was cancelled. No charges have been made to your
              account.
            </p>
            <p className="text-sm text-muted-foreground">
              You can try again or explore other campaigns.
            </p>
          </div>

          <div className="space-y-3">
            {campaignId && (
              <Button asChild className="w-full">
                <Link href={`/campaigns/${campaignId}`}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Link>
              </Button>
            )}

            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
