"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, LogOut, User, Plus } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExploreHeaderProps {
  onCreateClick?: () => void;
}

export function ExploreHeader({ onCreateClick }: ExploreHeaderProps) {
  const { user, isAuthenticated, signOut } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl mx-auto hidden md:block relative">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-foreground transition-colors">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search for images, videos..."
                className="block w-full pl-10 pr-3 py-2 border border-input rounded-full bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
             {/* Mobile Search Icon (visible only on small screens) */}
             <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
             </Button>

            {/* Create Button */}
            <Button onClick={onCreateClick} className="hidden sm:flex items-center gap-2 px-3 py-1 h-auto text-sm font-normal rounded-full">
                <Plus className="h-4 w-4" />
                <span>Create</span>
            </Button>
            
            {/* Create Button (Icon only for mobile) */}
             <Button onClick={onCreateClick} className="sm:hidden px-2 py-1 h-auto rounded-full">
                <Plus className="h-5 w-5" />
            </Button>

            {isAuthenticated && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all hover:opacity-80"
                >
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt={user.email || "User"}
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </button>

                {/* Popover Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-4 py-2 border-b border-border">
                        <p className="text-sm font-medium truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
