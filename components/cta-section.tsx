"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="pt-24 md:pt-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-7xl tracking-tight mb-8 text-foreground font-medium text-balance">
          Try Invook now.
        </h2>
        
        <div className="flex justify-center">
          <Link
            href="/waitlist"
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-sm text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Join Waitlist
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Background gradient effect similar to the reference if needed */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-50 pointer-events-none" />
    </section>
  );
}
