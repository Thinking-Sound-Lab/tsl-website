"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQ {
  question: string;
  answer: React.ReactNode;
}

const defaultFaqs: FAQ[] = [
  {
    question: "How does Invook pricing work?",
    answer: "Invook offers free and pro pricing plans. Pro is $15 per month. Student get 50% discount. Contact us for more information.",
  },
  {
    question: "Is Invook available on all platforms?",
    answer: "Yes, Invook is available on macOS and Windows with cross-platform support.",
  },
  {
    question: "Are there free trials or discounts available for Invook?",
    answer: "We offer a free trial period for new users. Student discounts are also available.",
  },
  {
    question: "What languages does Invook support?",
    answer: "Invook supports 100+ languages.",
  },
  {
    question: "Does Invook work offline?",
    answer: "No, Invook requires an internet connection to function.",
  },
  {
    question: "Can I use Invook for technical documentation?",
    answer: "Absolutely! Invook can generate text from audio. It also works with text editor, docs, notes, and more.",
  },
  {
    question: "How secure is my data with Invook?",
    answer: "Your data is completely secure with end-to-end encryption and at rest or in transit.",
  },
];

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  faqs = defaultFaqs,
  title = "Questions & Answers",
  subtitle,
}: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-16 mt-16 border-t border-border/50">
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-x-40 gap-y-12">
        <div>
          <h2 className="text-[33px] lg:text-[36px] font-medium text-foreground tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-muted-foreground text-[14px] leading-relaxed pr-8">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border/50">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left text-[14px] text-foreground font-medium hover:text-foreground/80 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === i ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="text-[14px] text-foreground/70 leading-relaxed pr-8">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
