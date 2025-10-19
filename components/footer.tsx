import Link from "next/link";

export function Footer() {
  return (
    <div className="textured-beige-bg">
      <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
        <div className="stitched-border">
          <footer className="p-6 sm:p-8 lg:p-12 py-8 sm:py-10 lg:py-12 relative border-t border-gray-300">
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
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    Product
                  </h3>
                  <ul className="space-y-2">
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
                  </ul>
                </div>

                {/* Company Column */}
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    Company
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="https://invook.notion.site/About-2917f199308b8035a4efc8204a1293f9?source=copy_link"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://invook.notion.site/Careers-2917f199308b80aead5dfb1c2d6142dd?source=copy_link"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://invook.notion.site/Terms-of-Use-2917f199308b8085ae78ce56ba9fd0b3?source=copy_link"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Terms of use
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://invook.notion.site/Privacy-Policy-2917f199308b806bae6bd0588ac8c2c2?source=copy_link"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Privacy Policy
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
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    Resources
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="https://invook.notion.site/Getting-Started-28f7f199308b80658fc8f2e93ec90087?source=copy_link"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Getting Started
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/community"
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
                        href="https://invook.notion.site/Public-Invook-2917f199308b80da8923e91ff857e08d?source=copy_link"
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
            <div className="mt-8 lg:mt-10">
              <h3 className="text-xs font-mono font-medium text-gray-700 mb-4 tracking-wider">
                SOCIALS
              </h3>
              <div className="flex gap-4 mb-8">
                <Link
                  href="#"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="h-5 w-5 "
                  >
                    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="h-5 w-5 "
                  >
                    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="h-5 w-5"
                  >
                    <path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z"></path>
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
