export class ApiError extends Error {
  status: number;
  bodyText: string;

  constructor(message: string, status: number, bodyText: string) {
    super(message);
    this.status = status;
    this.bodyText = bodyText;
  }
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
    const msg = (() => {
      if (!json || typeof json !== "object") return `Request failed (${res.status})`;
      const maybe = json as { error?: unknown };
      return typeof maybe.error === "string" ? maybe.error : `Request failed (${res.status})`;
    })();
    throw new ApiError(msg, res.status, text);
  }

  return json as T;
}

export async function apiUploadFile(
  path: string,
  file: File,
  fieldName = "file"
): Promise<{ url: string }> {
  const form = new FormData();
  form.append(fieldName, file);
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
    const msg = (() => {
      if (!json || typeof json !== "object") return `Request failed (${res.status})`;
      const maybe = json as { error?: unknown };
      return typeof maybe.error === "string" ? maybe.error : `Request failed (${res.status})`;
    })();
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
    const msg = (() => {
      if (!json || typeof json !== "object") return `Request failed (${res.status})`;
      const maybe = json as { error?: unknown };
      return typeof maybe.error === "string" ? maybe.error : `Request failed (${res.status})`;
    })();
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
