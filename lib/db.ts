import { kv } from "@vercel/kv";
import { ReportContent, RepoInfo } from "./types";

export interface ReportData {
  id: string;
  info: RepoInfo;
  report: ReportContent;
  createdAt: string;
}

const isKVSettingsAvailable = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

/**
 * Generate a short, non-sequential unique ID (e.g. 'f7e9d12')
 */
export function generateShortId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Get a report by its unique ID
 */
export async function getReportById(id: string): Promise<ReportData | null> {
  if (!isKVSettingsAvailable) return null;
  try {
    const data = await kv.get(`report:${id}`);
    return data as ReportData | null;
  } catch (e) {
    console.error(`Failed to fetch report ${id} from DB:`, e);
    return null;
  }
}

/**
 * Save a report permanently and link it to the repo cache
 */
export async function saveReport(id: string, owner: string, repo: string, data: Omit<ReportData, 'id' | 'createdAt'>): Promise<ReportData | null> {
  if (!isKVSettingsAvailable) return null;
  
  const reportData: ReportData = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  try {
    // Save report permanently (no TTL)
    await kv.set(`report:${id}`, reportData);
    
    // Cache the repo -> id mapping for 7 days
    const cacheKey = `repolens:analysis:${owner.toLowerCase()}:${repo.toLowerCase()}`;
    await kv.set(cacheKey, { id }, { ex: 604800 });
    
    return reportData;
  } catch (e) {
    console.error(`Failed to save report ${id} to DB:`, e);
    return null;
  }
}

/**
 * Check if a repo was recently analyzed and return its report ID
 */
export async function getCachedReportId(owner: string, repo: string): Promise<string | null> {
  if (!isKVSettingsAvailable) return null;
  
  const cacheKey = `repolens:analysis:${owner.toLowerCase()}:${repo.toLowerCase()}`;
  try {
    const cached = await kv.get<{ id: string }>(cacheKey);
    return cached?.id || null;
  } catch (e) {
    console.error(`Failed to read cache for ${owner}/${repo}:`, e);
    return null;
  }
}
