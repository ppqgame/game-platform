import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { requireRole } from "../auth.js";
import { HttpError } from "../http.js";
export const managementRouter = Router();
managementRouter.get("/users", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const q = z
        .object({
        page: z.coerce.number().int().positive().default(1),
        pageSize: z.coerce.number().int().positive().max(100).default(30),
        search: z.string().optional(),
    })
        .parse(req.query);
    const where = q.search
        ? {
            OR: [{ email: { contains: q.search } }, { nickname: { contains: q.search } }],
        }
        : {};
    const [total, users] = await prisma.$transaction([
        prisma.endUser.count({ where }),
        prisma.endUser.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (q.page - 1) * q.pageSize,
            take: q.pageSize,
            include: {
                memberships: { orderBy: { expiresAt: "desc" }, take: 1 },
            },
        }),
    ]);
    res.json({
        page: q.page,
        pageSize: q.pageSize,
        total,
        users: users.map((u) => ({
            id: u.id,
            nickname: u.nickname,
            email: u.email,
            role: u.role,
            createdAt: u.createdAt,
            lastActiveAt: u.lastActiveAt,
            totalPlayCnt: u.totalPlayCnt,
            points: u.points,
            bannedAt: u.bannedAt,
            lastMembershipExpiresAt: u.memberships[0]?.expiresAt ?? null,
        })),
    });
});
managementRouter.post("/users/:id/role", requireRole("ADMIN"), async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const body = z.object({ role: z.enum(["USER", "MODERATOR", "ADMIN"]) }).parse(req.body);
    const user = await prisma.endUser.update({ where: { id }, data: { role: body.role } });
    res.json({ user: { id: user.id, role: user.role } });
});
managementRouter.get("/comments", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const q = z
        .object({
        page: z.coerce.number().int().positive().default(1),
        pageSize: z.coerce.number().int().positive().max(100).default(30),
        sort: z.enum(["latest", "helpful", "reports"]).default("helpful"),
        keyword: z.string().optional(),
    })
        .parse(req.query);
    const where = {
        ...(q.keyword ? { content: { contains: q.keyword } } : {}),
        parentId: null,
    };
    const orderBy = q.sort === "latest"
        ? [{ createdAt: "desc" }]
        : q.sort === "reports"
            ? [{ abuseReportCount: "desc" }, { createdAt: "desc" }]
            : [{ usefulCnt: "desc" }, { createdAt: "desc" }];
    const [total, comments] = await prisma.$transaction([
        prisma.comment.count({ where }),
        prisma.comment.findMany({
            where,
            include: { user: true, game: true },
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
            game: { id: c.game.id, slug: c.game.slug, title: c.game.title },
            user: { id: c.user.id, nickname: c.user.nickname },
            content: c.content,
            stars: c.stars,
            usefulCnt: c.usefulCnt,
            abuseReportCount: c.abuseReportCount,
            isHidden: c.isHidden,
            isPinned: c.isPinned,
            createdAt: c.createdAt,
        })),
    });
});
managementRouter.delete("/comments/:id", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    await prisma.comment.delete({ where: { id } });
    res.json({ ok: true });
});
managementRouter.post("/comments/:id/hide", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const body = z.object({ hidden: z.boolean() }).parse(req.body);
    const comment = await prisma.comment.update({ where: { id }, data: { isHidden: body.hidden } });
    res.json({ comment: { id: comment.id, isHidden: comment.isHidden } });
});
managementRouter.post("/comments/:id/pin", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const body = z.object({ pinned: z.boolean() }).parse(req.body);
    const comment = await prisma.comment.update({ where: { id }, data: { isPinned: body.pinned } });
    res.json({ comment: { id: comment.id, isPinned: comment.isPinned } });
});
managementRouter.get("/risk/users", requireRole("ADMIN", "MODERATOR"), async (_req, res) => {
    const suspicious = await prisma.endUser.findMany({
        where: { totalPlayCnt: { gte: 100 } },
        orderBy: { totalPlayCnt: "desc" },
        take: 50,
    });
    res.json({
        users: suspicious.map((u) => ({
            id: u.id,
            nickname: u.nickname,
            totalPlayCnt: u.totalPlayCnt,
            totalPlaySecs: u.totalPlaySecs,
            riskReason: "High play count in short period",
        })),
    });
});
managementRouter.get("/reports/games.csv", requireRole("ADMIN", "MODERATOR"), async (_req, res) => {
    const rows = await prisma.userPlayHistory.groupBy({
        by: ["gameId"],
        _count: { gameId: true },
        _sum: { durationSec: true },
        orderBy: { _count: { gameId: "desc" } },
        take: 200,
    });
    const games = await prisma.game.findMany({ where: { id: { in: rows.map((r) => r.gameId) } }, select: { id: true, slug: true, title: true } });
    const byId = new Map(games.map((g) => [g.id, g]));
    const csvLines = ["gameId,slug,title,starts,totalDurationSec"];
    for (const r of rows) {
        const g = byId.get(r.gameId);
        csvLines.push(`${r.gameId},${g?.slug ?? ""},\"${(g?.title ?? "").replaceAll("\"", "\"\"")}\",${r._count.gameId},${r._sum.durationSec ?? 0}`);
    }
    res.setHeader("content-type", "text/csv; charset=utf-8");
    res.setHeader("content-disposition", "attachment; filename=game-report.csv");
    res.send(csvLines.join("\n"));
});
managementRouter.post("/users/:id/ban", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const user = await prisma.endUser.update({ where: { id }, data: { bannedAt: new Date() } });
    res.json({ user: { id: user.id, bannedAt: user.bannedAt } });
});
managementRouter.post("/users/:id/unban", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const user = await prisma.endUser.update({ where: { id }, data: { bannedAt: null } });
    res.json({ user: { id: user.id, bannedAt: user.bannedAt } });
});
managementRouter.post("/users/:id/points", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const body = z.object({ points: z.number().int() }).parse(req.body);
    const user = await prisma.endUser.update({ where: { id }, data: { points: body.points } });
    res.json({ user: { id: user.id, points: user.points } });
});
managementRouter.post("/users/:id/message", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const body = z.object({ title: z.string().min(1), content: z.string().min(1) }).parse(req.body);
    const user = await prisma.endUser.findUnique({ where: { id } });
    if (!user)
        throw new HttpError(404, "User not found");
    await prisma.eventLog.create({
        data: {
            userId: id,
            eventName: "system_message",
            payload: JSON.stringify({ title: body.title, content: body.content }),
        },
    });
    res.json({ ok: true });
});
//# sourceMappingURL=management.js.map