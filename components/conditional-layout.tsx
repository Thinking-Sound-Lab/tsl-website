"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { Footer } from "./footer";

export function ConditionalLayout({ 
  children 
}: { 
  children: React.ReactNode; 
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth") || pathname === "/sign-in" || pathname === "/sign-up";
  const isExplorePage = pathname?.startsWith("/explore");
  const isSharePage = pathname?.startsWith("/share");
  const isStudioPage = pathname?.startsWith("/studio");

  return (
    <>
      {!isAuthPage && !isExplorePage && !isSharePage && !isStudioPage && <Navigation />}
      {children}
      {!isAuthPage && !isSharePage && !isStudioPage && <Footer />}
    </>
  );
}