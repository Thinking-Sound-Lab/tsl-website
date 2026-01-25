"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function WaitlistContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to join. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[400px] space-y-6 text-center">
          <h1 className="text-2xl md:text-3xl tracking-tight text-foreground text-balance">
            Thank you for Joining
          </h1>
          <p className="text-[15px] md:text-base text-muted-foreground tracking-tight text-balance">
            We&apos;ve reserved your spot. Watch your inbox for exclusive early access to the future of creative work.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-8 text-left">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl tracking-tight text-foreground">
            An AI Creative Workspace
          </h1>
          <p className=" text-[15px] md:text-base text-muted-foreground tracking-tight text-pretty">
            Upload files, add notes, youtube links to an intelligent drive and connect each of them to an AI Canvas to get your work done.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-[400px] mx-auto text-left">
          <div>
            <label htmlFor="email" className="block mb-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email <span className="text-orange-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              disabled={loading}
              className={`w-full h-12 px-4 mb-2 rounded-sm bg-secondary border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:border-white focus-visible:!ring-0 focus-visible:!outline-none focus-visible:border-white transition-all outline-none shadow-none ${
                error ? "border-red-500 focus:border-red-500" : "border-input"
              }`}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base mt-4"
              disabled={loading}
            >
              {loading ? "Loading.." : "Join the Waitlist"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
