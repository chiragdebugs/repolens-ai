import { Download, FileText, FileJson } from "lucide-react";
import { ReportContent, RepoInfo } from "@/lib/types";

interface ExportMenuProps {
  data: { report: ReportContent; info: RepoInfo };
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

  return (
    <div className="flex gap-2">
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
