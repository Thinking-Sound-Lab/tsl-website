"use client";

import { useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    teamSize: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main>
      <div className="textured-beige-bg min-h-screen">
        <div className="container mx-auto max-w-[1216px] px-4 sm:px-6 lg:px-8">
          <div className="stitched-border">
            {/* Hero Section with Grid Background */}
            <section
              className="relative py-20 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 mt-28 overflow-hidden"
              style={{
                backgroundColor: "#b8d4c8",
              }}
            >
              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #a0c4b5 1px, transparent 1px),
                    linear-gradient(to bottom, #a0c4b5 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative z-10 max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-800 mb-4 tracking-tight">
                  CONTACT US.
                </h1>
                <p className="text-base sm:text-lg text-gray-800 font-mono leading-relaxed">
                  Thanks for your interest in Invook. Fill out the form and our
                  team will reach out ASAP.
                </p>
              </div>
            </section>

            {/* Form Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-xs font-mono text-gray-600 mb-2 uppercase tracking-wide"
                      >
                        👤 First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-xs font-mono text-gray-600 mb-2 uppercase tracking-wide"
                      >
                        👤 Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Email and Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono text-gray-600 mb-2 uppercase tracking-wide"
                      >
                        ✉️ Work Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-mono text-gray-600 mb-2 uppercase tracking-wide"
                      >
                        🏢 Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        required
                        className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Team Size */}
                  <div>
                    <label
                      htmlFor="teamSize"
                      className="block text-xs font-mono text-gray-600 mb-2 uppercase tracking-wide"
                    >
                      👥 How Many Team Members?
                    </label>
                    <select
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: "right 0.5rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="">Select team size</option>
                      <option value="1-10">1-10 members</option>
                      <option value="11-50">11-50 members</option>
                      <option value="51-200">51-200 members</option>
                      <option value="201-1000">201-1000 members</option>
                      <option value="1000+">1000+ members</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono text-gray-600 mb-2 uppercase tracking-wide"
                    >
                      💬 What would be helpful for us to know?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your team, your use case, and what you're looking to achieve..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-4 px-6 transition-colors duration-200 text-base tracking-wide"
                  >
                    Contact Us
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-gray-300">
                  <p className="text-sm text-gray-600 font-mono text-center">
                    Need immediate assistance? Email us at{" "}
                    <a
                      href="mailto:contact@invook.com"
                      className="text-emerald-700 hover:text-emerald-800 underline"
                    >
                      contact@invook.com
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
