"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2 } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    fontFamily: "var(--font-sans)",
    primaryColor: "#6366f1", // indigo-500
    primaryTextColor: "#ffffff",
    primaryBorderColor: "#4f46e5",
    lineColor: "#6366f1",
    secondaryColor: "#1e1e2e",
    tertiaryColor: "#181825",
  },
  securityLevel: "loose",
});

export function MermaidViewer({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!chart || !containerRef.current) return;

    let isMounted = true;

    async function renderChart() {
      try {
        setError(false);
        const id = `mermaid-chart-${Math.round(Math.random() * 100000)}`;
        // Pre-process the chart to remove any markdown backticks if they leaked
        const cleanChart = chart.replace(/```mermaid/gi, "").replace(/```/g, "").trim();
        
        const { svg: generatedSvg } = await mermaid.render(id, cleanChart);
        
        if (isMounted) {
          setSvg(generatedSvg);
        }
      } catch (err) {
        console.error("Failed to render Mermaid chart:", err);
        if (isMounted) setError(true);
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm">
        Failed to render architecture diagram.
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto flex justify-center p-4 bg-card/30 rounded-xl border border-border/50"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
