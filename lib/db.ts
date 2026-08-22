import { kv } from "@vercel/kv";
import { ReportContent, RepoInfo } from "./types";

export interface ReportData {
  id: string;
  info: RepoInfo;
  report: ReportContent;
  createdAt: string;
}

const isKVSettingsAvailable = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

// In-memory fallback cache for local dev / environments without Vercel KV
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const memoryReportStore = new Map<string, ReportData>();
const memoryRepoCache = new Map<string, CacheEntry<{ id: string }>>();

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
  // Check memory store first
  if (memoryReportStore.has(id)) {
    return memoryReportStore.get(id)!;
  }

  if (!isKVSettingsAvailable) return null;

  try {
    const data = await kv.get(`report:${id}`);
    if (data) {
      memoryReportStore.set(id, data as ReportData);
      return data as ReportData;
    }
    return null;
  } catch (e) {
    console.error(`Failed to fetch report ${id} from DB:`, e);
    return null;
  }
}

/**
 * Save a report permanently and link it to the repo cache
 */
export async function saveReport(id: string, owner: string, repo: string, data: Omit<ReportData, 'id' | 'createdAt'>): Promise<ReportData | null> {
  const reportData: ReportData = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };

  // Always store in memory
  memoryReportStore.set(id, reportData);
  const cacheKey = `repolens:analysis:${owner.toLowerCase()}:${repo.toLowerCase()}`;
  memoryRepoCache.set(cacheKey, {
    value: { id },
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  if (!isKVSettingsAvailable) return reportData;

  try {
    // Save report permanently (no TTL)
    await kv.set(`report:${id}`, reportData);
    await kv.set(cacheKey, { id }, { ex: 604800 });
    return reportData;
  } catch (e) {
    console.error(`Failed to save report ${id} to DB:`, e);
    return reportData; // Return memory cached report anyway
  }
}

/**
 * Check if a repo was recently analyzed and return its report ID
 */
export async function getCachedReportId(owner: string, repo: string): Promise<string | null> {
  const cacheKey = `repolens:analysis:${owner.toLowerCase()}:${repo.toLowerCase()}`;
  
  // Check memory cache first
  const memoryCached = memoryRepoCache.get(cacheKey);
  if (memoryCached && memoryCached.expiresAt > Date.now()) {
    return memoryCached.value.id;
  }

  if (!isKVSettingsAvailable) return null;

  try {
    const cached = await kv.get<{ id: string }>(cacheKey);
    if (cached?.id) {
      memoryRepoCache.set(cacheKey, {
        value: cached,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      });
      return cached.id;
    }
    return null;
  } catch (e) {
    console.error(`Failed to read cache for ${owner}/${repo}:`, e);
    return null;
  }
}

