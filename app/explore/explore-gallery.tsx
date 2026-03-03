"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ───────────────────────────────────────────────
   Demo data — structured to match Gallery API shape.
   Replace with `fetch("/api/gallery")` when backend is live.
   ─────────────────────────────────────────────── */

interface GalleryPost {
    id: string;
    title: string;
    image_url: string;
    video_url?: string;
    prompt: string;
    model_display_name: string;
    media_type: "image" | "video";
    width: number;
    height: number;
    username: string;
    created_at: string;
    tags?: string[];
}

/* Helper to turn ISO date → "18h", "3d", "2w" etc. */
function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w`;
}
// Demo Data until backend is ready
const DEMO_POSTS: GalleryPost[] = [
    {
        id: "0",
        title: "Portrait Enhancement 4K",
        image_url: "https://picsum.photos/seed/portrait4k/640/960",
        prompt: "Ultra-high-resolution 4K enhancement based strictly on the provided reference image. Absolute fidelity to original facial anatomy, proportions, and identity. Preserve expression, gaze, pose, camera angle, framing, and perspective with zero deviation. Clothing, hair, skin, and background elements must remain unchanged in structure, placement, and design.\n\nRecover fine-grain detail with natural realism. Enhance pores, fine lines, hair strands, eyelashes, fabric weave, seams, and material edges without introducing stylization. Maintain original color science, white balance, and tonal relationships exactly as captured. Lighting direction, intensity, contrast, and shadow behavior must match the source image precisely, with only improved clarity and expanded\n\ndynamic range. No relighting, no reshaping. Remove any grain. Apply controlled sharpening and high-frequency detail reconstruction.\n\nRemove compression artifacts and noise while retaining authentic texture. No smoothing, no plastic skin, no artificial gloss. Facial features must remain consistent across the entire image with coherent anatomy and clean, stable edges.\n\nNegative constraints: no warping, no facial drift, no added or missing anatomy, no altered hands, no distortions, no perspective shift, no text or graphics, no hallucinated detail, no stylized rendering. Output must read as a true-to-life, photorealistic upscale that matches the reference exactly, only clearer, sharper, and higher resolution.",
        model_display_name: "Imagen 3",
        media_type: "image",
        width: 640,
        height: 960,
        username: "darlinn23",
        created_at: "2026-03-03T04:00:00Z",
        tags: ["ar 9:16", "quality 4", "profile cliry79", "upscale 4x", "photorealistic"],
    },
    {
        id: "1",
        title: "Neon Cyberpunk Alley",
        image_url: "https://picsum.photos/seed/cyber/640/960",
        prompt: "A rain-soaked cyberpunk alley with neon signs, reflections on wet pavement, holographic advertisements flickering above, steam rising from subway grates, cinematic lighting with deep shadows and vivid neon blues and pinks",
        model_display_name: "FLUX Schnell",
        media_type: "image",
        width: 640,
        height: 960,
        username: "stardust",
        created_at: "2026-03-03T00:00:00Z",
        tags: ["ar 2:3", "neon", "cyberpunk"],
    },
    {
        id: "2",
        title: "Ethereal Forest Spirit",
        image_url: "https://picsum.photos/seed/forest/800/600",
        prompt: "A glowing forest spirit in a misty woodland, bioluminescent mushrooms, ancient trees with twisted roots, volumetric fog, fantasy art style with soft ethereal lighting",
        model_display_name: "FLUX Pro",
        media_type: "image",
        width: 800,
        height: 600,
        username: "artisan",
        created_at: "2026-03-02T18:00:00Z",
        tags: ["fantasy", "bioluminescent", "forest"],
    },
    {
        id: "3",
        title: "Cosmic Jellyfish",
        image_url: "https://picsum.photos/seed/jelly/640/800",
        prompt: "Bioluminescent jellyfish floating in deep space among stars and nebulae, translucent tentacles trailing cosmic dust, ultra-detailed macro photography style",
        model_display_name: "FLUX Schnell",
        media_type: "image",
        width: 640,
        height: 800,
        username: "nebula_x",
        created_at: "2026-03-02T12:30:00Z",
        tags: ["space", "macro", "bioluminescent"],
    },
    {
        id: "4",
        title: "Desert Oasis Sunset",
        image_url: "https://picsum.photos/seed/desert/800/500",
        prompt: "Golden hour over a hidden desert oasis, palm trees silhouetted against orange sky, crystal clear water reflecting the sunset",
        model_display_name: "FLUX Pro",
        media_type: "image",
        width: 800,
        height: 500,
        username: "wanderer",
        created_at: "2026-03-01T08:00:00Z",
        tags: ["landscape", "golden hour"],
    },
    {
        id: "5",
        title: "Ancient Temple Ruins",
        image_url: "https://picsum.photos/seed/temple/640/900",
        prompt: "Overgrown ancient temple with vines and light rays piercing through cracks in the stone ceiling, moss-covered statues, mystical atmosphere",
        model_display_name: "FLUX Schnell",
        media_type: "image",
        width: 640,
        height: 900,
        username: "explorer",
        created_at: "2026-02-28T14:00:00Z",
        tags: ["ruins", "mystical", "overgrown"],
    },
    {
        id: "6",
        title: "Abstract Color Waves",
        image_url: "https://picsum.photos/seed/waves/800/800",
        prompt: "Flowing abstract color waves in vibrant hues, fluid art, mesmerizing swirls of magenta, teal and gold paint",
        model_display_name: "FLUX Pro",
        media_type: "image",
        width: 800,
        height: 800,
        username: "chromatic",
        created_at: "2026-02-27T20:00:00Z",
        tags: ["abstract", "fluid art"],
    },
    {
        id: "7",
        title: "Underwater Cathedral",
        image_url: "https://picsum.photos/seed/underwater/640/1000",
        prompt: "A sunken gothic cathedral with fish swimming through stained glass windows, rays of sunlight filtering through ocean water, coral growing on stone arches",
        model_display_name: "FLUX Schnell",
        media_type: "image",
        width: 640,
        height: 1000,
        username: "deep_blue",
        created_at: "2026-02-26T10:00:00Z",
        tags: ["underwater", "gothic", "coral"],
    },
    {
        id: "8",
        title: "Steampunk Airship",
        image_url: "https://picsum.photos/seed/airship/800/550",
        prompt: "A massive steampunk airship above Victorian London, brass and copper details, billowing steam, dramatic cloudy sky",
        model_display_name: "FLUX Pro",
        media_type: "image",
        width: 800,
        height: 550,
        username: "gear_head",
        created_at: "2026-02-25T16:00:00Z",
        tags: ["steampunk", "victorian", "airship"],
    },
    {
        id: "9",
        title: "Crystal Cave",
        image_url: "https://picsum.photos/seed/crystal/640/850",
        prompt: "A cave filled with giant glowing amethyst crystals, purple and violet reflections, underground lake with mirror-like surface",
        model_display_name: "FLUX Schnell",
        media_type: "image",
        width: 640,
        height: 850,
        username: "geologist",
        created_at: "2026-02-24T09:00:00Z",
        tags: ["crystal", "cave", "amethyst"],
    },
    {
        id: "10",
        title: "Floating Islands",
        image_url: "https://picsum.photos/seed/islands/800/700",
        prompt: "Floating islands with waterfalls cascading into clouds, lush green vegetation, rope bridges connecting the islands, fantasy landscape",
        model_display_name: "FLUX Pro",
        media_type: "image",
        width: 800,
        height: 700,
        username: "sky_painter",
        created_at: "2026-02-23T22:00:00Z",
        tags: ["fantasy", "floating", "waterfall"],
    },
    {
        id: "11",
        title: "Neon Samurai",
        image_url: "https://picsum.photos/seed/samurai/640/950",
        prompt: "A samurai in neon-lit armor standing in rain, katana glowing with electric blue energy, cyberpunk meets feudal Japan aesthetic",
        model_display_name: "FLUX Schnell",
        media_type: "image",
        width: 640,
        height: 950,
        username: "bushido",
        created_at: "2026-02-22T15:00:00Z",
        tags: ["cyberpunk", "samurai", "neon"],
    },
    {
        id: "12",
        title: "Aurora Borealis Village",
        image_url: "https://picsum.photos/seed/aurora/800/530",
        prompt: "A snowy Nordic village under vivid northern lights, cozy cabins with warm glowing windows, starry sky, long exposure photography style",
        model_display_name: "FLUX Pro",
        media_type: "image",
        width: 800,
        height: 530,
        username: "north_star",
        created_at: "2026-02-21T11:00:00Z",
        tags: ["aurora", "nordic", "long exposure"],
    },
    {
        id: "13",
        title: "Mechanical Butterfly",
        image_url: "https://picsum.photos/seed/butterfly/640/780",
        prompt: "A delicate clockwork butterfly with copper wings, intricate gears visible through transparent panels, macro photography, bokeh background",
        model_display_name: "FLUX Schnell",
        media_type: "image",
        width: 640,
        height: 780,
        username: "tinker",
        created_at: "2026-02-20T07:00:00Z",
        tags: ["clockwork", "macro", "bokeh"],
    },
    {
        id: "14",
        title: "Volcanic Lightning Storm",
        image_url: "https://picsum.photos/seed/volcano/800/600",
        prompt: "Lightning strikes above an erupting volcano at night, molten lava flowing, dramatic clouds illuminated by the eruption",
        model_display_name: "FLUX Pro",
        media_type: "image",
        width: 800,
        height: 600,
        username: "storm_chaser",
        created_at: "2026-02-19T19:00:00Z",
        tags: ["volcano", "lightning", "dramatic"],
    },
    {
        id: "15",
        title: "Zen Garden Dragon",
        image_url: "https://picsum.photos/seed/dragon/640/900",
        prompt: "A peaceful dragon resting in a Japanese zen garden, cherry blossoms falling, raked sand patterns, serene and contemplative mood",
        model_display_name: "FLUX Schnell",
        media_type: "image",
        width: 640,
        height: 900,
        username: "zen_master",
        created_at: "2026-02-18T13:00:00Z",
        tags: ["zen", "dragon", "cherry blossom"],
    },
    {
        id: "16",
        title: "Retro Sci-Fi Cityscape",
        image_url: "https://picsum.photos/seed/retro/800/650",
        prompt: "A 1960s retro-futuristic cityscape with flying cars, chrome buildings, atomic age design elements, vintage color palette",
        model_display_name: "FLUX Pro",
        media_type: "image",
        width: 800,
        height: 650,
        username: "future_past",
        created_at: "2026-02-17T06:00:00Z",
        tags: ["retro", "sci-fi", "vintage"],
    },
    {
        id: "v1",
        title: "Blazing Fire VFX",
        image_url: "https://picsum.photos/seed/fire/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        prompt: "Cinematic fire visual effects, slow motion flames engulfing the screen, ember particles, volumetric lighting",
        model_display_name: "Runway Gen-3",
        media_type: "video",
        width: 640,
        height: 360,
        username: "vfx_wizard",
        created_at: "2026-03-02T20:00:00Z",
        tags: ["vfx", "fire", "slow-mo"],
    },
    {
        id: "v2",
        title: "Great Escape Chase",
        image_url: "https://picsum.photos/seed/escape/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        prompt: "High energy chase sequence through a neon city, parkour over rooftops, dramatic camera angles",
        model_display_name: "Kling AI",
        media_type: "video",
        width: 640,
        height: 360,
        username: "motion_lab",
        created_at: "2026-03-01T14:00:00Z",
        tags: ["action", "chase", "cinematic"],
    },
    {
        id: "v3",
        title: "Joyride Through Space",
        image_url: "https://picsum.photos/seed/joyride/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        prompt: "A spacecraft joyride through an asteroid belt, vivid nebulae, lens flares, sci-fi cockpit POV",
        model_display_name: "Runway Gen-3",
        media_type: "video",
        width: 640,
        height: 360,
        username: "cosmonaut",
        created_at: "2026-02-28T09:00:00Z",
        tags: ["space", "sci-fi", "POV"],
    },
    {
        id: "v4",
        title: "Meltdown Abstract",
        image_url: "https://picsum.photos/seed/meltdown/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        prompt: "Abstract liquid metal meltdown, chrome surfaces morphing and dripping, surreal macro close-up",
        model_display_name: "Kling AI",
        media_type: "video",
        width: 640,
        height: 360,
        username: "abstract_eye",
        created_at: "2026-02-26T17:00:00Z",
        tags: ["abstract", "liquid", "chrome"],
    },
    {
        id: "v5",
        title: "Ocean Waves Aerial",
        image_url: "https://picsum.photos/seed/ocean/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        prompt: "Aerial drone shot of turquoise ocean waves crashing against volcanic black sand beach, golden hour light, Hawaii coastline",
        model_display_name: "Runway Gen-3",
        media_type: "video",
        width: 640,
        height: 360,
        username: "aerial_films",
        created_at: "2026-02-25T12:00:00Z",
        tags: ["aerial", "ocean", "drone"],
    },
    {
        id: "v6",
        title: "Neon City Drive",
        image_url: "https://picsum.photos/seed/drive/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        prompt: "First-person driving through a neon-drenched Tokyo at night, rain on windshield, synthwave aesthetic, smooth camera movement",
        model_display_name: "Kling AI",
        media_type: "video",
        width: 640,
        height: 360,
        username: "nightdriver",
        created_at: "2026-02-24T21:00:00Z",
        tags: ["driving", "neon", "synthwave"],
    },
    {
        id: "v7",
        title: "Morphing Sculptures",
        image_url: "https://picsum.photos/seed/sculpt/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        prompt: "Marble sculpture morphing through classical art periods, Renaissance to modern abstract, seamless transitions",
        model_display_name: "Runway Gen-3",
        media_type: "video",
        width: 640,
        height: 360,
        username: "art_morph",
        created_at: "2026-02-23T16:00:00Z",
        tags: ["sculpture", "morph", "art history"],
    },
    {
        id: "v8",
        title: "Northern Lights Timelapse",
        image_url: "https://picsum.photos/seed/northlights/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        prompt: "Timelapse of vibrant aurora borealis dancing over a frozen lake, stars wheeling in the background, Iceland",
        model_display_name: "Kling AI",
        media_type: "video",
        width: 640,
        height: 360,
        username: "aurora_hunter",
        created_at: "2026-02-22T03:00:00Z",
        tags: ["aurora", "timelapse", "iceland"],
    },
    {
        id: "v9",
        title: "Ink in Water",
        image_url: "https://picsum.photos/seed/ink/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        prompt: "Macro shot of colorful ink drops dispersing in crystal clear water, slow motion, vivid magenta and cyan pigments swirling",
        model_display_name: "Runway Gen-3",
        media_type: "video",
        width: 640,
        height: 360,
        username: "macro_magic",
        created_at: "2026-02-20T11:00:00Z",
        tags: ["macro", "ink", "slow-mo"],
    },
    {
        id: "v10",
        title: "Walking Through Portals",
        image_url: "https://picsum.photos/seed/portal/640/360",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        prompt: "Person walking through glowing interdimensional portals, each leading to a different surreal landscape, seamless loop",
        model_display_name: "Kling AI",
        media_type: "video",
        width: 640,
        height: 360,
        username: "dimension_hop",
        created_at: "2026-02-18T08:00:00Z",
        tags: ["portal", "surreal", "loop"],
    },
];

/* ─── Filter Tabs ─────────────────────────────── */

const BASE_FILTERS = ["All", "Images", "Videos"] as const;

/* ─── Component ───────────────────────────────── */

export default function ExploreGallery() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
    const [copied, setCopied] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    /* Autoplay video when lightbox opens on a video post */
    useEffect(() => {
        if (selectedPost?.media_type === "video" && videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    }, [selectedPost]);

    /* Derive unique model names from data for dynamic tabs */
    const modelTabs = Array.from(
        new Set(DEMO_POSTS.map((p) => p.model_display_name))
    );

    const filtered = DEMO_POSTS.filter((p) => {
        if (activeFilter === "Images") return p.media_type === "image";
        if (activeFilter === "Videos") return p.media_type === "video";
        if (activeFilter !== "All") return p.model_display_name === activeFilter;
        return true;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const handleCopyPrompt = async () => {
        if (!selectedPost) return;
        await navigator.clipboard.writeText(selectedPost.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-background pt-20 pb-16">
            {/* ── Header ─────────────────────────────── */}
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
                    Explore
                </h1>
                <p className="mt-3 text-base text-muted-foreground max-w-xl">
                    Discover stunning AI-generated artwork from the Invook community.
                    Every image tells a story powered by prompts and imagination.
                </p>

                {/* Filters */}
                <div className="flex items-center gap-2 mt-6 flex-wrap">
                    {/* Base filters: All / Images / Videos */}
                    {BASE_FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${activeFilter === f
                                ? "bg-foreground text-background"
                                : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                                }`}
                        >
                            {f}
                        </button>
                    ))}

                    {/* Divider */}
                    <div className="w-px h-6 bg-foreground/15 mx-1" />

                    {/* Model filters — auto-derived from data */}
                    {modelTabs.map((model) => (
                        <button
                            key={model}
                            onClick={() => setActiveFilter(model)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${activeFilter === model
                                ? "bg-foreground text-background"
                                : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                                }`}
                        >
                            {model}
                        </button>
                    ))}
                </div>
            </header>

            {/* ── Masonry Grid ───────────────────────── */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
                <div className="masonry-grid">
                    {filtered.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="masonry-item"
                        >
                            <button
                                onClick={() => {
                                    setSelectedPost(post);
                                    setCopied(false);
                                }}
                                className="gallery-card group w-full text-left cursor-pointer"
                            >
                                <div className="gallery-card-image-wrapper">
                                    <Image
                                        src={post.image_url}
                                        alt={post.title}
                                        width={post.width}
                                        height={post.height}
                                        className="gallery-card-image"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    />

                                    {/* Video play icon */}
                                    {post.media_type === "video" && (
                                        <div className="gallery-card-play">
                                            <svg className="w-10 h-10 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Hover overlay */}
                                    <div className="gallery-card-overlay">
                                        <div className="gallery-card-info">
                                            <h3 className="text-sm font-semibold text-white truncate">
                                                {post.title}
                                            </h3>
                                            <span className="text-xs text-white/70">
                                                {post.model_display_name}
                                            </span>
                                        </div>

                                        <div className="gallery-card-user">
                                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs text-white font-medium">
                                                {post.username[0].toUpperCase()}
                                            </div>
                                            <span className="text-xs text-white/80">
                                                {post.username}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Lightbox / Detail Modal ─────────────── */}
            <AnimatePresence>
                {selectedPost && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="lightbox-container"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col lg:flex-row h-full">
                                {/* ── Media Side ────────────────── */}
                                <div className="relative lg:flex-1 flex items-center justify-center bg-black/20 p-2 sm:p-3 lg:p-4 min-h-[250px]">
                                    {selectedPost.media_type === "video" && selectedPost.video_url ? (
                                        <video
                                            ref={videoRef}
                                            src={selectedPost.video_url}
                                            poster={selectedPost.image_url}
                                            controls
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="max-h-[50vh] lg:max-h-[85vh] w-auto rounded-lg"
                                        />
                                    ) : (
                                        <Image
                                            src={selectedPost.image_url}
                                            alt={selectedPost.title}
                                            width={selectedPost.width}
                                            height={selectedPost.height}
                                            className="max-h-[50vh] lg:max-h-[85vh] w-auto object-contain rounded-lg"
                                            priority
                                        />
                                    )}
                                </div>

                                {/* ── Details Side ──────────────── */}
                                <div className="lightbox-details">
                                    {/* Fixed top: model badge + user */}
                                    <div className="flex flex-col gap-3 flex-shrink-0">
                                        {/* Model badge */}
                                        <span className="lightbox-model-badge">
                                            {selectedPost.model_display_name}
                                        </span>

                                        {/* Username + time */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-foreground">
                                                {selectedPost.username}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                                {timeAgo(selectedPost.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Scrollable prompt area */}
                                    <div className="lightbox-prompt-scroll">
                                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                            {selectedPost.prompt}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    {selectedPost.tags && selectedPost.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 flex-shrink-0">
                                            {selectedPost.tags.map((tag) => (
                                                <span key={tag} className="lightbox-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Action buttons — always pinned at bottom */}
                                    <div className="flex items-center gap-3 flex-shrink-0 pt-1">
                                        <button
                                            onClick={handleCopyPrompt}
                                            className="lightbox-btn-outline"
                                        >
                                            {copied ? (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    Copy Prompt
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => {
                                                router.push("/sign-in");
                                            }}
                                            className="lightbox-btn-primary"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                            </svg>
                                            Use in Canvas
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
