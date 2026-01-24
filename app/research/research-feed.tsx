"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  featured?: boolean;
}

const categories = [
  "All",
  "Machine Learning",
  "Privacy & Security",
  "Performance",
  "Natural Language Processing",
  "Engineering",
];

export default function ResearchFeed() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [boxesPerRow, setBoxesPerRow] = useState(62);
  const [staticBoxes, setStaticBoxes] = useState<Set<number>>(new Set());
  const [posts, setPosts] = useState<Post[]>([]);
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from API route
    async function fetchPosts() {
      try {
        const response = await fetch("/api/research");
        const data = await response.json();
        setPosts(data.posts);
        setFeaturedPost(data.featured);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const updateBoxesPerRow = () => {
      if (window.innerWidth < 640) {
        setBoxesPerRow(20);
      } else if (window.innerWidth < 768) {
        setBoxesPerRow(30);
      } else if (window.innerWidth < 1024) {
        setBoxesPerRow(40);
      } else {
        setBoxesPerRow(62);
      }
    };

    updateBoxesPerRow();
    window.addEventListener("resize", updateBoxesPerRow);

    return () => window.removeEventListener("resize", updateBoxesPerRow);
  }, []);

  useEffect(() => {
    const totalBoxes = 3 * boxesPerRow;
    const initialStatic = new Set<number>();
    const staticCount = Math.floor(totalBoxes * 0.08);
    for (let i = 0; i < staticCount; i++) {
      initialStatic.add(Math.floor(Math.random() * totalBoxes));
    }
    setStaticBoxes(initialStatic);
  }, [boxesPerRow]);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  if (loading) {
    return (
      <main>
        <div className="textured-beige-bg min-h-screen flex items-center justify-center">
          <p className="text-gray-600 font-mono">Loading research posts...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="textured-beige-bg min-h-screen">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            {/* Hero Section with centered heading and muted background */}
            <section className="bg-white/50 py-28 px-4 sm:px-8 lg:px-12 text-center mt-28">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-emerald-700 tracking-tight text-pretty">
                THE INVOOK RESEARCH
              </h1>
            </section>

            {/* Featured Research */}
            {featuredPost && (
              <section
                className="border-t border-b bg-[#E6E4E0]"
                style={{ borderColor: "#b0b0b0" }}
              >
                <div className="grid lg:grid-cols-[3fr_2fr] gap-0 items-stretch">
                  {/* Right Side - Rotating 3D Mesh (first on mobile, second on desktop) */}
                  <div className="relative bg-emerald-700/30 flex items-center justify-center overflow-hidden h-48 sm:h-64 lg:h-auto lg:aspect-square lg:order-2">
                    <svg
                      className="absolute w-full h-full text-emerald-600 animate-spin-slow"
                      viewBox="0 0 200 200"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    >
                      {/* Wireframe sphere with latitude lines */}
                      {Array.from({ length: 20 }).map((_, i) => {
                        const radius = 10 + i * 4;
                        return (
                          <circle
                            key={`lat-${i}`}
                            cx="100"
                            cy="100"
                            r={radius}
                            opacity={0.4}
                          />
                        );
                      })}

                      {/* Wireframe sphere with longitude lines */}
                      {Array.from({ length: 16 }).map((_, i) => {
                        const angle = (i * 180) / 16;
                        const radiusX =
                          Math.abs(Math.cos((angle * Math.PI) / 180)) * 90;
                        return (
                          <ellipse
                            key={`long-${i}`}
                            cx="100"
                            cy="100"
                            rx={radiusX}
                            ry="90"
                            transform={`rotate(${angle} 100 100)`}
                            opacity={0.4}
                          />
                        );
                      })}

                      {/* Additional mesh lines for complexity */}
                      {Array.from({ length: 8 }).map((_, i) => {
                        const angle = (i * 360) / 8;
                        return (
                          <line
                            key={`spoke-${i}`}
                            x1="100"
                            y1="100"
                            x2={100 + 90 * Math.cos((angle * Math.PI) / 180)}
                            y2={100 + 90 * Math.sin((angle * Math.PI) / 180)}
                            opacity={0.3}
                          />
                        );
                      })}
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-emerald-700 font-bold text-3xl sm:text-5xl tracking-widest z-10">
                        FEATURED
                      </span>
                    </div>
                  </div>

                  {/* Left Side - Content (second on mobile, first on desktop) */}
                  <Link
                    href={`/research/${featuredPost.slug}`}
                    className="px-4 sm:px-8 lg:px-12 py-12 lg:py-16 lg:order-1 flex flex-col justify-between hover:bg-[#E6E4E0]/50 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <svg
                          className="w-4 h-4 text-gray-700"
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
                        <svg
                          className="w-5 h-5 text-emerald-700 -rotate-45"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-gray-700 leading-tight tracking-tight">
                        {featuredPost.title}
                      </h2>

                      <p className="text-gray-700 text-sm font-mono leading-relaxed">
                        {featuredPost.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600 font-mono mt-8">
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.author}</span>
                    </div>
                  </Link>
                </div>
              </section>
            )}

            {/* Static Block Pattern */}
            <section className="w-full overflow-hidden">
              {Array.from({ length: 3 }, (_, rowIndex) => (
                <div key={rowIndex} className="flex justify-center">
                  {Array.from({ length: boxesPerRow }, (_, colIndex) => {
                    const boxIndex = rowIndex * boxesPerRow + colIndex;
                    const isStatic = staticBoxes.has(boxIndex);

                    const staticColors = [
                      "bg-pink-800/30",
                      "bg-yellow-800/30",
                      "bg-green-800/30",
                      "bg-orange-800/30",
                    ];
                    const boxColor = isStatic
                      ? staticColors[boxIndex % staticColors.length]
                      : "";

                    return (
                      <div
                        key={boxIndex}
                        className={`w-5 h-5 border border-gray-300 ${boxColor}`}
                      />
                    );
                  })}
                </div>
              ))}
            </section>

            {/* All Posts Header Box */}
            <section className="bg-orange-700/30 py-16 px-4 sm:px-8 lg:px-12">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-orange-700 mb-8 tracking-tight">
                ALL POSTS
              </h2>

              {/* Category Filter */}
              <div className="inline-flex flex-wrap items-center bg-white/50 border border-orange-700 border-dashed p-1 gap-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 font-mono text-sm transition-colors ${
                      selectedCategory === category
                        ? "bg-orange-700 text-white"
                        : "text-gray-700 hover:text-orange-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            {/* All Posts Grid Section */}
            <section>
              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/research/${post.slug}`}
                    className="bg-[#E6E4E0] border border-gray-300/50 p-6 sm:p-8 cursor-pointer group transition-all hover:shadow-2xl hover:scale-[1.02] hover:z-10 relative flex flex-col justify-between min-h-[320px]"
                  >
                    <div>
                      {/* Top icons row */}
                      <div className="flex items-center justify-between mb-6">
                        <svg
                          className="w-5 h-5 text-gray-700"
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
                        <svg
                          className="w-5 h-5 text-orange-600 -rotate-45 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-700 mb-4 leading-tight tracking-tight">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed font-mono">
                        {post.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-600 font-mono mt-6">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-lg">
                    No posts found in this category.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
