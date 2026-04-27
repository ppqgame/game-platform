export class ApiError extends Error {
  status: number;
  bodyText: string;

  constructor(message: string, status: number, bodyText: string) {
    super(message);
    this.status = status;
    this.bodyText = bodyText;
  }
}

function parseErrorMessage(json: unknown, status: number) {
  if (json && typeof json === "object") {
    const maybe = json as { error?: unknown };
    if (typeof maybe.error === "string") return maybe.error;
  }
  if (status === 413) return "上传文件过大（413）。请压缩文件，或让运维调大 Nginx 的 client_max_body_size。";
  return `Request failed (${status})`;
}

export function getAccessToken() {
  return localStorage.getItem("gp_token") || localStorage.getItem("gp_admin_token");
}

export function setTokens(input: { token: string; refreshToken?: string; admin?: boolean }) {
  localStorage.setItem(input.admin ? "gp_admin_token" : "gp_token", input.token);
  if (input.refreshToken) localStorage.setItem(input.admin ? "gp_admin_refresh" : "gp_refresh", input.refreshToken);
}

export async function apiJson<T>(
  path: string,
  init?: RequestInit & { auth?: boolean }
): Promise<T> {
  const headers = new Headers(init?.headers);

  if (init?.auth) {
    const token = getAccessToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(path, {
    ...init,
    headers,
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    const msg = parseErrorMessage(json, res.status);
    throw new ApiError(msg, res.status, text);
  }

  return json as T;
}

export async function apiUploadFile(
  path: string,
  file: File,
  fieldName = "file",
  meta?: { gameName?: string; kind?: "icon" | "banner" | "screenshot"; index?: number }
): Promise<{ url: string }> {
  const form = new FormData();
  form.append(fieldName, file);
  if (meta?.gameName?.trim()) form.append("gameName", meta.gameName.trim());
  if (meta?.kind) form.append("kind", meta.kind);
  if (typeof meta?.index === "number" && Number.isFinite(meta.index)) form.append("index", String(meta.index));
  const headers = new Headers();
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(path, { method: "POST", body: form, headers });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  if (!res.ok) {
    const msg = parseErrorMessage(json, res.status);
    throw new ApiError(msg, res.status, text);
  }
  if (!json || typeof json !== "object" || typeof (json as { url?: unknown }).url !== "string") {
    throw new ApiError("Invalid upload response", res.status, text);
  }
  return { url: (json as { url: string }).url };
}

export async function apiUploadGameZip(
  path: string,
  file: File,
  gameName?: string,
  fieldName = "file"
): Promise<{ playUrl: string; basePath: string }> {
  const form = new FormData();
  form.append(fieldName, file);
  if (gameName && gameName.trim()) form.append("gameName", gameName.trim());
  const headers = new Headers();
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(path, { method: "POST", body: form, headers });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  if (!res.ok) {
    const msg = parseErrorMessage(json, res.status);
    throw new ApiError(msg, res.status, text);
  }
  if (
    !json ||
    typeof json !== "object" ||
    typeof (json as { playUrl?: unknown }).playUrl !== "string" ||
    typeof (json as { basePath?: unknown }).basePath !== "string"
  ) {
    throw new ApiError("Invalid game zip upload response", res.status, text);
  }
  return {
    playUrl: (json as { playUrl: string }).playUrl,
    basePath: (json as { basePath: string }).basePath,
  };
}
