"use client";

/**
 * ExploreLikeButton
 *
 * Self-contained like/unlike button for explore items.
 *
 * Rules followed:
 * - Auth-gate: unauthenticated users are redirected to sign-in (P0 auth rule).
 * - Optimistic UI with rollback on API error (silent — consistent with rest of gallery).
 * - framer-motion spring animation on toggle (consistent with rest of explore page).
 * - One responsibility: handles like state for a single post ID.
 */

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { ExploreAPI } from "@/lib/api/explore";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────── */

interface ExploreLikeButtonProps {
    postId: string;
    initialLiked: boolean;
    initialCount: number;
    /** "sm" for card hover overlay, "lg" for lightbox detail panel */
    size?: "sm" | "lg";
    /** Styling variant: "overlay" (default) for on-top-of-media, "ghost" for neutral UI backgrounds */
    variant?: "overlay" | "ghost";
    /** Optional class for the outer wrapper */
    className?: string;
    /** Called after a successful toggle, so parent can sync state */
    onToggled?: (liked: boolean, count: number) => void;
}

/* ─── Particle burst (small hearts that fly out on first like) ── */

interface ParticleProps {
    id: number;
}

function HeartParticle({ id }: ParticleProps) {
    const angle = (id / 6) * 360;
    const distance = 26 + (id % 3) * 8;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance;

    return (
        <motion.span
            key={id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, x, y, scale: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="absolute pointer-events-none select-none text-[8px]"
            style={{ top: "50%", left: "50%", marginTop: -4, marginLeft: -4 }}
        >
            ♥
        </motion.span>
    );
}

/* ─── Component ─────────────────────────────────────── */

export function ExploreLikeButton({
    postId,
    initialLiked,
    initialCount,
    size = "sm",
    variant = "overlay",
    className,
    onToggled,
}: ExploreLikeButtonProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);
    const [isPending, setIsPending] = useState(false);
    const [particles, setParticles] = useState<number[]>([]);
    const particleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ─── Toggle handler ─── */
    const handleToggle = useCallback(
        async (e: React.MouseEvent) => {
            e.stopPropagation();

            // Auth gate — consistent with rest of explore page
            if (!isAuthenticated) {
                router.push(`/sign-in?redirect=${encodeURIComponent("/explore")}`);
                return;
            }

            if (isPending) return;

            // Optimistic update
            const prevLiked = liked;
            const prevCount = count;
            const nextLiked = !liked;
            const nextCount = nextLiked ? count + 1 : Math.max(0, count - 1);

            const optimisticAt = Date.now();

            setLiked(nextLiked);
            setCount(nextCount);
            setIsPending(true);

            // Burst particles only when liking (not unliking)
            if (nextLiked) {
                const ids = Array.from({ length: 6 }, (_, i) => i);
                setParticles(ids);
                if (particleTimerRef.current) clearTimeout(particleTimerRef.current);
                particleTimerRef.current = setTimeout(() => setParticles([]), 600);
            }

            try {
                const { data } = await ExploreAPI.toggleLike(postId);
                // Authoritative values from server
                setLiked(data.liked);
                setCount(data.likeCount);
                onToggled?.(data.liked, data.likeCount);
            } catch (err) {
                // Ensure animation is always visible for at least 500ms before rollback.
                // This guarantees the heart animation plays fully even when the API
                // responds quickly with an error (e.g. 404 on dev environment).
                const elapsed = Date.now() - optimisticAt;
                const minDisplayMs = 500;
                if (elapsed < minDisplayMs) {
                    await new Promise((r) => setTimeout(r, minDisplayMs - elapsed));
                }
                console.error("Failed to toggle like", { postId, err });
                setLiked(prevLiked);
                setCount(prevCount);
            } finally {
                setIsPending(false);
            }
        },
        [isAuthenticated, liked, count, isPending, postId, router, onToggled]
    );

    /* ─── Sizes ─── */
    const isLg = size === "lg";
    const isGhost = variant === "ghost";
    const iconSize = isLg ? "w-5 h-5" : (isGhost ? "w-5 h-5" : "w-[18px] h-[18px]");
    const textSize = isLg ? "text-sm font-semibold" : "text-[11px] font-semibold";

    // lg: pill button with border; sm: tight circle icon button (overlay) or menu-consistent button (ghost)
    const buttonBase = isLg
        ? "flex items-center gap-2 px-5 h-11 rounded-full border transition-all duration-200"
        : isGhost
            ? "w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
            : "w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200";

    const likedStyle = isLg
        ? "bg-rose-500/10 border-rose-500/40 text-rose-400 hover:bg-rose-500/20"
        : isGhost
            ? "text-rose-500 hover:bg-rose-500/10"
            : "bg-black/60 backdrop-blur-md text-rose-400 border border-white/15";
            
    const unlikedStyle = isLg
        ? "bg-secondary border-border text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
        : isGhost
            ? "text-foreground/70 hover:bg-secondary hover:text-foreground"
            : "bg-black/60 backdrop-blur-md text-white/80 border border-white/15 hover:text-rose-300";

    return (
        <div className={cn("relative inline-flex items-center gap-1", className)}>
            {/* Particle burst */}
            <AnimatePresence>
                {particles.map((id) => (
                    <HeartParticle key={id} id={id} />
                ))}
            </AnimatePresence>

            <motion.button
                id={`like-btn-${postId}`}
                onClick={handleToggle}
                disabled={isPending}
                whileTap={{ scale: 0.82 }}
                aria-label={liked ? "Unlike this post" : "Like this post"}
                aria-pressed={liked}
                className={cn(
                    buttonBase,
                    liked ? likedStyle : unlikedStyle,
                    isPending && "opacity-70 cursor-wait"
                )}
            >
                {/* Heart icon with spring scale animation */}
                <motion.svg
                    key={liked ? "liked" : "unliked"}
                    initial={{ scale: 0.5, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 550, damping: 15 }}
                    className={iconSize}
                    viewBox="0 0 24 24"
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={liked ? 0 : 2}
                    style={{ color: liked ? "#f43f5e" : "inherit" }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </motion.svg>

                {/* lg size shows count inline; sm shows nothing inside circle (count shown outside) */}
                {isLg && (
                    <motion.span
                        key={count}
                        initial={{ y: liked ? -6 : 6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className={textSize}
                    >
                        {count > 0 ? count.toLocaleString() : "Like"}
                    </motion.span>
                )}
            </motion.button>

            {/* sm/ghost: count badge shown OUTSIDE the circle */}
            {!isLg && count > 0 && (
                <motion.span
                    key={count}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={cn(
                        "text-[11px] font-semibold leading-none",
                        isGhost ? "text-foreground/70" : "text-white/90"
                    )}
                >
                    {count.toLocaleString()}
                </motion.span>
            )}
        </div>
    );
}
