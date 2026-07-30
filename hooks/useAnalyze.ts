import { useState, useEffect } from "react";
import { RepoInfo, ReportContent } from "@/lib/types";

export interface AnalyzeResult {
  info: RepoInfo;
  report: ReportContent;
}

export function useAnalyze(url: string | null) {
  const [data, setData] = useState<AnalyzeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          setData(json);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAnalysis();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, isLoading, error };
}
