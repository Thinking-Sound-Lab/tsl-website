"use client";

import { useState } from "react";
import { WaitlistModal } from "@/components/waitlist-modal";
import { WaitlistProvider } from "@/components/waitlist-context";

export function WaitlistRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <WaitlistProvider onOpenWaitlist={() => setWaitlistOpen(true)}>
      {children}
      <WaitlistModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
    </WaitlistProvider>
  );
}