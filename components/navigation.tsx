"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWaitlist } from "@/components/waitlist-context";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openWaitlist } = useWaitlist();

  const handleJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    openWaitlist();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="flex h-[52px] items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <Image
                src="/svgs/web_logo.svg" 
                alt="Invook"
                width={0}
                height={0}
                style={{ height: '1.5rem', width: 'auto' }}
                className="h-6 w-auto brightness-0 dark:invert" 
                priority
              />
            </div>
          </Link>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex items-center justify-center space-x-10 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="https://invook.notion.site/Support-28f7f199308b80658fc8f2e93ec90087" 
              className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support
            </a>
            <Link
              href="/changelog"
              className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors"
            >
              Changelog
            </Link>
            <a
              href="https://invook.notion.site/About-2917f199308b80aead5dfb1c2d6142dd"
              className="text-sm font-normal text-foreground/80 hover:text-foreground dark:text-foreground dark:hover:text-muted-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
          </div>

          {/* Right: Join Waitlist & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleJoinWaitlist}
              className="hidden lg:inline-flex items-center justify-center px-3 py-1 border border-primary text-sm font-normal rounded-full shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors cursor-pointer"
            >
              Join Waitlist
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-foreground hover:text-muted-foreground transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col space-y-4 px-2">
              <a
                href="https://invook.notion.site/Support-28f7f199308b80658fc8f2e93ec90087"
                className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Support
              </a>
              <Link
                href="/changelog"
                className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Changelog
              </Link>
              <a
                href="https://invook.notion.site/About-2917f199308b80aead5dfb1c2d6142dd"
                className="text-sm text-foreground hover:text-muted-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <button
                onClick={(e) => {
                  handleJoinWaitlist(e);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full inline-flex items-center justify-center px-4 py-2 mt-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}