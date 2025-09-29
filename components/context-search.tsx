export function ContextSearch() {
  return (
    <section className="bg-emerald-500/35 p-6 sm:p-8 lg:p-12 py-12 sm:py-12 lg:py-16 relative">
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center min-h-[200px]">
        {/* Left Side - Content (2 columns) - Vertically centered */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="text-xs font-mono text-emerald-700 font-medium mb-2 tracking-wide">
            [CONTEXT AWARE SEARCH]
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 leading-tight">
            AI Screen Analysis
          </h3>

          <p className="text-gray-700 text-sm leading-relaxed mb-6 font-mono">
            Ask questions about anything on your screen without copy-pasting. AI
            analyzes screen content and provides instant answers about what
            you&rsquo;re viewing.
          </p>
        </div>

        {/* Right Side - Example Box */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 p-4 text-xs font-mono rounded">
            <div className="text-gray-500 mb-2">
              Screen: Greptile.com - Full Codebase Context
            </div>
            <div className="space-y-2">
              <div className="text-gray-800">
                🎤 &ldquo;How many languages does this tool support?&rdquo;
              </div>
              <div className="text-emerald-600 mt-1">
                ➤ Based on screen content: 30+ languages supported
              </div>
              <div className="text-gray-600 mt-2">
                Analyzed screen • No copy-paste needed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
