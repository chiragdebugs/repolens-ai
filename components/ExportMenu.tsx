import { Download, FileText, FileJson, Link as LinkIcon } from "lucide-react";
import { ReportContent, RepoInfo } from "@/lib/types";
import { toast } from "sonner";

interface ExportMenuProps {
  data: { id?: string; report: ReportContent; info: RepoInfo };
}

export function ExportMenu({ data }: ExportMenuProps) {
  const handleDownloadMarkdown = () => {
    const blob = new Blob([data.report.rawMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.info.repo}-report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.info.repo}-report.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShare = () => {
    const url = data.id 
      ? `${window.location.origin}/report/${data.id}` 
      : window.location.href;
    
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="px-3 py-2 rounded-[14px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white transition-all shadow-sm active:scale-95 flex items-center gap-1.5 text-xs font-medium print:hidden"
        title="Share Report"
      >
        <LinkIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span className="hidden sm:inline">Share</span>
      </button>
      <button
        onClick={handleDownloadMarkdown}
        className="px-3 py-2 rounded-[14px] bg-[#FFFFFF] dark:bg-[#202024] hover:bg-[#F4F5F5] dark:hover:bg-[#171719] text-[#232427] dark:text-[#ECEDEE] transition-colors border border-black/[0.08] dark:border-white/[0.08] flex items-center gap-1.5 text-xs font-mono font-medium shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]"
        title="Download Markdown"
      >
        <FileText className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} />
        <span className="hidden sm:inline">MD</span>
      </button>
      <button
        onClick={handleDownloadJSON}
        className="px-3 py-2 rounded-[14px] bg-[#FFFFFF] dark:bg-[#202024] hover:bg-[#F4F5F5] dark:hover:bg-[#171719] text-[#232427] dark:text-[#ECEDEE] transition-colors border border-black/[0.08] dark:border-white/[0.08] flex items-center gap-1.5 text-xs font-mono font-medium shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]"
        title="Download JSON"
      >
        <FileJson className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} />
        <span className="hidden sm:inline">JSON</span>
      </button>
      <button
        onClick={handleDownloadPDF}
        className="px-3 py-2 rounded-[14px] bg-[#FFFFFF] dark:bg-[#202024] hover:bg-[#F4F5F5] dark:hover:bg-[#171719] text-[#232427] dark:text-[#ECEDEE] transition-colors border border-black/[0.08] dark:border-white/[0.08] flex items-center gap-1.5 text-xs font-mono font-medium print:hidden shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]"
        title="Download PDF / Print"
      >
        <Download className="w-3.5 h-3.5 text-[#777A80]" strokeWidth={1.5} />
        <span className="hidden sm:inline">PDF</span>
      </button>
    </div>
  );
}

