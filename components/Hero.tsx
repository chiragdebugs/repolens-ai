"use client";

import { motion } from "framer-motion";
import { RepoInput } from "./RepoInput";
import { HeroRibbons } from "./HeroRibbons";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[85vh] flex items-center bg-[#F4F5F5] dark:bg-[#171719]">
      {/* Background Architectural Vector Grid */}
      <HeroRibbons />

      <div className="container mx-auto px-4 md:px-8 max-w-[1440px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Text & Input */}
          <div className="flex flex-col text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] dark:bg-[#202024] border border-black/[0.08] dark:border-white/[0.08] text-[11px] font-mono tracking-wider uppercase text-[#777A80] mx-auto lg:mx-0 w-fit mb-6 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              Gemini AI Engine & AST Analysis
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6 text-[#232427] dark:text-[#ECEDEE]"
            >
              Understand Any <br className="hidden md:block" />
              <span className="text-[#2563EB]">GitHub Repository</span> <br className="hidden md:block" />
              Without Reading Code.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-base md:text-lg text-[#55575C] dark:text-[#777A80] mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Paste any public GitHub repository URL and instantly receive an AI-generated architecture report. Perfect for onboarding, code reviews, and exploring new projects.
            </motion.p>

            <RepoInput />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xs text-[#777A80] mt-4 font-mono"
            >
              * Analyzes READMEs, configs, and folder structures. Does not clone source code.
            </motion.p>
          </div>

          {/* Right Column: Sleek Editorial AI Repository Analysis Dashboard Mockup */}
          <div className="relative hidden lg:flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" as const }}
              className="relative w-full max-w-lg"
            >

              {/* Product Dashboard Card Container */}
              <div className="relative bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] border border-black/[0.09] dark:border-white/[0.09] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_12px_32px_-8px_rgba(0,0,0,0.06)] p-6 flex flex-col gap-5 overflow-hidden">
                
                {/* Header Window Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D64545]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#D8892F]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2E9B68]" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.06] dark:border-white/[0.06] text-xs font-mono text-[#55575C] dark:text-[#777A80]">
                      <span>facebook</span> / <span className="text-[#232427] dark:text-[#ECEDEE] font-semibold">react</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#2E9B68]/10 text-[#2E9B68] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E9B68] animate-pulse" />
                      Analysis Complete
                    </span>
                  </div>
                </div>

                {/* Key Metrics Dashboard Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-[16px] bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.05] dark:border-white/[0.05] flex flex-col gap-0.5">
                    <span className="text-[11px] text-[#777A80] font-mono uppercase tracking-wider">Health Score</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#2E9B68]">98</span>
                      <span className="text-xs text-[#777A80]">/100</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-[16px] bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.05] dark:border-white/[0.05] flex flex-col gap-0.5">
                    <span className="text-[11px] text-[#777A80] font-mono uppercase tracking-wider">Complexity</span>
                    <span className="text-sm font-semibold text-[#2563EB]">Enterprise</span>
                  </div>
                  <div className="p-3 rounded-[16px] bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.05] dark:border-white/[0.05] flex flex-col gap-0.5">
                    <span className="text-[11px] text-[#777A80] font-mono uppercase tracking-wider">Dependencies</span>
                    <span className="text-sm font-semibold text-[#232427] dark:text-[#ECEDEE]">42 modules</span>
                  </div>
                </div>

                {/* Architecture Relationship Graph (SVG Node Diagram) */}
                <div className="p-4 rounded-[18px] bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.05] dark:border-white/[0.05] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs font-mono font-medium text-[#777A80]">
                    <span>ARCHITECTURE DIAGRAM</span>
                    <span className="text-[10px] text-[#2563EB]">AST AST-v2</span>
                  </div>

                  {/* Micro SVG Architecture Graph */}
                  <div className="relative h-28 w-full bg-[#FFFFFF] dark:bg-[#202024] rounded-[12px] border border-black/[0.06] dark:border-white/[0.06] p-2 flex items-center justify-center">
                    <svg viewBox="0 0 380 100" className="w-full h-full" fill="none">
                      <path d="M 60,50 L 140,25 M 60,50 L 140,75 M 140,25 L 240,50 M 140,75 L 240,50 M 240,50 L 320,50" stroke="#777A80" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                      
                      <circle r="2" fill="#2563EB">
                        <animateMotion path="M 60,50 L 140,25 L 240,50 L 320,50" dur="4s" repeatCount="indefinite" />
                      </circle>

                      <g transform="translate(30, 35)">
                        <rect width="60" height="30" rx="6" fill="#171719" stroke="#2563EB" strokeWidth="1" />
                        <text x="30" y="19" textAnchor="middle" fill="#ECEDEE" fontSize="10" fontFamily="monospace">react</text>
                      </g>

                      <g transform="translate(130, 10)">
                        <rect width="85" height="30" rx="6" fill="#171719" stroke="#777A80" strokeWidth="1" />
                        <text x="42.5" y="19" textAnchor="middle" fill="#777A80" fontSize="9" fontFamily="monospace">reconciler</text>
                      </g>

                      <g transform="translate(130, 60)">
                        <rect width="85" height="30" rx="6" fill="#171719" stroke="#777A80" strokeWidth="1" />
                        <text x="42.5" y="19" textAnchor="middle" fill="#777A80" fontSize="9" fontFamily="monospace">scheduler</text>
                      </g>

                      <g transform="translate(260, 35)">
                        <rect width="80" height="30" rx="6" fill="#171719" stroke="#2E9B68" strokeWidth="1" />
                        <text x="40" y="19" textAnchor="middle" fill="#2E9B68" fontSize="10" fontFamily="monospace">react-dom</text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* AI Summary Snippet */}
                <div className="p-3.5 rounded-[16px] bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.05] dark:border-white/[0.05] font-mono text-xs text-[#55575C] dark:text-[#777A80] leading-relaxed">
                  <span className="text-[#2563EB] font-semibold">AI ANALYSIS: </span>
                  Fiber architecture with concurrent rendering engine mapped across 1,240 core modules.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}


