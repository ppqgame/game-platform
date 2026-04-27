/** 将 playUrl 解析为可放在 <a href> / 浏览器打开的绝对地址（支持 http(s)、/…、相对路径） */
export function resolvePlayUrl(href: string, baseHref: string = typeof window !== "undefined" ? window.location.href : "http://localhost/"): string {
  const t = href.trim();
  if (!t) return "";

  const backendOrigin = (import.meta.env.VITE_BACKEND_ORIGIN as string | undefined) || "";
  if (/^https?:\/\//i.test(t)) {
    try {
      const u = new URL(t);
      const host = u.hostname.toLowerCase();
      const isLoopbackHost = host === "localhost" || host === "127.0.0.1" || host === "::1";
      if (!isLoopbackHost) return t;

      const fallbackOrigin = backendOrigin || new URL(baseHref).origin;
      const target = new URL(fallbackOrigin);
      u.protocol = target.protocol;
      u.host = target.host;
      return u.toString();
    } catch {
      return t;
    }
  }

  if (t.startsWith("/games/") || t.startsWith("/play/")) {
    const normalized = t.startsWith("/games/") ? t.replace(/^\/games\//, "/play/") : t;
    // 开发环境改走 /_play 代理，避免与前端 /games/:slug 详情路由冲突。
    if (import.meta.env.DEV) return normalized.replace(/^\/play\//, "/_play/");
    if (backendOrigin) return `${backendOrigin}${normalized}`;
  }
  try {
    return new URL(t, baseHref).href;
  } catch {
    return t;
  }
}
