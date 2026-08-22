import { Map } from "lucide-react";

export function LearningPath({ path }: { path: { path: string; reason: string }[] }) {
  if (!path || path.length === 0) return null;

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] p-6 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] h-full">
      <div className="flex items-center gap-2 mb-6 pb-3 border-b border-black/[0.05] dark:border-white/[0.05]">
        <Map className="w-4 h-4 text-[#2563EB]" strokeWidth={1.5} />
        <h3 className="text-lg font-bold text-[#232427] dark:text-[#ECEDEE]">Learning Path</h3>
      </div>
      <div className="space-y-4 relative">
        <div className="absolute left-[13px] top-3 bottom-3 w-px bg-black/[0.08] dark:bg-white/[0.08]" />
        
        {path.map((step, index) => {
          const stepNumber = String(index + 1).padStart(2, "0");
          return (
            <div key={step.path} className="relative pl-9 flex flex-col gap-1">
              <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full bg-[#F4F5F5] dark:bg-[#171719] border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center text-[10px] font-mono font-bold text-[#2563EB]">
                {stepNumber}
              </div>
              <h4 className="font-mono text-xs font-bold text-[#232427] dark:text-[#ECEDEE] tracking-tight">{step.path}</h4>
              <p className="text-xs text-[#55575C] dark:text-[#777A80] leading-relaxed">{step.reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

