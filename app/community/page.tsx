import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
};

export default function CommunityPage() {
  return (
    <main>
      <div className="textured-beige-bg">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            {/* Hero Section */}
            <section
              className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 mt-28 overflow-hidden"
              style={{
                backgroundColor: "#b8d4c8",
              }}
            >
              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #a0c4b5 1px, transparent 1px),
                    linear-gradient(to bottom, #a0c4b5 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-700 mb-2 uppercase tracking-tight text-balance">
                  COMMUNITY
                </h1>
                <p className="text-base text-gray-900 font-mono max-w-2xl text-balance">
                  Join the Invook community to connect with other users, share
                  feedback, and stay updated on the latest developments.
                </p>
              </div>
            </section>

            {/* Community Links Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Discord */}
                <a
                  href="https://discord.gg/UqabBguBzk"
                  className="bg-gray-100/50 border border-gray-300 p-8 relative hover:shadow-lg transition-all duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

                  <div className="flex items-center gap-4 mb-4">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Discord
                    </h3>
                  </div>

                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    Join our Discord server to chat with other users, get
                    support, and share your experiences with Invook.
                  </p>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/channel/UCeuCsCIquUCHfRHTmmL-n4g"
                  className="bg-gray-100/50 border border-gray-300 p-8 relative hover:shadow-lg transition-all duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

                  <div className="flex items-center gap-4 mb-4">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-900">
                      YouTube
                    </h3>
                  </div>

                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    Watch tutorials, product demos, and updates on our YouTube
                    channel.
                  </p>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/thinking-sound-lab-25"
                  className="bg-gray-100/50 border border-gray-300 p-8 relative hover:shadow-lg transition-all duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

                  <div className="flex items-center gap-4 mb-4">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-900">
                      LinkedIn
                    </h3>
                  </div>

                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    Connect with us on LinkedIn for company updates and
                    professional insights.
                  </p>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/invook.ai?igsh=MW11Z2tpeXVsb2ljcg%3D%3D&utm_source=qr"
                  className="bg-gray-100/50 border border-gray-300 p-8 relative hover:shadow-lg transition-all duration-200 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

                  <div className="flex items-center gap-4 mb-4">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Instagram
                    </h3>
                  </div>

                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    Follow us on Instagram for behind-the-scenes content and
                    community highlights.
                  </p>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
