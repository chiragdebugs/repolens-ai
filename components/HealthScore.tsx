"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck, AlertTriangle } from "lucide-react";

export function HealthScore({ score }: { score: number }) {
  // Determine color and icon based on score
  let color = "text-green-500";
  let bgLight = "bg-green-500/10";
  let borderColor = "border-green-500/20";
  let Icon = ShieldCheck;
  let status = "Excellent";

  if (score < 50) {
    color = "text-red-500";
    bgLight = "bg-red-500/10";
    borderColor = "border-red-500/20";
    Icon = AlertTriangle;
    status = "Needs Improvement";
  } else if (score < 80) {
    color = "text-amber-500";
    bgLight = "bg-amber-500/10";
    borderColor = "border-amber-500/20";
    Icon = Activity;
    status = "Good";
  }

  return (
    <div className={`glass rounded-2xl p-6 border ${borderColor} shadow-sm relative overflow-hidden flex items-center justify-between`}>
      <div className={`absolute top-0 right-0 w-32 h-32 ${bgLight} rounded-full blur-3xl -mr-16 -mt-16`} />
      
      <div>
        <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
          Repository Health
          <Icon className={`w-5 h-5 ${color}`} />
        </h3>
        <p className="text-sm text-muted-foreground">{status}</p>
      </div>

      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {/* Background Circle */}
          <path
            className="text-muted/20"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          {/* Progress Circle */}
          <motion.path
            className={color}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${color}`}>{score}</span>
        </div>
      </div>
    </div>
  );
}
