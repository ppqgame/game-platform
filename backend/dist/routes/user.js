import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { HttpError } from "../http.js";
import { hashPassword, issueUserTokens, requireAuth, rotateAccessTokenFromRefresh, verifyPassword } from "../auth.js";
export const userRouter = Router();
userRouter.post("/auth/register", async (req, res) => {
    const body = z.object({ email: z.string().email(), password: z.string().min(8), nickname: z.string().min(2).max(40) }).parse(req.body);
    const exists = await prisma.endUser.findUnique({ where: { email: body.email } });
    if (exists)
        throw new HttpError(409, "Email already registered");
    const user = await prisma.endUser.create({
        data: { email: body.email, passwordHash: await hashPassword(body.password), nickname: body.nickname },
    });
    const issued = issueUserTokens({ sub: user.id });
    await prisma.userSession.create({
        data: {
            userId: user.id,
            refreshToken: issued.refreshToken,
            userAgent: req.header("user-agent") ?? null,
            ip: req.ip,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
    });
    res.status(201).json({ token: issued.accessToken, refreshToken: issued.refreshToken, user: { id: user.id, nickname: user.nickname } });
});
userRouter.post("/auth/login", async (req, res) => {
    const body = z.object({ email: z.string().email(), password: z.string().min(1) }).parse(req.body);
    const user = await prisma.endUser.findUnique({ where: { email: body.email } });
    if (!user?.passwordHash)
        throw new HttpError(401, "Invalid credentials");
    const ok = await verifyPassword(body.password, user.passwordHash);
    if (!ok)
        throw new HttpError(401, "Invalid credentials");
    if (user.bannedAt)
        throw new HttpError(403, "Account suspended");
    await prisma.endUser.update({ where: { id: user.id }, data: { lastActiveAt: new Date() } });
    const issued = issueUserTokens({ sub: user.id });
    await prisma.userSession.create({
        data: {
            userId: user.id,
            refreshToken: issued.refreshToken,
            userAgent: req.header("user-agent") ?? null,
            ip: req.ip,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
    });
    res.json({ token: issued.accessToken, refreshToken: issued.refreshToken, user: { id: user.id, nickname: user.nickname } });
});
userRouter.post("/auth/refresh", async (req, res) => {
    const body = z.object({ refreshToken: z.string().min(10) }).parse(req.body);
    const session = await prisma.userSession.findUnique({ where: { refreshToken: body.refreshToken } });
    if (!session || session.expiresAt.getTime() < Date.now())
        throw new HttpError(401, "Refresh token expired");
    res.json({ token: rotateAccessTokenFromRefresh(body.refreshToken) });
});
userRouter.get("/me", requireAuth, async (req, res) => {
    const user = await prisma.endUser.findUnique({ where: { id: req.auth.sub } });
    if (!user)
        throw new HttpError(404, "User not found");
    res.json({
        user: {
            id: user.id,
            nickname: user.nickname,
            avatarUrl: user.avatarUrl,
            points: user.points,
            totalPlayCnt: user.totalPlayCnt,
            totalPlaySecs: user.totalPlaySecs,
            joinDays: Math.max(1, Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24))),
        },
    });
});
userRouter.get("/center", requireAuth, async (req, res) => {
    const userId = req.auth.sub;
    const [recent, favorites] = await Promise.all([
        prisma.userPlayHistory.findMany({
            where: { userId },
            include: { game: { include: { category: true, tags: { include: { tag: true } }, assets: { where: { type: "COVER" }, take: 1 } } } },
            orderBy: { lastPlayedAt: "desc" },
            take: 10,
        }),
        prisma.userFavorite.findMany({
            where: { userId },
            include: { game: { include: { category: true, tags: { include: { tag: true } }, assets: { where: { type: "COVER" }, take: 1 } } } },
            orderBy: { createdAt: "desc" },
            take: 20,
        }),
    ]);
    res.json({
        recent: recent.map((it) => ({
            gameId: it.gameId,
            slug: it.game.slug,
            title: it.game.title,
            progress: it.progress,
            bestScore: it.bestScore,
            lastPlayedAt: it.lastPlayedAt,
            coverUrl: it.game.assets[0]?.url ?? null,
        })),
        favorites: favorites.map((it) => ({
            gameId: it.gameId,
            slug: it.game.slug,
            title: it.game.title,
            coverUrl: it.game.assets[0]?.url ?? null,
        })),
    });
});
//# sourceMappingURL=user.js.map