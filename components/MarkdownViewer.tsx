import ReactMarkdown from "react-markdown";

export function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none text-xs md:text-sm text-[#232427] dark:text-[#ECEDEE] prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#2563EB] hover:prose-a:text-[#1D4ED8] prose-pre:bg-[#F4F5F5] dark:prose-pre:bg-[#171719] prose-pre:border prose-pre:border-black/[0.06] dark:prose-pre:border-white/[0.06] prose-pre:rounded-[14px]">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

