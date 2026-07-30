"use client";

import { motion } from "framer-motion";
import { BrainCircuit, FastForward, FileCode2, FolderTree, ShieldCheck, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: <FastForward className="w-5 h-5 text-[#2FBF8F]" />,
    title: "Instant Understanding",
    description: "Get a comprehensive architecture report in seconds without manually reading thousands of lines of code.",
  },
  {
    icon: <FolderTree className="w-5 h-5 text-[#5B8CFF]" />,
    title: "Architecture Extraction",
    description: "Automatically maps folder structures and dependencies to explain the core design patterns of the repo.",
  },
  {
    icon: <BrainCircuit className="w-5 h-5 text-[#2FBF8F]" />,
    title: "Powered by Gemini",
    description: "Utilizes Google's Gemini 2.5 Flash to provide deep contextual insights and high-quality summaries.",
  },
  {
    icon: <FileCode2 className="w-5 h-5 text-[#5B8CFF]" />,
    title: "Smart File Selection",
    description: "Only parses essential configuration files and READMEs to respect privacy and API rate limits.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-[#2FBF8F]" />,
    title: "Secure & Private",
    description: "Your data is never stored. We analyze the public repository metadata on-the-fly and discard it.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-[#5B8CFF]" />,
    title: "Beautiful Markdown",
    description: "Export beautifully formatted Markdown reports with one click, perfect for documentation and sharing.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Everything you need to decode complex codebases.
          </h2>
          <p className="text-lg text-muted-foreground">
            RepoLens AI abstracts away the noise and gives you the exact information you need to start contributing immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 transition-colors group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-6 shadow-sm border border-border/50 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
