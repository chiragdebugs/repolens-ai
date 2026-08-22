"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { GithubIcon } from "./icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-[#FFFFFF]/90 dark:bg-[#171719]/90 backdrop-blur-md border-black/[0.08] dark:border-white/[0.08] py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[#171719] dark:bg-[#FFFFFF] text-[#FFFFFF] dark:text-[#171719] font-bold text-sm flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-[0_1px_0_rgba(255,255,255,0.2)_inset]">
            R
          </div>
          <span className="font-semibold text-lg tracking-tight text-[#232427] dark:text-[#ECEDEE]">RepoLens AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#55575C] dark:text-[#777A80]">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#232427] dark:hover:text-[#ECEDEE] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3.5">
          {pathname.startsWith("/report") && (
            <Link
              href="/"
              className="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full font-medium text-xs transition-all shadow-sm active:scale-95"
            >
              Analyze Another Repo
            </Link>
          )}
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#55575C] hover:text-[#232427] dark:text-[#777A80] dark:hover:text-[#ECEDEE] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 text-[#55575C] dark:text-[#777A80] hover:text-[#232427] dark:hover:text-[#ECEDEE] transition-colors border border-black/5 dark:border-white/5"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-[#2563EB]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[#2563EB]" />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[#232427] dark:text-[#ECEDEE]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full inset-x-0 bg-[#FFFFFF] dark:bg-[#171719] border-b border-black/[0.08] dark:border-white/[0.08] py-4 px-6 flex flex-col gap-4 shadow-xl"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#55575C] dark:text-[#777A80] hover:text-[#232427] dark:hover:text-[#ECEDEE] transition-colors py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-black/[0.08] dark:bg-white/[0.08] my-1" />
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-[#55575C] dark:text-[#777A80] hover:text-[#232427] dark:hover:text-[#ECEDEE] transition-colors py-1"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </Link>
        </motion.div>
      )}
    </header>
  );
}

