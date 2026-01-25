"use client";



import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ title, description, className }: FeatureCardProps) {
  return (
    <div className={cn("bg-secondary rounded-sm p-4 flex flex-col h-full min-h-[200px] border border-border/50 overflow-hidden relative", className)}>
      <div className="relative z-10 w-full max-w-[80%]">
        <h3 className="text-[15px] lg:text-[16px] text-foreground mb-1">{title}</h3>
        <p className="text-[15px] lg:text-[16px] text-muted-foreground tracking-tight text-balance">{description}</p>
      </div>
    </div>
  );
}

export function FeaturesBento() {
  return (
    <section className="bg-background py-24">
      <div className="flex flex-col items-start max-w-2xl mb-10">
        <h2 className="text-3xl md:text-4xl text-foreground mb-4 tracking-tight">
          The super creative workflow
        </h2>
        <p className="text-lg text-muted-foreground tracking-tight text-balance">
          Manage your assets, research, and ideas in a single, unified environment. Designed to keep you in flow, from initial spark to final output.
        </p>
      </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[minmax(250px,auto)]">
          {/* Item 1: Intelligent File Storage (Large) */}
          <FeatureCard
            title="Intelligent File Storage"
            description="Store all your assets with AI-powered organization. No more folder shuffling."
            className="md:col-span-2"
          />

          {/* Item 2: Deep Research on Canvas */}
          <FeatureCard
            title="Deep Research on Canvas"
            description="Visually map out complex topics and connect dots across your entire knowledge base."
            className="md:col-span-1"
          />

          {/* Item 3: Quick Capture */}
          <FeatureCard
            title="Quick Capture"
            description="Instantly save fleeting thoughts, links, and snippets without breaking flow."
            className="md:col-span-1"
          />

          {/* Item 4: Visual Search */}
          <FeatureCard
            title="Visual Search"
            description="Find images and files by describing them naturally, even if you forgot the filename."
            className="md:col-span-1"
          />

          {/* Item 5: Team members */}
          <FeatureCard
            title="Team members"
            description="Collaborate instantly with your team on shared canvases and drive folders."
            className="md:col-span-1"
          />
        </div>
    </section>
  );
}
