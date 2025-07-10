import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, DollarSign, Share2, Users } from "lucide-react";

interface CampaignPreviewProps {
  title?: string;
  description?: string;
  businessName?: string;
  ownerName?: string;
  fundingGoal?: number;
  currentFunding?: number;
  daysRemaining?: number;
  backerCount?: number;
  category?: string;
  coverImage?: string;
  ownerAvatar?: string;
}

const CampaignPreview = ({
  title = "My Amazing Business Idea",
  description = "This is a description of my business idea. We're creating something innovative that will change the world. Support us to make this dream a reality!",
  businessName = "Startup Ventures",
  ownerName = "Jane Smith",
  fundingGoal = 10000,
  currentFunding = 3500,
  daysRemaining = 30,
  backerCount = 42,
  category = "Technology",
  coverImage = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  ownerAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=janesmith",
}: CampaignPreviewProps) => {
  const fundingPercentage = Math.min(
    Math.round((currentFunding / fundingGoal) * 100),
    100,
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-background">
      <Card className="overflow-hidden border-2 border-border">
        <div className="relative h-64 w-full">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-4 right-4">{category}</Badge>
        </div>

        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={ownerAvatar} alt={ownerName} />
                <AvatarFallback>
                  {ownerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{ownerName}</p>
                <p className="text-xs text-muted-foreground">{businessName}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <CardTitle className="text-2xl mt-4">{title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  ${currentFunding.toLocaleString()} raised
                </span>
                <span className="text-sm text-muted-foreground">
                  ${fundingGoal.toLocaleString()} goal
                </span>
              </div>
              <Progress value={fundingPercentage} className="h-2" />
              <div className="flex justify-between mt-1">
                <span className="text-sm text-muted-foreground">
                  {fundingPercentage}% funded
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">
                  ${currentFunding.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Raised</span>
              </div>

              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <Clock className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{daysRemaining}</span>
                <span className="text-xs text-muted-foreground">Days Left</span>
              </div>

              <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                <Users className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">{backerCount}</span>
                <span className="text-xs text-muted-foreground">Backers</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Campaign ends in {daysRemaining} days</span>
          </div>
          <Button>Back This Project</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CampaignPreview;
