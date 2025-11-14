import { Hero } from "@/components/hero";
import { Partners } from "@/components/partners";
import { SpeedComparison } from "@/components/speed-comparison";
import { Benefits } from "@/components/benefits";
import { ContextSearch } from "@/components/context-search";
import { AnimatedBoxes } from "@/components/animated-boxes";
import { SecuritySection } from "@/components/security-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";

export function MainContent() {
  return (
    <div className="textured-beige-bg">
      <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
        {/* Single stitched border container for all content */}
        <div className="stitched-border">
          <Hero />
          {/* Navigation-style divider */}
          <div className="w-full border-t border-gray-300"></div>
          <Partners />
          {/* Navigation-style divider */}
          <div className="w-full border-t border-gray-300"></div>
          <SpeedComparison />
          {/* Navigation-style divider */}
          <div className="w-full border-t border-gray-300"></div>
          <Benefits />
          {/* Navigation-style divider */}
          <div className="w-full border-t border-gray-300"></div>
          <div className="">
            <AnimatedBoxes />
          </div>
          <ContextSearch />
          {/* <LearnSection /> */}
          <SecuritySection />
          <div className="">
            <AnimatedBoxes />
          </div>
          <TestimonialsSection />
          <FAQSection />
        </div>
      </div>
    </div>
  );
}
