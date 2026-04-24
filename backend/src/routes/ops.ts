import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { requireRole } from "../auth.js";
import { HttpError } from "../http.js";
import { parseSearchConfigJson, serializeSearchConfigJson } from "../searchConfigJson.js";

export const opsRouter = Router();

opsRouter.get("/banners", async (_req, res) => {
  const list = await prisma.bannerConfig.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  res.json({ banners: list });
});

opsRouter.post("/banners", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
  const body = z
    .object({
      title: z.string().min(1).max(120),
      imageUrl: z.string().url().optional().nullable(),
      videoUrl: z.string().url().optional().nullable(),
      gameSlug: z.string().optional(),
      startsAt: z.string().datetime().optional(),
      endsAt: z.string().datetime().optional(),
      sortOrder: z.number().int().default(0),
      isActive: z.boolean().default(true),
    })
    .parse(req.body);
  let gameId: string | null = null;
  if (body.gameSlug) {
    const game = await prisma.game.findUnique({ where: { slug: body.gameSlug } });
    if (!game) throw new HttpError(404, "Game not found");
    gameId = game.id;
  }
  const banner = await prisma.bannerConfig.create({
    data: {
      title: body.title,
      imageUrl: body.imageUrl ?? null,
      videoUrl: body.videoUrl ?? null,
      gameId,
      startsAt: body.startsAt ? new Date(body.startsAt) : null,
      endsAt: body.endsAt ? new Date(body.endsAt) : null,
      sortOrder: body.sortOrder,
      isActive: body.isActive,
    },
  });
  res.status(201).json({ banner });
});

opsRouter.get("/tasks", async (_req, res) => {
  const tasks = await prisma.taskDefinition.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" } });
  res.json({ tasks });
});

opsRouter.post("/tasks", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
  const body = z
    .object({
      key: z.string().min(1),
      title: z.string().min(1),
      type: z.enum(["DAILY", "NEWBIE"]),
      targetValue: z.number().int().positive(),
      rewardPoint: z.number().int().positive(),
    })
    .parse(req.body);
  const task = await prisma.taskDefinition.upsert({
    where: { key: body.key },
    create: body,
    update: body,
  });
  res.json({ task });
});

opsRouter.get("/announcements", async (_req, res) => {
  const row = await prisma.searchConfig.findFirst();
  const { notices } = parseSearchConfigJson(row?.hotKeywords);
  res.json({ notices });
});

opsRouter.post("/announcements", requireRole("ADMIN", "MODERATOR"), async (req, res) => {
  const body = z.object({ notices: z.array(z.string()).max(20) }).parse(req.body);
  const row = await prisma.searchConfig.findFirst();
  if (!row) {
    const created = await prisma.searchConfig.create({
      data: { hotKeywords: serializeSearchConfigJson({ hotKeywords: [], notices: body.notices }), enableHistory: true },
    });
    return res.json({ notices: parseSearchConfigJson(created.hotKeywords).notices });
  }
  const prev = parseSearchConfigJson(row.hotKeywords);
  const next = serializeSearchConfigJson({ hotKeywords: prev.hotKeywords, notices: body.notices });
  const updated = await prisma.searchConfig.update({
    where: { id: row.id },
    data: { hotKeywords: next },
  });
  res.json({ notices: parseSearchConfigJson(updated.hotKeywords).notices });
});

