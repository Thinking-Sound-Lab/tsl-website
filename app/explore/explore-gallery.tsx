"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useAuthStore } from "@/store/useAuthStore";
import { ExploreAPI, type ExploreItem, type ExploreModel, type UploadMetadata } from "@/lib/api/explore";
import { ExploreHeader } from "@/components/explore-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";
import { ExploreLikeButton } from "@/components/explore-like-button";

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

function formatDuration(seconds?: number | null): string | null {
    if (!seconds || seconds <= 0) return null;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function getModelLabel(value: string, models: ExploreModel[]): string {
    return models.find(m => m.value === value)?.label || value;
}

/* ─── Constants ─────────────────────────────── */
const BASE_FILTERS = ["All", "Images", "Videos"] as const;

/* ─── Component ─────────────────────────────── */

export default function ExploreGallery() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const { capture } = useAnalytics();

    /* Data State */
    const [posts, setPosts] = useState<ExploreItem[]>([]);
    const [models, setModels] = useState<ExploreModel[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /* UI State */
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [confirmedSearch, setConfirmedSearch] = useState("");
    const [selectedPost, setSelectedPost] = useState<ExploreItem | null>(null);
    const [copied, setCopied] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isModelsExpanded, setIsModelsExpanded] = useState(false);

    /**
     * likeMeta — local optimistic like state keyed by post ID.
     * Keeps card hover count and lightbox count in sync for the session.
     * Seeded lazily on first interaction; falls back to server-provided values.
     */
    const [likeMeta, setLikeMeta] = useState<Record<string, { liked: boolean; count: number }>>({});

    const getLikeMeta = useCallback(
        (post: ExploreItem) =>
            likeMeta[post.id] ?? {
                liked: post.is_liked_by_user ?? false,
                count: post.like_count ?? 0,
            },
        [likeMeta]
    );

    const handleLikeToggled = useCallback(
        (postId: string, liked: boolean, count: number) => {
            setLikeMeta((prev) => ({ ...prev, [postId]: { liked, count } }));
        },
        []
    );

    /* Report Modal */
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [postToReport, setPostToReport] = useState<ExploreItem | null>(null);
    const [reportReason, setReportReason] = useState("");
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);

    /* Upload/Edit Modal */
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<ExploreItem | null>(null);
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
    const fetchingPageRef = useRef<number | null>(null);

    /* ─── Filter Params ─── */
    const getFilterParams = useCallback((filter: string, search: string) => {
        const params: { item_type?: string; model_name?: string; q?: string } = {};

        // 1. Base Filter (from pills)
        if (filter === "Images") params.item_type = "image";
        else if (filter === "Videos") params.item_type = "video";
        else if (filter !== "All" && filter !== "My Assets") params.model_name = filter;

        // 2. Search Query (always send as q if present)
        if (search.trim()) {
            params.q = search.trim();
        }

        return params;
    }, []);

    /* ─── Fetch Posts ─── */
    const fetchPosts = useCallback(
        async (pageNum: number, filter: string, search: string, append = false) => {
            try {
                if (pageNum === 1) setIsLoadingPosts(true);
                else setIsLoadingMore(true);

                const params = getFilterParams(filter, search);

                let res;
                if (filter === "My Assets" && user?.userId) {
                    res = await ExploreAPI.getUserPosts(user.userId, pageNum, 30, {
                        model_name: params.model_name,
                        item_type: params.item_type,
                    });
                } else if (search.trim()) {
                    res = await ExploreAPI.searchPosts(search.trim(), pageNum, 30);
                } else {
                    res = await ExploreAPI.getPosts(pageNum, 30, params);
                }

                // Extract items from the nested 'data' property of res.data
                const payload = res.data;
                const items = payload?.data || [];
                const more = payload?.hasMore || false;

                if (pageNum === 1 && search.trim()) {
                    capture("search_performed", {
                        query: search.trim(),
                        results_count: items.length,
                        has_results: items.length > 0,
                    });
                }

                setPosts((prev) => {
                    const next = append ? [...prev, ...items] : (items || []);
                    return next;
                });
                setHasMore(more && items.length > 0);
                setError(null);
                return true;
            } catch (err) {
                console.error("Failed to fetch explore posts", err);
                setError("Failed to load gallery. Please refresh.");
                setHasMore(false);
                return false;
            } finally {
                setIsLoadingPosts(false);
                setIsLoadingMore(false);
                fetchingPageRef.current = null;
            }
        },
        [getFilterParams, user?.userId, capture]
    );

    /* ─── Fetch Models ─── */
    const fetchModels = useCallback(async () => {
        try {
            const { success, data } = await ExploreAPI.getModels();
            if (success && Array.isArray(data)) {
                setModels(data);
            }
        } catch (err) {
            console.error("Failed to fetch models", err);
        }
    }, []);

    /* ─── Initial Load ─── */
    useEffect(() => {
        fetchModels();
    }, [fetchModels]);

    /* ─── Filter or Search Change ─── */
    useEffect(() => {
        setPage(1);
        fetchPosts(1, activeFilter, confirmedSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter, confirmedSearch]);

    /* ─── Infinite Scroll ─── */
    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting && hasMore && !isLoadingMore && !isLoadingPosts) {
                    const next = page + 1;
                    if (fetchingPageRef.current === next) return;

                    fetchingPageRef.current = next;
                    const success = await fetchPosts(next, activeFilter, confirmedSearch, true);
                    if (success) {
                        setPage(next);
                    }
                }
            },
            { rootMargin: "50px" }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, isLoadingMore, isLoadingPosts, page, activeFilter, confirmedSearch, fetchPosts]);

    /* ─── Handlers ─── */
    const handleSearchConfirm = () => {
        setConfirmedSearch(searchQuery);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
        setConfirmedSearch("");
        setActiveFilter("All"); // Reset to natural state
    };

    const handleCopyPrompt = async () => {
        if (!selectedPost) return;
        await navigator.clipboard.writeText(selectedPost.prompt);
        capture("prompt_copied", {
            post_id: selectedPost.id,
            model: selectedPost.model_name,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleUploadClick = () => {
        if (!isAuthenticated) {
            router.push(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
            return;
        }
        setEditingPost(null);
        resetUploadModal();
        setIsUploadModalOpen(true);
    };

    const handleEditClick = (post: ExploreItem) => {
        setEditingPost(post);
        // Use the main URL for preview (especially important for videos)
        setUploadFilePreview(post.url);
        setUploadFileType(post.item_type);
        setUploadPrompt(post.prompt);
        setUploadModel(post.model_name);
        setUploadTags(post.tags?.join(", ") || "");
        setIsUploadModalOpen(true);
    };

    const handleDeleteClick = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await ExploreAPI.deleteItem(id);
            capture("post_deleted", { post_id: id });
            setPosts((prev) => prev.filter((p) => p.id !== id));
            if (selectedPost?.id === id) setSelectedPost(null);
        } catch (err) {
            console.error("Failed to delete item", err);
            alert("Failed to delete item. Please try again.");
        }
    };

    const handleReport = async () => {
        if (!postToReport || !reportReason.trim()) return;
        if (!isAuthenticated) {
            router.push(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
            return;
        }
        setIsSubmittingReport(true);
        try {
            await ExploreAPI.reportItem(postToReport.id, reportReason.trim());
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
        if (!isAuthenticated || !user?.userId) {
            alert("Please sign in to upload assets.");
            return;
        }

        if (!editingPost && (!uploadFile || !uploadFileType)) return;

        // Final MIME type validation
        if (uploadFile) {
            const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/avif"];
            const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];

            if (!allowedImageTypes.includes(uploadFile.type) && !allowedVideoTypes.includes(uploadFile.type)) {
                alert("Unsupported file type. Please upload PNG, JPG, WebP, AVIF, MP4, WebM, or MOV.");
                return;
            }
        }

        setIsSubmittingUpload(true);
        setUploadProgress(0);

        const controller = new AbortController();
        abortControllerRef.current = controller;

        const tags = uploadTags.split(",").map((t) => t.trim()).filter(Boolean);

        try {
            if (editingPost) {
                await ExploreAPI.updateItem(editingPost.id, {
                    prompt: uploadPrompt,
                    tags,
                });
                capture("post_updated", { post_id: editingPost.id });
            } else if (uploadFile && uploadFileType) {
                let duration: number | undefined = undefined;
                if (uploadFileType === "video") {
                    try {
                        duration = await new Promise((resolve) => {
                            const video = document.createElement("video");
                            video.preload = "metadata";
                            video.onloadedmetadata = () => {
                                resolve(Math.round(video.duration));
                            };
                            video.onerror = () => resolve(undefined);
                            video.src = URL.createObjectURL(uploadFile);
                        });
                    } catch (e) {
                        console.warn("Failed to get video duration", e);
                    }
                }

                const metadata: UploadMetadata = {
                    prompt: uploadPrompt,
                    model_name: uploadModel,
                    mime_type: uploadFile.type,
                    width: 1024,
                    height: 1024,
                    item_type: uploadFileType,
                    duration,
                    tags,
                };

                const newItem = await ExploreAPI.uploadFile(
                    uploadFile,
                    metadata,
                    (p) => setUploadProgress(p),
                    controller.signal,
                );
                capture("post_created", {
                    model: uploadModel,
                    item_type: uploadFileType,
                });

                // Prepend new item for instant feedback
                setPosts(prev => [newItem, ...prev]);
            }
            setIsUploadModalOpen(false);
            resetUploadModal();
            setEditingPost(null);
        } catch (err) {
            const e = err as Error;
            if (e.message !== "Aborted" && e.message !== "Upload aborted by user") {
                console.error("Upload/Update failed", e);
                alert(`Operation failed: ${e.message}`);
            }
        } finally {
            setIsSubmittingUpload(false);
            abortControllerRef.current = null;
        }
    };

    /* ─── Autoplay video in lightbox ─── */
    useEffect(() => {
        if (selectedPost?.item_type === "video" && videoRef.current) {
            videoRef.current.play().catch(() => { });
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

    /* ─── Skeleton ─── */
    const SkeletonCard = ({ index }: { index: number }) => {
        const heights = ["140%", "160%", "110%", "135%", "150%"];
        const paddingBottom = heights[index % heights.length];

        return (
            <div className="masonry-item animate-pulse">
                <div
                    className="gallery-card-image-wrapper bg-secondary/50 rounded-xl"
                    style={{ paddingBottom }}
                />
                <div className="flex items-center justify-between mt-2.5 px-0.5">
                    <div className="h-4 bg-secondary/50 rounded w-24" />
                    <div className="w-8 h-8 bg-secondary/30 rounded-full" />
                </div>
            </div>
        );
    };

    /* ─── Render ─── */
    return (
        <div className="min-h-screen bg-background pt-[104px] md:pt-[112px] pb-16">
            <ExploreHeader
                onCreateClick={handleUploadClick}
                onMyAssetsClick={() => setActiveFilter("My Assets")}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchConfirm={handleSearchConfirm}
                onClearSearch={handleClearSearch}
            />

            {/* ── Header ── */}
            <header className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] mb-10">
                <div className="flex flex-col items-start max-w-3xl pt-12 pb-6">
                    <h1 className="text-xl sm:text-[24px] md:text-[28px] text-foreground mb-4 text-balance tracking-tighter">
                        AI Prompts Library: Explore Community Images & Videos
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground/70 max-w-2xl">
                        A community-powered library of AI prompts for images and videos. Discover how creators generate stunning visuals, reuse proven prompts, and remix them to create your own content.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-col gap-4 mt-8">
                    <div className={`flex items-center gap-2 ${isModelsExpanded ? "flex-wrap" : "overflow-x-auto no-scrollbar pb-2"}`}>
                        {BASE_FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${activeFilter === f
                                    ? "bg-foreground text-background"
                                    : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}

                        {isAuthenticated && (
                            <button
                                onClick={() => setActiveFilter("My Assets")}
                                className={`flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${activeFilter === "My Assets"
                                    ? "bg-foreground text-background"
                                    : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                                    }`}
                            >
                                My Assets
                            </button>
                        )}

                        {models.length > 0 && <div className="flex-shrink-0 w-px h-6 bg-foreground/15 mx-1" />}

                        {(isModelsExpanded ? models : models.slice(0, 4)).map((model) => (
                            <button
                                key={`filter-${model.value}`}
                                onClick={() => setActiveFilter(model.value)}
                                className={`flex-shrink-0 px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${activeFilter === model.value
                                    ? "bg-foreground text-background"
                                    : "bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground"
                                    }`}
                            >
                                {model.label}
                            </button>
                        ))}

                        {models.length > 4 && (
                            <button
                                onClick={() => setIsModelsExpanded(!isModelsExpanded)}
                                className="flex-shrink-0 px-4 py-1.5 text-sm font-semibold rounded-full bg-secondary text-foreground/70 hover:bg-secondary/80 hover:text-foreground transition-all flex items-center gap-1.5 border border-dashed border-foreground/20"
                            >
                                {isModelsExpanded ? (
                                    <>
                                        Less
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        More ({models.length - 4})
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
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
                            onClick={() => { setError(null); fetchPosts(1, activeFilter, confirmedSearch); }}
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
                        Array.from({ length: 12 }).map((_, i) => (
                            <SkeletonCard key={`skel-${i}`} index={i} />
                        ))}

                    {!isLoadingPosts &&
                        posts?.map((post, i) => {
                            const duration = formatDuration(post.duration);
                            return (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: Math.min(i, 20) * 0.03 }}
                                    className="masonry-item"
                                >
                                    <div className="gallery-card relative">
                                        {/* 3-dot menu — absolute top-right */}
                                        <div className="absolute top-2 right-2 z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenuId(openMenuId === post.id ? null : post.id);
                                                }}
                                                className="dropdown-trigger w-7 h-7 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
                                                        {activeFilter === "My Assets" && (
                                                            <>
                                                                <button
                                                                    className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2 whitespace-nowrap"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleEditClick(post);
                                                                        setOpenMenuId(null);
                                                                    }}
                                                                >
                                                                    <svg className="w-4 h-4 text-foreground/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2 whitespace-nowrap"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeleteClick(post.id);
                                                                        setOpenMenuId(null);
                                                                    }}
                                                                >
                                                                    <svg className="w-4 h-4 text-destructive/70 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                    Delete
                                                                </button>
                                                            </>
                                                        )}
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

                                        {/* Image */}
                                        <button
                                            onClick={() => { setSelectedPost(post); setCopied(false); }}
                                            className="gallery-card-image-wrapper w-full text-left cursor-pointer"
                                        >
                                            {(post.thumbnail_url || post.url) ? (
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
                                            ) : (
                                                <div className="w-full aspect-square bg-secondary flex items-center justify-center">
                                                    <span className="text-xs text-muted-foreground">No preview</span>
                                                </div>
                                            )}

                                            {post.item_type === "video" && duration && (
                                                <div className="absolute top-2.5 left-2.5 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-semibold text-white tracking-wide border border-white/10">
                                                    {duration}
                                                </div>
                                            )}
                                        </button>

                                        {/* Model + Prompt + CTAs */}
                                        <div className="flex flex-col gap-2 mt-2.5 px-1 pb-1">
                                            <div className="flex items-center justify-between pointer-events-auto">
                                                <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                                                    {getModelLabel(post.model_name, models)}
                                                </span>
                                                
                                                <div
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center"
                                                >
                                                    <ExploreLikeButton
                                                        postId={post.id}
                                                        initialLiked={getLikeMeta(post).liked}
                                                        initialCount={getLikeMeta(post).count}
                                                        size="sm"
                                                        variant="ghost"
                                                        onToggled={(liked, count) => handleLikeToggled(post.id, liked, count)}
                                                    />
                                                </div>
                                            </div>

                                            <p className="text-xs text-foreground/80 leading-relaxed">
                                                {post.prompt.length > 100
                                                    ? `${post.prompt.slice(0, 100).trimEnd()}...`
                                                    : post.prompt}
                                            </p>
                                            {post.prompt.length > 100 && (
                                                <button
                                                    onClick={() => { setSelectedPost(post); setCopied(false); }}
                                                    className="self-start text-[11px] text-[#F54E00] hover:underline font-semibold cursor-pointer -mt-1"
                                                >
                                                    more
                                                </button>
                                            )}

                                            <button
                                                onClick={() => navigator.clipboard.writeText(post.prompt)}
                                                className="w-full h-8 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-full border border-border hover:bg-secondary transition-colors cursor-pointer"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy Prompt
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (isAuthenticated) {
                                                        router.push("/download");
                                                    } else {
                                                        router.push(`/sign-in?redirect=${encodeURIComponent("/download")}`);
                                                    }
                                                }}
                                                className="w-full h-8 flex items-center justify-center gap-1.5 text-xs font-semibold rounded-full bg-[#F54E00] text-white hover:bg-[#F54E00]/90 transition-colors cursor-pointer"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                                </svg>
                                                Remix
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
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
                        <p className="text-muted-foreground text-sm mt-1 mb-8">Try a different filter or be the first to upload!</p>
                        <Button
                            onClick={handleUploadClick}
                            className="rounded-full px-8 py-2.5 font-medium transition-all hover:scale-105 active:scale-95"
                        >
                            Publish your first asset
                        </Button>
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
                            className="lightbox-container max-w-[1400px] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col lg:flex-row lg:h-full lg:overflow-hidden">
                                {/* Media Side */}
                                <div className="relative lg:flex-1 bg-black flex items-center justify-center min-h-[300px] h-[40vh] lg:h-full">
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
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            {(selectedPost.url || selectedPost.thumbnail_url) ? (
                                                <Image
                                                    src={(selectedPost.url || selectedPost.thumbnail_url) as string}
                                                    alt={selectedPost.prompt.slice(0, 60)}
                                                    fill
                                                    className="object-contain"
                                                    priority
                                                    unoptimized
                                                />
                                            ) : (
                                                <span className="text-muted-foreground">No preview available</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Details Side */}
                                <div className="lightbox-details bg-background lg:h-full">
                                    <div className="flex flex-col gap-4 flex-shrink-0">
                                        <span className="inline-flex self-start px-3 py-1 bg-[#F54E00] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                            {getModelLabel(selectedPost.model_name, models)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-muted-foreground">{timeAgo(selectedPost.created_at)}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 lg:overflow-y-auto mt-6 pr-2 custom-scrollbar">
                                        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-medium">
                                            {selectedPost.prompt}
                                        </p>
                                    </div>

                                    {selectedPost.tags && selectedPost.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-6 flex-shrink-0">
                                            {selectedPost.tags.map((tag) => (
                                                <span key={tag} className="px-2.5 py-1 text-[11px] font-semibold bg-secondary text-muted-foreground rounded-md border border-border">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-8 pt-6 border-t border-border flex-shrink-0">
                                        <p className="text-[11px] text-muted-foreground/60 mb-4 flex items-center gap-1.5 px-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            If the thumbnail is not visible, reload the page again to see it.
                                        </p>
                                        <div className="flex flex-col sm:flex-row items-center gap-3">
                                            {/* Like button — full-width on mobile, fixed on desktop */}
                                            <ExploreLikeButton
                                                postId={selectedPost.id}
                                                initialLiked={getLikeMeta(selectedPost).liked}
                                                initialCount={getLikeMeta(selectedPost).count}
                                                size="lg"
                                                className="w-full sm:w-auto"
                                                onToggled={(liked, count) =>
                                                    handleLikeToggled(selectedPost.id, liked, count)
                                                }
                                            />

                                            <button
                                                onClick={handleCopyPrompt}
                                                className="w-full sm:flex-1 h-11 flex items-center justify-center gap-2 text-sm font-semibold rounded-full border border-border hover:bg-secondary transition-colors"
                                            >
                                                {copied ? (
                                                    <>
                                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                        Copy Prompt
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (isAuthenticated) {
                                                        router.push("/download");
                                                    } else {
                                                        router.push(`/sign-in?redirect=${encodeURIComponent("/download")}`);
                                                    }
                                                }}
                                                className="w-full sm:flex-1 h-11 flex items-center justify-center gap-2 text-sm font-semibold rounded-full bg-[#F54E00] text-white hover:bg-[#F54E00]/90 transition-colors shadow-md"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                                                </svg>
                                                Use in Canvas
                                            </button>
                                        </div>
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

                            <div className="flex flex-col lg:flex-row lg:h-full lg:overflow-hidden">
                                {/* Left: File Upload */}
                                <div className="relative w-full lg:flex-1 flex flex-col bg-black min-h-[300px] h-[40vh] lg:h-full lg:border-r border-border/50">
                                    {!uploadFilePreview ? (
                                        <div className="flex-1 flex flex-col p-6 lg:p-10">
                                            <label className="flex-1 w-full min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-2xl cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all text-center group">
                                                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <svg className="w-8 h-8 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                </div>
                                                <span className="text-lg font-medium text-foreground">Click or Drag to Upload</span>
                                                <span className="text-sm text-foreground/50 mt-2">Images (PNG, JPG, WebP, AVIF) or Videos (MP4, WebM, MOV)</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/png,image/jpeg,image/jpg,image/webp,image/avif,video/mp4,video/webm,video/quicktime"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/avif"];
                                                            const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];

                                                            if (!allowedImageTypes.includes(file.type) && !allowedVideoTypes.includes(file.type)) {
                                                                alert("Unsupported file type. Please upload PNG, JPG, WebP, AVIF, MP4, WebM, or MOV.");
                                                                return;
                                                            }

                                                            setUploadFile(file);
                                                            setUploadFilePreview(URL.createObjectURL(file));
                                                            setUploadFileType(file.type.startsWith("video") ? "video" : "image");
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden">
                                            {uploadFileType === "video" ? (
                                                <video
                                                    src={uploadFilePreview}
                                                    poster={editingPost?.thumbnail_url || undefined}
                                                    controls
                                                    className="w-full h-full object-contain shadow-2xl"
                                                />
                                            ) : (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={uploadFilePreview}
                                                        alt="Upload preview"
                                                        fill
                                                        className="object-contain"
                                                        unoptimized
                                                        priority
                                                    />
                                                </div>
                                            )}
                                            {!editingPost && (
                                                <button
                                                    onClick={() => resetUploadModal()}
                                                    disabled={isSubmittingUpload}
                                                    className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 backdrop-blur-md transition-colors z-10 disabled:opacity-50"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Right: Form */}
                                <div className="lightbox-details bg-background flex flex-col pt-8 sm:pt-10 lg:h-full">
                                    <h2 className="text-xl font-bold text-foreground mb-6 px-1">
                                        {editingPost ? "Edit Post" : "Create Post"}
                                    </h2>

                                    <div className="flex-1 lg:overflow-y-auto space-y-6 lg:pr-4 pl-1 custom-scrollbar w-full mb-4">
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
                                        <div className={cn("space-y-2 relative model-dropdown-trigger", editingPost && "opacity-60 cursor-not-allowed")}>
                                            <label className="text-sm font-medium text-foreground/80 flex items-center justify-between">
                                                Model
                                                {editingPost && (
                                                    <span className="text-[10px] text-muted-foreground font-normal">Cannot be changed</span>
                                                )}
                                            </label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    disabled={!!editingPost}
                                                    onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                                                    className="w-full bg-secondary/50 border border-border rounded-xl p-3 text-sm text-foreground focus:outline-none focus:ring-0 transition-colors flex items-center justify-between disabled:cursor-not-allowed"
                                                >
                                                    <span className={uploadModel ? "text-foreground" : "text-muted-foreground"}>
                                                        {models.find(m => m.value === uploadModel)?.label || "Select a model"}
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
                                                                        key={`dropdown-${m.value}`}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setUploadModel(m.value);
                                                                            setIsModelDropdownOpen(false);
                                                                        }}
                                                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors ${uploadModel === m.value
                                                                            ? "bg-secondary/50 text-foreground font-medium"
                                                                            : "text-foreground/80"
                                                                            }`}
                                                                    >
                                                                        {m.label}
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
                                        <p className="text-[11px] text-muted-foreground/60 mb-4 flex items-center gap-1.5 px-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            If the thumbnail is not visible after posting, reload the page to see it.
                                        </p>
                                        <button
                                            disabled={(!editingPost && !uploadFile) || !uploadPrompt.trim() || !uploadModel || isSubmittingUpload}
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
                                                        {editingPost ? "Updating..." : "Uploading..."} {uploadProgress > 0 ? `${uploadProgress}%` : ""}
                                                    </>
                                                ) : (editingPost ? "Save Changes" : "Post to Explore")}
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
