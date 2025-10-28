const testimonials = [
  {
    quote:
      "Using Invook has completely transformed how I work. The voice-to-text accuracy is incredible, and it saves me hours every day.",
    name: "Sarah Chen",
    title: "Product Manager",
    company: "Amazon",
    companyLogo: "🏢",
    gender: "female",
  },
  {
    quote:
      "The AI-powered dictation is so accurate that I rarely need to make corrections. It understands context and technical terms perfectly.",
    name: "Nishant Raj",
    title: "Software Engineer",
    company: "Amazon",
    companyLogo: "💻",
    gender: "male",
  },
  //   {
  //     quote:
  //       "Invook helps our team work faster. The screen analysis feature is a game-changer for our workflow.",
  //     name: "Emily Watson",
  //     title: "Engineering Lead",
  //     company: "InnovateLabs",
  //     companyLogo: "⚡",
  //     gender: "female",
  //   },
  {
    quote:
      "I'm impressed by how well it handles multiple languages and technical jargon. It's become an essential tool for my global work.",
    name: "Shashank Raj",
    title: "Tech Lead",
    company: "Notion",
    companyLogo: "🌍",
    gender: "male",
  },
  //   {
  //     quote:
  //       "The privacy-first approach gives us peace of mind. All processing happens locally, which is crucial for our compliance requirements.",
  //     name: "Jennifer Lee",
  //     title: "Security Officer",
  //     company: "SecureData",
  //     companyLogo: "🔒",
  //     gender: "female",
  //   },
  {
    quote:
      "Invook has been the most reliable search tool I've used. It consistently delivers accurate results and the UI is intuitive.",
    name: "Abhishek Sharma",
    title: "Design Lead",
    company: "Figma",
    companyLogo: "🎨",
    gender: "male",
  },
];

const FaceAvatar = ({ gender }: { gender: string }) => {
  if (gender === "male") {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle
          cx="20"
          cy="20"
          r="19"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 32C8 26 12 24 20 24C28 24 32 26 32 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  } else {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle
          cx="20"
          cy="20"
          r="19"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="20" cy="16" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 32C8 26 12 24 20 24C28 24 32 26 32 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 12C14 12 16 10 20 10C24 10 26 12 26 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
};

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
            className="bg-gray-100/50 border border-gray-300 p-6 flex flex-col justify-between relative"
          >
            {/* Corner squares */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-gray-400"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-gray-400"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-gray-400"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-gray-400"></div>

            <div>
              <p className="text-gray-700 font-mono text-sm leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </p>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-gray-300 my-4"></div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-gray-600">
                  <FaceAvatar gender={testimonial.gender} />
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
