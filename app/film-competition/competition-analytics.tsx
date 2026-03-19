"use client";

import { useEffect, useRef } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { Button } from "@/components/ui/button";

export function CompetitionPageTracker() {
  const { capture } = useAnalytics();
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      capture("competition_page_viewed");
      tracked.current = true;
    }
  }, [capture]);

  return null;
}

export function CompetitionSubmitButton({ text }: { text: string }) {
  const { capture } = useAnalytics();

  return (
    <a 
      href="https://tally.so/r/xXZJb9" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-block"
      onClick={() => capture("competition_submit_clicked")}
    >
      <Button size="lg" className="text-base px-6 py-2 h-auto font-medium tracking-tight hover-lift transition-transform">
        {text}
      </Button>
    </a>
  );
}
