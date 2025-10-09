"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";

interface Post {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  content: string;
  tableOfContents: { id: string; title: string }[];
}

export default function ResearchPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = use(params);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/research/${slug}`);
        if (!response.ok) {
          setPost(null);
        } else {
          const data = await response.json();
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main>
        <div className="textured-beige-bg min-h-screen flex items-center justify-center mt-28">
          <p className="text-gray-600 font-mono">Loading...</p>
        </div>
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <main>
      <div className="textured-beige-bg min-h-screen">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            {/* Hero Section with Title and Author */}
            <section
              className="bg-emerald-700/20 py-20 px-4 sm:px-8 lg:px-12 mt-28 border-b"
              style={{ borderColor: "#b0b0b0" }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-700 mb-6 leading-tight tracking-tighter">
                {post.title}
              </h1>
              <p className="text-gray-800 font-mono text-sm">
                {post.author} • {post.date}
              </p>
            </section>

            {/* Mobile Table of Contents Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="w-full px-4 sm:px-8 lg:px-12 py-6 flex items-start gap-2 text-left transition-colors"
              >
                <svg
                  className={`w-3 h-3 mt-1 text-gray-700 transition-transform flex-shrink-0 ${
                    isTocOpen ? "rotate-90" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42z" />
                </svg>
                <span className="text-sm font-medium text-gray-900 tracking-wider uppercase">
                  Table of Contents
                </span>
              </button>
              {isTocOpen && (
                <div className="px-4 sm:px-8 lg:px-12 pb-6">
                  <ul className="space-y-3 ml-5">
                    {post.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-emerald-700 hover:text-emerald-900 text-sm transition-colors block"
                          onClick={() => setIsTocOpen(false)}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <section
              className="grid lg:grid-cols-[280px_1fr] gap-0 border-t"
              style={{ borderColor: "#b0b0b0" }}
            >
              {/* Desktop Table of Contents - Left Sidebar */}
              <aside className="hidden lg:block pt-12 pb-12 pl-6 pr-8">
                <h2 className="text-sm font-medium text-gray-900 tracking-wider uppercase mb-4">
                  Table of Contents
                </h2>
                <ul className="space-y-3">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-emerald-700 hover:text-emerald-900 text-sm transition-colors block"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Main Content - Right Side */}
              <article className="pt-12 pb-12 px-4 sm:px-8 lg:px-12">
                <div
                  className="content-styles"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
