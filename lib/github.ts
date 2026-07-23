import { Octokit } from "@octokit/rest";
import { RepoData, RepoInfo } from "./types";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const CONFIG_FILES = [
  "package.json",
  "requirements.txt",
  "pyproject.toml",
  "Cargo.toml",
  "go.mod",
  "pom.xml",
  "composer.json",
  "Dockerfile",
  "docker-compose.yml",
  "vite.config.ts",
  "vite.config.js",
  "next.config.js",
  "next.config.ts",
  "next.config.mjs",
  "angular.json",
  "tsconfig.json",
];

export async function parseGithubUrl(url: string) {
  let urlString = url.trim();
  if (!urlString.startsWith("http://") && !urlString.startsWith("https://")) {
    urlString = "https://" + urlString;
  }
  
  let parsed;
  try {
    parsed = new URL(urlString);
  } catch {
    throw new Error("Invalid URL format.");
  }

  if (parsed.hostname !== "github.com" && parsed.hostname !== "www.github.com") {
    throw new Error("Only GitHub URLs are supported.");
  }
  
  const parts = parsed.pathname.split("/").filter(Boolean);
  
  if (parts.length === 0) {
    throw new Error("Please enter a valid GitHub repository URL.");
  }
  
  if (parts.length === 1) {
    throw new Error("This looks like a GitHub profile URL. Please provide a link to a specific repository (e.g., github.com/owner/repo).");
  }

  const repo = parts[1].endsWith(".git") ? parts[1].replace(".git", "") : parts[1];
  return { owner: parts[0], repo };
}

export async function fetchRepoData(owner: string, repo: string): Promise<RepoData> {
  // 1. Fetch metadata
  const { data: repoData } = await octokit.repos.get({ owner, repo });
  
  // We allow private repositories since Octokit is authenticated with GITHUB_TOKEN

  const info: RepoInfo = {
    owner: repoData.owner.login,
    repo: repoData.name,
    description: repoData.description,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    watchers: repoData.subscribers_count || repoData.watchers_count, // Some endpoints return subscribers_count for watchers
    openIssues: repoData.open_issues_count,
    defaultBranch: repoData.default_branch,
    createdAt: repoData.created_at,
    updatedAt: repoData.updated_at,
    language: repoData.language ?? null,
    license: repoData.license?.name ?? null,
    url: repoData.html_url,
  };

  // 2. Fetch languages
  const { data: languages } = await octokit.repos.listLanguages({ owner, repo });

  // 3. Fetch README
  let readme = "";
  try {
    const { data: readmeData } = await octokit.repos.getReadme({ owner, repo });
    readme = Buffer.from(readmeData.content, "base64").toString("utf-8");
  } catch (e) {
    console.warn("No README found", e);
  }

  // 4. Fetch tree
  let treeString = "";
  try {
    const { data: branchData } = await octokit.repos.getBranch({ owner, repo, branch: repoData.default_branch });
    const commitSha = branchData.commit.sha;
    
    const { data: treeData } = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: commitSha,
      recursive: "true",
    });

    // Simplify tree for prompt
    const paths = treeData.tree
      .map(t => t.path)
      .filter((p): p is string => Boolean(p))
      .filter(p => !p.includes("node_modules/") && !p.includes(".git/") && !p.includes("dist/") && !p.includes("build/"))
      .slice(0, 1000); // Limit to prevent massive prompts

    treeString = paths.join("\n");
  } catch (e) {
    console.warn("Could not fetch tree", e);
  }

  // 5. Fetch Config Files
  const configFiles: Record<string, string> = {};
  for (const file of CONFIG_FILES) {
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: file,
      });

      if (!Array.isArray(fileData) && fileData.type === "file" && fileData.content) {
        const content = Buffer.from(fileData.content, "base64").toString("utf-8");
        // Limit config file size to prevent huge prompts
        configFiles[file] = content.substring(0, 5000);
      }
    } catch {
      // File doesn't exist, ignore
    }
  }

  return {
    info,
    readme: readme.substring(0, 15000), // Limit README size
    languages,
    tree: treeString,
    configFiles,
  };
}
