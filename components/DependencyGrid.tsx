import { Package2 } from "lucide-react";

export function DependencyGrid({ dependencies }: { dependencies: { name: string; usage: string }[] }) {
  if (!dependencies || dependencies.length === 0) return null;

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] p-6 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] h-full">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.05] dark:border-white/[0.05]">
        <div className="flex items-center gap-2">
          <Package2 className="w-4 h-4 text-[#2563EB]" strokeWidth={1.5} />
          <h3 className="text-lg font-bold text-[#232427] dark:text-[#ECEDEE]">Core Dependencies</h3>
        </div>
        <span className="text-[11px] font-mono text-[#777A80] uppercase tracking-wider">{dependencies.length} MODULES</span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {dependencies.map((dep) => (
          <div 
            key={dep.name} 
            className="p-3.5 bg-[#F4F5F5] dark:bg-[#171719] rounded-[16px] border border-black/[0.05] dark:border-white/[0.05] hover:border-[#2563EB]/40 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-mono text-xs font-bold text-[#232427] dark:text-[#ECEDEE] truncate">{dep.name}</h4>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" />
            </div>
            <p className="text-xs text-[#55575C] dark:text-[#777A80] line-clamp-2 leading-relaxed">{dep.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

