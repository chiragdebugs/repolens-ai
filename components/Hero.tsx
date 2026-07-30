"use client";

import { motion } from "framer-motion";
import { RepoInput } from "./RepoInput";
import { HeroRibbons } from "./HeroRibbons";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center bg-background">
      {/* Background Animated Ribbons & Lighting */}
      <HeroRibbons />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Input */}
          <div className="flex flex-col text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card/90 border border-border text-xs font-medium text-muted-foreground mx-auto lg:mx-0 w-fit mb-6 shadow-sm backdrop-blur-md"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#2FBF8F] shadow-[0_0_8px_rgba(47,191,143,0.6)]" />
              Gemini 2.5 Flash Engine
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground"
            >
              Understand Any <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FBF8F] via-[#5B8CFF] to-foreground">
                GitHub Repository
              </span>{" "}
              <br className="hidden md:block" />
              Without Reading Code.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Paste any public GitHub repository URL and instantly receive an AI-generated architecture report. Perfect for onboarding, code reviews, and exploring new projects.
            </motion.p>

            <RepoInput />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-muted-foreground/70 mt-4"
            >
              * Analyzes READMEs, configs, and folder structures. Does not clone source code.
            </motion.p>
          </div>

          {/* Right Column: Realistic Enterprise AI Repository Analysis Dashboard */}
          <div className="relative hidden lg:flex justify-center items-center min-h-[520px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-lg perspective-[1200px]"
            >
              {/* Subtle ambient volumetric lighting field behind mockup */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[#2FBF8F]/15 via-[#5B8CFF]/10 to-transparent blur-3xl opacity-70 pointer-events-none" />

              {/* Main Realistic AI Product Dashboard Card */}
              <div className="relative bg-card/95 backdrop-blur-2xl rounded-2xl border border-border shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] p-5 transform rotate-y-[-5deg] rotate-x-[3deg] hover:rotate-0 transition-transform duration-700 ease-out flex flex-col gap-4 overflow-hidden">
                
                {/* Header Window Bar */}
                <div className="flex items-center justify-between pb-3.5 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-muted/80 border border-border/50 text-[11px] font-mono text-muted-foreground">
                      <span className="text-[#2FBF8F]">facebook</span> / <span className="text-foreground font-semibold">react</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#2FBF8F]/10 text-[#2FBF8F] border border-[#2FBF8F]/25 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF8F] animate-pulse" />
                      AI Analysis Complete
                    </span>
                  </div>
                </div>

                {/* Key Metrics Dashboard Grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50 flex flex-col gap-0.5">
                    <span className="text-[10px] text-muted-foreground font-medium">Health Score</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-[#2FBF8F]">98</span>
                      <span className="text-[10px] text-muted-foreground">/100</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50 flex flex-col gap-0.5">
                    <span className="text-[10px] text-muted-foreground font-medium">Complexity</span>
                    <span className="text-xs font-bold text-[#5B8CFF]">Enterprise</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/50 border border-border/50 flex flex-col gap-0.5">
                    <span className="text-[10px] text-muted-foreground font-medium">Dependencies</span>
                    <span className="text-xs font-bold text-foreground">42 modules</span>
                  </div>
                </div>

                {/* Architecture Relationship Graph (SVG Node Diagram) */}
                <div className="p-3.5 rounded-xl bg-muted/30 border border-border/50 relative overflow-hidden flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] font-mono font-medium text-muted-foreground mb-1">
                    <span>Architecture Diagram</span>
                    <span className="text-[10px] text-[#2FBF8F]">AST Engine v2</span>
                  </div>

                  {/* Micro SVG Architecture Graph */}
                  <div className="relative h-28 w-full bg-background/50 rounded-lg border border-border/40 p-2 flex items-center justify-center">
                    <svg viewBox="0 0 380 100" className="w-full h-full" fill="none">
                      {/* Connection Lines */}
                      <path d="M 60,50 L 140,25 M 60,50 L 140,75 M 140,25 L 240,50 M 140,75 L 240,50 M 240,50 L 320,50" stroke="#5B8CFF" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.6" />
                      
                      {/* Live Data Pulse Animation */}
                      <circle r="2.5" fill="#2FBF8F">
                        <animateMotion path="M 60,50 L 140,25 L 240,50 L 320,50" dur="4s" repeatCount="indefinite" />
                      </circle>

                      {/* Nodes */}
                      <g transform="translate(30, 35)">
                        <rect width="60" height="30" rx="6" fill="#171D28" stroke="#2FBF8F" strokeWidth="1" />
                        <text x="30" y="19" textAnchor="middle" fill="#F8FAFC" fontSize="10" fontFamily="monospace">react</text>
                      </g>

                      <g transform="translate(130, 10)">
                        <rect width="85" height="30" rx="6" fill="#171D28" stroke="#5B8CFF" strokeWidth="1" />
                        <text x="42.5" y="19" textAnchor="middle" fill="#A5B0C5" fontSize="9" fontFamily="monospace">reconciler</text>
                      </g>

                      <g transform="translate(130, 60)">
                        <rect width="85" height="30" rx="6" fill="#171D28" stroke="#5B8CFF" strokeWidth="1" />
                        <text x="42.5" y="19" textAnchor="middle" fill="#A5B0C5" fontSize="9" fontFamily="monospace">scheduler</text>
                      </g>

                      <g transform="translate(260, 35)">
                        <rect width="80" height="30" rx="6" fill="#171D28" stroke="#2FBF8F" strokeWidth="1" />
                        <text x="40" y="19" textAnchor="middle" fill="#2FBF8F" fontSize="10" fontFamily="monospace">react-dom</text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* AI Summary Snippet */}
                <div className="p-3 rounded-xl bg-muted/40 border border-border/40 font-mono text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-[#2FBF8F] font-semibold">AI Insight: </span>
                  Fiber architecture with concurrent rendering engine mapped across 1,240 core modules.
                </div>
              </div>

              {/* Floating Foreground Badge 1: AST Parsed Accent */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-5 top-12 bg-card/95 backdrop-blur-xl p-3 rounded-xl shadow-2xl border border-border flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-[#2FBF8F]/10 border border-[#2FBF8F]/25 flex items-center justify-center text-[#2FBF8F]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">1,240 Modules</div>
                  <div className="text-[10px] text-muted-foreground font-mono">AST Tree Verified</div>
                </div>
              </motion.div>

              {/* Floating Foreground Badge 2: Security & License Status */}
              <motion.div 
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 bottom-8 bg-card/95 backdrop-blur-xl px-3.5 py-2.5 rounded-xl shadow-2xl border border-border flex items-center gap-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-[#5B8CFF] animate-ping" />
                <span className="text-xs font-mono font-medium text-foreground">MIT Licensed ● Secure</span>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

