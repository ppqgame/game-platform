const memory = new Map();
export async function cacheGet(key) {
    const item = memory.get(key);
    if (!item)
        return null;
    if (item.expiresAt && item.expiresAt < Date.now()) {
        memory.delete(key);
        return null;
    }
    return item.value;
}
export async function cacheSet(key, value, ttlSec) {
    memory.set(key, {
        value,
        expiresAt: ttlSec ? Date.now() + ttlSec * 1000 : null,
    });
}
export async function cacheDel(key) {
    memory.delete(key);
}
//# sourceMappingURL=cache.js.map