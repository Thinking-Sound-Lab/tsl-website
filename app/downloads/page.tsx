"use client";

export default function DownloadsPage() {
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
                  GET INVOOK TODAY
                </h1>
                <p className="text-base text-gray-900 font-mono max-w-2xl text-balance">
                  Download Invook for your platform
                </p>
              </div>
            </section>

            {/* Download Sections */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 pb-32 sm:pb-40 lg:pb-48">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Mac Section */}
                <div className="bg-gray-100/50 border border-gray-300 p-8 relative">
                  {/* Corner squares */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

                  <div className="flex items-center gap-4 mb-8">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="text-3xl font-bold text-gray-900">Mac</h3>
                  </div>

                  {/* macOS Download Button */}
                  <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-5 px-6 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-base font-semibold">macOS</div>
                        <div className="text-sm text-emerald-100">
                          Version 10.14+
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Windows Section */}
                <div className="bg-gray-100/50 border border-gray-300 p-8 relative">
                  {/* Corner squares */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

                  <div className="flex items-center gap-4 mb-8">
                    <svg
                      className="w-12 h-12 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                    <h3 className="text-3xl font-bold text-gray-900">
                      Windows
                    </h3>
                  </div>

                  {/* Windows Download Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-5 px-4 transition-colors duration-200">
                      <div className="text-left">
                        <div className="text-base font-semibold mb-1">.exe</div>
                        <div className="text-xs text-emerald-100">
                          Windows 11/10 x64
                        </div>
                      </div>
                    </button>

                    <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-5 px-4 transition-colors duration-200">
                      <div className="text-left">
                        <div className="text-base font-semibold mb-1">.exe</div>
                        <div className="text-xs text-emerald-100">
                          Windows 11/10 ARM64
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
