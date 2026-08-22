"use client";

import { motion } from "framer-motion";
import { Search, Cpu, FileOutput } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: <Search className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "Paste URL",
    description: "Provide any public GitHub repository link. Our system instantly validates the URL and prepares for analysis.",
  },
  {
    step: "02",
    icon: <Cpu className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "AI Analysis",
    description: "We fetch key configuration files and repository metadata, sending a highly optimized prompt to Gemini.",
  },
  {
    step: "03",
    icon: <FileOutput className="w-5 h-5 text-[#2563EB]" strokeWidth={1.5} />,
    title: "Get Report",
    description: "Receive a structured architecture report outlining tech stack, folder structures, health score, and Mermaid diagrams.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#F4F5F5] dark:bg-[#171719] border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#777A80] mb-2 block">WORKFLOW</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#232427] dark:text-[#ECEDEE] mb-4">
            How it works
          </h2>
          <p className="text-base md:text-lg text-[#55575C] dark:text-[#777A80]">
            Three simple steps to unlock the architecture of any open-source project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="p-8 rounded-[24px] bg-[#FFFFFF] dark:bg-[#202024] border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-10 h-10 rounded-[14px] bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#777A80] bg-[#F4F5F5] dark:bg-[#171719] px-2.5 py-1 rounded-full border border-black/[0.05] dark:border-white/[0.05]">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#232427] dark:text-[#ECEDEE] mb-3">{step.title}</h3>
                <p className="text-sm text-[#55575C] dark:text-[#777A80] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

