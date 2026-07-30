import { MessageSquare } from "lucide-react";

export function InterviewQuestions({ questions }: { questions: string[] }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-6 border border-border/50 shadow-sm h-full">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-[#5B8CFF]" />
        Interview Questions
      </h3>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="p-3 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 transition-colors flex gap-3 items-start">
            <span className="text-[#5B8CFF] font-bold shrink-0">Q.</span>
            <p className="text-sm">{q}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
