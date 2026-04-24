type CacheItem = { value: unknown; expiresAt: number | null };

const memory = new Map<string, CacheItem>();

export async function cacheGet<T>(key: string): Promise<T | null> {
  const item = memory.get(key);
  if (!item) return null;
  if (item.expiresAt && item.expiresAt < Date.now()) {
    memory.delete(key);
    return null;
  }
  return item.value as T;
}

export async function cacheSet<T>(key: string, value: T, ttlSec?: number) {
  memory.set(key, {
    value,
    expiresAt: ttlSec ? Date.now() + ttlSec * 1000 : null,
  });
}

export async function cacheDel(key: string) {
  memory.delete(key);
}

