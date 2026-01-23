import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/conditional-layout";
import { Analytics } from "@vercel/analytics/react";
import { WaitlistRoot } from "@/components/waitlist-root";
import { ThemeProvider } from "./theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invook",
  description:
    "Boost productivity with Invook — AI dictation, smart editing, translation, and instant screen analysis. Work smarter across any app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WaitlistRoot>
            <ConditionalLayout>{children}</ConditionalLayout>
          </WaitlistRoot>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}