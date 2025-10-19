"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [downloadText, setDownloadText] = useState("Download");

  useEffect(() => {
    // Detect platform
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("mac")) {
      setDownloadText("Download for Mac");
    } else if (platform.includes("win")) {
      setDownloadText("Download for Windows");
    } else {
      setDownloadText("Download");
    }
  }, []);

  return (
    <nav
      className="fixed top-12 left-0 w-full border-b-[0.5px] z-50"
      style={{
        backgroundColor: "rgb(241 239 235)",
        borderBottomColor: "#b0b0b0",
      }}
    >
      <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center">
              <span className="text-lg font-medium text-emerald-700">
                Invook
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links and Download Button */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <a
                href="/pricing"
                className="flex items-center space-x-2 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span>Pricing</span>
              </a>
              <div
                className="relative"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <button
                  className="flex items-center space-x-2 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>Resources</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isResourcesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isResourcesOpen && (
                  <div className="absolute top-full left-0 pt-2 w-48 animate-fadeSlideIn">
                    <div
                      className="border border-gray-300 shadow-lg"
                      style={{ backgroundColor: "rgb(241 239 235)" }}
                    >
                      <a
                        href="https://invook.notion.site/Getting-Started-28f7f199308b80658fc8f2e93ec90087?source=copy_link"
                        className="flex items-center space-x-2 px-4 py-2 text-sm font-mono text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span>Getting Started</span>
                      </a>
                      <Link
                        href="/use-cases"
                        className="flex items-center space-x-2 px-4 py-2 text-sm font-mono text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>Use Case</span>
                      </Link>
                      <a
                        href="https://invook.notion.site/Careers-2917f199308b80aead5dfb1c2d6142dd?source=copy_link"
                        className="flex items-center space-x-2 px-4 py-2 text-sm font-mono text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Career</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <Link
                href="/research"
                className="flex items-center space-x-2 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span>Research</span>
              </Link>
            </div>

            {/* Download Button */}
            <Link href="/downloads">
              <Button variant="emerald" size="default">
                {downloadText}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link href="/downloads">
              <Button variant="emerald" size="sm">
                {downloadText}
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
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
          <div
            className="lg:hidden border-t py-4"
            style={{ borderColor: "#b0b0b0" }}
          >
            <div className="flex flex-col space-y-4">
              <a
                href="/pricing"
                className="flex items-center space-x-3 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span>Pricing</span>
              </a>
              <div>
                <button
                  className="flex items-center space-x-3 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors px-2 py-1 w-full"
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>Resources</span>
                  <svg
                    className={`w-3 h-3 ml-auto transition-transform duration-200 ${
                      isResourcesOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isResourcesOpen && (
                  <div className="ml-8 mt-2 space-y-2 animate-fadeSlideIn">
                    <a
                      href="/about"
                      className="block px-2 py-1 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => {
                        setIsResourcesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      About
                    </a>
                    <a
                      href="/career"
                      className="block px-2 py-1 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => {
                        setIsResourcesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Career
                    </a>
                    <a
                      href="/getting-started"
                      className="block px-2 py-1 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => {
                        setIsResourcesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Getting Started
                    </a>
                    <Link
                      href="/use-cases"
                      className="block px-2 py-1 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors"
                      onClick={() => {
                        setIsResourcesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Use Case
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/research"
                className="flex items-center space-x-3 text-sm font-mono text-gray-700 hover:text-gray-900 transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span>Research</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
