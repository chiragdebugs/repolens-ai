"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function HeroRibbons() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 45, damping: 30 };
  const bgX = useSpring(useTransform(mouseX, [-600, 600], [-5, 5]), springConfig);
  const bgY = useSpring(useTransform(mouseY, [-600, 600], [-4, 4]), springConfig);

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
      {/* Subtle ambient light field */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-[#2563EB]/[0.03] rounded-full blur-[140px]" />

      {/* Structural Architectural Grid & Faint Node Vectors */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute right-0 top-0 w-full lg:w-[60%] h-full flex items-center justify-end opacity-40 dark:opacity-30"
      >
        <svg
          viewBox="0 0 1000 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-[850px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Subtle Grid Lines */}
          <line x1="100" y1="150" x2="900" y2="150" stroke="#777A80" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
          <line x1="100" y1="350" x2="900" y2="350" stroke="#777A80" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
          <line x1="100" y1="550" x2="900" y2="550" stroke="#777A80" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />

          <line x1="250" y1="50" x2="250" y2="750" stroke="#777A80" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
          <line x1="550" y1="50" x2="550" y2="750" stroke="#777A80" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />
          <line x1="750" y1="50" x2="750" y2="750" stroke="#777A80" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.4" />

          {/* Architectural Node Curves */}
          <path
            d="M 250,150 C 400,150 400,350 550,350 C 700,350 700,550 750,550"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeOpacity="0.35"
          />

          <path
            d="M 250,350 C 400,350 400,150 550,150 C 700,150 700,350 750,350"
            stroke="#777A80"
            strokeWidth="1"
            strokeDasharray="2 4"
            strokeOpacity="0.3"
          />

          {/* Subtle Node Dots */}
          <circle cx="250" cy="150" r="3" fill="#2563EB" opacity="0.6" />
          <circle cx="550" cy="350" r="3" fill="#2563EB" opacity="0.6" />
          <circle cx="750" cy="550" r="3" fill="#2563EB" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  );
}

