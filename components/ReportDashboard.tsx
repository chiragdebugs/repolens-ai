"use client";

import Link from "next/link";
import React from "react";
import { RepoCard } from "@/components/RepoCard";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { Lightbulb, Layers } from "lucide-react";
import { HealthScore } from "@/components/HealthScore";
import { ComplexityBadge } from "@/components/ComplexityBadge";
import { DependencyGrid } from "@/components/DependencyGrid";
import { LearningPath } from "@/components/LearningPath";
import { InterviewQuestions } from "@/components/InterviewQuestions";
import { ExportMenu } from "@/components/ExportMenu";
import { MermaidViewer } from "@/components/MermaidViewer";
import { motion } from "framer-motion";
import { RepoInfo, ReportContent } from "@/lib/types";

export function ReportDashboard({ data }: { data: { id?: string; info: RepoInfo; report: ReportContent } }) {
  if (!data) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };


  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="container mx-auto px-4 max-w-[1440px] py-10 space-y-6"
    >
      {/* Header Row */}
      <motion.div variants={item} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08] print:mb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#777A80] mb-1 block">ENGINEERING REPORT</span>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#232427] dark:text-[#ECEDEE]">Repository Architecture Report</h1>
          <p className="text-sm text-[#55575C] dark:text-[#777A80]">AI-generated structural analysis and code inspection</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/" className="px-4 py-2 bg-[#2563EB] text-white rounded-[14px] font-medium text-xs hover:bg-[#1D4ED8] transition-colors shadow-sm active:scale-95 flex items-center gap-2">
            New Analysis
          </Link>
          <ExportMenu data={data} />
        </div>
      </motion.div>

      {/* Top Section - Overview & Health */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2">
          <RepoCard info={data.info} />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <HealthScore score={data.report.healthScore} />
        </motion.div>
      </div>

      {/* Middle Section - Complexity, Dependencies, Path */}
      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div variants={item} className="lg:col-span-1">
          <ComplexityBadge 
            level={data.report.complexity?.level} 
            explanation={data.report.complexity?.explanation} 
          />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-2">
          <DependencyGrid dependencies={data.report.dependencies} />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
          <LearningPath path={data.report.learningPath} />
        </motion.div>
      </div>

      {/* Editorial Dark Technical Section (#171719 background for Architecture Diagram) */}
      {data.report.mermaidDiagram && (
        <motion.div variants={item} className="bg-[#171719] text-[#ECEDEE] rounded-[24px] p-8 border border-white/[0.08] shadow-2xl print:break-inside-avoid">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              <h3 className="text-xl font-bold tracking-tight text-[#ECEDEE]">System Architecture Diagram</h3>
            </div>
            <span className="text-[11px] font-mono text-[#777A80] uppercase tracking-wider">MERMAID GRAPH</span>
          </div>
          <MermaidViewer chart={data.report.mermaidDiagram} />
        </motion.div>
      )}

      {/* Bottom Section - Improvements & Interview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] p-6 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] print:break-inside-avoid">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-black/[0.05] dark:border-white/[0.05]">
            <Lightbulb className="w-4 h-4 text-[#2563EB]" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-[#232427] dark:text-[#ECEDEE]">Suggested Improvements</h3>
          </div>
          <ul className="space-y-3">
            {data.report.improvements?.map((imp: string, i: number) => (
              <li key={i} className="flex gap-3 text-xs text-[#232427] dark:text-[#ECEDEE] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-1.5" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div variants={item} className="print:break-inside-avoid">
          <InterviewQuestions questions={data.report.interviewQuestions} />
        </motion.div>
      </div>

      {/* Raw Markdown Full Report Section */}
      <motion.div variants={item} className="bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] p-8 border border-black/[0.07] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_8px_-2px_rgba(0,0,0,0.04)] print:break-before-page">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2563EB]" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-[#232427] dark:text-[#ECEDEE]">Full Architecture Analysis Document</h3>
          </div>
          <span className="text-[11px] font-mono text-[#777A80] uppercase tracking-wider">MARKDOWN SPEC</span>
        </div>
        <MarkdownViewer content={data.report.rawMarkdown} />
      </motion.div>

    </motion.div>
  );
}

