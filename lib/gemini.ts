import { GoogleGenAI } from "@google/genai";
import { ReportContent } from "./types";

// Key management for rate limit protection
const keyCooldowns = new Map<string, number>();

function getGeminiApiKeys(): string[] {
  const keysStr = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "";
  return keysStr
    .split(/[,;\s]+/)
    .map((k) => k.trim())
    .filter(Boolean);
}

function getNextAvailableKey(): string | null {
  const keys = getGeminiApiKeys();
  if (keys.length === 0) return null;

  const now = Date.now();
  // Find key not in cooldown
  const availableKey = keys.find((key) => {
    const cooldownUntil = keyCooldowns.get(key) || 0;
    return now >= cooldownUntil;
  });

  if (availableKey) {
    return availableKey;
  }

  // If all keys are in cooldown, pick the one that expires soonest
  const sorted = [...keys].sort((a, b) => (keyCooldowns.get(a) || 0) - (keyCooldowns.get(b) || 0));
  return sorted[0];
}

function markKeyCooldown(key: string, durationMs = 5 * 60 * 1000) {
  console.warn(`[API Key Rotation] Marking key starting with ...${key.slice(-4)} on cooldown for 5 minutes due to rate limit.`);
  keyCooldowns.set(key, Date.now() + durationMs);
}

function isRateLimitError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return (
    msg.includes("429") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("quota") ||
    msg.includes("Rate limit") ||
    msg.includes("limit reached")
  );
}

/**
 * Clean AI JSON responses (handling markdown backticks & leading/trailing noise)
 */
function cleanJsonResponse(text: string): Record<string, unknown> {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json/i, "").replace(/```$/i, "").trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```/i, "").replace(/```$/i, "").trim();
  }

  const startIdx = cleaned.indexOf("{");
  const endIdx = cleaned.lastIndexOf("}");
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    cleaned = cleaned.substring(startIdx, endIdx + 1);
  }

  return JSON.parse(cleaned);
}

/**
 * Build standard ReportContent from parsed JSON object
 */
function formatReportData(parsed: Record<string, unknown>): ReportContent {
  const p = parsed as Partial<ReportContent>;
  const rawMarkdown = `
# Architecture Report

## Project Summary
${p.summary || "No summary provided."}

## Health Score: ${p.healthScore ?? 80}/100

## Complexity: ${p.complexity?.level || "Unknown"}
${p.complexity?.explanation || ""}


## Tech Stack
${(p.techStack || []).map((t: string) => `- ${t}`).join("\n")}

## Key Dependencies
${(p.dependencies || []).map((d: { name: string; usage: string }) => `- **${d.name}**: ${d.usage}`).join("\n")}

## Folder Structure
${p.folderStructure || ""}

## Learning Path
${(p.learningPath || []).map((step: { path: string; reason: string }, i: number) => `${i + 1}. **${step.path}** - ${step.reason}`).join("\n")}

## Important Files
${(p.importantFiles || []).map((f: { path: string; description: string }) => `### \`${f.path}\`\n${f.description}`).join("\n\n")}

## Architecture Diagram
\`\`\`mermaid
${p.mermaidDiagram || ""}
\`\`\`

## Interview Questions
${(p.interviewQuestions || []).map((q: string) => `- ${q}`).join("\n")}

## Suggested Improvements
${(p.improvements || []).map((imp: string) => `- ${imp}`).join("\n")}
  `.trim();

  return {
    summary: p.summary || "",
    healthScore: p.healthScore ?? 80,
    complexity: p.complexity || { level: "Intermediate", explanation: "" },
    techStack: p.techStack || [],
    dependencies: p.dependencies || [],
    folderStructure: p.folderStructure || "",
    learningPath: p.learningPath || [],
    importantFiles: p.importantFiles || [],
    mermaidDiagram: p.mermaidDiagram || "",
    interviewQuestions: p.interviewQuestions || [],
    improvements: p.improvements || [],
    rawMarkdown,
  };
}


/**
 * Fallback Provider: Groq API (Free Tier: 14,400 RPD / 30 RPM)
 */
async function generateWithGroq(prompt: string): Promise<ReportContent | null> {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) return null;

  console.log("[Fallback Engine] Attempting analysis using Groq API (llama-3.3-70b-versatile)...");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are an expert software architect analyzing GitHub codebases. Output ONLY valid JSON matching the requested structure." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Groq API error HTTP ${res.status}: ${errText}`);
    }

    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response content from Groq");

    const parsed = cleanJsonResponse(content);
    return formatReportData(parsed);
  } catch (err) {
    console.error("[Fallback Engine] Groq API call failed:", err);
    return null;
  }
}

/**
 * Primary Generator with Automatic Key Rotation & Model Degradation
 */
export async function generateArchitectureReport(prompt: string, attempt = 1): Promise<ReportContent> {
  const modelsToTry = [
    process.env.GEMINI_MODEL,
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-1.5-flash",
  ].filter(Boolean) as string[];

  const keys = getGeminiApiKeys();

  // 1. Try Gemini API across keys & models
  if (keys.length > 0) {
    // Select key with rate limit rotation
    const apiKey = getNextAvailableKey() || keys[0];
    const modelName = modelsToTry[(attempt - 1) % modelsToTry.length];

    try {
      const ai = new GoogleGenAI({ apiKey });

      console.log(`[Gemini API] Executing attempt ${attempt} with model '${modelName}' using key ending in ...${apiKey.slice(-4)}`);

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      });

      const text = response.text;
      if (!text) throw new Error("Empty response text from Gemini API");

      const parsed = cleanJsonResponse(text);
      return formatReportData(parsed);
    } catch (error: unknown) {
      console.error(`Gemini API Error (Attempt ${attempt}):`, error);

      if (isRateLimitError(error)) {
        markKeyCooldown(apiKey);
      }

      // Try next attempt with next key / model
      if (attempt < keys.length * modelsToTry.length) {
        console.log(`[Gemini API] Retrying with next key/model in pool (Attempt ${attempt + 1})...`);
        await new Promise((res) => setTimeout(res, 1000));
        return generateArchitectureReport(prompt, attempt + 1);
      }
    }
  }

  // 2. Fallback Provider (Groq API)
  const groqResult = await generateWithGroq(prompt);
  if (groqResult) {
    return groqResult;
  }

  // 3. Final Error if everything failed
  throw new Error(
    "All available AI API keys (Gemini & Fallbacks) have hit rate limits or failed. Please wait 1-2 minutes for rate limit window reset, or add additional free Gemini/Groq keys."
  );
}
