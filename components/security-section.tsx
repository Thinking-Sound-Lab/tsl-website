"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const securityMessages = [
  {
    random: "XK9P2L7M#@T8O:*()ZQ4W3E5R6T7Y8U9I0PLKJ#@HGFD$%ASXC^&VBNM<>?:QWERT",
    real: "End-to-end encryption ensures your voice data is protected at all times with military-grade security",
  },
  {
    random: "QW5RT8YU@#MN3BV6CX7Z0PL9OK8IJ7UH6YG5TF4RD3ES2AZ1WQ0@#$%^&*()PLKJ",
    real: "Zero knowledge architecture means we never have access to your data or conversations",
  },
  {
    random: "MN3BV6CX@#ZX4CV7BN8ML0KI9JU8HY7TG6RF5ED4WS3AQ2@#$%^&*()ZXCVBN",
    real: "Local data processing keeps all your voice commands on your device for maximum privacy",
  },
  {
    random: "PL0KI9UY@#AS2DF5GH6JK7L8ZX9CV0BN1M2QW3ER4TY5UI6OP7@#$%^&*()ASDF",
    real: "No data storage on servers guarantees your information never leaves your control",
  },
  {
    random: "ZX4CV7BN@#QW2ER3TY4UI5OP6AS7DF8GH9JK0LZ1XC2VB3NM4@#$%^&*()QWER",
    real: "Privacy by design is built into every feature from the ground up for complete security",
  },
  {
    random: "AS2DF5GH@#PL3OK4IJ5UH6YG7TF8RD9ES0AZ1WQ2@#$%^&*()MNBVCXZLKJH",
    real: "Secure voice processing with advanced AI happens entirely offline on your device",
  },
  {
    random: "RT6YH7UJ8IK9OL0P@#ZX1CV2BN3M4QW5ER6TY7UI8OP9AS0DF1GH2JK3L@#$%",
    real: "Encrypted cloud sync available only with your explicit permission and your own encryption keys",
  },
  {
    random: "DF8GH9JK0L@#AS1ZX2CV3BN4M5QW6ER7TY8UI9OP0PL1OK2IJ3UH4YG5TF6RD",
    real: "Open source code allows security experts to verify our commitment to your privacy",
  },
  {
    random: "YG5TF4RD3ES2WQ1@#ZX0CV9BN8M7QW6ER5TY4UI3OP2AS1DF0GH9JK8L7PL6",
    real: "Multi-layer security protocols protect against unauthorized access and data breaches",
  },
  {
    random: "IJ3UH4YG5TF6RD7ES8WQ9@#PL0OK1IJ2UH3YG4TF5RD6ES7AZ8WQ9@#$%^&",
    real: "Regular security audits and updates ensure your data remains protected with latest standards",
  },
];

export function SecuritySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getAnimationClass = (index: number) => {
    const speeds = ["fastest", "fast", "", "slow", "slower"];
    const speedIndex = index % speeds.length;
    const speed = speeds[speedIndex];
    const direction = index % 2 === 0 ? "right" : "left";
    return `animate-scroll-${direction}${speed ? `-${speed}` : ""}`;
  };

  return (
    <section
      className="p-6 sm:p-8 lg:p-12 py-20 sm:py-24 lg:py-28 relative border-t"
      style={{ borderColor: "#b0b0b0" }}
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
        {/* Mobile Version - Background Text */}
        <div className="lg:hidden absolute inset-0 flex flex-col opacity-20 pointer-events-none overflow-hidden">
          {securityMessages.map((message, index) => (
            <div key={index} className="relative overflow-hidden w-full py-1">
              <div
                className={`text-emerald-600 font-mono text-xs tracking-widest whitespace-nowrap inline-block ${getAnimationClass(
                  index
                )}`}
              >
                <span className="inline-block">{message.random}</span>
                <span className="inline-block ml-8">{message.random}</span>
                <span className="inline-block ml-8">{message.random}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Left Side - Content */}
        <div className="flex flex-col justify-center relative z-10">
          <div className="text-base font-mono text-emerald-800 font-medium mb-2 tracking-wide">
            [SECURITY]
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-3 leading-tight tracking-tight">
            Security first design
          </h2>

          <p className="text-gray-600 text-base lg:text-base leading-relaxed mb-8 font-mono">
            Your privacy is our priority. We never store or access your data
            without your permission. All the data are encrypted both in transit
            and at rest.
          </p>

          <div>
            <Button variant="emerald" size="lg">
              <Link href="https://invook.notion.site/Privacy-Policy-2917f199308b806bae6bd0588ac8c2c2?source=copy_link">
                View Privacy Policy
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side - Animated Text (Desktop Only) */}
        <div className="hidden lg:flex flex-col ">
          {securityMessages.map((message, index) => (
            <div
              key={index}
              className="relative overflow-hidden w-full py-1"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`text-emerald-600 font-mono text-sm tracking-widest whitespace-nowrap transition-all duration-300 inline-block ${getAnimationClass(
                  index
                )}`}
              >
                <span className="inline-block">
                  {hoveredIndex === index ? message.real : message.random}
                </span>
                <span className="inline-block ml-8">
                  {hoveredIndex === index ? message.real : message.random}
                </span>
                <span className="inline-block ml-8">
                  {hoveredIndex === index ? message.real : message.random}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
