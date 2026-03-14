"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth-button";

interface ExploreHeaderProps {
  onCreateClick?: () => void;
  onMyAssetsClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchConfirm?: () => void;
  onClearSearch?: () => void;
}

export function ExploreHeader({ 
  onCreateClick, 
  onMyAssetsClick,
  searchValue = "", 
  onSearchChange, 
  onSearchConfirm,
  onClearSearch 
}: ExploreHeaderProps) {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearchConfirm) {
      onSearchConfirm();
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="flex h-[64px] items-center justify-between gap-4">
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

          {/* Center: Search Bar (Desktop) */}
          <div className="flex-1 max-w-2xl mx-auto hidden md:block relative">
            <div className="relative group">
              <div 
                className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                onClick={onSearchConfirm}
              >
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for images, videos..."
                className="block w-full pl-10 pr-10 py-2 border border-input rounded-full bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
              {searchValue && (
                <button
                  onClick={onClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
             {/* Mobile Search Icon */}
             <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden rounded-full"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
             >
                {isMobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
             </Button>

            {/* Publish Button */}
            <Button onClick={onCreateClick} className="hidden sm:flex items-center gap-2 px-4 py-1.5 h-auto text-sm font-medium rounded-full">
                <span>Publish</span>
            </Button>
            
            {/* Publish Button (mobile) */}
             <Button onClick={onCreateClick} className="sm:hidden px-3 py-1.5 h-auto text-xs font-medium rounded-full">
                <span>Publish</span>
            </Button>

            <AuthButton onMyAssetsClick={onMyAssetsClick} />
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isMobileSearchOpen && (
            <div className="md:hidden pb-4 pt-1 animate-in slide-in-from-top-2 duration-200">
                <div className="relative">
                    <div 
                      className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                      onClick={onSearchConfirm}
                    >
                      <Search className="h-4 w-4" />
                    </div>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search gallery..."
                        className="w-full pl-10 pr-10 py-2.5 border border-input rounded-xl bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                        autoFocus
                    />
                    {searchValue && (
                        <button
                            onClick={onClearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        )}
      </div>
    </header>
  );
}
