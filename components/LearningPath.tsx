import { Map, ArrowDown } from "lucide-react";

export function LearningPath({ path }: { path: { path: string; reason: string }[] }) {
  if (!path || path.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-6 border border-border/50 shadow-sm h-full">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Map className="w-5 h-5 text-indigo-500" />
        Learning Path
      </h3>
      <div className="space-y-4 relative">
        <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border/50" />
        
        {path.map((step, index) => (
          <div key={step.path} className="relative pl-8 flex flex-col gap-1">
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-500">
              {index + 1}
            </div>
            <h4 className="font-mono text-sm font-semibold">{step.path}</h4>
            <p className="text-sm text-muted-foreground">{step.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
