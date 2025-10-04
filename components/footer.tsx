import Link from "next/link";

export function Footer() {
  return (
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
            <h3 className="text-base font-bold text-gray-900 mb-6">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                >
                  Docs <span className="text-xs">↗</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
                >
                  API <span className="text-xs">↗</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Security
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
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Enterprise
                </Link>
              </li>
              <li>
                <Link
                  href="#"
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
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
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
                  Tutorials
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
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
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
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-emerald-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-emerald-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-emerald-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5.372 4.648A2.023 2.023 0 0 1 3.35 2.626 2.023 2.023 0 0 1 5.372.604a2.023 2.023 0 0 1 2.023 2.022 2.023 2.023 0 0 1-2.023 2.022zm13.556 0h-.009c-.884 0-1.6-.716-1.6-1.6v-.871c0-.884.716-1.6 1.6-1.6h.009c.884 0 1.6.716 1.6 1.6v.871c0 .884-.716 1.6-1.6 1.6zm2.72 0c-.88 0-1.593-.717-1.593-1.6v-.871c0-.884.713-1.6 1.593-1.6.88 0 1.593.716 1.593 1.6v.871c0 .883-.713 1.6-1.593 1.6z" />
            </svg>
          </Link>
        </div>
        <p className="text-xs text-gray-600 font-mono">
          © 2025 Thinking Sound Lab.
        </p>
      </div>
    </footer>
  );
}
