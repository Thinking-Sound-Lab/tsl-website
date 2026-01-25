"use client";

import { FAQSection } from "@/components/faq-section";
import { useState } from "react";


const plans = [
  {
    id: 1,
    kind: "basic",
    price: 0,
    features: [
      "15 GB Drive storage",
      "15 requests per month",
      "1 Canvas",
      "1 GB per file upload",
    ],
  },
  {
    id: 2,
    kind: "pro",
    price: 17,
    billed: "annually",
    metadata: {
      billed: "monthly",
      price: 14,
    },
    features: [
      "100 GB Drive storage",
      "200 requests per month",
      "10 Canvases",
      "3 GB per file upload",
    ],
  },
  {
    id: 3,
    kind: "creator",
    price: 35,
    billed: "annually",
    metadata: {
      billed: "monthly",
      price: 28,
    },
    features: [
      "2 TB Drive storage",
      "1500 requests per month",
      "Unlimited Canvas",
      "20 GB per file upload",
    ],
  },
];

const pricingFaqs = [
  {
    question: "What's included in the 7-day free trial?",
    answer:
      "The 7-day free trial gives you full access to all Pro features including unlimited words, questions, and commands. No credit card required to start.",
  },
  {
    question: "Can I switch between monthly and annual billing?",
    answer:
      "Yes, you can switch between monthly and annual billing at any time. When switching to annual, you'll save 17% compared to monthly pricing.",
  },
  {
    question: "How do I qualify for the student discount?",
    answer:
      "Students get 50% off any paid plan. Click the student discount button above to email us with your .edu email address or valid student ID for verification.",
  },
  {
    question: "What happens when I reach the limits on the Free plan?",
    answer:
      "When you reach your weekly limits on the Free plan, you'll be notified. You can upgrade to Pro at any time for unlimited access to all features.",
  },
  {
    question: "What AI model do you offer for AI Screen Analysis?",
    answer:
      "We offer OpenAI and Anthropic models ie. GPT-5, Claude Sonnet 4.5 etc for AI Screen Analysis.",
  },
];

export default function PricingContent() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "annually"
  );



  return (
    <main>
      <div className="textured-beige-bg">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            <section className="min-h-screen ">
              {/* Header Section with Emerald Background and Grid */}
              <section
                className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 mt-28 overflow-hidden"
                style={{
                  backgroundColor: "#b8d4c8",
                }}
              >
                {/* Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #a0c4b5 1px, transparent 1px),
                      linear-gradient(to bottom, #a0c4b5 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10 max-w-3xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-700 mb-2 uppercase tracking-tight text-balance">
                    INVOOK PRICING
                  </h1>
                  <p className="text-base text-gray-900 font-mono max-w-2xl text-balance">
                    Simple, transparent pricing to get started for free. No
                    credit card required.
                  </p>
                </div>
              </section>

              {/* Pricing Cards Section */}
              <div className="mx-auto px-4 py-16">
                {/* Billing Cycle Toggle */}
                <div className="flex justify-center mb-12">
                  <div className="inline-flex items-center bg-white/50 border border-emerald-700 border-dashed p-1">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`px-6 py-2 font-mono text-sm transition-colors ${billingCycle === "monthly"
                        ? "bg-emerald-700 text-white"
                        : "text-gray-700 hover:text-emerald-700"
                        }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle("annually")}
                      className={`px-6 py-2 font-mono text-sm transition-colors flex items-center gap-2 ${billingCycle === "annually"
                        ? "bg-emerald-700 text-white"
                        : "text-gray-700 hover:text-emerald-700"
                        }`}
                    >
                      Annually
                      <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded">
                        20% OFF
                      </span>
                    </button>
                  </div>
                </div>
                {/* Pricing Cards */}
                <div className="grid gap-8 mx-auto mb-8 max-w-6xl
                                grid-cols-1
                                md:grid-cols-2
                                lg:grid-cols-3">
                  {/* Corner squares */}

                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white/50 border border-emerald-700 border-dashed p-8 relative"
                    >
                      <div className="absolute top-0 left-0 w-2 h-2 bg-emerald-700"></div>
                      <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-700"></div>
                      <div className="absolute bottom-0 left-0 w-2 h-2 bg-emerald-700"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-700"></div>
                      <div className="text-center mb-6">
                        <div className="inline-block bg-gray-100 px-4 py-2 rounded-full mb-4">
                          <span className="text-sm font-mono text-gray-600 uppercase tracking-wide">
                            [ {plan.kind} ]
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="flex items-baseline justify-center mb-2">
                            <span className="text-5xl font-bold text-gray-900">
                              $
                              {billingCycle === "monthly" &&
                                plan.metadata?.price
                                ? plan.metadata.price
                                : plan.price}
                            </span>
                            <span className="text-gray-600 ml-2 font-mono">
                              /month
                            </span>
                          </div>
                          {billingCycle === "annually" &&
                            plan.billed === "annually" && (
                              <span className="text-sm text-gray-600 font-mono">
                                billed annually
                              </span>
                            )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <svg
                              className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-emerald-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 12h14"
                              />
                            </svg>
                            <span className="text-gray-700 font-mono text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special Discounts */}
                <div className="text-center">
                  <p className="text-gray-700 font-mono mb-4 text-sm font-bold">
                    Special Discounts
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div
                      className="bg-white/50 border border-black/15 px-4 py-2 cursor-pointer hover:bg-white/80 transition-colors"
                      onClick={() =>
                      (window.location.href =
                        "mailto:support@thinkingsoundlab.com?subject=Student%20Discount%20Inquiry")
                      }
                    >
                      <span className="text-gray-800 font-mono text-sm">
                        50% off for Students
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Calculator Section REMOVED intentionally */}

            </section>

            {/* FAQ Section */}
            <FAQSection
              faqs={pricingFaqs}
              title="Pricing Questions"
              subtitle="Everything you need to know about Invook pricing"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
