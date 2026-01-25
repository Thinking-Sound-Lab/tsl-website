"use client";

const testimonials = [
  {
    quote:
      "The AI Drive has completely changed how I organize my research. I can dump everything in, and the semantic search finds connections I missed.",
    name: "Sarah Chen",
    title: "Product Manager",
    company: "Amazon",
    image: "/assets/avatar-placeholder.png", 
  },
  {
    quote:
      "Canvas is exactly what I needed. Being able to visually map out my codebase and documentation side-by-side with AI assistance is a game changer.",
    name: "Nishant Raj",
    title: "Software Engineer",
    company: "Amazon",
    image: "/assets/avatar-placeholder.png", 
  },
  {
    quote:
      "Finally a workspace that understands my context. I use the Drive to store my design assets and the AI helps me retrieve them by description instantly.",
    name: "Abhishek Sharma",
    title: "Design Lead",
    company: "Figma",
    image: "/assets/avatar-placeholder.png", 
  },
  {
    quote:
      "The flow between the Drive and Canvas is seamless. I gather inspiration in the Drive and then restructure it into actionable plans on the Canvas.",
    name: "Shashank Raj",
    title: "Tech Lead",
    company: "Notion",
    image: "/assets/avatar-placeholder.png", 
  },
  {
    quote:
      "I stopped worrying about folder structures. I just throw everything into the Drive and let the AI handle the organization. It's freedom.",
    name: "Emily Watson",
    title: "Engineering Lead",
    company: "InnovateLabs",
    image: "/assets/avatar-placeholder.png", 
  },
  {
    quote:
      "Visualizing my writing process on the Canvas has made me so much faster. It's the perfect blend of structure and flexibility.",
    name: "David Park",
    title: "Content Strategist",
    company: "MediaCorp",
    image: "/assets/avatar-placeholder.png", 
  },
];

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  image?: string;
}

function TestimonialCard({ quote, name, title, company }: TestimonialCardProps) {
  return (
    <div className="bg-secondary rounded-xl p-8 flex flex-col justify-between h-full min-h-[280px]">
        <p className="text-secondary-foreground/90 text-[14px] md:text-[16px] leading-relaxed font-normal">
          {quote}
        </p>
      
      <div className="flex items-center gap-3 mt-8">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden relative">
             <div className="w-full h-full bg-zinc-700 flex items-center justify-center text-xs text-white">
                {name.charAt(0)}
             </div>
        </div>
        <div className="flex flex-col">
          <span className="text-foreground font-medium text-[14px]">{name}</span>
          <span className="text-muted-foreground text-[14px]">{title}, {company}</span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-[1216px] px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-medium text-center text-foreground mb-16 tracking-tight">
          The super creative workflow
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
