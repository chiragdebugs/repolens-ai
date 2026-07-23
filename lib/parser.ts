import { RepoData } from "./types";

export function generatePrompt(data: RepoData): string {
  const { info, readme, languages, tree, configFiles } = data;

  const configStr = Object.entries(configFiles)
    .map(([file, content]) => `\n--- ${file} ---\n${content}`)
    .join("\n");

  const langStr = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang)
    .join(", ");

  return `
You are an expert Software Architect, Tech Lead, and Senior Full-Stack Engineer. 
Your task is to analyze the provided GitHub repository information and generate a highly structured, comprehensive Architecture Report and Dashboard data.

--- REPOSITORY INFO ---
Name: ${info.owner}/${info.repo}
Description: ${info.description || "None"}
Primary Languages: ${langStr || info.language || "Unknown"}
Stars: ${info.stars}
Forks: ${info.forks}
Watchers: ${info.watchers}
Open Issues: ${info.openIssues}

--- README (Truncated) ---
${readme.substring(0, 5000)}

--- FOLDER STRUCTURE (Truncated) ---
${tree.substring(0, 5000)}

--- CONFIGURATION FILES ---
${configStr}

--- TASK ---
Based on the provided information, generate a comprehensive architecture report.
You must respond ONLY with a JSON object in the following format. Do not include markdown formatting like \`\`\`json.
{
  "summary": "A concise one-paragraph summary of what this project is and its primary purpose.",
  "healthScore": 85, // Number 0-100 based on docs quality, tests, CI/CD, security, linting, etc.
  "complexity": {
    "level": "Beginner" | "Intermediate" | "Advanced" | "Enterprise",
    "explanation": "Why this complexity was chosen (mention folder count, dependencies, architecture)."
  },
  "techStack": ["React", "TypeScript", "Tailwind CSS"], // Array of detected technologies
  "dependencies": [
    {
      "name": "Next.js",
      "usage": "Core React framework used for server-side rendering and routing."
    }
  ], // Key dependencies and their purpose. Maximum 8.
  "folderStructure": "A brief explanation of the overall folder structure and how the project is organized. Mention key directories.",
  "learningPath": [
    {
      "path": "README.md",
      "reason": "Start here to understand the high-level goals and setup."
    }
  ], // 5-7 files/folders in the best order to learn the codebase.
  "importantFiles": [
    {
      "path": "src/main.tsx",
      "description": "Why this file is important to read first."
    }
  ], // Exactly 3 most important files to read first.
  "mermaidDiagram": "graph TD\\n  A[Frontend] --> B[API]\\n  B --> C[(Database)]", // A valid Mermaid.js string (use \n for newlines, no markdown ticks inside). Represent the core architecture.
  "interviewQuestions": [
    "Why was Next.js chosen?",
    "Explain the folder structure."
  ], // 5-10 technical interview questions based on this repo.
  "improvements": [
    "Add Docker support for easier local development.",
    "Implement GitHub Actions for CI/CD."
  ] // Actionable improvement suggestions. Avoid generic ones.
}

Ensure the JSON is strictly valid. No trailing commas, no extra text.
`;
}
