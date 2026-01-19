import Link from "next/link";
import Image from "next/image";

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
                  <Image
                    src="/svgs/web_logo.svg"
                    alt="Invook"
                    width={0}
                    height={0}
                    style={{ height: '1.5rem', width: 'auto' }}
                    className="h-6 w-auto"
                  />
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
                        href="/use-cases"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Use cases
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        href="/downloads"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Downloads
                      </Link>
                    </li> */}
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
                      <a
                        href="mailto:support@thinkingsoundlab.com"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                      >
                        Contact Us
                      </a>
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
                    <li>
                      <Link
                        href="/llm.txt"
                        className="text-sm font-mono text-gray-700 hover:text-emerald-700 transition-colors"
                        target="_blank"
                      >
                        llm.txt
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
              <div className="flex gap-4 mb-8 items-center">
                <Link
                  href="https://discord.gg/UqabBguBzk"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </Link>
                <Link
                  href="https://linkedin.com/company/thinking-sound-lab-25"
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
                  href="https://www.youtube.com/channel/UCeuCsCIquUCHfRHTmmL-n4g"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
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
                <Link
                  href="https://www.instagram.com/invook.ai?igsh=MW11Z2tpeXVsb2ljcg%3D%3D&utm_source=qr"
                  className="text-gray-700 hover:text-emerald-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
              </div>
              <p className="text-xs text-gray-600 font-mono">
                © 2025 Thinking Sound Lab. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
