import { RepoInfo } from "@/lib/types";
import { Star, GitFork, Code2, Scale, Eye, AlertCircle, GitBranch, Calendar } from "lucide-react";
// No date-fns needed

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
    <div className="glass rounded-2xl p-8 border border-border/50 shadow-sm relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2FBF8F]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2 truncate">
          {info.owner} / <span className="text-[#2FBF8F]">{info.repo}</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          {info.description || "No description provided."}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
        <div className="flex flex-col gap-1 p-3 bg-background/50 rounded-xl border border-border/50">
          <span className="text-muted-foreground text-xs flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Stars</span>
          <span className="text-lg">{info.stars.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1 p-3 bg-background/50 rounded-xl border border-border/50">
          <span className="text-muted-foreground text-xs flex items-center gap-1.5"><GitFork className="w-3.5 h-3.5" /> Forks</span>
          <span className="text-lg">{info.forks.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-1 p-3 bg-background/50 rounded-xl border border-border/50">
          <span className="text-muted-foreground text-xs flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Watchers</span>
          <span className="text-lg">{info.watchers?.toLocaleString() || 0}</span>
        </div>
        <div className="flex flex-col gap-1 p-3 bg-background/50 rounded-xl border border-border/50">
          <span className="text-muted-foreground text-xs flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Issues</span>
          <span className="text-lg">{info.openIssues?.toLocaleString() || 0}</span>
        </div>
        
        {info.language && (
          <div className="flex flex-col gap-1 p-3 bg-background/50 rounded-xl border border-border/50">
            <span className="text-muted-foreground text-xs flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> Language</span>
            <span className="text-lg text-[#5B8CFF]">{info.language}</span>
          </div>
        )}
        {info.license && (
          <div className="flex flex-col gap-1 p-3 bg-background/50 rounded-xl border border-border/50">
            <span className="text-muted-foreground text-xs flex items-center gap-1.5"><Scale className="w-3.5 h-3.5" /> License</span>
            <span className="text-lg text-[#2FBF8F] truncate">{info.license}</span>
          </div>
        )}
        {info.defaultBranch && (
          <div className="flex flex-col gap-1 p-3 bg-background/50 rounded-xl border border-border/50">
            <span className="text-muted-foreground text-xs flex items-center gap-1.5"><GitBranch className="w-3.5 h-3.5" /> Branch</span>
            <span className="text-lg truncate">{info.defaultBranch}</span>
          </div>
        )}
        {info.updatedAt && (
          <div className="flex flex-col gap-1 p-3 bg-background/50 rounded-xl border border-border/50">
            <span className="text-muted-foreground text-xs flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Updated</span>
            <span className="text-lg truncate">{timeAgo(info.updatedAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
