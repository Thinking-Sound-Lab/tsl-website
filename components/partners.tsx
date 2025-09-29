export function Partners() {
  const partners = [
    {
      name: "Perplexity",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16"
            cy="16"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="16" cy="16" r="6" fill="currentColor" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            perplexity
          </text>
        </svg>
      ),
    },
    {
      name: "Figma",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 120 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="8" width="8" height="16" rx="4" fill="currentColor" />
          <rect x="20" y="8" width="8" height="8" rx="4" fill="currentColor" />
          <rect x="20" y="20" width="8" height="8" rx="4" fill="currentColor" />
          <circle cx="36" cy="16" r="4" fill="currentColor" />
          <circle cx="48" cy="16" r="4" fill="currentColor" />
          <text x="60" y="20" className="font-mono text-sm" fill="currentColor">
            figma
          </text>
        </svg>
      ),
    },
    {
      name: "Lovable",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 8l8 8-8 8-8-8 8-8zm0 4l-4 4 4 4 4-4-4-4z" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            lovable
          </text>
        </svg>
      ),
    },
    {
      name: "OpenAI",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16"
            cy="16"
            r="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="16" cy="16" r="5" fill="currentColor" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            openai
          </text>
        </svg>
      ),
    },
    {
      name: "Notion",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 8h16v16H8V8zm2 2v12h12V10H10z" />
          <path d="M12 12h8v2h-8zM12 16h8v2h-8zM12 20h6v2h-6z" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            notion
          </text>
        </svg>
      ),
    },
    {
      name: "Linear",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 24L24 8M8 8h16v16" />
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            d="M8 24L24 8M8 8h16v16"
          />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            linear
          </text>
        </svg>
      ),
    },
    {
      name: "Stripe",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 12h16v8H8z" fill="currentColor" />
          <path d="M8 12l8-4 8 4v8l-8 4-8-4v-8z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            stripe
          </text>
        </svg>
      ),
    },
    {
      name: "Vercel",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 8l8 16H8l8-16z" fill="currentColor" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            vercel
          </text>
        </svg>
      ),
    },
    {
      name: "GitHub",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="8" fill="currentColor" />
          <circle cx="10" cy="22" r="2" fill="currentColor" />
          <circle cx="22" cy="22" r="2" fill="currentColor" />
          <circle cx="16" cy="26" r="1" fill="currentColor" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            github
          </text>
        </svg>
      ),
    },
    {
      name: "Slack",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="8" width="4" height="16" rx="2" fill="currentColor" />
          <rect x="16" y="12" width="4" height="8" rx="2" fill="currentColor" />
          <rect x="24" y="8" width="4" height="16" rx="2" fill="currentColor" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            slack
          </text>
        </svg>
      ),
    },
    {
      name: "Discord",
      logo: (
        <svg
          className="w-36 h-12 fill-current"
          viewBox="0 0 140 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 12h16v12H8z" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
          <circle cx="20" cy="16" r="1.5" fill="currentColor" />
          <path d="M10 20h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <text x="40" y="20" className="font-mono text-sm" fill="currentColor">
            discord
          </text>
        </svg>
      ),
    },
  ];

  return (
    <section>
      {/* Content area without container or border */}
      <div className="">
        {/* Heading with reduced spacing */}
        <div className="text-center p-2 sm:p-4 md:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-medium font-mono text-emerald-700 tracking-tight text-pretty">
            Used by professionals everywhere to speed up their thoughts
          </h2>
        </div>

        {/* Partner Grid with stitched sides and solid top border only */}
        <div
          className="border-t py-6 sm:py-8"
          style={{ borderTopColor: "#b0b0b0" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 lg:gap-x-12 lg:gap-y-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 grayscale hover:grayscale-0"
              >
                <div className="text-gray-500 hover:text-gray-700 transition-colors">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
