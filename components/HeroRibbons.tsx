"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function HeroRibbons() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 2-5px parallax shift
  const springConfig = { stiffness: 40, damping: 25 };
  const parallaxX = useSpring(useTransform(mouseX, [-500, 500], [-4, 4]), springConfig);
  const parallaxY = useSpring(useTransform(mouseY, [-500, 500], [-3, 3]), springConfig);

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
      {/* Subtle Volumetric Light Background Glow */}
      <div className="absolute -right-20 top-1/4 w-[600px] h-[600px] bg-[#2FBF8F]/[0.03] rounded-full blur-[140px]" />
      <div className="absolute right-40 top-1/3 w-[500px] h-[500px] bg-[#5B8CFF]/[0.03] rounded-full blur-[120px]" />

      {/* Animated Ribbons Composition */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute right-0 top-0 w-full lg:w-[65%] h-full flex items-center justify-end pr-0 lg:pr-10"
      >
        <svg
          viewBox="0 0 1000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-[850px] opacity-85"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Ribbon 1 Gradient - Muted Emerald to Azure */}
            <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2FBF8F" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#5B8CFF" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#090B10" stopOpacity="0" />
            </linearGradient>

            {/* Ribbon 2 Gradient - Azure to Graphite */}
            <linearGradient id="ribbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#4338CA" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#090B10" stopOpacity="0" />
            </linearGradient>

            {/* Ribbon 3 Gradient - Deep Slate / Emerald Overlay */}
            <linearGradient id="ribbonGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2FBF8F" stopOpacity="0.18" />
              <stop offset="50%" stopColor="#171D28" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0.08" />
            </linearGradient>

            {/* Ribbon 4 Gradient - Translucent Ribbon Accent */}
            <linearGradient id="ribbonGrad4" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#2FBF8F" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#090B10" stopOpacity="0" />
            </linearGradient>

            {/* Radial Glow Filter */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ribbon Layer 1 - Deep Background Mesh */}
          <motion.path
            d="M 350,100 C 600,180 850,50 980,250 C 1050,380 750,520 600,680 C 480,800 250,750 100,650 C 250,550 500,580 680,450 C 850,320 650,220 350,100 Z"
            fill="url(#ribbonGrad3)"
            animate={{
              d: [
                "M 350,100 C 600,180 850,50 980,250 C 1050,380 750,520 600,680 C 480,800 250,750 100,650 C 250,550 500,580 680,450 C 850,320 650,220 350,100 Z",
                "M 370,120 C 620,150 830,70 960,280 C 1030,400 780,540 620,660 C 460,780 230,730 120,630 C 270,530 480,600 660,430 C 830,300 670,240 370,120 Z",
                "M 350,100 C 600,180 850,50 980,250 C 1050,380 750,520 600,680 C 480,800 250,750 100,650 C 250,550 500,580 680,450 C 850,320 650,220 350,100 Z"
              ]
            }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ribbon Layer 2 - Flowing Emerald Ribbon */}
          <motion.path
            d="M 450,50 C 700,120 920,220 950,420 C 970,580 800,720 620,750 C 480,770 320,680 420,520 C 520,380 780,460 820,320 C 860,180 650,120 450,50 Z"
            fill="url(#ribbonGrad1)"
            filter="url(#softGlow)"
            animate={{
              d: [
                "M 450,50 C 700,120 920,220 950,420 C 970,580 800,720 620,750 C 480,770 320,680 420,520 C 520,380 780,460 820,320 C 860,180 650,120 450,50 Z",
                "M 430,70 C 680,100 940,240 930,440 C 950,600 780,700 600,730 C 460,750 340,660 400,500 C 500,360 760,480 800,300 C 840,160 630,140 430,70 Z",
                "M 450,50 C 700,120 920,220 950,420 C 970,580 800,720 620,750 C 480,770 320,680 420,520 C 520,380 780,460 820,320 C 860,180 650,120 450,50 Z"
              ]
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ribbon Layer 3 - Azure Swirl */}
          <motion.path
            d="M 520,150 C 750,220 900,350 880,520 C 860,680 680,780 500,720 C 380,680 450,550 580,480 C 720,400 820,280 680,200 Z"
            fill="url(#ribbonGrad2)"
            animate={{
              d: [
                "M 520,150 C 750,220 900,350 880,520 C 860,680 680,780 500,720 C 380,680 450,550 580,480 C 720,400 820,280 680,200 Z",
                "M 500,170 C 730,200 920,330 860,540 C 840,700 660,760 480,700 C 360,660 470,530 600,460 C 740,380 800,300 660,220 Z",
                "M 520,150 C 750,220 900,350 880,520 C 860,680 680,780 500,720 C 380,680 450,550 580,480 C 720,400 820,280 680,200 Z"
              ]
            }}
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Ribbon Layer 4 - Foreground Sharp Curve */}
          <motion.path
            d="M 600,80 C 780,180 940,290 890,480 C 840,650 640,690 550,620 C 480,560 620,440 740,360 C 860,280 750,140 600,80 Z"
            fill="url(#ribbonGrad4)"
            animate={{
              d: [
                "M 600,80 C 780,180 940,290 890,480 C 840,650 640,690 550,620 C 480,560 620,440 740,360 C 860,280 750,140 600,80 Z",
                "M 580,100 C 760,160 960,310 870,500 C 820,670 620,670 530,600 C 460,540 640,420 760,340 C 880,260 730,160 580,100 Z",
                "M 600,80 C 780,180 940,290 890,480 C 840,650 640,690 550,620 C 480,560 620,440 740,360 C 860,280 750,140 600,80 Z"
              ]
            }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Developer Detail Elements - Git Graph Nodes & Faint Code Structure */}
          <g className="opacity-45">
            {/* Git Branch Lines */}
            <path
              d="M 480,260 C 580,300 700,280 810,360 M 540,320 C 620,380 740,420 840,480"
              stroke="#2FBF8F"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeOpacity="0.4"
            />
            <path
              d="M 520,450 C 640,490 760,430 870,560"
              stroke="#5B8CFF"
              strokeWidth="1.5"
              strokeDasharray="2 4"
              strokeOpacity="0.35"
            />

            {/* Git Commit Nodes */}
            <g className="animate-pulse" style={{ animationDuration: '4s' }}>
              <circle cx="580" cy="300" r="4" fill="#2FBF8F" fillOpacity="0.8" />
              <circle cx="580" cy="300" r="8" stroke="#2FBF8F" strokeWidth="1" strokeOpacity="0.4" fill="none" />
              <text x="592" y="304" fill="#A5B0C5" fontSize="10" fontFamily="monospace" opacity="0.6">main</text>
            </g>

            <g>
              <circle cx="700" cy="280" r="3.5" fill="#5B8CFF" fillOpacity="0.8" />
              <text x="712" y="284" fill="#A5B0C5" fontSize="9" fontFamily="monospace" opacity="0.5">feat/ast</text>
            </g>

            <g>
              <circle cx="810" cy="360" r="4" fill="#2FBF8F" fillOpacity="0.7" />
              <circle cx="810" cy="360" r="9" stroke="#2FBF8F" strokeWidth="1" strokeOpacity="0.3" fill="none" />
              <text x="822" y="364" fill="#A5B0C5" fontSize="9" fontFamily="monospace" opacity="0.5">v2.0.4</text>
            </g>

            <g>
              <circle cx="620" cy="380" r="3" fill="#5B8CFF" fillOpacity="0.6" />
              <text x="630" y="384" fill="#A5B0C5" fontSize="9" fontFamily="monospace" opacity="0.4">/lib/parser.ts</text>
            </g>

            <g>
              <circle cx="740" cy="420" r="3.5" fill="#2FBF8F" fillOpacity="0.7" />
              <text x="750" y="424" fill="#A5B0C5" fontSize="9" fontFamily="monospace" opacity="0.5">schema.sql</text>
            </g>

            {/* Neural Graph / AST Connectors */}
            <line x1="580" y1="300" x2="620" y2="380" stroke="#5B8CFF" strokeWidth="1" strokeOpacity="0.25" />
            <line x1="700" y1="280" x2="740" y2="420" stroke="#2FBF8F" strokeWidth="1" strokeOpacity="0.25" />
            <line x1="740" y1="420" x2="810" y2="360" stroke="#2FBF8F" strokeWidth="1" strokeOpacity="0.25" />
          </g>

          {/* Tiny Flowing Particles */}
          <motion.circle
            r="2.5"
            fill="#2FBF8F"
            animate={{
              cx: [480, 580, 700, 810],
              cy: [260, 300, 280, 360],
              opacity: [0, 0.9, 0.9, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <motion.circle
            r="2"
            fill="#5B8CFF"
            animate={{
              cx: [540, 620, 740, 840],
              cy: [320, 380, 420, 480],
              opacity: [0, 0.8, 0.8, 0]
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 2 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
