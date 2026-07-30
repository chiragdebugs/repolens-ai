import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[#171D28] border border-[#2FBF8F]/30 flex items-center justify-center text-[#2FBF8F] font-bold text-xs">
            R
          </div>
          <span className="font-bold tracking-tight text-[#F8FAFC]">RepoLens AI</span>
        </div>

        <p className="text-sm text-muted-foreground text-center md:text-left">
          Built for the developer community. Powered by Gemini.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/in/chirag-tapre-47a426192/"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedinIcon className="w-5 h-5" />
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
