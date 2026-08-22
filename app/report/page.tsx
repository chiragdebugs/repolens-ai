"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AlertCircle, Loader2 } from "lucide-react";
import { ReportDashboard } from "@/components/ReportDashboard";

function ReportContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // For fallback if KV is not enabled
  const [fallbackData, setFallbackData] = useState<{ info: import('@/lib/types').RepoInfo; report: import('@/lib/types').ReportContent } | null>(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;
    
    async function fetchAnalysis() {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        
        const json = await res.json();
        
        if (!res.ok) {
          throw new Error(json.error || "Failed to analyze repository.");
        }
        
        if (isMounted) {
          if (json.id) {
            // DB is enabled and report was saved/cached. Redirect to permanent URL.
            router.replace(`/report/${json.id}`);
          } else if (json.report) {
            // Fallback: DB is disabled, render locally
            setFallbackData(json);
            setIsLoading(false);
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
          setIsLoading(false);
        }
      }
    }

    fetchAnalysis();

    return () => {
      isMounted = false;
    };
  }, [url, router]);

  if (isLoading || (!error && !fallbackData && url)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="w-16 h-16 relative flex items-center justify-center bg-[#FFFFFF] dark:bg-[#202024] rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset]">
          <Loader2 className="w-7 h-7 text-[#2563EB] animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-base font-bold text-[#232427] dark:text-[#ECEDEE] tracking-tight">Analyzing Repository...</p>
          <p className="text-xs font-mono text-[#777A80]">Fetching AST trees, configs, and dependencies with Gemini AI</p>
        </div>
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center px-4">
        <div className="w-14 h-14 rounded-[20px] bg-[#D64545]/10 border border-[#D64545]/20 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-[#D64545]" />
        </div>
        <h2 className="text-xl font-bold text-[#D64545]">Analysis Failed</h2>
        <p className="text-sm text-[#55575C] dark:text-[#777A80] max-w-md">{error || "No URL provided."}</p>
        <Link href="/" className="mt-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2.5 rounded-full font-medium text-xs transition-all shadow-sm active:scale-95">
          Try Another URL
        </Link>
      </div>
    );
  }

  if (fallbackData) {
    return <ReportDashboard data={fallbackData} />;
  }

  return null;
}

export default function ReportGenerationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-[#ECEDEE] dark:bg-[#171719]">
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[#ECEDEE] dark:bg-[#171719]"><Loader2 className="w-6 h-6 animate-spin text-[#777A80]" /></div>}>
          <ReportContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

