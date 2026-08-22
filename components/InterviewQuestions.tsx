import { MessageSquare } from "lucide-react";

export function InterviewQuestions({ questions }: { questions: string[] }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] p-6 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] h-full">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-black/[0.05] dark:border-white/[0.05]">
        <MessageSquare className="w-4 h-4 text-[#2563EB]" strokeWidth={1.5} />
        <h3 className="text-lg font-bold text-[#232427] dark:text-[#ECEDEE]">Interview Questions</h3>
      </div>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={i} className="p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05] hover:border-[#2563EB]/40 transition-colors flex gap-3 items-start">
            <span className="text-[#2563EB] font-mono font-bold text-xs shrink-0 mt-0.5">Q{i + 1}.</span>
            <p className="text-xs text-[#232427] dark:text-[#ECEDEE] leading-relaxed">{q}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

