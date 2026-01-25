"use client";


interface PersonaCardProps {
  title: string;
  description: string;
}

function PersonaCard({ title, description }: PersonaCardProps) {
  return (
    <div className="bg-secondary rounded-sm p-4 border border-border/50 flex flex-col gap-4">
      <div>
        <h3 className="text-[15px] lg:text-[16px] text-foreground mb-1 font-medium">{title}</h3>
        <p className="text-[15px] lg:text-[16px] text-muted-foreground tracking-tight text-balance leading-relaxed">
          {description}
        </p>
      </div>

    </div>
  );
}

export function WhoIsInvookFor() {
  const personas = [
    {
      title: "Teams",
      description: "Collaborate on shared knowledge bases and research. Keep everyone aligned with a single source of truth.",
    },
    {
      title: "Writers",
      description: "Organize characters, plotlines, and research in one place. Contextual search brings back details instantly.",
    },
    {
      title: "Filmmakers",
      description: "Storyboards, scripts, and production notes side-by-side. Visual search makes finding location shots effortless.",
    },
    {
      title: "Designers",
      description: "Moodboards and assets living together. Canvas allows for infinite visual exploration and connection.",
    },
    {
      title: "Creators",
      description: "Manage content calendars, scripts, and assets. Streamline your production workflow from idea to upload.",
    },
    {
      title: "Students",
      description: "Lectures, notes, and papers interconnected. Deep search helps you find that one specific citation.",
    },
  ];

  return (
    <section className="bg-background overflow-hidden">
        <div className="flex flex-col items-start max-w-2xl mb-10">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4 tracking-tight">
            Powerful, yet intuitive
          </h2>
          <p className="text-lg text-muted-foreground tracking-tight text-balance">
            Standardize your creative process with tools designed for focus and speed. From individual creators to enterprise teams, Invook adapts to how you work.
          </p>
        </div>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {personas.map((persona, index) => (
            <PersonaCard
              key={index}
              title={persona.title}
              description={persona.description}
            />
          ))}
        </div>
    </section>
  );
}
