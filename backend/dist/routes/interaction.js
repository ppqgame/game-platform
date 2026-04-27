import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { HttpError } from "../http.js";
import { requireAuth, verifyAccessToken } from "../auth.js";
export const interactionRouter = Router();
interactionRouter.post("/favorites/:slug", requireAuth, async (req, res) => {
    const slug = z.string().min(1).parse(req.params.slug);
    const game = await prisma.game.findUnique({ where: { slug } });
    if (!game)
        throw new HttpError(404, "Game not found");
    await prisma.userFavorite.upsert({
        where: { userId_gameId: { userId: req.auth.sub, gameId: game.id } },
        create: { userId: req.auth.sub, gameId: game.id },
        update: {},
    });
    res.json({ ok: true });
});
interactionRouter.delete("/favorites/:slug", requireAuth, async (req, res) => {
    const slug = z.string().min(1).parse(req.params.slug);
    const game = await prisma.game.findUnique({ where: { slug } });
    if (!game)
        throw new HttpError(404, "Game not found");
    await prisma.userFavorite.deleteMany({ where: { userId: req.auth.sub, gameId: game.id } });
    res.json({ ok: true });
});
interactionRouter.post("/games/:slug/start", requireAuth, async (req, res) => {
    const slug = z.string().min(1).parse(req.params.slug);
    const body = z.object({ durationSec: z.number().int().nonnegative().default(0), progress: z.number().int().min(0).max(100).default(0), bestScore: z.number().int().optional() }).parse(req.body ?? {});
    const game = await prisma.game.findUnique({ where: { slug } });
    if (!game)
        throw new HttpError(404, "Game not found");
    const history = await prisma.userPlayHistory.findFirst({ where: { userId: req.auth.sub, gameId: game.id } });
    if (history) {
        await prisma.userPlayHistory.update({
            where: { id: history.id },
            data: {
                durationSec: history.durationSec + body.durationSec,
                progress: Math.max(history.progress, body.progress),
                bestScore: body.bestScore ? Math.max(history.bestScore ?? 0, body.bestScore) : history.bestScore,
                lastPlayedAt: new Date(),
            },
        });
    }
    else {
        await prisma.userPlayHistory.create({
            data: { userId: req.auth.sub, gameId: game.id, durationSec: body.durationSec, progress: body.progress, bestScore: body.bestScore },
        });
    }
    await prisma.$transaction([
        prisma.game.update({ where: { id: game.id }, data: { launchCount: { increment: 1 } } }),
        prisma.endUser.update({ where: { id: req.auth.sub }, data: { lastActiveAt: new Date() } }),
        prisma.eventLog.create({
            data: { userId: req.auth.sub, gameId: game.id, eventName: "game_start", payload: JSON.stringify(body) },
        }),
    ]);
    res.json({ ok: true });
});
interactionRouter.post("/games/:slug/rating", requireAuth, async (req, res) => {
    const slug = z.string().min(1).parse(req.params.slug);
    const body = z.object({ stars: z.number().int().min(1).max(5) }).parse(req.body);
    const game = await prisma.game.findUnique({ where: { slug } });
    if (!game)
        throw new HttpError(404, "Game not found");
    const rating = await prisma.userRating.upsert({
        where: { userId_gameId: { userId: req.auth.sub, gameId: game.id } },
        create: { userId: req.auth.sub, gameId: game.id, stars: body.stars },
        update: { stars: body.stars },
    });
    res.json({ rating });
});
interactionRouter.get("/games/:slug/comments", async (req, res) => {
    const slug = z.string().min(1).parse(req.params.slug);
    const q = z.object({ page: z.coerce.number().int().positive().default(1), pageSize: z.coerce.number().int().positive().max(50).default(20), sort: z.enum(["latest", "helpful"]).default("latest") }).parse(req.query);
    const game = await prisma.game.findUnique({ where: { slug } });
    if (!game)
        throw new HttpError(404, "Game not found");
    let viewerId = null;
    try {
        const auth = req.header("authorization") || "";
        const m = auth.match(/^Bearer\s+(.+)$/i);
        if (m?.[1])
            viewerId = verifyAccessToken(m[1]).sub;
    }
    catch {
        viewerId = null;
    }
    const orderBy = q.sort === "helpful" ? [{ usefulCnt: "desc" }, { createdAt: "desc" }] : [{ createdAt: "desc" }];
    const where = {
        gameId: game.id,
        parentId: null,
        OR: [{ isHidden: false }, ...(viewerId ? [{ userId: viewerId }] : [])],
    };
    const [total, comments] = await prisma.$transaction([
        prisma.comment.count({ where }),
        prisma.comment.findMany({
            where,
            include: {
                user: true,
                replies: {
                    where: {
                        OR: [{ isHidden: false }, ...(viewerId ? [{ userId: viewerId }] : [])],
                    },
                    include: { user: true },
                    orderBy: { createdAt: "asc" },
                },
            },
            orderBy,
            skip: (q.page - 1) * q.pageSize,
            take: q.pageSize,
        }),
    ]);
    res.json({
        page: q.page,
        pageSize: q.pageSize,
        total,
        comments: comments.map((c) => ({
            id: c.id,
            stars: c.stars,
            content: c.content,
            createdAt: c.createdAt,
            user: { id: c.user.id, nickname: c.user.nickname, avatarUrl: c.user.avatarUrl },
            replies: c.replies.map((r) => ({
                id: r.id,
                content: r.content,
                createdAt: r.createdAt,
                user: { id: r.user.id, nickname: r.user.nickname, avatarUrl: r.user.avatarUrl },
            })),
        })),
    });
});
interactionRouter.post("/games/:slug/comments", requireAuth, async (req, res) => {
    const slug = z.string().min(1).parse(req.params.slug);
    const body = z.object({ stars: z.number().int().min(1).max(5), content: z.string().min(1).max(500), parentId: z.string().optional() }).parse(req.body);
    const game = await prisma.game.findUnique({ where: { slug } });
    if (!game)
        throw new HttpError(404, "Game not found");
    const comment = await prisma.comment.create({
        data: {
            userId: req.auth.sub,
            gameId: game.id,
            parentId: body.parentId,
            stars: body.parentId ? null : body.stars,
            content: body.content,
            isHidden: true,
        },
    });
    res.status(201).json({ comment });
});
interactionRouter.post("/comments/:id/useful", requireAuth, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment)
        throw new HttpError(404, "Comment not found");
    const exists = await prisma.commentVote.findFirst({ where: { userId: req.auth.sub, commentId: id } });
    if (exists)
        return res.json({ ok: true, duplicated: true });
    await prisma.$transaction([
        prisma.commentVote.create({ data: { userId: req.auth.sub, commentId: id } }),
        prisma.comment.update({ where: { id }, data: { usefulCnt: { increment: 1 } } }),
    ]);
    res.json({ ok: true });
});
//# sourceMappingURL=interaction.js.map