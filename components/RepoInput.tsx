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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto flex items-center mt-10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-xl rounded-full -z-10 transition-all duration-500 hover:blur-2xl" />
      <div className="relative flex items-center w-full p-2 bg-background/80 glass rounded-full shadow-lg border border-border/50 hover:border-border transition-colors">
        <div className="pl-4 pr-3 text-muted-foreground flex items-center justify-center">
          <GithubIcon className="w-5 h-5" />
        </div>
        <input
          type="url"
          required
          placeholder="https://github.com/facebook/react"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm md:text-base min-w-0"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="ml-2 bg-foreground text-background px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 group whitespace-nowrap"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Explain
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </motion.form>
  );
}
