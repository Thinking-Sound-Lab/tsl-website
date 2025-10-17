"use client";

export default function CommunityPage() {
  return (
    <main>
      <div className="textured-beige-bg min-h-screen">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border min-h-screen">
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
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 pb-32 sm:pb-40 lg:pb-48">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Discord */}
                <a
                  href="#"
                  className="bg-gray-100/50 border border-gray-300 p-8 relative hover:shadow-lg transition-all duration-200 group"
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

                {/* Reddit */}
                <a
                  href="#"
                  className="bg-gray-100/50 border border-gray-300 p-8 relative hover:shadow-lg transition-all duration-200 group"
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
                      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                    </svg>
                    <h3 className="text-2xl font-bold text-gray-900">Reddit</h3>
                  </div>

                  <p className="text-gray-700 font-mono text-sm leading-relaxed">
                    Join our subreddit to discuss features, share tips, and
                    connect with fellow Invook users.
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
