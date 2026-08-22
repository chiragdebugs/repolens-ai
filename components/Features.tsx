"use client";

import { motion } from "framer-motion";
import { BrainCircuit, FastForward, FileCode2, FolderTree, ShieldCheck, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: <FastForward className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "Instant Understanding",
    description: "Get a comprehensive architecture report in seconds without manually reading thousands of lines of code.",
  },
  {
    icon: <FolderTree className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "Architecture Extraction",
    description: "Automatically maps folder structures and dependencies to explain the core design patterns of the repo.",
  },
  {
    icon: <BrainCircuit className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "Powered by Gemini",
    description: "Utilizes Google's Gemini Flash engine to provide deep contextual insights and high-quality summaries.",
  },
  {
    icon: <FileCode2 className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "Smart File Selection",
    description: "Only parses essential configuration files and READMEs to respect privacy and API rate limits.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "Secure & Private",
    description: "Your data is never stored. We analyze public repository metadata on-the-fly and discard transient data.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "Structured Reports",
    description: "Export beautifully formatted Markdown and JSON reports with one click, perfect for documentation.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-[#ECEDEE] dark:bg-[#171719] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1440px] relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#777A80] mb-2 block">ENGINEERING CAPABILITIES</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#232427] dark:text-[#ECEDEE] mb-4">
            Everything you need to decode complex codebases.
          </h2>
          <p className="text-base md:text-lg text-[#55575C] dark:text-[#777A80]">
            RepoLens AI abstracts away the noise and gives you the exact structural insights to start contributing immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-7 rounded-[24px] bg-[#FFFFFF] dark:bg-[#202024] border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_8px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 rounded-[14px] bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#232427] dark:text-[#ECEDEE] mb-2.5">{feature.title}</h3>
              <p className="text-sm text-[#55575C] dark:text-[#777A80] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

