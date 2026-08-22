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
      className="relative w-full max-w-2xl mx-auto lg:mx-0 flex items-center mt-6"
    >
      <div className="relative flex items-center w-full p-2 bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] border border-black/[0.09] dark:border-white/[0.09] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_4px_20px_-4px_rgba(0,0,0,0.05)] focus-within:border-[#2563EB] dark:focus-within:border-[#2563EB] transition-all duration-200">
        <div className="pl-4 pr-3 text-[#777A80] flex items-center justify-center shrink-0">
          <GithubIcon className="w-5 h-5 text-[#55575C] dark:text-[#777A80]" />
        </div>
        <input
          type="url"
          required
          placeholder="https://github.com/facebook/react"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[#232427] dark:text-[#ECEDEE] placeholder:text-[#777A80]/70 text-sm md:text-base font-normal tracking-tight min-w-0"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="ml-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-[18px] font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:hover:bg-[#2563EB] flex items-center gap-2 shrink-0 shadow-sm active:scale-95"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Analyze Repository
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}


