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
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-r-2 border-pink-500 animate-spin flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-foreground animate-spin" />
          </div>
        </div>
        <p className="text-lg font-medium animate-pulse">Analyzing Repository...</p>
        <p className="text-sm text-muted-foreground">This may take up to 30 seconds.</p>
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-red-500">Analysis Failed</h2>
        <p className="text-muted-foreground max-w-md">{error || "No URL provided."}</p>
        <Link href="/" className="mt-4 bg-foreground text-background px-6 py-2 rounded-full font-medium text-sm transition-all hover:scale-105 active:scale-95">
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
      <main className="min-h-screen pt-16 bg-muted/20">
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
          <ReportContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
