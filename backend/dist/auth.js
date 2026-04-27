import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { HttpError } from "./http.js";
import { env } from "./env.js";
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
export async function verifyPassword(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
}
export function signAccessToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "2h" });
}
export function signRefreshToken(payload) {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
}
export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    }
    catch {
        throw new HttpError(401, "Invalid token");
    }
}
export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, env.JWT_REFRESH_SECRET);
    }
    catch {
        throw new HttpError(401, "Invalid refresh token");
    }
}
function readBearer(req) {
    const header = req.header("authorization") || "";
    const m = header.match(/^Bearer\s+(.+)$/i);
    if (!m)
        throw new HttpError(401, "Missing bearer token");
    return m[1];
}
export const requireAuth = async (req, res, next) => {
    const payload = verifyAccessToken(readBearer(req));
    req.auth = payload;
    if (payload.role === "ADMIN")
        req.admin = { sub: payload.sub, email: payload.email ?? "", role: payload.role };
    if (payload.role === "USER" || payload.role === "MODERATOR") {
        const { prisma } = await import("./db.js");
        const u = await prisma.endUser.findUnique({ where: { id: payload.sub }, select: { bannedAt: true } });
        if (u?.bannedAt)
            throw new HttpError(403, "Account suspended");
    }
    next();
};
export const requireAdmin = (req, _res, next) => {
    const payload = verifyAccessToken(readBearer(req));
    if (payload.role !== "ADMIN")
        throw new HttpError(403, "Admin role required");
    req.auth = payload;
    req.admin = { sub: payload.sub, email: payload.email ?? "", role: payload.role };
    next();
};
export function requireRole(...roles) {
    return (req, _res, next) => {
        const payload = verifyAccessToken(readBearer(req));
        if (!roles.includes(payload.role))
            throw new HttpError(403, "Forbidden");
        req.auth = payload;
        if (payload.role === "ADMIN")
            req.admin = { sub: payload.sub, email: payload.email ?? "", role: payload.role };
        next();
    };
}
export function issueAdminTokens(input) {
    const role = "ADMIN";
    const sessionId = `${input.sub}-${Date.now()}`;
    return {
        accessToken: signAccessToken({ sub: input.sub, email: input.email, role }),
        refreshToken: signRefreshToken({ sub: input.sub, sid: sessionId, role }),
        sessionId,
    };
}
export function issueUserTokens(input) {
    const role = "USER";
    const sessionId = `${input.sub}-${Date.now()}`;
    return {
        accessToken: signAccessToken({ sub: input.sub, role }),
        refreshToken: signRefreshToken({ sub: input.sub, sid: sessionId, role }),
        sessionId,
    };
}
export function rotateAccessTokenFromRefresh(refreshToken) {
    const decoded = verifyRefreshToken(refreshToken);
    return signAccessToken({ sub: decoded.sub, role: decoded.role });
}
export function signAdminToken(payload) {
    return signAccessToken(payload);
}
export function verifyAdminToken(token) {
    return verifyAccessToken(token);
}
export const requireLegacyAdmin = (req, _res, next) => {
    const payload = verifyAccessToken(readBearer(req));
    if (payload.role !== "ADMIN")
        throw new HttpError(403, "Admin role required");
    req.admin = { sub: payload.sub, email: payload.email ?? "", role: payload.role };
    next();
};
//# sourceMappingURL=auth.js.map