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
    <div className="flex gap-2">
      <button
        onClick={handleShare}
        className="p-2 rounded-lg bg-foreground text-background transition-all hover:scale-105 active:scale-95 shadow-sm flex items-center gap-2 text-xs font-medium print:hidden"
        title="Share Report"
      >
        <LinkIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Share</span>
      </button>
      <button
        onClick={handleDownloadMarkdown}
        className="p-2 rounded-lg hover:bg-muted transition-colors border border-border flex items-center gap-2 text-xs font-medium"
        title="Download Markdown"
      >
        <FileText className="w-4 h-4 text-muted-foreground" />
        <span className="hidden sm:inline">MD</span>
      </button>
      <button
        onClick={handleDownloadJSON}
        className="p-2 rounded-lg hover:bg-muted transition-colors border border-border flex items-center gap-2 text-xs font-medium"
        title="Download JSON"
      >
        <FileJson className="w-4 h-4 text-muted-foreground" />
        <span className="hidden sm:inline">JSON</span>
      </button>
      <button
        onClick={handleDownloadPDF}
        className="p-2 rounded-lg hover:bg-muted transition-colors border border-border flex items-center gap-2 text-xs font-medium print:hidden"
        title="Download PDF / Print"
      >
        <Download className="w-4 h-4 text-muted-foreground" />
        <span className="hidden sm:inline">PDF</span>
      </button>
    </div>
  );
}
