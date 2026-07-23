import { Layers, Zap, BrainCircuit, Building2 } from "lucide-react";

interface ComplexityProps {
  level: "Beginner" | "Intermediate" | "Advanced" | "Enterprise" | string;
  explanation: string;
}

export function ComplexityBadge({ level, explanation }: ComplexityProps) {
  let color = "text-indigo-500";
  let bg = "bg-indigo-500/10";
  let border = "border-indigo-500/20";
  let Icon = Layers;

  switch (level) {
    case "Beginner":
      color = "text-green-500";
      bg = "bg-green-500/10";
      border = "border-green-500/20";
      Icon = Zap;
      break;
    case "Intermediate":
      color = "text-blue-500";
      bg = "bg-blue-500/10";
      border = "border-blue-500/20";
      Icon = Layers;
      break;
    case "Advanced":
      color = "text-amber-500";
      bg = "bg-amber-500/10";
      border = "border-amber-500/20";
      Icon = BrainCircuit;
      break;
    case "Enterprise":
      color = "text-pink-500";
      bg = "bg-pink-500/10";
      border = "border-pink-500/20";
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
