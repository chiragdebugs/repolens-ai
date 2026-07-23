import ReactMarkdown from "react-markdown";

export function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-indigo-500 hover:prose-a:text-indigo-400 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
