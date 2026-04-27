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

  if (t.startsWith("/games/")) {
    // 开发环境改走 /_games 代理，避免与前端 /games/:slug 详情路由冲突。
    if (import.meta.env.DEV) return t.replace(/^\/games\//, "/_games/");
    if (backendOrigin) return `${backendOrigin}${t}`;
  }
  try {
    return new URL(t, baseHref).href;
  } catch {
    return t;
  }
}
