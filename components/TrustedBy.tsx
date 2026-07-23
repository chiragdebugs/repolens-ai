"use client";

import { motion } from "framer-motion";

const COMPANIES = [
  "Acme Corp", "GlobalTech", "Nexus", "Quantum", "Nebula", "Starlight"
];

export function TrustedBy() {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          Trusted by innovative engineering teams worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {COMPANIES.map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-xl md:text-2xl font-bold tracking-tighter text-foreground select-none"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
