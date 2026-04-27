/**
 * `SearchConfig.hotKeywords` stores JSON. Supported shapes:
 * - Legacy: `["a","b"]` — hot search terms only
 * - Current: `{ "hotKeywords": string[], "notices": string[] }`
 */
export function parseSearchConfigJson(raw) {
    if (!raw)
        return { hotKeywords: [], notices: [] };
    try {
        const v = JSON.parse(raw);
        if (Array.isArray(v)) {
            return { hotKeywords: v.map(String), notices: [] };
        }
        if (v && typeof v === "object") {
            const o = v;
            const hot = Array.isArray(o.hotKeywords) ? o.hotKeywords.map(String) : [];
            const notices = Array.isArray(o.notices) ? o.notices.map(String) : [];
            return { hotKeywords: hot, notices };
        }
    }
    catch {
        // ignore
    }
    return { hotKeywords: [], notices: [] };
}
export function serializeSearchConfigJson(data) {
    return JSON.stringify({ hotKeywords: data.hotKeywords, notices: data.notices });
}
//# sourceMappingURL=searchConfigJson.js.map