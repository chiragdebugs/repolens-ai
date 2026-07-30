"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function HeroRibbons() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth multi-layer parallax springs
  const springConfig = { stiffness: 45, damping: 30 };
  
  // Background layer parallax (subtle)
  const bgX = useSpring(useTransform(mouseX, [-600, 600], [-4, 4]), springConfig);
  const bgY = useSpring(useTransform(mouseY, [-600, 600], [-3, 3]), springConfig);

  // Midground layer parallax
  const midX = useSpring(useTransform(mouseX, [-600, 600], [-8, 8]), springConfig);
  const midY = useSpring(useTransform(mouseY, [-600, 600], [-6, 6]), springConfig);

  // Foreground layer parallax (more responsive)
  const fgX = useSpring(useTransform(mouseX, [-600, 600], [-12, 12]), springConfig);
  const fgY = useSpring(useTransform(mouseY, [-600, 600], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX - innerWidth / 2);
      mouseY.set(e.clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Volumetric Soft Lighting Fields */}
      <div className="absolute -right-24 top-1/6 w-[700px] h-[700px] bg-[#2FBF8F]/[0.04] rounded-full blur-[150px] dark:bg-[#2FBF8F]/[0.05]" />
      <div className="absolute right-36 top-1/3 w-[600px] h-[600px] bg-[#5B8CFF]/[0.04] rounded-full blur-[140px] dark:bg-[#5B8CFF]/05]" />
      <div className="absolute right-10 bottom-10 w-[500px] h-[500px] bg-[#4338CA]/[0.03] rounded-full blur-[130px]" />

      {/* Layer 1: Background Ribbons & Deep Graph Connections */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute right-0 top-0 w-full lg:w-[70%] h-full flex items-center justify-end"
      >
        <svg
          viewBox="0 0 1100 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-[900px] opacity-75"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Layered Ribbon Gradients with Defined Edges */}
            <linearGradient id="ribbonGradDeep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2FBF8F" stopOpacity="0.22" />
              <stop offset="50%" stopColor="#171D28" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="ribbonGradMid" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#2FBF8F" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#090B10" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="edgeEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2FBF8F" stopOpacity="0" />
              <stop offset="40%" stopColor="#2FBF8F" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#5B8CFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2FBF8F" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="edgeAzure" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#5B8CFF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#2FBF8F" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Background Ribbon 1 - Morphing Deep Mesh */}
          <motion.path
            d="M 300,120 C 580,200 820,60 980,240 C 1080,380 760,540 600,700 C 460,820 220,760 120,640 C 260,520 520,580 700,440 C 880,300 640,220 300,120 Z"
            fill="url(#ribbonGradDeep)"
            stroke="url(#edgeEmerald)"
            strokeWidth="1.2"
            animate={{
              d: [
                "M 300,120 C 580,200 820,60 980,240 C 1080,380 760,540 600,700 C 460,820 220,760 120,640 C 260,520 520,580 700,440 C 880,300 640,220 300,120 Z",
                "M 330,140 C 600,170 800,90 960,260 C 1060,400 780,560 620,680 C 440,800 240,740 140,620 C 280,500 500,600 680,420 C 860,280 660,240 330,140 Z",
                "M 300,120 C 580,200 820,60 980,240 C 1080,380 760,540 600,700 C 460,820 220,760 120,640 C 260,520 520,580 700,440 C 880,300 640,220 300,120 Z"
              ]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Background Micro Details: AST Connectors & Faint Commit Nodes */}
          <g className="opacity-50">
            <path
              d="M 420,220 Q 560,180 720,290 T 940,420"
              stroke="#2FBF8F"
              strokeWidth="1"
              strokeDasharray="3 5"
              strokeOpacity="0.45"
            />
            <path
              d="M 480,380 Q 640,440 820,380 T 980,560"
              stroke="#5B8CFF"
              strokeWidth="1"
              strokeDasharray="2 4"
              strokeOpacity="0.4"
            />

            {/* Commit Node 1 */}
            <circle cx="560" cy="180" r="3.5" fill="#2FBF8F" />
            <circle cx="560" cy="180" r="7" stroke="#2FBF8F" strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
            <text x="572" y="184" fill="#A5B0C5" fontSize="9" fontFamily="monospace" opacity="0.65">main: ast-parser</text>

            {/* Commit Node 2 */}
            <circle cx="720" cy="290" r="3" fill="#5B8CFF" />
            <text x="730" y="294" fill="#A5B0C5" fontSize="9" fontFamily="monospace" opacity="0.55">feat/graph-v2</text>

            {/* Node 3 */}
            <circle cx="820" cy="380" r="3.5" fill="#2FBF8F" />
            <text x="832" y="384" fill="#A5B0C5" fontSize="9" fontFamily="monospace" opacity="0.6">/src/core/reconciler.ts</text>
          </g>
        </svg>
      </motion.div>

      {/* Layer 2: Midground Main Flowing Emerald Ribbon */}
      <motion.div
        style={{ x: midX, y: midY }}
        className="absolute right-0 top-0 w-full lg:w-[65%] h-full flex items-center justify-end"
      >
        <svg
          viewBox="0 0 1000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-[850px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="emeraldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2FBF8F" stopOpacity="0.38" />
              <stop offset="45%" stopColor="#5B8CFF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#090B10" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Midground Ribbon - Fluid Emerald Sweep */}
          <motion.path
            d="M 400,60 C 660,140 900,200 940,400 C 960,560 780,700 600,740 C 440,760 300,660 400,500 C 500,360 760,440 800,300 C 840,160 620,100 400,60 Z"
            fill="url(#emeraldRibbon)"
            stroke="url(#edgeEmerald)"
            strokeWidth="1.6"
            animate={{
              d: [
                "M 400,60 C 660,140 900,200 940,400 C 960,560 780,700 600,740 C 440,760 300,660 400,500 C 500,360 760,440 800,300 C 840,160 620,100 400,60 Z",
                "M 380,80 C 640,120 920,220 920,420 C 940,580 760,680 580,720 C 420,740 320,640 380,480 C 480,340 740,460 780,280 C 820,140 600,120 380,80 Z",
                "M 400,60 C 660,140 900,200 940,400 C 960,560 780,700 600,740 C 440,760 300,660 400,500 C 500,360 760,440 800,300 C 840,160 620,100 400,60 Z"
              ]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Traveling Light Pulse 1 */}
          <motion.circle
            r="3"
            fill="#2FBF8F"
            animate={{
              cx: [400, 660, 940, 780, 400],
              cy: [60, 140, 400, 700, 500],
              opacity: [0, 1, 1, 0.8, 0]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Layer 3: Foreground Accent Ribbons (Passing in Front & Edge Weaving) */}
      <motion.div
        style={{ x: fgX, y: fgY }}
        className="absolute right-0 top-0 w-full lg:w-[60%] h-full flex items-center justify-end"
      >
        <svg
          viewBox="0 0 1000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-[850px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="foregroundAzure" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#2FBF8F" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#171D28" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Foreground Ribbon - Sharp Azure Curve with Travelling Highlight */}
          <motion.path
            d="M 500,100 C 720,180 880,320 840,500 C 800,660 620,740 500,680 C 420,620 540,500 680,420 C 800,340 700,180 500,100 Z"
            fill="url(#foregroundAzure)"
            stroke="url(#edgeAzure)"
            strokeWidth="1.8"
            animate={{
              d: [
                "M 500,100 C 720,180 880,320 840,500 C 800,660 620,740 500,680 C 420,620 540,500 680,420 C 800,340 700,180 500,100 Z",
                "M 480,120 C 700,160 900,340 820,520 C 780,680 600,720 480,660 C 400,600 560,480 700,400 C 820,320 680,200 480,120 Z",
                "M 500,100 C 720,180 880,320 840,500 C 800,660 620,740 500,680 C 420,620 540,500 680,420 C 800,340 700,180 500,100 Z"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Traveling Light Pulse 2 */}
          <motion.circle
            r="2.5"
            fill="#5B8CFF"
            animate={{
              cx: [500, 720, 840, 680, 500],
              cy: [100, 180, 500, 420, 100],
              opacity: [0, 0.9, 0.9, 0.5, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
