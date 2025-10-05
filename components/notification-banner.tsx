"use client";

import { useEffect, useRef } from "react";

export function NotificationBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawGrid();
    };

    const squareSize = 12;
    const highlights: { x: number; y: number; opacity: number }[] = [];

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base grid
      ctx.strokeStyle = "rgba(16, 185, 129, 0.1)"; // Very subtle emerald
      ctx.lineWidth = 0.5;

      for (let x = 0; x < canvas.width; x += squareSize) {
        for (let y = 0; y < canvas.height; y += squareSize) {
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      // Draw highlights
      highlights.forEach((highlight) => {
        ctx.fillStyle = `rgba(52, 211, 153, ${highlight.opacity})`; // emerald-400 with varying opacity
        ctx.fillRect(highlight.x, highlight.y, squareSize, squareSize);
      });
    };

    const addRandomHighlight = () => {
      const cols = Math.floor(canvas.width / squareSize);
      const rows = Math.floor(canvas.height / squareSize);

      const x = Math.floor(Math.random() * cols) * squareSize;
      const y = Math.floor(Math.random() * rows) * squareSize;
      const opacity = Math.random() * 0.15 + 0.05; // 0.05 to 0.2

      highlights.push({ x, y, opacity });

      // Keep only last 20 highlights
      if (highlights.length > 20) {
        highlights.shift();
      }

      drawGrid();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Add random highlights at intervals
    const intervalId = setInterval(() => {
      addRandomHighlight();
    }, 500);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-emerald-800 text-white overflow-hidden z-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ height: "48px" }}
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-center">
        <p className="text-xs sm:text-sm font-mono text-center">
          <span className="hidden sm:inline">
            Learn more about the technical and research problems we&apos;re solving at
            Thinking Sound Lab{" "}
          </span>
          <span className="sm:hidden">
            Research problems we&apos;re solving{" "}
          </span>
          <a
            href="/research"
            className="underline hover:text-emerald-200 transition-colors font-semibold"
          >
            Read More
          </a>
        </p>
      </div>
    </div>
  );
}
