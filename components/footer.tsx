import Link from "next/link";

export function Footer() {
  return (
    <div className="textured-beige-bg">
      <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
        <div className="stitched-border">
          <footer
            className="p-6 sm:p-8 lg:p-12 py-8 sm:py-10 lg:py-12 relative border-t"
            style={{ borderColor: "#b0b0b0" }}
          >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
              {/* Left Side - Logo */}
              <div className="flex flex-col">
                <div>
                  <span className="text-2xl font-medium text-emerald-700">
                    Invook
                  </span>
                </div>
              </div>

              {/* Right Side - Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
                {/* Product Column */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-6">
                    Product
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/pricing"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/use-cases"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Use cases
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/downloads"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Downloads
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Students
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company Column */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-6">
                    Company
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/about"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/career"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Terms
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Resources Column */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-6">
                    Resources
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/getting-started"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Getting Started
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Community
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/changelog"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Changelog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/help-center"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Help Center
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Socials and Copyright - Bottom */}
            <div className="mt-12 lg:mt-16">
              <h3 className="text-xs font-mono font-medium text-gray-700 mb-4 tracking-wider">
                SOCIALS
              </h3>
              <div className="flex gap-4 mb-8">
                <Link
                  href="#"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    />
                    <circle
                      cx="4"
                      cy="4"
                      r="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M23 7.5l-9 6-9-6M23 7.5v9c0 1.5-1 2.5-2.5 2.5h-17C2 19 1 18 1 16.5v-9C1 6 2 5 3.5 5h17C22 5 23 6 23 7.5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l-5 3v-5l5 2zM15 12l5 3v-5l-5 2z"
                    />
                  </svg>
                </Link>
              </div>
              <p className="text-xs text-gray-600 font-mono">
                © 2025 Thinking Sound Lab.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
