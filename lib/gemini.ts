import { GoogleGenAI } from "@google/genai";
import { ReportContent } from "./types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

export async function generateArchitectureReport(prompt: string, attempt = 1): Promise<ReportContent> {
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
      },
    });
    
    clearTimeout(timeoutId);

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    // The API might still return markdown backticks for json sometimes
    const cleanText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    
    const parsed = JSON.parse(cleanText);

    // Reconstruct raw markdown
    const rawMarkdown = `
# Architecture Report

## Project Summary
${parsed.summary}

## Health Score: ${parsed.healthScore}/100

## Complexity: ${parsed.complexity?.level || "Unknown"}
${parsed.complexity?.explanation || ""}

## Tech Stack
${parsed.techStack?.map((t: string) => `- ${t}`).join("\n")}

## Key Dependencies
${parsed.dependencies?.map((d: any) => `- **${d.name}**: ${d.usage}`).join("\n")}

## Folder Structure
${parsed.folderStructure}

## Learning Path
${parsed.learningPath?.map((step: any, i: number) => `${i + 1}. **${step.path}** - ${step.reason}`).join("\n")}

## Important Files
${parsed.importantFiles?.map((f: any) => `### \`${f.path}\`\n${f.description}`).join("\n\n")}

## Architecture Diagram
\`\`\`mermaid
${parsed.mermaidDiagram || ""}
\`\`\`

## Interview Questions
${parsed.interviewQuestions?.map((q: string) => `- ${q}`).join("\n")}

## Suggested Improvements
${parsed.improvements?.map((imp: string) => `- ${imp}`).join("\n")}
    `.trim();

    return {
      summary: parsed.summary,
      healthScore: parsed.healthScore,
      complexity: parsed.complexity,
      techStack: parsed.techStack,
      dependencies: parsed.dependencies,
      folderStructure: parsed.folderStructure,
      learningPath: parsed.learningPath,
      importantFiles: parsed.importantFiles,
      mermaidDiagram: parsed.mermaidDiagram,
      interviewQuestions: parsed.interviewQuestions,
      improvements: parsed.improvements,
      rawMarkdown,
    };
  } catch (error: any) {
    console.error(`Gemini API Error (Attempt ${attempt}/${MAX_RETRIES}):`, error);
    
    if (attempt < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return generateArchitectureReport(prompt, attempt + 1);
    }
    
    throw new Error(error.message || "Failed to generate report from AI after multiple attempts.");
  }
}
