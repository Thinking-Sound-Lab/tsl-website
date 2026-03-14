"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, User, FolderHeart } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";

interface AuthButtonProps {
  onMyAssetsClick?: () => void;
}

export function AuthButton({ onMyAssetsClick }: AuthButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuthStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

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

  if (!isAuthenticated) {
    return (
      <Button 
        variant="outline" 
        className="inline-flex items-center justify-center rounded-full px-4 py-1.5 h-auto text-sm font-medium transition-colors"
        asChild
      >
        <Link href={`/sign-in?redirect=${encodeURIComponent(pathname || "/explore")}`}>
          Sign In
        </Link>
      </Button>
    );
  }

  return (
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

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-2xl shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <div className="px-4 py-2 border-b border-border mb-1">
            <p className="text-xs font-medium text-muted-foreground truncate">Signed in as</p>
            <p className="text-sm font-bold text-foreground truncate">{user?.email}</p>
          </div>

          <button
            onClick={() => {
              if (onMyAssetsClick) {
                onMyAssetsClick();
              } else {
                router.push("/explore");
              }
              setIsProfileOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary/50 transition-colors text-left"
          >
            <FolderHeart className="h-4 w-4 text-muted-foreground" />
            <span>My Assets</span>
          </button>

          <button
            onClick={() => {
              signOut();
              setIsProfileOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors text-left"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}
