"use client";

import { motion } from "framer-motion";
import { Search, Cpu, FileOutput } from "lucide-react";

const STEPS = [
  {
    icon: <Search className="w-8 h-8 text-indigo-500" />,
    title: "1. Paste URL",
    description: "Provide any public GitHub repository link. Our system instantly validates the URL and prepares for analysis.",
  },
  {
    icon: <Cpu className="w-8 h-8 text-purple-500" />,
    title: "2. AI Analysis",
    description: "We fetch key configuration files and repository metadata, sending a highly optimized prompt to Gemini.",
  },
  {
    icon: <FileOutput className="w-8 h-8 text-pink-500" />,
    title: "3. Get Report",
    description: "Receive a structured, beautiful Markdown architecture report outlining the tech stack, folders, and key files.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to unlock the architecture of any open-source project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20" />

          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative flex flex-col items-center text-center p-6"
            >
              <div className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center mb-8 relative z-10 shadow-xl">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
