"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create a campaign?",
        answer:
          "Creating a campaign is easy! Simply sign up for an account, click 'Create Campaign', and follow our step-by-step guide. You'll need to provide your business details, funding goal, timeline, and upload media to showcase your project.",
      },
      {
        question: "What types of businesses can use Bloom?",
        answer:
          "We welcome all types of legitimate businesses including technology startups, food & beverage companies, retail stores, service businesses, manufacturing companies, and more. As long as your business idea is legal and ethical, you can create a campaign.",
      },
      {
        question: "How long does it take to get approved?",
        answer:
          "Most campaigns are reviewed and approved within 24-48 hours. We review each campaign to ensure it meets our guidelines and quality standards before going live.",
      },
      {
        question: "Do I need a business plan to start?",
        answer:
          "While not required, having a solid business plan helps create a more compelling campaign. We provide templates and resources to help you develop your business concept and presentation.",
      },
    ],
  },
  {
    category: "Pricing & Fees",
    questions: [
      {
        question: "What are your platform fees?",
        answer:
          "We charge a 5% platform fee plus $0.30 per donation on successfully funded campaigns. There are no upfront costs or monthly fees. You only pay when you receive funding.",
      },
      {
        question: "When do I receive my funds?",
        answer:
          "Funds are transferred to your bank account within 5-7 business days after your campaign ends or reaches its goal. We use secure payment processing to ensure fast and reliable transfers.",
      },
      {
        question: "What happens if I don't reach my goal?",
        answer:
          "We use a flexible funding model, which means you keep whatever funds you raise, even if you don't reach your full goal. This gives you the flexibility to start your business with whatever support you receive.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees! Our 5% platform fee and $0.30 per donation are the only costs. Payment processing fees are handled separately by our payment processor and are clearly disclosed during the donation process.",
      },
      {
        question: "How do payment processing fees work?",
        answer:
          "Payment processing fees are typically 2.9% + $0.30 per transaction, handled by our secure payment partners (Stripe/PayPal). These fees are separate from our platform fee and are industry standard.",
      },
    ],
  },
  {
    category: "Campaign Management",
    questions: [
      {
        question: "Can I edit my campaign after it's live?",
        answer:
          "Yes! You can update your campaign description, add new media, post updates, and communicate with your supporters throughout your campaign. However, you cannot change your funding goal once the campaign is live.",
      },
      {
        question: "How do I promote my campaign?",
        answer:
          "We provide built-in social sharing tools, email templates, and marketing resources. The most successful campaigns actively promote through social media, email lists, local networks, and word-of-mouth marketing.",
      },
      {
        question: "Can I offer rewards to supporters?",
        answer:
          "Absolutely! You can create multiple reward tiers with different perks, products, or experiences for your supporters. Rewards help incentivize larger donations and build stronger connections with your backers.",
      },
      {
        question: "How long can my campaign run?",
        answer:
          "Campaigns can run for 1-90 days. Most successful campaigns run for 30-60 days, giving enough time to build momentum while maintaining urgency. You set the duration when creating your campaign.",
      },
      {
        question: "Can I extend my campaign deadline?",
        answer:
          "Campaign deadlines cannot be extended once set. This maintains trust with backers and creates urgency. Plan your timeline carefully and consider running a follow-up campaign if needed.",
      },
    ],
  },
  {
    category: "For Supporters",
    questions: [
      {
        question: "How do I support a campaign?",
        answer:
          "Simply browse campaigns, find one you'd like to support, choose your contribution amount, and complete the secure checkout process. You can also leave a message of encouragement for the entrepreneur.",
      },
      {
        question: "Is my payment secure?",
        answer:
          "Yes! We use industry-standard encryption and secure payment processing. Your financial information is never stored on our servers and all transactions are processed through trusted payment partners.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refund policies vary by campaign. Since this is crowdfunding, contributions are generally non-refundable once processed. However, if a campaign is cancelled or found to be fraudulent, we will work to process refunds.",
      },
      {
        question: "How do I track campaigns I've supported?",
        answer:
          "Create an account to track all your contributions, receive updates from campaign creators, and manage your reward claims all in one place through your personal dashboard.",
      },
      {
        question: "What if a campaign doesn't deliver rewards?",
        answer:
          "While we can't guarantee reward delivery, we provide dispute resolution support and maintain creator accountability standards. Always review campaign details and creator history before contributing.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "I'm having trouble uploading media",
        answer:
          "Make sure your images are in JPG, PNG, or GIF format and under 10MB each. Videos should be in MP4 format and under 100MB. If you continue having issues, try using a different browser or contact our support team.",
      },
      {
        question: "Why can't I access my account?",
        answer:
          "Try resetting your password first. If that doesn't work, check that you're using the correct email address. For persistent login issues, contact our support team with your account details.",
      },
      {
        question: "The website isn't working properly",
        answer:
          "Try clearing your browser cache and cookies, or try accessing the site from a different browser. If problems persist, please contact our technical support team with details about your browser and the specific issue.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "You can delete your account from your profile settings. Note that this action is permanent and will remove all your campaign data. Contact support if you need assistance with account deletion.",
      },
    ],
  },
  {
    category: "Legal & Compliance",
    questions: [
      {
        question: "What are the legal requirements for campaigns?",
        answer:
          "Campaigns must comply with local laws and regulations. You're responsible for any legal obligations, including taxes on funds raised. We recommend consulting with legal and tax professionals for your specific situation.",
      },
      {
        question: "How do you handle taxes on raised funds?",
        answer:
          "Funds raised may be considered taxable income. We provide transaction records, but you're responsible for proper tax reporting. Consult with a tax professional for guidance on your specific situation.",
      },
      {
        question: "What happens to my data?",
        answer:
          "We protect your personal data according to our Privacy Policy. Your information is used only for platform operations and is never sold to third parties. You can request data deletion at any time.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredFAQs, setFilteredFAQs] = React.useState(faqData);

  React.useEffect(() => {
    if (!searchQuery) {
      setFilteredFAQs(faqData);
      return;
    }

    const filtered = faqData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (qa) =>
            qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            qa.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((category) => category.questions.length > 0);

    setFilteredFAQs(filtered);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Find answers to common questions about using FundMyBusiness for
                your crowdfunding needs.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse all categories
                  below.
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredFAQs.map((category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {category.category}
                      </CardTitle>
                      <CardDescription>
                        {category.questions.length} question
                        {category.questions.length !== 1 ? "s" : ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((qa, questionIndex) => (
                          <AccordionItem
                            key={questionIndex}
                            value={`item-${categoryIndex}-${questionIndex}`}
                          >
                            <AccordionTrigger className="text-left">
                              {qa.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {qa.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to
              help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/support">Contact Support</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
