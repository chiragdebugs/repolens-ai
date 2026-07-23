import { NextResponse } from "next/server";
import { parseGithubUrl, fetchRepoData } from "@/lib/github";
import { generatePrompt } from "@/lib/parser";
import { generateArchitectureReport } from "@/lib/gemini";

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

    // Fetch GitHub data
    const repoData = await fetchRepoData(owner, repo);

    // Generate prompt
    const prompt = generatePrompt(repoData);

    // Call Gemini
    const report = await generateArchitectureReport(prompt);

    return NextResponse.json({
      info: repoData.info,
      report,
    });
  } catch (error: any) {
    console.error("Analysis API Error:", error);
    
    let errorMessage = error.message || "An unexpected error occurred during analysis.";
    
    // Parse ugly JSON strings thrown by @google/genai
    if (errorMessage.includes("{") && errorMessage.includes("}")) {
      try {
        const parsedError = JSON.parse(errorMessage);
        if (parsedError?.error?.message) {
          errorMessage = parsedError.error.message;
        }
      } catch (e) {
        // Not valid JSON, keep original message
      }
    }

    if (error.status === 404 || errorMessage === "Not Found") {
      errorMessage = "Repository not found. If this is a private repository, ensure you have set a valid GITHUB_TOKEN in your environment variables with access to this repo.";
    } else if (errorMessage.includes("429") || errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("quota")) {
      errorMessage = "AI rate limit exceeded. Please wait a minute and try again. If this persists, you may have exhausted your Gemini API free tier limits.";
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: error.status === 404 ? 404 : 500 }
    );
  }
}
