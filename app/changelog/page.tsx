"use client";

import { useState } from "react";
import Image from "next/image";
import { changelogData, ChangelogItem } from "./data";

const ITEMS_PER_PAGE = 5;

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

  // Enforce section order
  const SECTION_ORDER = ["feature", "improvement", "bugfix", "note"];

  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.keys(groupedChanges).reduce(
      (acc, type) => ({ ...acc, [type]: false }),
      {}
    )
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
        <div className="p-6 bg-white rounded-xl">
          <div className="text-3xl font-bold text-emerald-700 mb-2">
            v{changelog.version}
          </div>
          <div className="text-sm font-mono text-gray-600">
            {changelog.date}
          </div>
        </div>
      </div>

      {/* Right Side - Unified Changes Card */}
      <div className="bg-white rounded-xl">
        {/* Release summary */}
        <div className="p-6 sm:p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {changelog.summaryTitle}
          </h2>

          <p className="mt-3 text-gray-700 font-mono text-sm leading-relaxed max-w-2xl">
            {changelog.summaryBody}
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {SECTION_ORDER.filter(type => groupedChanges[type]).map((type) => {
            const changes = groupedChanges[type];
            return (
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
                        <h4 className="text-lg font-bold text-gray-900">
                          {change.title}
                        </h4>

                        <p className="text-gray-700 font-mono text-sm leading-relaxed">
                          {change.description}
                        </p>

                        {/* Image support */}
                        {change.image && (
                          <div className="mt-4">
                            <Image
                              src={change.image}
                              alt={change.title}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full h-auto border border-gray-300"
                            />
                          </div>
                        )}

                        {/* GIF support */}
                        {change.gif && (
                          <div className="mt-4">
                            <Image
                              src={change.gif}
                              alt={change.title}
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="w-full h-auto border border-gray-300"
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
            );
          })}
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
      <div className="min-h-screen bg-[#f7f7f5]">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="py-28 px-4 sm:px-8 lg:px-12 text-center mt-28">
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
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 bg-gray-100 text-gray-700 font-mono text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                          className={`w-10 h-10 border font-mono text-sm transition-colors ${currentPage === page
                            ? "bg-emerald-700 text-white border-emerald-700"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
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
                    className="px-4 py-2 border border-gray-200 bg-gray-100 text-gray-700 font-mono text-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}