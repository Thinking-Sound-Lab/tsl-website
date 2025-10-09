"use client";

import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/faq-section";
import { useState } from "react";

const plans = [
  {
    id: 1,
    kind: "basic",
    price: 0,
    features: [
      "2000 words per week",
      "50 question per week",
      "10 command edit per week",
      "Unlimited words to dictionary",
      "Support for 100+ languages",
      "Privacy mode",
    ],
  },
  {
    id: 2,
    kind: "pro",
    price: 12,
    billed: "annually",
    metadata: {
      billed: "monthly",
      price: 15,
    },
    features: [
      "Everything in Basic",
      "Unlimited words per week",
      "Unlimited question per week",
      "Unlimited command per week",
      "Language Translation",
      "Active Application Formatting",
    ],
  },
  // {
  // 	id: 3,
  // 	kind: "team",
  // 	price: 10,
  // 	billed: "annually",
  // 	metadata: {
  // 		billed: "monthly",
  // 		price: 12,
  // 	},
  // 	features: [
  // 		"Everything in Pro",
  // 		"Centeralized billing",
  // 		"Administrative controls",
  // 		"Team dictionary",
  // 	]
  // }
];

const pricingFaqs = [
  {
    question: "What's included in the free trial?",
    answer:
      "The 7-day free trial gives you full access to all Pro features including unlimited words, questions, and commands. No credit card required to start.",
  },
  {
    question: "Can I switch between monthly and annual billing?",
    answer:
      "Yes, you can switch between monthly and annual billing at any time. When switching to annual, you'll save 20% compared to monthly pricing.",
  },
  {
    question: "What's your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not satisfied with Invook, contact us within 30 days of purchase for a full refund.",
  },
  {
    question: "How do I qualify for the student discount?",
    answer:
      "Students get 50% off any paid plan. Click the student discount button above to email us with your .edu email address or valid student ID for verification.",
  },
  {
    question: "What happens when I reach the limits on the Basic plan?",
    answer:
      "When you reach your weekly limits on the Basic plan, you'll be notified. You can upgrade to Pro at any time for unlimited access to all features.",
  },
  {
    question: "Do you offer team or enterprise pricing?",
    answer:
      "Yes! We offer special pricing for teams and enterprises with centralized billing and administrative controls. Contact us for a custom quote.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "annually"
  );
  const [hoursPerDay, setHoursPerDay] = useState(4);
  const [hourlyRate, setHourlyRate] = useState<number | string>(50);

  // Calculate savings
  const wordsPerDay = hoursPerDay * 2400; // Assuming 2400 words per hour typing speed
  const hoursPerMonth = hoursPerDay * 22; // 22 working days
  const hoursSavedMonthly = Math.round(hoursPerMonth * 0.5); // Assume 50% time saving with Invook
  const hourlyRateNum =
    typeof hourlyRate === "string"
      ? hourlyRate === ""
        ? 0
        : Number(hourlyRate)
      : hourlyRate;
  const timeValueSaved = hoursSavedMonthly * hourlyRateNum;
  const proCost = billingCycle === "monthly" ? 15 : 12;
  const netSavings = timeValueSaved - proCost;

  return (
    <main>
      <div className="textured-beige-bg">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            <section className="min-h-screen ">
              {/* Header Section with Emerald Background and Grid */}
              <div
                className=" bg-emerald-500/25 relative overflow-hidden mt-28"
                style={{
                  backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="max-w-full sm:max-w-2xl lg:max-w-3xl relative z-10 py-16 px-4">
                  <div className="text-left mb-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-700 mb-2 uppercase tracking-wide text-balance">
                      INVOOK PRICING
                    </h1>
                    <p className="text-base text-gray-900 font-mono max-w-2xl text-balance">
                      Simple, transparent pricing to get started for free. No
                      credit card required.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Cards Section */}
              <div className="mx-auto px-4 py-16">
                {/* Billing Cycle Toggle */}
                <div className="flex justify-center mb-12">
                  <div className="inline-flex items-center bg-white/50 border border-emerald-700 border-dashed p-1">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={`px-6 py-2 font-mono text-sm transition-colors ${
                        billingCycle === "monthly"
                          ? "bg-emerald-700 text-white"
                          : "text-gray-700 hover:text-emerald-700"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle("annually")}
                      className={`px-6 py-2 font-mono text-sm transition-colors flex items-center gap-2 ${
                        billingCycle === "annually"
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
                <div className="grid md:grid-cols-2 gap-8 mx-auto mb-8 max-w-4xl ">
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
                        <div className="flex items-baseline justify-center mb-2">
                          <span className="text-5xl font-bold text-gray-900">
                            $
                            {billingCycle === "monthly" && plan.metadata?.price
                              ? plan.metadata.price
                              : plan.price}
                          </span>
                          <span className="text-gray-600 ml-2 font-mono">
                            /
                            {billingCycle === "monthly"
                              ? "month"
                              : plan.billed || "month"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
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

                      <Button variant="emerald" className="w-full font-mono">
                        Start 7 day free trial
                      </Button>
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
                          "mailto:support@invook.com?subject=Student%20Discount%20Inquiry")
                      }
                    >
                      <span className="text-gray-800 font-mono text-sm">
                        50% off for Students
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Calculator Section */}
              <div className="bg-emerald-800 text-white px-6 sm:px-8 lg:px-16 py-16 sm:py-20">
                <div className="max-w-6xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Calculator */}
                    <div className="px-4 sm:px-0">
                      <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-balance">
                        Calculate
                        <br />
                        your savings
                      </h2>

                      <div className="space-y-8">
                        {/* Hours Slider */}
                        <div>
                          <p className="text-lg mb-4">
                            I spend{" "}
                            <span className="font-bold">
                              {hoursPerDay} hours
                            </span>{" "}
                            typing a day ({wordsPerDay.toLocaleString()} words)
                          </p>
                          <input
                            type="range"
                            min="1"
                            max="12"
                            value={hoursPerDay}
                            onChange={(e) =>
                              setHoursPerDay(Number(e.target.value))
                            }
                            className="w-full h-2 bg-emerald-600 rounded-lg appearance-none cursor-pointer accent-white"
                          />
                          <p className="text-sm text-emerald-200 mt-2">
                            On average, people type 2 hours a day (that&apos;s
                            4,800 words!)
                          </p>
                        </div>

                        {/* Hourly Rate Input */}
                        <div>
                          <label className="text-lg flex items-baseline gap-2 flex-wrap">
                            and, my time is worth
                            <span className="relative inline-flex items-baseline gap-1">
                              <span className="text-2xl font-bold">$</span>
                              <input
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setHourlyRate(val === "" ? "" : Number(val));
                                }}
                                className="bg-transparent border-b-2 border-white w-16 text-2xl font-bold outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                min="0"
                              />
                              <span className="text-2xl font-bold">/hour</span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Savings Card */}
                    <div className="relative px-4 sm:px-0">
                      <div className="bg-white/10 backdrop-blur-sm border-2 border-white rounded-3xl p-8 sm:p-10">
                        <div className="text-center mb-6">
                          <p className="text-emerald-200 mb-2">
                            Monthly, you&apos;ll save
                          </p>
                          <p className="text-5xl sm:text-6xl font-bold">
                            ${netSavings.toLocaleString()}/mo
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-white/20">
                            <span className="text-emerald-100">
                              Hours spent typing
                            </span>
                            <span className="font-bold">{hoursPerMonth}</span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-white/20">
                            <span className="text-emerald-100">
                              Hours saved monthly
                            </span>
                            <span className="font-bold">
                              {hoursSavedMonthly}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-white/20">
                            <span className="text-emerald-100">
                              Time value saved
                            </span>
                            <span className="font-bold">
                              ${timeValueSaved.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-emerald-100">
                              Invook Pro monthly cost
                            </span>
                            <span className="font-bold">${proCost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
