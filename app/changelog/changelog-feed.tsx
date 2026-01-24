"use client";

import { useState } from "react";
import Image from "next/image";
import { changelogData, ChangelogItem } from "./data";

const ITEMS_PER_PAGE = 5;

const ChangeMedia = ({
  src,
  alt,
  isGif,
}: {
  src: string;
  alt: string;
  isGif?: boolean;
}) => (
  <div className="my-8 rounded-lg border border-border/40 overflow-hidden bg-muted/20">
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={675}
      className="w-full h-auto block"
      unoptimized={isGif}
    />
  </div>
);

const ChangelogEntry = ({ item }: { item: ChangelogItem }) => {
  // Treat features and any item with media as a "Prominent" section
  const prominentChanges = item.changes.filter(
    (c) => c.type === "feature" || c.image || c.gif
  );
  // Everything else goes into the list
  const listChanges = item.changes.filter(
    (c) => c.type !== "feature" && !c.image && !c.gif
  );

  return (
    <article className="py-16 md:py-24 border-b border-border/40 last:border-0 first:pt-0 tracking-tight text-balance">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-8 md:gap-12">
        {/* Left Column: Version & Date */}
        <div className="md:sticky md:top-32 h-fit">
          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="px-3 py-1 rounded-full border border-border/60 text-sm font-mono text-foreground/80 bg-background">
              {item.version}
            </span>
            <time className="text-sm font-mono">{item.date}</time>
          </div>
        </div>

        {/* Right Column: Content */}
        <div>
           {/* Header Area */}
          <div className="mb-12">
            <span className="text-muted-foreground/60 text-base mb-2 block">Changelog</span>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground mb-6 leading-[1.1]">
              {item.summaryTitle}
            </h2>
            <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-3xl">
              {item.summaryBody}
            </p>
          </div>

          {/* Prominent Features */}
          <div className="space-y-10">
            {prominentChanges.map((change, idx) => (
              <div key={`prominent-${idx}`} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base md:text-lg font-medium text-foreground tracking-tight">
                    {change.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">
                    {change.description}
                  </p>
                </div>
                {change.image && (
                  <ChangeMedia src={change.image} alt={change.title} />
                )}
                {change.gif && (
                  <ChangeMedia src={change.gif} alt={change.title} isGif />
                )}
              </div>
            ))}
          </div>

          {/* Other Updates List */}
          {listChanges.length > 0 && (
            <div className="mt-16">
              <h3 className="text-base md:text-lg font-medium text-foreground mb-6">
                Other Improvements
              </h3>
              <ul className="space-y-4">
                {listChanges.map((change, idx) => (
                  <li
                    key={`list-${idx}`}
                    className="flex gap-3 text-muted-foreground text-[16px]"
                  >
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                    <span className="leading-relaxed">
                      <span className="font-normal text-foreground/90 mr-2">
                        {change.title}:
                      </span>
                      {change.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default function ChangelogFeed() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(changelogData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentChangelogs = changelogData.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-[1400px] py-12 md:py-24">
        {/* Feed */}
        <div className="mt-8">
          {currentChangelogs.map((changelog, index) => (
            <ChangelogEntry
              key={`${changelog.version}-${index}`}
              item={changelog}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pt-12 max-w-2xl mx-auto w-full">
            <div className={`grid gap-4 ${currentPage > 1 && currentPage < totalPages ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                {/* Newer Posts */}
                {currentPage > 1 && (
                     <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="group flex flex-col items-start justify-center text-left bg-secondary hover:bg-secondary/80 border border-border/50 rounded-sm px-4 py-4 transition-all w-full"
                      >
                        <span className="text-xs text-muted-foreground mb-1.5 group-hover:text-foreground transition-colors">&larr; Previous</span>
                        <span className="text-base text-foreground tracking-tight">Newer posts</span>
                     </button>
                )}

                {/* Older Posts */}
                {currentPage < totalPages && (
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className="group flex flex-col items-end justify-center text-right bg-secondary hover:bg-secondary/80 border border-border/50 rounded-sm px-4 py-4 transition-all w-full"
                    >
                      <span className="text-xs text-muted-foreground mb-1.5 group-hover:text-foreground transition-colors">Next &rarr;</span>
                      <span className="text-base text-foreground tracking-tight">Older posts</span>
                    </button>
                )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
