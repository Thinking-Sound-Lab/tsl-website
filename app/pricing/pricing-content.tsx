"use client";

import { useState } from "react";
import { CTASection } from "@/components/cta-section";
import { Check, ChevronDown, Info } from "lucide-react";

export default function PricingContent() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { question: "What is the right plan for me?", answer: "Free: For individuals getting started with node-based AI. It includes a basic pool of daily credits. Pro: Designed for power users and professionals. You get a larger monthly credit allowance. Team: Best for studios and agencies. This plan unlocks our Real-time collaborative Canvas, shared asset libraries, and centralized billing for multiple seats." },
    { question: "What are my payment options?", answer: "We accept all major credit cards including Visa, Mastercard, and American Express, as well as digital wallets like Google Pay and Apple Pay." },
    { question: "How do Credits work on Invook?", answer: "Invook uses a credit system to manage asset generation. Every generation, upscale, or node execution consumes a specific number of credits based on the complexity of the task and the model used. Plan credits are granted monthly and do not roll over on the Free plan. Available on Pro and Team plans. If you run out, you can purchase Top-up Credits. These credits can be purchased on paid plans (Starter, Pro, Team) as needed. Unused credits roll over for up to 5 months, after which they expire." },
    { question: "How does Invook use my data?", answer: "We use the enterprise-grade API tier of our model providers. This ensures that neither Invook nor our model providers use your prompts, workflows, or generated assets to train any base models." },
    { question: "Why use Invook instead of a local setup?", answer: "Invook removes the hardware and technical barriers of local setups. You get instant access to top-tier cloud GPUs without needing to manage Python environments or manual node updates. Most importantly, Invook is collaborative; unlike a local instance, our platform allows multiple team members to work on the same infinite canvas simultaneously, seeing cursors and edits in real-time." },
    { question: "Where can I ask more questions?", answer: "Our support team is available 24/7. You can reach out via the Contact page or send an email directly to support@thinkingsoundlab.com." }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 font-sans">
      <div className="mx-auto w-[85%] max-w-[1600px] pt-32 pb-24">
        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
            Pricing
          </h1>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center rounded-full p-1 bg-secondary border border-border">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 text-sm rounded-full transition-all duration-200 ${!isYearly
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 text-sm rounded-full transition-all duration-200 ${isYearly
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="mb-24">
          <h3 className="text-[13px] text-muted-foreground mb-6 pl-1 font-medium">Individual Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Free Plan */}
            <div className="bg-secondary/50 border border-border rounded-xl p-6 flex flex-col hover:bg-secondary/80 transition-colors">
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-1 text-foreground">Free</h2>
                <div className="text-[15px] text-muted-foreground mb-6 font-medium">Free</div>
                <div className="text-sm text-muted-foreground mb-4">Includes:</div>
                <ul className="space-y-3">
                  {["300 Monthly Credits", "Up to 1,000 images/month", "Up to 20 videos/month (200s)", "2 Canvas Projects", "0 Collaborators (solo only)"].map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-foreground/80">
                      <Check className="w-4 h-4 mr-2.5 mt-0.5 text-muted-foreground shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <button className="w-fit text-[13px] font-medium bg-foreground/10 hover:bg-foreground/20 text-foreground px-5 py-2 rounded-full transition-colors border border-border">
                  Download
                </button>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="bg-secondary/50 border border-border rounded-xl p-6 flex flex-col hover:bg-secondary/80 transition-colors">
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-1 text-foreground">Starter</h2>
                <div className="flex items-baseline mb-6">
                  <span className="text-[15px] text-foreground font-medium">${isYearly ? "16" : "20"}/mo.</span>
                  {isYearly && <span className="text-xs text-[#f54e00] ml-2">Save 20%</span>}
                </div>
                <div className="text-sm text-muted-foreground mb-4">Everything in Free, plus:</div>
                <ul className="space-y-3">
                  {["1,500 Monthly Credits", "Up to 5,000 images/month", "Up to 100 videos/month (1000s)", "Unlimited Canvas Projects", "Unlimited Collaborators", "Comments"].map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-foreground/80">
                      <Check className="w-4 h-4 mr-2.5 mt-0.5 text-muted-foreground shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <button className="w-fit text-[13px] font-medium bg-foreground/10 hover:bg-foreground/20 text-foreground px-5 py-2 rounded-full transition-colors border border-border">
                  Get Starter
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-secondary/50 border border-border rounded-xl p-6 flex flex-col hover:bg-secondary/80 transition-colors">
              <div className="mb-8">
                <div className="flex items-center mb-1">
                  <h2 className="text-xl font-medium text-foreground">Pro</h2>
                  <span className="text-[12px] text-[#f54e00] font-medium ml-2">Recommended</span>
                </div>
                <div className="flex items-baseline mb-6">
                  <span className="text-[15px] text-foreground font-medium">${isYearly ? "28" : "35"}/mo.</span>
                  {isYearly && <span className="text-xs text-[#f54e00] ml-2">Save 20%</span>}
                </div>
                <div className="text-sm text-muted-foreground mb-4">Everything in Starter, plus:</div>
                <ul className="space-y-3">
                  {["3,000 Monthly Credits", "Up to 10,000 images/month", "Up to 200 videos/month (2000s)", "Credit Rollover (5 months)"].map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-foreground/80">
                      <Check className="w-4 h-4 mr-2.5 mt-0.5 text-muted-foreground shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <button className="w-fit text-[13px] font-medium bg-foreground text-background hover:opacity-90 px-5 py-2 rounded-full transition-colors">
                  Get Pro
                </button>
              </div>
            </div>

            {/* Team Plan */}
            <div className="bg-secondary/50 border border-border rounded-xl p-6 flex flex-col hover:bg-secondary/80 transition-colors">
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-1 text-foreground">Team</h2>
                <div className="flex items-baseline mb-6 flex-wrap">
                  <span className="text-[15px] text-foreground font-medium">${isYearly ? "36" : "45"} per user/mo.</span>
                  {isYearly && <span className="text-xs text-[#f54e00] ml-2">Save 20%</span>}
                </div>
                <div className="text-sm text-muted-foreground mb-4">Everything in Pro, plus:</div>
                <ul className="space-y-3">
                  {["4,000 Monthly Credits per user", "Up to 13,333 images/month per user", "Up to 266 videos/month (2660s) per user", "Minimum 5 members required", "Unified Billing", "Team level Credit Management", "Shared Credit Pool"].map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-foreground/80">
                      <Check className="w-4 h-4 mr-2.5 mt-0.5 text-muted-foreground shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <button className="w-fit text-[13px] font-medium bg-foreground/10 hover:bg-foreground/20 text-foreground px-5 py-2 rounded-full transition-colors border border-border">
                  Get Team
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Credit Add-ons */}
        <div className="mb-24">
          <h3 className="text-[13px] text-muted-foreground mb-6 pl-1 font-medium">Credit add-ons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { target: "Starter", tiers: [{ price: 10, credits: "750" }, { price: 12, credits: "900" }] },
              { target: "Pro", tiers: [{ price: 10, credits: "900" }, { price: 12, credits: "1,080" }] },
              { target: "Team", tiers: [{ price: 10, credits: "900" }, { price: 12, credits: "1,080" }] }
            ].map((addon, i) => (
              <div key={i} className="bg-secondary/50 border border-border rounded-xl p-6 hover:bg-secondary/80 transition-colors">
                <h4 className="text-lg font-medium text-foreground mb-6 w-full pb-4 border-b border-border">{addon.target} Add-on</h4>
                <ul className="space-y-3">
                  {addon.tiers.map((tier, idx) => (
                    <li key={idx} className="flex items-start text-sm text-foreground/80">
                      <Check className="w-4 h-4 mr-2.5 mt-0.5 text-muted-foreground shrink-0" />
                      <span>${tier.price} for {tier.credits} credits</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <button className="w-fit text-[13px] font-medium bg-foreground/10 hover:bg-foreground/20 text-foreground px-5 py-2 rounded-full transition-colors border border-border">
                    Add Credits
                  </button>
                </div>
              </div>
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
                {/* Free */}
                <div className="flex flex-col text-left pl-2">
                  <div className="text-xl text-foreground font-medium mb-1">Free</div>
                  <div className="text-[13px] text-muted-foreground mb-4">$0/mo</div>
                  <button className="w-full text-[13px] font-medium bg-secondary hover:bg-secondary/80 text-foreground py-2.5 rounded-full transition-colors border border-border">
                    Download Now
                  </button>
                </div>
                {/* Starter */}
                <div className="flex flex-col text-left pl-2">
                  <div className="text-xl text-foreground font-medium mb-1">Starter</div>
                  <div className="text-[13px] text-muted-foreground mb-4">Starts at ${isYearly ? "16" : "20"}/mo</div>
                  <button className="w-full text-[13px] font-medium bg-secondary hover:bg-secondary/80 text-foreground py-2.5 rounded-full transition-colors border border-border">
                    Start today
                  </button>
                </div>
                {/* Pro */}
                <div className="flex flex-col text-left pl-2">
                  <div className="text-xl text-foreground font-medium mb-1">Pro</div>
                  <div className="text-[13px] text-muted-foreground mb-4">Starts at ${isYearly ? "28" : "35"}/mo</div>
                  <button className="w-full text-[13px] font-medium bg-secondary hover:bg-secondary/80 text-foreground py-2.5 rounded-full transition-colors border border-border">
                    Start today
                  </button>
                </div>
                {/* Team */}
                <div className="flex flex-col text-left pl-2">
                  <div className="text-xl text-foreground font-medium mb-1">Team</div>
                  <div className="text-[13px] text-muted-foreground mb-4">Starts at ${isYearly ? "36" : "45"}/mo</div>
                  <button className="w-full text-[13px] font-medium bg-secondary hover:bg-secondary/80 text-foreground py-2.5 rounded-full transition-colors border border-border">
                    Start today
                  </button>
                </div>
              </div>

              {/* Features Section */}
              <div className="text-[17px] text-foreground font-medium mb-6 mt-4">Features</div>

              <div className="flex flex-col text-[14px] text-foreground/90">
                {/* Row 1 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium">Monthly Credits</div>
                  <div className="text-center font-medium">300</div>
                  <div className="text-center font-medium">1,500</div>
                  <div className="text-center font-medium">3,000</div>
                  <div className="text-center font-medium">4,000/user</div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium">Canvas Projects</div>
                  <div className="text-center font-medium">2</div>
                  <div className="text-center font-medium">Unlimited</div>
                  <div className="text-center font-medium">Unlimited</div>
                  <div className="text-center font-medium">Unlimited</div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium">Collaborators</div>
                  <div className="text-center font-medium">0</div>
                  <div className="text-center font-medium">Unlimited</div>
                  <div className="text-center font-medium">Unlimited</div>
                  <div className="text-center font-medium">Unlimited</div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium">Comments</div>
                  <div className="text-center text-muted-foreground flex justify-center">—</div>
                  <div className="text-center flex justify-center"><Check className="w-[18px] h-[18px] text-emerald-500 rounded-full border border-emerald-500/30 p-0.5" /></div>
                  <div className="text-center flex justify-center"><Check className="w-[18px] h-[18px] text-emerald-500 rounded-full border border-emerald-500/30 p-0.5" /></div>
                  <div className="text-center flex justify-center"><Check className="w-[18px] h-[18px] text-emerald-500 rounded-full border border-emerald-500/30 p-0.5" /></div>
                </div>

                {/* Row 5 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium">Credit Rollover</div>
                  <div className="text-center text-muted-foreground flex justify-center">—</div>
                  <div className="text-center text-muted-foreground flex justify-center">—</div>
                  <div className="text-center font-medium flex justify-center">5 months</div>
                  <div className="text-center font-medium flex justify-center">5 months</div>
                </div>

                {/* Row 6 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium">Credit Top-ups</div>
                  <div className="text-center text-muted-foreground flex justify-center">—</div>
                  <div className="text-center flex justify-center"><Check className="w-[18px] h-[18px] text-emerald-500 rounded-full border border-emerald-500/30 p-0.5" /></div>
                  <div className="text-center flex justify-center"><Check className="w-[18px] h-[18px] text-emerald-500 rounded-full border border-emerald-500/30 p-0.5" /></div>
                  <div className="text-center flex justify-center"><Check className="w-[18px] h-[18px] text-emerald-500 rounded-full border border-emerald-500/30 p-0.5" /></div>
                </div>

                {/* Row 7 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium">Team Features</div>
                  <div className="text-center text-muted-foreground flex justify-center">—</div>
                  <div className="text-center text-muted-foreground flex justify-center">—</div>
                  <div className="text-center text-muted-foreground flex justify-center">—</div>
                  <div className="text-center flex justify-center"><Check className="w-[18px] h-[18px] text-emerald-500 rounded-full border border-emerald-500/30 p-0.5" /></div>
                </div>

                {/* Row 8 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium flex items-center">
                    Images/Month
                    <div className="relative group ml-1.5 flex items-center cursor-help">
                      <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-[max-content] max-w-[220px] bg-background text-foreground text-[12px] p-2.5 rounded-md shadow-lg border border-border opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 text-center font-normal leading-relaxed">
                        Actuals depend on the model used
                      </div>
                    </div>
                  </div>
                  <div className="text-center font-medium flex justify-center">~1,000</div>
                  <div className="text-center font-medium flex justify-center">~5,000</div>
                  <div className="text-center font-medium flex justify-center">~10,000</div>
                  <div className="text-center font-medium flex justify-center">~13,333</div>
                </div>

                {/* Row 9 */}
                <div className="grid grid-cols-5 gap-4 py-5 border-b border-border/50 items-center">
                  <div className="col-span-1 font-medium flex items-center">
                    Videos/Month
                    <div className="relative group ml-1.5 flex items-center cursor-help">
                      <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-[max-content] max-w-[220px] bg-background text-foreground text-[12px] p-2.5 rounded-md shadow-lg border border-border opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 text-center font-normal leading-relaxed">
                        Actuals depend on the model used
                      </div>
                    </div>
                  </div>
                  <div className="text-center font-medium flex justify-center">~20 (200s)</div>
                  <div className="text-center font-medium flex justify-center">~100 (1000s)</div>
                  <div className="text-center font-medium flex justify-center">~200 (2000s)</div>
                  <div className="text-center font-medium flex justify-center">~266 (2660s)</div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24 pt-16 mt-32 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-12 gap-y-12">
            <div>
              <h2 className="text-xl font-medium text-foreground tracking-tight">Questions & Answers</h2>
            </div>

            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-border/50">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-5 text-left text-[14px] text-foreground font-medium hover:text-foreground/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="text-[14px] text-foreground/70 leading-relaxed pr-8">
                      {faq.answer}
                    </p>
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
