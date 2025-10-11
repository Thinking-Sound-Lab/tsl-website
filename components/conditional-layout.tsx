"use client";

import { usePathname } from "next/navigation";
import { NotificationBanner } from "./notification-banner";
import { Navigation } from "./navigation";
import { Footer } from "./footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <>
      {!isAuthPage && <NotificationBanner />}
      {!isAuthPage && <Navigation />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}
