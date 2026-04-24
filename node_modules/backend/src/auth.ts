import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { HttpError } from "./http.js";
import { env } from "./env.js";

export type AccessJwtPayload = {
  sub: string;
  email?: string;
  role: "ADMIN" | "USER" | "MODERATOR";
};

export type RefreshJwtPayload = {
  sub: string;
  sid: string;
  role: "ADMIN" | "USER" | "MODERATOR";
};

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function signAccessToken(payload: AccessJwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "2h" });
}

export function signRefreshToken(payload: RefreshJwtPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
}

export function verifyAccessToken(token: string): AccessJwtPayload {
  try {
    return jwt.verify(token, env.JWT_SECRET) as AccessJwtPayload;
  } catch {
    throw new HttpError(401, "Invalid token");
  }
}

export function verifyRefreshToken(token: string): RefreshJwtPayload {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshJwtPayload;
  } catch {
    throw new HttpError(401, "Invalid refresh token");
  }
}

function readBearer(req: Parameters<RequestHandler>[0]) {
  const header = req.header("authorization") || "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  if (!m) throw new HttpError(401, "Missing bearer token");
  return m[1]!;
}

export const requireAuth: RequestHandler = async (req, res, next) => {
  const payload = verifyAccessToken(readBearer(req));
  req.auth = payload;
  if (payload.role === "ADMIN") req.admin = { sub: payload.sub, email: payload.email ?? "", role: payload.role };
  if (payload.role === "USER" || payload.role === "MODERATOR") {
    const { prisma } = await import("./db.js");
    const u = await prisma.endUser.findUnique({ where: { id: payload.sub }, select: { bannedAt: true } });
    if (u?.bannedAt) throw new HttpError(403, "Account suspended");
  }
  next();
};

export const requireAdmin: RequestHandler = (req, _res, next) => {
  const payload = verifyAccessToken(readBearer(req));
  if (payload.role !== "ADMIN") throw new HttpError(403, "Admin role required");
  req.auth = payload;
  req.admin = { sub: payload.sub, email: payload.email ?? "", role: payload.role };
  next();
};

export function requireRole(...roles: Array<AccessJwtPayload["role"]>): RequestHandler {
  return (req, _res, next) => {
    const payload = verifyAccessToken(readBearer(req));
    if (!roles.includes(payload.role)) throw new HttpError(403, "Forbidden");
    req.auth = payload;
    if (payload.role === "ADMIN") req.admin = { sub: payload.sub, email: payload.email ?? "", role: payload.role };
    next();
  };
}

export function issueAdminTokens(input: { sub: string; email: string }) {
  const role: AccessJwtPayload["role"] = "ADMIN";
  const sessionId = `${input.sub}-${Date.now()}`;
  return {
    accessToken: signAccessToken({ sub: input.sub, email: input.email, role }),
    refreshToken: signRefreshToken({ sub: input.sub, sid: sessionId, role }),
    sessionId,
  };
}

export function issueUserTokens(input: { sub: string }) {
  const role: AccessJwtPayload["role"] = "USER";
  const sessionId = `${input.sub}-${Date.now()}`;
  return {
    accessToken: signAccessToken({ sub: input.sub, role }),
    refreshToken: signRefreshToken({ sub: input.sub, sid: sessionId, role }),
    sessionId,
  };
}

export function rotateAccessTokenFromRefresh(refreshToken: string) {
  const decoded = verifyRefreshToken(refreshToken);
  return signAccessToken({ sub: decoded.sub, role: decoded.role });
}

export type JwtPayload = AccessJwtPayload;

export function signAdminToken(payload: JwtPayload) {
  return signAccessToken(payload);
}

export function verifyAdminToken(token: string): JwtPayload {
  return verifyAccessToken(token);
}

export const requireLegacyAdmin: RequestHandler = (req, _res, next) => {
  const payload = verifyAccessToken(readBearer(req));
  if (payload.role !== "ADMIN") throw new HttpError(403, "Admin role required");
  req.admin = { sub: payload.sub, email: payload.email ?? "", role: payload.role };
  next();
};
