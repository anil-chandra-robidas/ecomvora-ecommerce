"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing");

  useEffect(() => {
    const statuses = [
      { at: 10, text: "Loading assets" },
      { at: 35, text: "Preparing layout" },
      { at: 60, text: "Fetching products" },
      { at: 85, text: "Almost ready" },
      { at: 98, text: "Finishing up" },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 30 ? 6 : prev < 60 ? 4 : prev < 85 ? 3 : 2;
        const next = Math.min(prev + increment, 100);

        const statusUpdate = statuses.find((s) => prev < s.at && next >= s.at);
        if (statusUpdate) setStatus(statusUpdate.text);

        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-dark transition-all duration-700 ease-out ${
        progress >= 100 ? "opacity-0 scale-[1.03] blur-sm pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full blur-[140px] animate-pulse"
          style={{ background: `radial-gradient(circle, rgba(249,115,22,${0.06 + progress * 0.001}) 0%, transparent 70%)` }}
        />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1.5s", background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)" }}
        />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{ background: `radial-gradient(circle, rgba(249,115,22,${0.02 + progress * 0.0005}) 0%, transparent 60%)` }}
        />

        {/* Animated grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="preloader-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#preloader-grid)" />
        </svg>

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center">
        {/* Logo section */}
        <div className="relative mb-12">
          {/* Outer decorative rings */}
          <div className="absolute -inset-8">
            {/* Orbit ring 1 */}
            <div className="absolute inset-0 rounded-full border border-white/[0.03] animate-spin" style={{ animationDuration: "20s" }}>
              <div className="absolute -top-1 left-1/2 w-2 h-2 bg-brand/40 rounded-full blur-[1px]" />
            </div>
            {/* Orbit ring 2 */}
            <div className="absolute inset-4 rounded-full border border-white/[0.04] animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
              <div className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-brand/30 rounded-full blur-[1px]" />
            </div>
            {/* Orbit ring 3 */}
            <div className="absolute inset-8 rounded-full border border-dashed border-white/[0.05] animate-spin" style={{ animationDuration: "25s" }}>
              <div className="absolute top-1/2 -right-1 w-1 h-1 bg-brand/20 rounded-full" />
            </div>
          </div>

          {/* Main progress circle */}
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
            {/* Background track */}
            <circle cx="56" cy="56" r="52" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="2" />
            {/* Progress arc */}
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="none"
              stroke="url(#preloader-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="326.73"
              strokeDashoffset={326.73 - (326.73 * progress) / 100}
              className="transition-all duration-300 ease-out"
            />
            {/* Glow filter */}
            <defs>
              <linearGradient id="preloader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Glowing progress arc */}
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="none"
              stroke="url(#preloader-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="326.73"
              strokeDashoffset={326.73 - (326.73 * progress) / 100}
              className="transition-all duration-300 ease-out"
              filter="url(#glow)"
              opacity="0.5"
            />
          </svg>

          {/* Logo center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Glow pulse */}
              <div className="absolute -inset-3 bg-brand/15 rounded-2xl blur-xl animate-pulse" />

              {/* Logo box */}
              <div className="relative w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center shadow-2xl shadow-brand/30 transform hover:scale-105 transition-transform">
                <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className="mb-10 overflow-hidden">
          <div className="flex items-center">
            {["E", "c", "o", "m", "V", "o", "r", "a"].map((letter, i) => (
              <span
                key={i}
                className={`text-4xl font-bold tracking-tight ${
                  i >= 4 ? "text-brand" : "text-white"
                }`}
                style={{
                  animation: "preloader-letter 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                  animationDelay: `${0.3 + i * 0.06}s`,
                  opacity: 0,
                  transform: "translateY(30px) rotateX(-40deg)",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Progress section */}
        <div className="flex flex-col items-center gap-5 w-64">
          {/* Status text */}
          <div className="h-5 flex items-center">
            <span
              className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium transition-all duration-300"
              style={{ opacity: progress > 5 ? 1 : 0, transform: progress > 5 ? "translateY(0)" : "translateY(5px)" }}
            >
              {status}
            </span>
          </div>

          {/* Progress bar container */}
          <div className="relative w-full">
            {/* Track */}
            <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
              {/* Fill */}
              <div
                className="h-full rounded-full transition-all duration-200 ease-out relative overflow-hidden"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #ea580c, #f97316, #fb923c)" }}
              >
                {/* Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Glow dot at end */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand blur-[4px] transition-all duration-200"
              style={{ left: `calc(${progress}% - 6px)`, opacity: progress > 5 ? 0.6 : 0 }}
            />
          </div>

          {/* Percentage + dots */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-light text-white tabular-nums">
              {progress}
            </span>
            <span className="text-xs text-brand font-semibold">%</span>
            <div className="flex gap-1 ml-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-brand rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.6s" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes preloader-letter {
          0% {
            opacity: 0;
            transform: translateY(30px) rotateX(-40deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
