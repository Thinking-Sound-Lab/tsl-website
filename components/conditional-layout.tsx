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
  const isAuthPage = pathname?.startsWith("/auth");
  const isDownloadsPage = pathname === "/downloads";

  return (
    <>
      {!isAuthPage && !isDownloadsPage && <Navigation />}
      {children}
      {!isAuthPage && !isDownloadsPage && <Footer />}
    </>
  );
}