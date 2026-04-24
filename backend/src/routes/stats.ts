import { Router } from "express";
import { prisma } from "../db.js";
import { requireRole } from "../auth.js";

export const statsRouter = Router();

statsRouter.get("/dashboard", requireRole("ADMIN", "MODERATOR"), async (_req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const [todayStarts, totalUsers, totalGames, ratings, comments] = await Promise.all([
    prisma.eventLog.count({ where: { eventName: "game_start", createdAt: { gte: todayStart } } }),
    prisma.endUser.count(),
    prisma.game.count({ where: { status: "PUBLISHED" } }),
    prisma.userRating.count(),
    prisma.comment.count({ where: { parentId: null, isHidden: false } }),
  ]);
  res.json({
    realtime: {
      todayStarts,
      totalUsers,
      totalGames,
      ratings,
      comments,
      estimatedAdRevenue: Number((todayStarts * 0.0025).toFixed(2)),
    },
  });
});

statsRouter.get("/leaderboard/games", requireRole("ADMIN", "MODERATOR"), async (_req, res) => {
  const rows = await prisma.userPlayHistory.groupBy({
    by: ["gameId"],
    _sum: { durationSec: true },
    _count: { gameId: true },
    orderBy: { _count: { gameId: "desc" } },
    take: 20,
  });
  const games = await prisma.game.findMany({ where: { id: { in: rows.map((r) => r.gameId) } }, select: { id: true, slug: true, title: true } });
  const byId = new Map(games.map((g) => [g.id, g]));
  res.json({
    leaderboard: rows.map((r) => ({
      gameId: r.gameId,
      slug: byId.get(r.gameId)?.slug ?? "",
      title: byId.get(r.gameId)?.title ?? "Unknown",
      starts: r._count.gameId,
      totalDurationSec: r._sum.durationSec ?? 0,
    })),
  });
});

