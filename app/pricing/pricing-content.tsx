"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useAnalytics } from "@/hooks/use-analytics";
import { CTASection } from "@/components/cta-section";
import { ChevronDown } from "lucide-react";
import { PricingCard } from "./pricing-card";
import { ModelCapacityTables } from "@/components/model-capacity-tables";
import pricingData from "../../constants/pricing.json";

interface PlanPrice {
  monthly: string;
  yearly: string;
}

interface PlanButton {
  text: string;
  variant: "primary" | "secondary";
}

interface IndividualPlan {
  id: string;
  title: string;
  price: PlanPrice;
  priceSubtext?: string;
  recommended?: boolean;
  includes: string;
  features: string[];
  button: PlanButton;
}

interface TopUpTier {
  id: string;
  title: string;
  price: string;
  credits: string;
  includes?: string;
  features: string[];
  button: PlanButton;
}

export default function PricingContent() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isYearly, setIsYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const { capture } = useAnalytics();
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      capture("pricing_page_viewed");
      tracked.current = true;
    }
  }, [capture]);

  const handleAction = async (planId: string) => {
    capture("pricing_button_clicked", { 
      plan_id: planId, 
      billing_cycle: isYearly ? "yearly" : "monthly" 
    });

    if (!isAuthenticated) {
      router.push(`/sign-up?redirect=${encodeURIComponent("/download")}`);
      return;
    }

    router.push("/download");
  };

  const faqs = [
    {
      question: "What is the right plan for me?", answer: (
        <div className="space-y-3">
          <div><span className="font-medium tracking-tight">Free</span>: For individuals getting started with node-based AI. It includes a basic pool of daily credits.</div>
          <div><span className="font-medium tracking-tight">Pro</span>: Designed for power users and professionals. You get a larger monthly credit allowance.</div>
          <div><span className="font-medium tracking-tight">Team</span>: Best for studios and agencies. This plan unlocks our Real-time collaborative Canvas, shared asset libraries, and centralized billing for multiple seats.</div>
        </div>
      )
    },
    { question: "What are my payment options?", answer: "We accept all major credit cards including Visa, Mastercard, and American Express, as well as digital wallets like Google Pay and Apple Pay." },
    { question: "How do Credits work on Invook?", answer: "Invook uses a credit system to manage asset generation. Every generation, upscale, or node execution consumes a specific number of credits based on the complexity of the task and the model used. Plan credits are granted monthly and do not roll over on the Free plan. Available on Pro and Team plans. If you run out, you can purchase Top-up Credits. These credits can be purchased on paid plans (Starter, Pro, Team) as needed. Unused credits roll over for up to 5 months, after which they expire." },
    { question: "How does Invook use my data?", answer: "We use the enterprise-grade API tier of our model providers. This ensures that neither Invook nor our model providers use your prompts, workflows, or generated assets to train any base models." },
    { question: "Why use Invook instead of a local setup?", answer: "Invook removes the hardware and technical barriers of local setups. You get instant access to top-tier cloud GPUs without needing to manage Python environments or manual node updates. Most importantly, Invook is collaborative; unlike a local instance, our platform allows multiple team members to work on the same infinite canvas simultaneously, seeing cursors and edits in real-time." },
    { question: "Where can I ask more questions?", answer: (
      <>Our support team is available 24/7. You can reach out via the Contact page or send an email directly to <a href="mailto:support@thinkingsoundlab.com" className="text-[#f54e00] hover:underline">support@thinkingsoundlab.com</a>.</>
    ) }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] pt-32 pb-24">
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
            Pricing
          </h1>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center rounded-full p-1 bg-secondary border border-border">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 text-sm rounded-full transition-all duration-200 cursor-pointer ${!isYearly
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 text-sm rounded-full transition-all duration-200 cursor-pointer ${isYearly
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="mb-24">
          <h3 className="text-[15px] md:text-[16px] text-muted-foreground mb-6 pl-1 font-normal tracking-tight">Individual Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(pricingData.plans.individual as IndividualPlan[]).map((plan) => (
              <PricingCard
                key={plan.id}
                title={plan.title}
                price={isYearly ? plan.price.yearly : plan.price.monthly}
                isYearly={isYearly}
                priceSubtext={plan.priceSubtext}
                recommended={plan.recommended}
                includesText={plan.includes}
                features={plan.features}
                buttonText={plan.button.text}
                buttonVariant={plan.button.variant}
                onClick={() => handleAction(plan.id)}
              />
            ))}
          </div>
        </div>

        {/* Credit Add-ons */}
        <div className="mb-24">
          <h3 className="text-[15px] md:text-[16px] text-muted-foreground mb-6 pl-1 font-normal tracking-tight">Credit add-ons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(pricingData.plans.topUps as TopUpTier[]).map((tier) => (
              <PricingCard
                key={tier.id}
                title={tier.title}
                price={tier.price}
                credits={tier.credits}
                isAddon={true}
                includesText={tier.includes || "Includes capacity for:"}
                features={tier.features}
                buttonText={tier.button.text}
                buttonVariant={tier.button.variant}
                onClick={() => handleAction(tier.id)}
              />
            ))}
          </div>
        </div>

        {/* Quick Comparison Table */}
        <div className="mb-24">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-5 gap-4 pb-8 mb-8 border-b border-border/50">
                <div className="col-span-1"></div>
                {(pricingData.plans.individual as IndividualPlan[]).map((plan) => (
                  <div key={plan.id} className="flex flex-col text-left pl-2">
                    <div className="text-xl text-foreground font-medium mb-1">{plan.title}</div>
                    <div className="text-[13px] text-muted-foreground mb-4">
                      {plan.id === "free" ? "$0/mo" : `Starts at $${isYearly ? plan.price.yearly : plan.price.monthly}/mo`}
                    </div>
                    <button 
                      onClick={() => handleAction(plan.id)}
                      className="w-full text-[13px] font-medium bg-secondary hover:bg-secondary/80 text-foreground py-2.5 rounded-full transition-colors border border-border cursor-pointer"
                    >
                      {plan.id === "free" ? "Download Now" : "Start today"}
                    </button>
                  </div>
                ))}
              </div>


              <div className="mt-12">
                <ModelCapacityTables />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24 pt-16 mt-32 border-t border-border/50">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-x-40 gap-y-12">
            <div>
              <h2 className="text-[33px] lg:text-[36px] font-medium text-foreground tracking-tight leading-tight">Questions & Answers</h2>
            </div>

            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-border/50">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-5 text-left text-[14px] text-foreground font-medium hover:text-foreground/80 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="text-[14px] text-foreground/70 leading-relaxed pr-8">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <CTASection />
    </main>
  );
}
