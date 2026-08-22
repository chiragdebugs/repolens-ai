import { RepoInfo } from "@/lib/types";
import { Star, GitFork, Code2, Scale, Eye, AlertCircle, GitBranch, Calendar } from "lucide-react";

function timeAgo(dateString: string) {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  if (diffDays < 30) return `${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} months ago`;
  return `${Math.floor(diffMonths / 12)} years ago`;
}

export function RepoCard({ info }: { info: RepoInfo }) {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] p-8 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] relative overflow-hidden h-full">
      <div className="mb-6">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#777A80] mb-1.5 block">REPOSITORY METADATA</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#232427] dark:text-[#ECEDEE] mb-2 truncate">
          {info.owner} / <span className="text-[#2563EB]">{info.repo}</span>
        </h2>
        <p className="text-[#55575C] dark:text-[#777A80] text-sm max-w-2xl leading-relaxed">
          {info.description || "No description provided."}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-medium">
        <div className="flex flex-col gap-1 p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05]">
          <span className="text-[#777A80] text-xs font-mono flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} /> Stars</span>
          <span className="text-lg font-semibold text-[#232427] dark:text-[#ECEDEE]">{info.stars.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1 p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05]">
          <span className="text-[#777A80] text-xs font-mono flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} /> Forks</span>
          <span className="text-lg font-semibold text-[#232427] dark:text-[#ECEDEE]">{info.forks.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1 p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05]">
          <span className="text-[#777A80] text-xs font-mono flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} /> Watchers</span>
          <span className="text-lg font-semibold text-[#232427] dark:text-[#ECEDEE]">{info.watchers?.toLocaleString() || 0}</span>
        </div>
        <div className="flex flex-col gap-1 p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05]">
          <span className="text-[#777A80] text-xs font-mono flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} /> Issues</span>
          <span className="text-lg font-semibold text-[#232427] dark:text-[#ECEDEE]">{info.openIssues?.toLocaleString() || 0}</span>
        </div>
        
        {info.language && (
          <div className="flex flex-col gap-1 p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05]">
            <span className="text-[#777A80] text-xs font-mono flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-[#2563EB]" strokeWidth={1.5} /> Language</span>
            <span className="text-lg font-semibold text-[#2563EB] truncate">{info.language}</span>
          </div>
        )}
        {info.license && (
          <div className="flex flex-col gap-1 p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05]">
            <span className="text-[#777A80] text-xs font-mono flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-[#2E9B68]" strokeWidth={1.5} /> License</span>
            <span className="text-lg font-semibold text-[#2E9B68] truncate">{info.license}</span>
          </div>
        )}
        {info.defaultBranch && (
          <div className="flex flex-col gap-1 p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05]">
            <span className="text-[#777A80] text-xs font-mono flex items-center gap-1.5"><GitBranch className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} /> Branch</span>
            <span className="text-lg font-semibold text-[#232427] dark:text-[#ECEDEE] truncate">{info.defaultBranch}</span>
          </div>
        )}
        {info.updatedAt && (
          <div className="flex flex-col gap-1 p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05]">
            <span className="text-[#777A80] text-xs font-mono flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} /> Updated</span>
            <span className="text-lg font-semibold text-[#232427] dark:text-[#ECEDEE] truncate">{timeAgo(info.updatedAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

