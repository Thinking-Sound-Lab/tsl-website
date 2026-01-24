"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
  graphic?: React.ReactNode;
}

function FeatureCard({ title, description, className, graphic }: FeatureCardProps) {
  return (
    <div className={cn("bg-secondary rounded-sm p-4 flex flex-col justify-between h-full min-h-[200px] border border-border/50 overflow-hidden relative", className)}>
      <div className="mb-4 relative z-10 w-full max-w-[80%]">
        <h3 className="text-[15px] lg:text-[16px] text-foreground mb-1">{title}</h3>
        <p className="text-[15px] lg:text-[16px] text-muted-foreground tracking-tight text-balance">{description}</p>
      </div>
      {graphic}
    </div>
  );
}

export function FeaturesBento() {
  return (
    <section className="py-24 bg-background">
        <h2 className="text-3xl md:text-4xl text-center text-foreground mb-16 tracking-tight">
            The super creative workflow
        </h2>
        
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
