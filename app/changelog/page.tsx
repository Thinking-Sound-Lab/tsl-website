"use client";

import { useState } from "react";
import { changelogData, ChangelogItem } from "./data";

const ITEMS_PER_PAGE = 5;

const ChangeTypeBadge = ({ type }: { type: string }) => {
  const colors = {
    feature: "bg-emerald-700/10 text-emerald-700 border-emerald-700/30",
    improvement: "bg-blue-700/10 text-blue-700 border-blue-700/30",
    bugfix: "bg-orange-700/10 text-orange-700 border-orange-700/30",
    note: "bg-purple-700/10 text-purple-700 border-purple-700/30",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-mono uppercase border ${
        colors[type as keyof typeof colors]
      }`}
    >
      {type}
    </span>
  );
};

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChangelogCard = ({ changelog }: { changelog: ChangelogItem }) => {
  // Group changes by type
  const groupedChanges = changelog.changes.reduce((acc, change) => {
    if (!acc[change.type]) {
      acc[change.type] = [];
    }
    acc[change.type].push(change);
    return acc;
  }, {} as Record<string, typeof changelog.changes>);

  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.keys(groupedChanges).reduce((acc, type) => ({ ...acc, [type]: true }), {})
  );

  const toggleSection = (type: string) => {
    setExpandedSections(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const typeLabels = {
    feature: "Features",
    improvement: "Improvements",
    bugfix: "Bug Fixes",
    note: "Notes",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 lg:gap-12">
      {/* Left Side - Version & Date */}
      <div className="lg:sticky lg:top-32 lg:self-start">
        <div className="bg-gray-100/50 border border-gray-300 p-6 relative">
          {/* Corner squares */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

          <div className="text-3xl font-bold text-emerald-700 mb-2">
            v{changelog.version}
          </div>
          <div className="text-sm font-mono text-gray-600">
            {changelog.date}
          </div>
        </div>
      </div>

      {/* Right Side - Unified Changes Card */}
      <div className="bg-gray-100/50 border border-gray-300 relative">
        {/* Corner squares */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

        <div className="divide-y divide-gray-300">
          {Object.entries(groupedChanges).map(([type, changes]) => (
            <div key={type} className="p-6 sm:p-8">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(type)}
                className="w-full flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {typeLabels[type as keyof typeof typeLabels]} ({changes.length})
                  </h3>
                </div>
                <ChevronIcon isOpen={expandedSections[type]} />
              </button>

              {/* Section Content */}
              {expandedSections[type] && (
                <div className="mt-6 space-y-6">
                  {changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="space-y-3">
                      <div className="mb-2">
                        <ChangeTypeBadge type={change.type} />
                      </div>

                      <h4 className="text-lg font-bold text-gray-900">
                        {change.title}
                      </h4>

                      <p className="text-gray-700 font-mono text-sm leading-relaxed">
                        {change.description}
                      </p>

                      {/* Image support */}
                      {change.image && (
                        <div className="mt-4">
                          <img
                            src={change.image}
                            alt={change.title}
                            className="w-full border border-gray-300"
                          />
                        </div>
                      )}

                      {/* GIF support */}
                      {change.gif && (
                        <div className="mt-4">
                          <img
                            src={change.gif}
                            alt={change.title}
                            className="w-full border border-gray-300"
                          />
                        </div>
                      )}

                      {/* Divider between changes (not after last one) */}
                      {changeIndex < changes.length - 1 && (
                        <div className="pt-6 border-b border-gray-300/50"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ChangelogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(changelogData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentChangelogs = changelogData.slice(startIndex, endIndex);

  return (
    <main>
      <div className="textured-beige-bg min-h-screen">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            {/* Hero Section */}
            <section className="bg-white/50 py-28 px-4 sm:px-8 lg:px-12 text-center mt-28">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-emerald-700 tracking-tight text-pretty">
                CHANGELOG
              </h1>
              <p className="text-base sm:text-lg text-gray-700 font-mono leading-relaxed mt-4 max-w-2xl mx-auto">
                Track all updates, improvements, and new features in Invook
              </p>
            </section>

            {/* Changelog Items */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
              <div className="space-y-12">
                {currentChangelogs.map((changelog, index) => (
                  <ChangelogCard
                    key={`${changelog.version}-${index}`}
                    changelog={changelog}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 bg-gray-100/50 text-gray-700 font-mono text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 border font-mono text-sm transition-colors ${
                              currentPage === page
                                ? "bg-emerald-700 text-white border-emerald-700"
                                : "bg-gray-100/50 text-gray-700 border-gray-300 hover:bg-gray-200"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 bg-gray-100/50 text-gray-700 font-mono text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
