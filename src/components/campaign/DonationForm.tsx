"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, DollarSign, AlertCircle, Loader2 } from "lucide-react";
// Mock payment processing - no external integrations needed
import { RewardTier } from "@/lib/supabase";

interface DonationFormProps {
  campaignId: string;
  campaignTitle?: string;
  rewardTiers?: RewardTier[];
  onSuccess?: (paymentIntentId: string) => void;
}

const DonationForm = ({
  campaignId,
  campaignTitle = "Campaign",
  rewardTiers = [],
  onSuccess = () => {},
}: DonationFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [receiptEmail, setReceiptEmail] = useState<string>("");
  const [donorMessage, setDonorMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const predefinedAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (value: string) => {
    setAmount(value);
    setCustomAmount("");
    setSelectedTier("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setAmount("");
    setSelectedTier("");
  };

  const handleTierSelect = (tierId: string) => {
    const tier = rewardTiers.find((t) => t.id === tierId);
    if (tier) {
      setSelectedTier(tierId);
      setAmount(tier.amount.toString());
      setCustomAmount("");
    }
  };

  const getDonationAmount = (): number => {
    if (selectedTier) {
      const tier = rewardTiers.find((t) => t.id === selectedTier);
      return tier ? tier.amount : 0;
    }
    if (customAmount) {
      return parseFloat(customAmount);
    }
    if (amount) {
      return parseFloat(amount);
    }
    return 0;
  };

  const validateForm = (): string | null => {
    const donationAmount = getDonationAmount();

    if (!donationAmount || donationAmount < 5) {
      return "Minimum donation amount is $5.00";
    }

    if (!donorName.trim() && !isAnonymous) {
      return "Please enter your name or choose to donate anonymously";
    }

    if (receiptEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receiptEmail)) {
      return "Please enter a valid email address";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const donationAmount = getDonationAmount();
      const amountInCents = Math.round(donationAmount * 100);

      // Mock payment processing - simulate successful payment
      const mockPaymentIntentId = `pi_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful payment
      console.log("Mock payment processed:", {
        campaignId,
        amount: amountInCents,
        receiptEmail: receiptEmail || undefined,
        donorName: isAnonymous ? "Anonymous" : donorName,
        donorMessage: donorMessage || undefined,
        isAnonymous,
        paymentIntentId: mockPaymentIntentId,
      });

      // Simulate success
      onSuccess(mockPaymentIntentId);
      setIsLoading(false);
    } catch (err) {
      console.error("Payment error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while processing your donation",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-background">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Support {campaignTitle}
          </CardTitle>
          <CardDescription>
            Choose your donation amount and help make this project a reality.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Reward Tiers */}
            {rewardTiers.length > 0 && (
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Choose a Reward Tier
                </Label>
                <div className="grid gap-3">
                  {rewardTiers.map((tier) => (
                    <Card
                      key={tier.id}
                      className={`cursor-pointer transition-colors ${
                        selectedTier === tier.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => handleTierSelect(tier.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign className="h-4 w-4" />
                              <span className="font-semibold">
                                ${tier.amount}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                - {tier.title}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {tier.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Predefined Amounts */}
            <div className="space-y-3">
              <Label className="text-base font-medium">Quick Amounts</Label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {predefinedAmounts.map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={
                      amount === value.toString() ? "default" : "outline"
                    }
                    onClick={() => handleAmountSelect(value.toString())}
                    className="h-12"
                  >
                    ${value}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label htmlFor="customAmount">Custom Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customAmount"
                  type="number"
                  min="5"
                  step="0.01"
                  placeholder="Enter amount (min $5)"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) =>
                    setIsAnonymous(checked as boolean)
                  }
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Donate anonymously
                </Label>
              </div>

              {!isAnonymous && (
                <div className="space-y-2">
                  <Label htmlFor="donorName">Your Name *</Label>
                  <Input
                    id="donorName"
                    placeholder="Enter your full name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required={!isAnonymous}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="receiptEmail">
                  Email for Receipt (Optional)
                </Label>
                <Input
                  id="receiptEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={receiptEmail}
                  onChange={(e) => setReceiptEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="donorMessage">Message (Optional)</Label>
                <Textarea
                  id="donorMessage"
                  placeholder="Leave a message of support..."
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>

            {/* Donation Summary */}
            {getDonationAmount() > 0 && (
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Donation Amount:</span>
                    <span className="text-xl font-bold">
                      ${getDonationAmount().toFixed(2)}
                    </span>
                  </div>
                  {selectedTier && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Reward:{" "}
                      {rewardTiers.find((t) => t.id === selectedTier)?.title}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading || getDonationAmount() < 5}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4" />
                  Donate ${getDonationAmount().toFixed(2)}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default DonationForm;
