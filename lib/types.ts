export interface RepoInfo {
  owner: string;
  repo: string;
  description: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
  language: string | null;
  license: string | null;
  url: string;
}

export interface RepoData {
  info: RepoInfo;
  readme: string;
  languages: Record<string, number>;
  tree: string;
  configFiles: Record<string, string>;
}

export interface ReportContent {
  summary: string;
  healthScore: number;
  complexity: {
    level: "Beginner" | "Intermediate" | "Advanced" | "Enterprise";
    explanation: string;
  };
  techStack: string[];
  dependencies: {
    name: string;
    usage: string;
  }[];
  folderStructure: string;
  learningPath: {
    path: string;
    reason: string;
  }[];
  importantFiles: {
    path: string;
    description: string;
  }[];
  mermaidDiagram: string;
  interviewQuestions: string[];
  improvements: string[];
  rawMarkdown: string;
}
