import { Package2 } from "lucide-react";

export function DependencyGrid({ dependencies }: { dependencies: { name: string; usage: string }[] }) {
  if (!dependencies || dependencies.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-6 border border-border/50 shadow-sm h-full">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Package2 className="w-5 h-5 text-[#2FBF8F]" />
        Core Dependencies
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {dependencies.map((dep) => (
          <div key={dep.name} className="p-3 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 transition-colors">
            <h4 className="font-semibold text-sm mb-1">{dep.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{dep.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
