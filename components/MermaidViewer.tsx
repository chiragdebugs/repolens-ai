"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { Loader2 } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    fontFamily: "var(--font-mono), monospace",
    primaryColor: "#202024",
    primaryTextColor: "#ECEDEE",
    primaryBorderColor: "#2563EB",
    lineColor: "#2563EB",
    secondaryColor: "#171719",
    tertiaryColor: "#202024",
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
      <div className="p-4 bg-[#D64545]/10 text-[#D64545] border border-[#D64545]/20 rounded-[16px] text-xs font-mono">
        Failed to render architecture diagram.
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="w-5 h-5 animate-spin text-[#777A80]" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto flex justify-center p-6 bg-[#202024] rounded-[20px] border border-white/[0.08] shadow-[0_1px_0_rgba(255,255,255,0.05)_inset]"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

