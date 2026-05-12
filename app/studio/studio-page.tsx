"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { StudioCanvas } from "@/components/studio/studio-canvas";
import { StudioPromptBar } from "@/components/studio/studio-prompt-bar";
import { useStudioGeneration } from "@/hooks/use-studio-generation";
import { useAuthStore } from "@/store/useAuthStore";

export default function StudioPage() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const { generate, state } = useStudioGeneration();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/sign-in?redirect=${encodeURIComponent("/studio")}`);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <StudioCanvas
        error={state.error}
        isGenerating={state.isGenerating}
      />
      <StudioPromptBar isGenerating={state.isGenerating} onGenerate={generate} />
    </div>
  );
}
