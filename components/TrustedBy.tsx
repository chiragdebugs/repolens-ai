"use client";

import { motion } from "framer-motion";

const CAPABILITIES = [
  "GitHub REST API",
  "Gemini AI",
  "Architecture Analysis",
  "Repository Health",
  "AI Insights",
];

export function TrustedBy() {
  return (
    <section className="py-8 border-y border-black/[0.06] dark:border-white/[0.06] bg-[#F4F5F5] dark:bg-[#171719]">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-6 md:gap-x-10 text-xs font-mono tracking-wider uppercase text-[#777A80]">
          {CAPABILITIES.map((capability, i) => (
            <motion.div
              key={capability}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-6 md:gap-10"
            >
              <span className="hover:text-[#232427] dark:hover:text-[#ECEDEE] transition-colors">
                {capability}
              </span>
              {i < CAPABILITIES.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-[#777A80]/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

