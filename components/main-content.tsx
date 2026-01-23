import { Hero } from "@/components/hero";

// import { SpeedComparison } from "@/components/speed-comparison";
import { Benefits } from "@/components/benefits";
// import { ContextSearch } from "@/components/context-search";
import { SecuritySection } from "@/components/security-section";
import { FeaturesBento } from "@/components/features-bento";
import { WhoIsInvookFor } from "@/components/who-is-invook-for";

export function MainContent() {
  return (
      <div className="container mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Content without stitched border */}
        <div className="flex flex-col gap-6 md:gap-12 lg:gap-20">
          <Hero />

          {/* <SpeedComparison /> */}
          <Benefits />
          {/* <ContextSearch /> */}
          {/* <SecuritySection /> */}
          <FeaturesBento />
          <WhoIsInvookFor />
        </div>
      </div>
  );
}