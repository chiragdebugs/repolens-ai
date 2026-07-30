import { NextResponse } from "next/server";
import { parseGithubUrl, fetchRepoData } from "@/lib/github";
import { generatePrompt } from "@/lib/parser";
import { generateArchitectureReport } from "@/lib/gemini";
import { getCachedReportId, saveReport, generateShortId } from "@/lib/db";

export const maxDuration = 60; // Allow Vercel functions to run for 60 seconds

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const parsed = await parseGithubUrl(url);
    if (!parsed) {
      return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });
    }

    const { owner, repo } = parsed;

    const cachedId = await getCachedReportId(owner, repo);
    
    if (cachedId) {
      console.log(`[Cache Hit] Serving ${owner}/${repo} from Vercel KV`);
      return NextResponse.json({ id: cachedId });
    }

    console.log(`[Cache Miss] Fetching ${owner}/${repo} from GitHub and analyzing with Gemini...`);

    // Fetch GitHub data
    const repoData = await fetchRepoData(owner, repo);

    // Generate prompt
    const prompt = generatePrompt(repoData);

    // Call Gemini
    const report = await generateArchitectureReport(prompt);

    const newId = generateShortId();

    const saved = await saveReport(newId, owner, repo, {
      info: repoData.info,
      report,
    });

    if (saved) {
      return NextResponse.json({ id: newId });
    } else {
      // Fallback: If DB is not available, just return the data so it renders locally without redirect
      return NextResponse.json({
        info: repoData.info,
        report,
      });
    }
  } catch (error: unknown) {
    console.error("Analysis API Error:", error);
    
    let errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during analysis.";
    
    // Parse ugly JSON strings thrown by @google/genai
    if (errorMessage.includes("{") && errorMessage.includes("}")) {
      try {
        const parsedError = JSON.parse(errorMessage);
        if (parsedError?.error?.message) {
          errorMessage = parsedError.error.message;
        }
      } catch {
        // Not valid JSON, keep original message
      }
    }

    if ((error as { status?: number })?.status === 404 || errorMessage === "Not Found") {
      errorMessage = "Repository not found. If this is a private repository, ensure you have set a valid GITHUB_TOKEN in your environment variables with access to this repo.";
    } else if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("quota")) {
      errorMessage = "AI rate limit exceeded. Please wait a minute and try again. If this persists, you may have exhausted your Gemini API free tier limits.";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: (error as { status?: number })?.status === 404 ? 404 : 500 }
    );
  }
}
