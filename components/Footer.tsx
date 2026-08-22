import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.06] bg-[#F4F5F5] dark:bg-[#171719] py-10">
      <div className="container mx-auto px-4 max-w-[1440px] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#171719] dark:bg-[#FFFFFF] text-[#FFFFFF] dark:text-[#171719] font-bold text-xs flex items-center justify-center">
            R
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#232427] dark:text-[#ECEDEE]">RepoLens AI</span>
        </div>

        <p className="text-xs text-[#777A80] font-mono text-center md:text-left">
          Built for the developer community. Powered by Gemini.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="https://www.linkedin.com/in/chirag-tapre-47a426192/"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#777A80] hover:text-[#232427] dark:hover:text-[#ECEDEE] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-[#777A80] hover:text-[#232427] dark:hover:text-[#ECEDEE] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

