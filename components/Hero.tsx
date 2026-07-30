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

          {/* Right Column: Refined Enterprise Preview */}
          <div className="relative hidden lg:flex justify-center items-center h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md aspect-square"
            >
              {/* Subtle ambient glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#2FBF8F]/10 to-[#5B8CFF]/10 blur-2xl opacity-60" />
              
              {/* Floating Graph & Code Card */}
              <div className="absolute inset-6 bg-card/90 backdrop-blur-xl rounded-2xl border border-border shadow-2xl flex flex-col p-6 overflow-hidden transform -rotate-3 transition-transform hover:rotate-0 duration-500">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <div className="w-3 h-3 rounded-full bg-muted" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground/60">architecture.json</span>
                </div>
                
                <div className="space-y-3.5 flex-1 font-mono text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="text-[#2FBF8F]">● repo: &quot;facebook/react&quot;</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#2FBF8F]/10 text-[#2FBF8F] border border-[#2FBF8F]/20">Verified</span>
                  </div>
                  <div className="h-2 w-3/4 rounded bg-muted" />
                  <div className="h-2 w-1/2 rounded bg-muted" />
                  
                  <div className="p-3 rounded-lg bg-muted/60 border border-border/40 space-y-2 mt-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#5B8CFF]">tech_stack:</span>
                      <span className="text-foreground">[&quot;TypeScript&quot;, &quot;C++&quot;]</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#5B8CFF]">health_score:</span>
                      <span className="text-[#2FBF8F]">98/100</span>
                    </div>
                  </div>

                  <div className="h-2 w-5/6 rounded bg-muted" />
                  <div className="h-2 w-2/3 rounded bg-muted" />
                </div>
              </div>

              {/* Floating Code Badge Accent */}
              <motion.div 
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-16 bg-card/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-border flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#2FBF8F]/10 border border-[#2FBF8F]/20 flex items-center justify-center text-[#2FBF8F]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">AST Parsed</div>
                  <div className="text-[10px] text-muted-foreground">1,000+ files mapped</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

