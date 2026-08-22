import { Layers, Zap, BrainCircuit, Building2 } from "lucide-react";

interface ComplexityProps {
  level: "Beginner" | "Intermediate" | "Advanced" | "Enterprise" | string;
  explanation: string;
}

export function ComplexityBadge({ level, explanation }: ComplexityProps) {
  let badgeColor = "text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20";
  let Icon = Layers;

  switch (level) {
    case "Beginner":
      badgeColor = "text-[#2E9B68] bg-[#2E9B68]/10 border-[#2E9B68]/20";
      Icon = Zap;
      break;
    case "Intermediate":
      badgeColor = "text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20";
      Icon = Layers;
      break;
    case "Advanced":
      badgeColor = "text-[#55575C] dark:text-[#ECEDEE] bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10";
      Icon = BrainCircuit;
      break;
    case "Enterprise":
      badgeColor = "text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20";
      Icon = Building2;
      break;
  }

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] p-6 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#777A80]">COMPLEXITY SPEC</span>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${badgeColor}`}>
            <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
            {level || "Unknown"}
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#232427] dark:text-[#ECEDEE] mb-2">{level} Architecture</h3>
        <p className="text-sm text-[#55575C] dark:text-[#777A80] leading-relaxed">
          {explanation}
        </p>
      </div>
    </div>
  );
}

