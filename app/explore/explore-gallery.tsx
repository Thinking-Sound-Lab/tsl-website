"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { uploadOrchestrator, type UploadMetadata } from "@/lib/upload/orchestrator";
import { ExploreAPI, type ExploreItem } from "@/lib/api/explore";

/* ─── Helpers ───────────────────────────────── */

function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d`;
    return `${Math.floor(days / 7)}w`;
}

function formatDuration(seconds?: number | null): string {
    if (!seconds) return "0:15";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

/* ─── Constants ─────────────────────────────── */
const BASE_FILTERS = ["All", "Images", "Videos"] as const;

/* ─── Component ─────────────────────────────── */

export default function ExploreGallery() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    /* Data State */
    const [posts, setPosts] = useState<ExploreItem[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /* UI State */
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [selectedPost, setSelectedPost] = useState<ExploreItem | null>(null);
    const [copied, setCopied] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    /* Report Modal */
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [postToReport, setPostToReport] = useState<ExploreItem | null>(null);
    const [reportReason, setReportReason] = useState("");
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);

    /* Upload Modal */
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadFilePreview, setUploadFilePreview] = useState<string | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadFileType, setUploadFileType] = useState<"image" | "video" | null>(null);
    const [uploadPrompt, setUploadPrompt] = useState("");
    const [uploadModel, setUploadModel] = useState("");
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const [uploadTags, setUploadTags] = useState("");
    const [isSubmittingUpload, setIsSubmittingUpload] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const abortControllerRef = useRef<AbortController | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    /* ─── Filter Params ─── */
    const getFilterParams = useCallback((filter: string) => {
        if (filter === "Images") return { item_type: "image" };
        if (filter === "Videos") return { item_type: "video" };
        if (filter !== "All") return { model_name: filter };
        return {};
    }, []);

    /* ─── Fetch Posts ─── */
    const fetchPosts = useCallback(
        async (pageNum: number, filter: string, append = false) => {
            try {
                if (pageNum === 1) setIsLoadingPosts(true);
                else setIsLoadingMore(true);

                const res = await ExploreAPI.getPosts(pageNum, 30, getFilterParams(filter));
                const { data: items, hasMore: more } = res.data;

                setPosts((prev) => (append ? [...prev, ...items] : items));
                setHasMore(more);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch explore posts", err);
                setError("Failed to load gallery. Please refresh.");
            } finally {
                setIsLoadingPosts(false);
                setIsLoadingMore(false);
            }
        },
        [getFilterParams]
    );

    /* ─── Fetch Models ─── */
    const fetchModels = useCallback(async () => {
        try {
            const res = await ExploreAPI.getModels();
            setModels(res.data);
        } catch (err) {
            console.error("Failed to fetch models", err);
        }
    }, []);

    /* ─── Initial Load ─── */
    useEffect(() => {
        fetchPosts(1, activeFilter);
        fetchModels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ─── Filter Change ─── */
    useEffect(() => {
        setPage(1);
        fetchPosts(1, activeFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter]);

    /* ─── Infinite Scroll ─── */
    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore && !isLoadingMore && !isLoadingPosts) {
                    const next = page + 1;
                    setPage(next);
                    fetchPosts(next, activeFilter, true);
                }
            },
            { rootMargin: "200px" }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, isLoadingPosts, page, activeFilter, fetchPosts]);

    /* ─── Autoplay video in lightbox ─── */
    useEffect(() => {
        if (selectedPost?.item_type === "video" && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    }, [selectedPost]);

    /* ─── Close dropdowns on outside click ─── */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const t = e.target as Element;
            if (!t.closest(".dropdown-trigger")) setOpenMenuId(null);
            if (!t.closest(".model-dropdown-trigger")) setIsModelDropdownOpen(false);
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    /* ─── Handlers ─── */
    const handleCopyPrompt = async () => {
        if (!selectedPost) return;
        await navigator.clipboard.writeText(selectedPost.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleUploadClick = () => {
        if (!isAuthenticated) {
            router.push("/sign-in?redirect=/explore");
            return;
        }
        setIsUploadModalOpen(true);
    };

    const handleReport = async () => {
        if (!postToReport || !reportReason.trim()) return;
        if (!isAuthenticated) {
            router.push("/sign-in?redirect=/explore");
            return;
        }
        setIsSubmittingReport(true);
        try {
            await ExploreAPI.reportPost(postToReport.id, reportReason.trim());
            setIsReportModalOpen(false);
            setReportReason("");
            setPostToReport(null);
        } catch (err) {
            console.error("Failed to report", err);
            alert("Failed to submit report. Please try again.");
        } finally {
            setIsSubmittingReport(false);
        }
    };

    const resetUploadModal = () => {
        setUploadFile(null);
        setUploadFilePreview(null);
        setUploadFileType(null);
        setUploadPrompt("");
        setUploadModel("");
        setUploadTags("");
        setUploadProgress(0);
    };

    const handleSubmitUpload = async () => {
        if (!uploadFile || !uploadFileType) return;
        setIsSubmittingUpload(true);
        setUploadProgress(0);

        const controller = new AbortController();
        abortControllerRef.current = controller;

        const metadata: UploadMetadata = {
            prompt: uploadPrompt,
            modelName: uploadModel,
            mimeType: uploadFile.type,
            width: 1024,
            height: 1024,
            itemType: uploadFileType,
            tags: uploadTags.split(",").map((t) => t.trim()).filter(Boolean),
        };

        try {
            await uploadOrchestrator({
                file: uploadFile,
                metadata,
                onProgress: (p) => setUploadProgress(p),
                signal: controller.signal,
            });
            setIsUploadModalOpen(false);
            resetUploadModal();
            setPage(1);
            fetchPosts(1, activeFilter);
        } catch (err) {
            const e = err as Error;
            if (e.message !== "Aborted" && e.message !== "Upload aborted by user") {
                console.error("Upload failed", e);
                alert(`Upload failed: ${e.message}`);
            }
        } finally {
            setIsSubmittingUpload(false);
            abortControllerRef.current = null;
        }
    };

    /* ─── Skeleton ─── */
    const SkeletonCard = () => (
        <div className="masonry-item animate-pulse">
            <div
                className="gallery-card-image-wrapper bg-secondary/50 rounded-xl"
                style={{ paddingBottom: `${100 + Math.random() * 60}%` }}
            />
            <div className="flex items-center justify-between mt-2.5 px-0.5">
                <div className="h-4 bg-secondary/50 rounded w-24" />
                <div className="w-8 h-8 bg-secondary/30 rounded-full" />
            </div>
        </div>
    );

    /* ─── Render ─── */
    return (
        <div className="min-h-screen bg-background pt-20 pb-16">

            {/* ── Header ── */}
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">Explore</h1>
                <p className="mt-3 text-base text-muted-foreground max-w-xl">
                    Discover stunning AI-generated artwork from the Invook community.
                    Every image tells a story powered by prompts and imagination.
                </p>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mt-6 flex-wrap">
                    {BASE_FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                                activeFilter === f
                                    ? "bg-foreground text-background"
                                    : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                            }`}
                        >
                            {f}
                        </button>
                    ))}

                    {models.length > 0 && <div className="w-px h-6 bg-foreground/15 mx-1" />}

                    {models.map((model) => (
                        <button
                            key={model}
                            onClick={() => setActiveFilter(model)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                                activeFilter === model
                                    ? "bg-foreground text-background"
                                    : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                            }`}
                        >
                            {model}
                        </button>
                    ))}

                    <div className="flex-1" />

                    <button
                        onClick={handleUploadClick}
                        className="px-5 py-2 text-sm font-semibold rounded-full bg-[#F54E00] text-white hover:bg-[#F54E00]/90 transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Upload
                    </button>
                </div>
            </header>

            {/* ── Error Banner ── */}
            {error && (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] mb-6">
                    <div className="bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {error}
                        <button
                            onClick={() => { setError(null); fetchPosts(1, activeFilter); }}
                            className="ml-auto underline hover:no-underline"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* ── Masonry Grid ── */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
                <div className="masonry-grid">
                    {isLoadingPosts &&
                        Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={`skel-${i}`} />)}

                    {!isLoadingPosts &&
                        posts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: Math.min(i, 20) * 0.03 }}
                                className="masonry-item"
                            >
                                <button
                                    onClick={() => { setSelectedPost(post); setCopied(false); }}
                                    className="gallery-card group w-full text-left cursor-pointer"
                                >
                                    <div className="gallery-card-image-wrapper">
                                        <Image
                                            src={post.thumbnail_url || post.url}
                                            alt={post.prompt.slice(0, 60)}
                                            width={post.width}
                                            height={post.height}
                                            className="gallery-card-image"
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                            unoptimized
                                            loading="lazy"
                                        />

                                        {post.item_type === "video" && (
                                            <div className="absolute top-2.5 left-2.5 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-semibold text-white tracking-wide border border-white/10">
                                                {formatDuration(post.duration)}
                                            </div>
                                        )}

                                        <div className="gallery-card-overlay">
                                            <div className="gallery-card-info">
                                                <h3 className="text-sm font-semibold text-white truncate">
                                                    {post.prompt.slice(0, 50)}
                                                </h3>
                                                <span className="text-xs text-white/70">{post.model_name}</span>
                                            </div>
                                            <div className="gallery-card-user">
                                                <span className="text-xs text-white/80">{timeAgo(post.created_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                {/* Bottom Info Bar */}
                                <div className="flex items-center justify-between mt-2.5 px-0.5 relative">
                                    <span className="text-sm font-medium text-foreground/80 truncate pr-4">
                                        {post.model_name}
                                    </span>

                                    <div className="relative flex-shrink-0">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === post.id ? null : post.id);
                                            }}
                                            className="dropdown-trigger w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary text-foreground/70 hover:text-foreground transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                            </svg>
                                        </button>

                                        <AnimatePresence>
                                            {openMenuId === post.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-xl shadow-xl overflow-hidden z-20 py-1"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2 whitespace-nowrap"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            router.push("/sign-in");
                                                            setOpenMenuId(null);
                                                        }}
                                                    >
                                                        <svg className="w-4 h-4 text-foreground/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                                        </svg>
                                                        Use in Canvas
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2 whitespace-nowrap"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigator.clipboard.writeText(post.prompt);
                                                            setOpenMenuId(null);
                                                        }}
                                                    >
                                                        <svg className="w-4 h-4 text-foreground/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                        Copy prompt
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2 whitespace-nowrap"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPostToReport(post);
                                                            setIsReportModalOpen(true);
                                                            setOpenMenuId(null);
                                                        }}
                                                    >
                                                        <svg className="w-4 h-4 text-destructive/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                        Report
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>

                {/* Empty State */}
                {!isLoadingPosts && posts.length === 0 && !error && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                            <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-foreground/60 text-lg font-medium">No items found</p>
                        <p className="text-muted-foreground text-sm mt-1">Try a different filter or be the first to upload!</p>
                    </div>
                )}

                {/* Loading More */}
                {isLoadingMore && (
                    <div className="flex justify-center py-8">
                        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                    </div>
                )}

                <div ref={sentinelRef} className="h-1" />
            </section>

            {/* ── Lightbox Modal ── */}
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
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="lightbox-container"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Media Side */}
                                <div className="relative lg:flex-1 flex items-center justify-center bg-black/20 p-2 sm:p-3 lg:p-4 min-h-[250px]">
                                    {selectedPost.item_type === "video" && selectedPost.url ? (
                                        <video
                                            ref={videoRef}
                                            src={selectedPost.url}
                                            poster={selectedPost.thumbnail_url || undefined}
                                            controls
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="max-h-[50vh] lg:max-h-[85vh] w-auto rounded-lg"
                                        />
                                    ) : (
                                        <Image
                                            src={selectedPost.thumbnail_url || selectedPost.url}
                                            alt={selectedPost.prompt.slice(0, 60)}
                                            width={selectedPost.width}
                                            height={selectedPost.height}
                                            className="max-h-[50vh] lg:max-h-[85vh] w-auto object-contain rounded-lg"
                                            priority
                                            unoptimized
                                        />
                                    )}
                                </div>

                                {/* Details Side */}
                                <div className="lightbox-details">
                                    <div className="flex flex-col gap-3 flex-shrink-0">
                                        <span className="lightbox-model-badge">{selectedPost.model_name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">{timeAgo(selectedPost.created_at)}</span>
                                        </div>
                                    </div>

                                    <div className="lightbox-prompt-scroll">
                                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                                            {selectedPost.prompt}
                                        </p>
                                    </div>

                                    {selectedPost.tags && selectedPost.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 flex-shrink-0">
                                            {selectedPost.tags.map((tag) => (
                                                <span key={tag} className="lightbox-tag">{tag}</span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 flex-shrink-0 pt-1">
                                        <button onClick={handleCopyPrompt} className="lightbox-btn-outline">
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
                                            onClick={() => router.push("/sign-in")}
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

            {/* ── Report Modal ── */}
            <AnimatePresence>
                {isReportModalOpen && postToReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
                        onClick={() => setIsReportModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="bg-background border border-border rounded-2xl shadow-2xl p-6 w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Report Content
                            </h2>
                            <p className="text-sm text-foreground/70 mb-4">
                                Please describe why you are reporting this content.
                            </p>
                            <textarea
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                placeholder="Why is this inappropriate?"
                                className="w-full bg-secondary/50 border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-0 transition-colors resize-none"
                                rows={4}
                            />
                            <div className="flex items-center justify-end gap-3 mt-6">
                                <button
                                    onClick={() => { setIsReportModalOpen(false); setReportReason(""); }}
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-full transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReport}
                                    disabled={!reportReason.trim() || isSubmittingReport}
                                    className="px-5 py-2 text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmittingReport ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Submitting...
                                        </>
                                    ) : "Submit Feedback"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Upload Modal ── */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
                        onClick={() => { if (!isSubmittingUpload) setIsUploadModalOpen(false); }}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="lightbox-container max-w-[1000px] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => {
                                    if (isSubmittingUpload) abortControllerRef.current?.abort();
                                    setIsUploadModalOpen(false);
                                }}
                                disabled={isSubmittingUpload}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Left: File Upload */}
                                <div className="relative lg:flex-1 flex flex-col bg-black/20 p-6 lg:p-10 min-h-[300px] lg:border-r border-border/50">
                                    {!uploadFilePreview ? (
                                        <label className="flex-1 w-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-2xl cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all text-center group">
                                            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <svg className="w-8 h-8 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                </svg>
                                            </div>
                                            <span className="text-lg font-medium text-foreground">Click or Drag to Upload</span>
                                            <span className="text-sm text-foreground/50 mt-2">Images or Videos (max 50MB)</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*,video/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setUploadFile(file);
                                                        setUploadFilePreview(URL.createObjectURL(file));
                                                        setUploadFileType(file.type.startsWith("video") ? "video" : "image");
                                                    }
                                                }}
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex-1 relative w-full h-full flex flex-col items-center justify-center min-h-[300px]">
                                            {uploadFileType === "video" ? (
                                                <video src={uploadFilePreview} controls className="max-h-full max-w-full rounded-lg" />
                                            ) : (
                                                <Image
                                                    src={uploadFilePreview}
                                                    alt="Upload preview"
                                                    fill
                                                    className="object-contain rounded-lg"
                                                    unoptimized
                                                />
                                            )}
                                            <button
                                                onClick={() => resetUploadModal()}
                                                disabled={isSubmittingUpload}
                                                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-md transition-colors z-10 disabled:opacity-50"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Form */}
                                <div className="lightbox-details bg-background flex flex-col pt-8 sm:pt-10">
                                    <h2 className="text-xl font-bold text-foreground mb-6">Create Post</h2>

                                    <div className="flex-1 overflow-y-auto space-y-6 pr-2 lg:pr-4 pl-1 custom-scrollbar w-full">
                                        {/* Prompt */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground/80">Prompt</label>
                                            <textarea
                                                value={uploadPrompt}
                                                onChange={(e) => setUploadPrompt(e.target.value)}
                                                placeholder="What prompt did you use?"
                                                rows={4}
                                                className="w-full bg-secondary/50 border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-0 transition-colors resize-none"
                                            />
                                        </div>

                                        {/* Model Dropdown */}
                                        <div className="space-y-2 relative model-dropdown-trigger">
                                            <label className="text-sm font-medium text-foreground/80">Model</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                                    className="w-full bg-secondary/50 border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-0 transition-colors flex items-center justify-between"
                                                >
                                                    <span className={uploadModel ? "text-foreground" : "text-muted-foreground"}>
                                                        {uploadModel || "Select a model"}
                                                    </span>
                                                    <svg
                                                        className={`w-4 h-4 transition-transform ${isModelDropdownOpen ? "rotate-180" : ""}`}
                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                <AnimatePresence>
                                                    {isModelDropdownOpen && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -5 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="absolute top-full mt-2 w-full bg-background border border-border rounded-xl shadow-xl overflow-hidden z-20"
                                                        >
                                                            <div className="max-h-60 overflow-y-auto w-full custom-scrollbar py-1">
                                                                {models.map((m) => (
                                                                    <button
                                                                        key={m}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setUploadModel(m);
                                                                            setIsModelDropdownOpen(false);
                                                                        }}
                                                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors ${
                                                                            uploadModel === m
                                                                                ? "bg-secondary/50 text-foreground font-medium"
                                                                                : "text-foreground/80"
                                                                        }`}
                                                                    >
                                                                        {m}
                                                                    </button>
                                                                ))}
                                                                {models.length === 0 && (
                                                                    <p className="px-4 py-2.5 text-sm text-muted-foreground">No models available</p>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground/80">
                                                Tags <span className="text-muted-foreground font-normal">(comma separated)</span>
                                            </label>
                                            <input
                                                value={uploadTags}
                                                onChange={(e) => setUploadTags(e.target.value)}
                                                placeholder="e.g. cinematic, neon, 4k"
                                                className="w-full bg-secondary/50 border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-0 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <div className="pt-6 mt-4 border-t border-border/50">
                                        <button
                                            disabled={!uploadFile || !uploadPrompt.trim() || !uploadModel || isSubmittingUpload}
                                            onClick={handleSubmitUpload}
                                            className="w-full py-3 rounded-full bg-[#F54E00] text-white font-semibold hover:bg-[#F54E00]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
                                        >
                                            {isSubmittingUpload && uploadProgress > 0 && (
                                                <div
                                                    className="absolute left-0 top-0 bottom-0 bg-black/20 transition-all duration-300 pointer-events-none"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            )}
                                            <span className="relative z-10 flex items-center gap-2">
                                                {isSubmittingUpload ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Uploading... {uploadProgress}%
                                                    </>
                                                ) : "Post to Explore"}
                                            </span>
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