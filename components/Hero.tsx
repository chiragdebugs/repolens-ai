"use client";

import { motion } from "framer-motion";
import { RepoInput } from "./RepoInput";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Input */}
          <div className="flex flex-col text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50 text-sm font-medium text-muted-foreground mx-auto lg:mx-0 w-fit mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Gemini 2.5 Flash Powered
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Understand Any <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                GitHub Repository
              </span>{" "}
              <br className="hidden md:block" />
              Without Reading Code.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Paste any public GitHub repository URL and instantly receive an AI-generated architecture report. Perfect for onboarding, code reviews, and exploring new projects.
            </motion.p>

            <RepoInput />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-muted-foreground mt-4"
            >
              * Analyzes READMEs, configs, and folder structures. Does not clone source code.
            </motion.p>
          </div>

          {/* Right Column: Abstract Illustration */}
          <div className="relative hidden lg:flex justify-center items-center h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-md aspect-square"
            >
              {/* Complex CSS gradients and Framer Motion for abstract art */}
              <motion.div 
                animate={{ 
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-3xl mix-blend-multiply dark:mix-blend-screen"
              />
              <motion.div 
                animate={{ 
                  rotate: [360, 270, 180, 90, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-bl from-pink-500/30 to-rose-500/30 blur-3xl mix-blend-multiply dark:mix-blend-screen"
                style={{ transformOrigin: "30% 70%" }}
              />
              
              {/* Floating elements to give a "data/code" feel */}
              <div className="absolute inset-10 glass rounded-2xl border border-white/20 shadow-2xl flex flex-col p-6 overflow-hidden transform -rotate-6">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="h-4 w-3/4 rounded bg-muted/80" />
                  <div className="h-4 w-1/2 rounded bg-muted/80" />
                  <div className="h-4 w-5/6 rounded bg-muted/80" />
                  <div className="h-4 w-2/3 rounded bg-muted/80" />
                  <div className="h-4 w-1/3 rounded bg-gradient-to-r from-indigo-500/50 to-pink-500/50" />
                </div>
              </div>
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-20 glass p-4 rounded-xl shadow-lg border border-white/20"
              >
                <div className="w-16 h-16 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded text-indigo-500 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
