"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, AlertTriangle } from "lucide-react";

export function HealthScore({ score }: { score: number }) {
  let color = "text-[#2E9B68]";
  let strokeColor = "#2E9B68";
  let Icon = ShieldCheck;
  let status = "Excellent";

  if (score < 50) {
    color = "text-[#D64545]";
    strokeColor = "#D64545";
    Icon = AlertTriangle;
    status = "Needs Improvement";
  } else if (score < 80) {
    color = "text-[#D8892F]";
    strokeColor = "#D8892F";
    Icon = Activity;
    status = "Good";
  }

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] p-6 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] relative overflow-hidden flex items-center justify-between h-full">
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#777A80]">QUALITY METRIC</span>
        <h3 className="text-lg font-bold text-[#232427] dark:text-[#ECEDEE] flex items-center gap-2">
          Health Score
          <Icon className={`w-4 h-4 ${color}`} strokeWidth={1.5} />
        </h3>
        <p className="text-sm font-medium text-[#55575C] dark:text-[#777A80]">{status}</p>
      </div>

      <div className="relative w-22 h-22 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-black/[0.06] dark:text-white/[0.06]"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <motion.path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${score}, 100`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#232427] dark:text-[#ECEDEE] leading-none">{score}</span>
          <span className="text-[10px] text-[#777A80] font-mono mt-0.5">/100</span>
        </div>
      </div>
    </div>
  );
}

