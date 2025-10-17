"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const defaultFaqs = [
  {
    question: "How does Invook pricing work?",
    answer:
      "Invook offers flexible pricing plans based on your usage needs. Contact us for detailed pricing information.",
  },
  {
    question: "Is Invook available on all platforms?",
    answer:
      "Yes, Invook is available on macOS and Windows with cross-platform support.",
  },
  {
    question: "Are there free trials or discounts available for Invook?",
    answer:
      "We offer a free trial period for new users. Educational and nonprofit discounts are also available.",
  },
  {
    question: "What languages does Invook support?",
    answer:
      "Invook supports multiple languages including English, Spanish, French, German, and more.",
  },
  {
    question: "Does Invook work offline?",
    answer:
      "Yes, all core features work completely offline with local processing for maximum privacy.",
  },
  {
    question: "Can I use Invook for technical documentation?",
    answer:
      "Absolutely! Invook understands technical terminology and can handle complex documentation needs.",
  },
  {
    question: "How secure is my data with Invook?",
    answer:
      "Your data is completely secure with end-to-end encryption and local processing. We never store your voice data.",
  },
];

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({ faqs = defaultFaqs, title = "Frequently Asked Questions", subtitle = "Your question not answered here?" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="p-6 sm:p-8 lg:p-12 py-20 sm:py-24 lg:py-28 relative border-t"
      style={{ borderColor: "#b0b0b0" }}
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side - Heading */}
        <div className="flex flex-col justify-center">
          <div className="text-base font-mono text-emerald-800 font-medium mb-2 tracking-wide">
            [FAQ]
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tighter tracking-tight">
            {title}
          </h2>

          <p className="text-gray-700 font-mono text-base mb-3">
            {subtitle}
          </p>

          <div>
            <Link href="/contact-us">
              <Button variant="emerald" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side - FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-base font-mono text-gray-900 pr-4 font-medium">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-600 font-mono text-base leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
