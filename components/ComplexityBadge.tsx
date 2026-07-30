import { Layers, Zap, BrainCircuit, Building2 } from "lucide-react";

interface ComplexityProps {
  level: "Beginner" | "Intermediate" | "Advanced" | "Enterprise" | string;
  explanation: string;
}

export function ComplexityBadge({ level, explanation }: ComplexityProps) {
  let color = "text-[#5B8CFF]";
  let bg = "bg-[#5B8CFF]/10";
  let border = "border-[#5B8CFF]/20";
  let Icon = Layers;

  switch (level) {
    case "Beginner":
      color = "text-[#2FBF8F]";
      bg = "bg-[#2FBF8F]/10";
      border = "border-[#2FBF8F]/20";
      Icon = Zap;
      break;
    case "Intermediate":
      color = "text-[#5B8CFF]";
      bg = "bg-[#5B8CFF]/10";
      border = "border-[#5B8CFF]/20";
      Icon = Layers;
      break;
    case "Advanced":
      color = "text-[#A5B0C5]";
      bg = "bg-[#A5B0C5]/10";
      border = "border-[#A5B0C5]/20";
      Icon = BrainCircuit;
      break;
    case "Enterprise":
      color = "text-[#818CF8]";
      bg = "bg-[#818CF8]/10";
      border = "border-[#818CF8]/20";
      Icon = Building2;
      break;
  }

  return (
    <div className={`glass rounded-2xl p-6 border ${border} shadow-sm h-full`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
        Project Complexity
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${bg} ${color} border ${border}`}>
          <Icon className="w-3.5 h-3.5" />
          {level || "Unknown"}
        </div>
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {explanation}
      </p>
    </div>
  );
}
