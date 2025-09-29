export function Benefits() {
  const benefits = [
    {
      tag: "VOICE TO TEXT",
      title: "Translation",
      description:
        "Convert voice to text in multiple languages with advanced AI technology for seamless communication.",
      arrow: (
        <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ),
      mockup: (
        <div className="mt-6 p-4 bg-gray-100/80 border border-gray-200 text-xs font-mono">
          <div className="text-gray-500 mb-2">voice_input.wav</div>
          <div className="text-gray-800">
            &ldquo;Hello, can you translate this to Spanish?&rdquo;
          </div>
          <div className="mt-2 text-emerald-600">
            → &ldquo;Hola, ¿puedes traducir esto al español?&rdquo;
          </div>
        </div>
      ),
    },
    {
      tag: "SMART EDITING",
      title: "Auto Edits",
      description:
        "Intelligent editing suggestions that align with your writing style and automatically improve your content.",
      arrow: (
        <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ),
      mockup: (
        <div className="mt-6 p-4 bg-gray-100/80 border border-gray-200 text-xs font-mono">
          <div className="text-gray-500 mb-2">document.txt</div>
          <div className="text-red-500 line-through">
            This code could allow attackers to link malicious accounts.
          </div>
          <div className="text-emerald-600 mt-1">
            ✓ This code might allow attackers to link malicious accounts.
          </div>
          <div className="text-gray-600 mt-2">
            Auto-corrected grammar and tone
          </div>
        </div>
      ),
    },
    {
      tag: "AI SEARCH",
      title: "Context Aware Search",
      description:
        "Search through your voice notes and documents with AI that understands context and meaning.",
      arrow: (
        <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ),
      mockup: (
        <div className="mt-6 p-4 bg-gray-100/80 border border-gray-200 text-xs font-mono">
          <div className="text-gray-500 mb-2">Search: &ldquo;security issues&rdquo;</div>
          <div className="space-y-2">
            <div className="text-gray-800">
              auth.tsx:94 - malicious accounts
            </div>
            <div className="text-gray-800">
              validation.js:23 - input sanitization
            </div>
            <div className="text-gray-800">
              security.md:15 - vulnerability notes
            </div>
          </div>
        </div>
      ),
    },
    {
      tag: "PERSONALIZATION",
      title: "Custom Vocabulary",
      description:
        "Train the AI to understand your specific terminology, jargon, and personal speaking patterns.",
      arrow: (
        <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ),
      mockup: (
        <div className="mt-6 p-4 bg-gray-100/80 border border-gray-200 text-xs font-mono">
          <div className="text-gray-500 mb-2">Custom Terms</div>
          <div className="space-y-1">
            <div className="text-gray-800">• &ldquo;griptile&rdquo; → &ldquo;Greptile&rdquo;</div>
            <div className="text-gray-800">
              • &ldquo;API keys&rdquo; → &ldquo;authentication tokens&rdquo;
            </div>
            <div className="text-gray-800">• &ldquo;dev ops&rdquo; → &ldquo;DevOps&rdquo;</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="p-4 sm:p-6 md:p-8 lg:p-16">
        {/* Heading Section */}
        <div className="text-left mb-8 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black tracking-tight mb-2">
            Your second partner
          </h2>
          <p className="text-base font-mono text-black/80 max-w-2xl leading-relaxed">
            AI-powered features that understand your workflow and help you work
            faster and smarter
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative border bg-white/50 transition-colors duration-200 p-6 sm:p-8"
              style={{ borderColor: "#b0b0b0" }}
            >
              {/* Tag */}
              <div className="text-xs font-mono text-emerald-600 font-medium mb-2 tracking-wide">
                [{benefit.tag}]
              </div>

              {/* Arrow */}
              {benefit.arrow}

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 font-mono">
                {benefit.description}
              </p>

              {/* Mockup */}
              {benefit.mockup}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
