"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { GithubIcon } from "./icons";
import { motion } from "framer-motion";

export function RepoInput() {
  const [url, setUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    // Simulate navigation/processing delay for visual feedback before route change
    setTimeout(() => {
      router.push(`/report?url=${encodeURIComponent(url)}`);
    }, 400);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto flex items-center mt-8"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2FBF8F]/10 to-[#5B8CFF]/10 blur-xl rounded-full -z-10 transition-opacity duration-500 opacity-70" />
      
      <div className="relative flex items-center w-full p-2 bg-[#11161F]/90 backdrop-blur-xl rounded-full border border-white/10 hover:border-white/20 transition-all duration-200 shadow-xl">
        <div className="pl-4 pr-3 text-[#A5B0C5] flex items-center justify-center">
          <GithubIcon className="w-5 h-5" />
        </div>
        <input
          type="url"
          required
          placeholder="https://github.com/facebook/react"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[#F8FAFC] placeholder:text-[#A5B0C5]/50 text-sm md:text-base min-w-0 font-normal"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="ml-2 bg-[#2FBF8F] hover:bg-[#28A97E] text-[#090B10] px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:hover:bg-[#2FBF8F] flex items-center gap-2 group whitespace-nowrap shadow-none border border-[#2FBF8F]/20"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Explain
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}

