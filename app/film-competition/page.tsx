import { FAQSection } from "@/components/faq-section";
import pageData from "./data.json";
import { CompetitionPageTracker, CompetitionSubmitButton } from "./competition-analytics";

export const metadata = {
  title: "Invook AI Film Competition",
  description: "Epic Scene Challenge. Create Your Masterpiece using Invook.",
};

export default function FilmCompetitionPage() {
  const { hero, mastering, eligibility, requirements, rules, prohibited, prize, faqs } = pageData;

  // Helper component for rendering strong tags in rules
  const renderRuleText = (text: string) => {
    if (text.startsWith("**")) {
      const parts = text.split("**"); // ['', 'How to enter:', ' All entries...']
      return (
        <>
          <strong>{parts[1]}</strong>{parts[2]}
        </>
      );
    }
    return <span>{text}</span>;
  };

  return (
    <div className="min-h-screen bg-background font-sans pb-20">
      <CompetitionPageTracker />
      <main className="pt-28">
        {/* Full-width Header Media */}
        <div className="w-full relative fade-in">
          {hero.media.endsWith('.mp4') ? (
            <video 
              autoPlay 
              muted 
              playsInline 
              src={hero.media} 
              className="w-full h-auto max-h-[85vh] object-cover object-center"
            />
          ) : (
            <img 
              src={hero.media} 
              alt="Invook AI Film Competition - Epic Scene Challenge"
              className="w-full h-auto max-h-[85vh] object-cover object-center"
            />
          )}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] mt-16 md:mt-24">
          <div className="space-y-24 md:space-y-32 slide-up">
            
            {/* Intro */}
            <section className="text-center space-y-6">
               <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-tight">
                 {hero.title}
               </h1>
               <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                 {hero.description}
               </p>
               <div className="pt-4">
                 <CompetitionSubmitButton text={hero.buttonText} />
               </div>
            </section>



            {/* Two Column Section */}
            <div className="grid md:grid-cols-2 gap-8">
               {/* Eligibility */}
               <section className="space-y-6">
                 <h2 className="text-2xl font-medium tracking-tight text-foreground">{eligibility.title}</h2>
                 <ul className="space-y-3 text-muted-foreground text-sm">
                   {eligibility.items.map((item, idx) => (
                     <li key={idx} className="flex items-start">
                       <span className="mr-3 text-primary font-medium tracking-tight">•</span> 
                       {item}
                     </li>
                   ))}
                 </ul>
               </section>

               {/* Content Requirements */}
               <section className="space-y-6">
                 <h2 className="text-2xl font-medium tracking-tight text-foreground">{requirements.title}</h2>
                 <ul className="space-y-3 text-muted-foreground text-sm">
                   {requirements.items.map((item, idx) => (
                     <li key={idx} className="flex items-start">
                       <span className="mr-3 text-primary font-medium tracking-tight">•</span> 
                       {item.label ? (
                         <><strong>{item.label}</strong><span className="ml-1">{item.value}</span></>
                       ) : (
                         <span>{item.value}</span>
                       )}
                     </li>
                   ))}
                 </ul>
               </section>
            </div>

            {/* Prohibited Content & Submission Rules */}
            <div className="grid md:grid-cols-2 gap-8">
              <section className="space-y-6">
                 <h2 className="text-2xl font-medium tracking-tight text-foreground">{rules.title}</h2>
                 <ul className="space-y-4 text-muted-foreground text-sm">
                   {rules.items.map((item, idx) => (
                     <li key={idx} className="flex items-start">
                       <span className="mr-3 text-primary font-medium tracking-tight">{idx + 1}.</span> 
                       <span>{renderRuleText(item)}</span>
                     </li>
                   ))}
                 </ul>
              </section>

              <section className="space-y-6">
                 <h2 className="text-2xl font-medium tracking-tight text-destructive">{prohibited.title}</h2>
                 <ul className="space-y-3 text-muted-foreground text-sm">
                   {prohibited.items.map((item, idx) => (
                     <li key={idx} className="flex items-start">
                       <span className="mr-3 text-destructive font-medium tracking-tight">✕</span> 
                       {item}
                     </li>
                   ))}
                 </ul>
              </section>
            </div>

            {/* Prize & Judging Criteria */}
            <section className="bg-card rounded-lg p-6 md:p-8 border border-border shadow-sm mt-8">
               <div className="text-center mb-8">
                 <h2 className="text-3xl font-medium tracking-tight text-foreground mb-3">{prize.title}</h2>
                 <p className="text-lg text-primary font-medium tracking-tight" dangerouslySetInnerHTML={{ __html: prize.subtitle }} />
                 <p className="mt-2 text-sm text-muted-foreground">{prize.judgingNote}</p>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse bg-background rounded-lg border border-border overflow-hidden text-sm">
                   <thead>
                     <tr className="bg-muted border-b border-border">
                       <th className="py-3 px-4 font-medium tracking-tight text-foreground">Criteria</th>
                       <th className="py-3 px-4 font-medium tracking-tight text-foreground w-20">Weight</th>
                       <th className="py-3 px-4 font-medium tracking-tight text-foreground">What the Judges Want to See</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border">
                     {prize.criteria.map((criteria, idx) => (
                       <tr key={idx} className={`hover:bg-muted/50 transition-colors ${idx % 2 !== 0 ? 'bg-muted/20' : ''}`}>
                         <td className="py-3 px-4 font-medium tracking-tight text-foreground">{criteria.name}</td>
                         <td className="py-3 px-4 font-medium tracking-tight text-primary">{criteria.weight}</td>
                         <td className="py-3 px-4 text-muted-foreground">{criteria.description}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </section>

            
            {/* FAQ Section has been moved INSIDE the max-w-5xl container to match side margins */}
            <FAQSection 
              faqs={faqs.items} 
              title={faqs.title} 
              subtitle={faqs.subtitle} 
            />

          </div>
        </div>
      </main>
    </div>
  );
}
