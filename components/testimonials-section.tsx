const testimonials = [
  {
    quote:
      "Using Invook has completely transformed how I work. The voice-to-text accuracy is incredible, and it saves me hours every day.",
    name: "Sarah Chen",
    title: "Product Manager",
    company: "TechCorp",
    avatar: "/avatars/sarah.jpg",
    companyLogo: "🏢",
  },
  {
    quote:
      "The AI-powered dictation is so accurate that I rarely need to make corrections. It understands context and technical terms perfectly.",
    name: "Michael Roberts",
    title: "Software Engineer",
    company: "DevTools Inc",
    avatar: "/avatars/michael.jpg",
    companyLogo: "💻",
  },
  {
    quote:
      "Invook helps our team work faster. The screen analysis feature is a game-changer for our workflow.",
    name: "Emily Watson",
    title: "Engineering Lead",
    company: "InnovateLabs",
    avatar: "/avatars/emily.jpg",
    companyLogo: "⚡",
  },
  {
    quote:
      "I'm impressed by how well it handles multiple languages and technical jargon. It's become an essential tool for our global team.",
    name: "David Park",
    title: "CTO",
    company: "GlobalTech",
    avatar: "/avatars/david.jpg",
    companyLogo: "🌍",
  },
  {
    quote:
      "The privacy-first approach gives us peace of mind. All processing happens locally, which is crucial for our compliance requirements.",
    name: "Jennifer Lee",
    title: "Security Officer",
    company: "SecureData",
    avatar: "/avatars/jennifer.jpg",
    companyLogo: "🔒",
  },
  {
    quote:
      "Invook has been the most reliable voice tool I've used. It consistently delivers accurate results and the UI is intuitive.",
    name: "Robert Kim",
    title: "Design Lead",
    company: "CreativeStudio",
    avatar: "/avatars/robert.jpg",
    companyLogo: "🎨",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="p-6 sm:p-8 lg:p-12 py-20 sm:py-24 lg:py-28 relative border-t"
      style={{ borderColor: "#b0b0b0" }}
    >
      <div className="text-center mb-12">
        <div className="text-base font-mono text-emerald-800 font-medium mb-2 tracking-wide">
          [TESTIMONIALS]
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-1 leading-tight tracking-tight">
          From Users That Use Invook
        </h2>

        <p className="text-gray-600 text-base leading-relaxed font-mono max-w-2xl mx-auto">
          See what people are saying about their experience with Invook
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-100/50 border border-gray-300 p-6 flex flex-col justify-between"
          >
            <p className="text-gray-700 font-mono text-sm leading-relaxed mb-6">
              &quot;{testimonial.quote}&quot;
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-600 font-mono">
                    {testimonial.title} • {testimonial.company}
                  </p>
                </div>
              </div>
              <div className="text-2xl">{testimonial.companyLogo}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
