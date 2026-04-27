import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { prisma } from "../db.js";
import { HttpError } from "../http.js";
import { parseSearchConfigJson } from "../searchConfigJson.js";

export const publicRouter = Router();

/** 前台只展示已发布且未软删的游戏 */
const liveGame: Prisma.GameWhereInput = { status: "PUBLISHED", deletedAt: null };

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(20),
});

function normalizePlayableUrlForResponse(v: string | null) {
  if (!v) return v;
  if (v.startsWith("/games/")) return v.replace(/^\/games\//, "/play/");
  if (/^https?:\/\//i.test(v)) {
    try {
      const u = new URL(v);
      if (u.pathname.startsWith("/games/")) {
        u.pathname = u.pathname.replace(/^\/games\//, "/play/");
        return u.toString();
      }
    } catch {
      return v;
    }
  }
  return v;
}

publicRouter.get("/health", (_req, res) => {
  res.json({ ok: true });
});

publicRouter.get("/categories", async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { createdAt: "asc" } });
  res.json({ categories });
});

publicRouter.get("/search/suggest", async (req, res) => {
  const q = z.object({ q: z.string().optional() }).parse(req.query).q?.trim() ?? "";
  const [games, hot] = await Promise.all([
    q
      ? prisma.game.findMany({
          where: {
            ...liveGame,
            OR: [{ title: { contains: q } }, { slug: { contains: q } }],
          },
          select: { slug: true, title: true },
          take: 8,
        })
      : Promise.resolve([]),
    prisma.searchConfig.findFirst(),
  ]);
  const { hotKeywords } = parseSearchConfigJson(hot?.hotKeywords);
  res.json({ suggestions: games, hotKeywords: hotKeywords.slice(0, 8), historyEnabled: hot?.enableHistory ?? true });
});

publicRouter.get("/games", async (req, res) => {
  const query = z
    .object({
      ...paginationSchema.shape,
      q: z.string().optional(),
      category: z.string().optional(),
      tag: z.string().optional(),
      sort: z.enum(["new", "title"]).default("new"),
    })
    .parse(req.query);

  const where: Prisma.GameWhereInput = {
    ...liveGame,
  };

  if (query.q) {
    where.OR = [
      { title: { contains: query.q } },
      { shortPitch: { contains: query.q } },
      { slug: { contains: query.q } },
    ];
  }

  if (query.category) {
    where.category = { slug: query.category };
  }

  if (query.tag) {
    where.tags = { some: { tag: { slug: query.tag } } };
  }

  const orderBy =
    query.sort === "title"
      ? ({ title: "asc" } as const)
      : ({ publishedAt: "desc" } as const);

  const [total, games] = await prisma.$transaction([
    prisma.game.count({ where }),
    prisma.game.findMany({
      where,
      orderBy,
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      include: {
        category: true,
        tags: { include: { tag: true } },
        assets: { where: { type: "COVER" }, take: 1 },
      },
    }),
  ]);

  res.json({
    page: query.page,
    pageSize: query.pageSize,
    total,
    games: games.map(mapPublicGameCard),
  });
});

publicRouter.get("/games/:slug", async (req, res) => {
  const slug = z.string().min(1).parse(req.params.slug);

  const game = await prisma.game.findFirst({
    where: { slug, ...liveGame },
    include: {
      category: true,
      tags: { include: { tag: true } },
      assets: { orderBy: [{ type: "asc" }, { sortOrder: "asc" }] },
    },
  });

  if (!game) throw new HttpError(404, "Game not found");

  res.json({ game: mapPublicGameDetail(game) });
});

publicRouter.get("/home", async (_req, res) => {
  const [hotGames, newGames, recommendedGames, banners] = await Promise.all([
    prisma.game.findMany({
      where: { ...liveGame, isHot: true },
      orderBy: [{ launchCount: "desc" }, { updatedAt: "desc" }],
      take: 30,
      include: { category: true, tags: { include: { tag: true } }, assets: { where: { type: "COVER" }, take: 1 } },
    }),
    prisma.game.findMany({
      where: { ...liveGame },
      orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
      take: 10,
      include: { category: true, tags: { include: { tag: true } }, assets: { where: { type: "COVER" }, take: 1 } },
    }),
    prisma.game.findMany({
      where: { ...liveGame, isHomeRecommended: true },
      orderBy: [{ updatedAt: "desc" }],
      take: 30,
      include: { category: true, tags: { include: { tag: true } }, assets: { where: { type: "COVER" }, take: 1 } },
    }),
    prisma.bannerConfig.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 8,
    }),
  ]);

  res.json({
    banners: banners.map((b) => ({
      id: b.id,
      title: b.title,
      imageUrl: b.imageUrl,
      videoUrl: b.videoUrl,
      gameId: b.gameId,
      startsAt: b.startsAt,
      endsAt: b.endsAt,
    })),
    sections: [
      { key: "hot", title: "HOT", kind: "GRID", games: hotGames.map(mapPublicGameCard) },
      { key: "new", title: "NEW", kind: "GRID", games: newGames.map(mapPublicGameCard) },
      { key: "recommended", title: "推荐", kind: "GRID", games: recommendedGames.map(mapPublicGameCard) },
    ],
  });
});

publicRouter.get("/discover", async (req, res) => {
  const query = z
    .object({
      ...paginationSchema.shape,
      category: z.string().optional(),
      tags: z
        .string()
        .optional()
        .transform((v) => (v ? v.split(",").map((x) => x.trim()).filter(Boolean) : [])),
      age: z.enum(["all", "12+", "16+", "18+"]).optional(),
      sort: z.enum(["default", "plays", "rating", "new"]).default("default"),
    })
    .parse(req.query);

  const where: Prisma.GameWhereInput = { ...liveGame };
  if (query.category) where.category = { slug: query.category };
  if (query.tags.length) where.tags = { some: { tag: { slug: { in: query.tags } } } };
  if (query.age && query.age !== "all") {
    const map: Record<string, string> = { "12+": "P12", "16+": "P16", "18+": "P18" };
    const ar = map[query.age];
    if (ar) where.ageRating = ar;
  }
  const orderBy: Prisma.GameOrderByWithRelationInput =
    query.sort === "new" ? { publishedAt: "desc" } : query.sort === "plays" ? { launchCount: "desc" } : { updatedAt: "desc" };

  const [total, games] = await prisma.$transaction([
    prisma.game.count({ where }),
    prisma.game.findMany({
      where,
      orderBy,
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
      include: { category: true, tags: { include: { tag: true } }, assets: { where: { type: "COVER" }, take: 1 } },
    }),
  ]);

  res.json({ page: query.page, pageSize: query.pageSize, total, games: games.map(mapPublicGameCard) });
});

publicRouter.post("/games/:slug/report", async (req, res) => {
  const slug = z.string().min(1).parse(req.params.slug);
  const body = z
    .object({
      reason: z.enum(["porn", "violence", "infringement", "other"]),
      detail: z.string().max(2000).optional().default(""),
    })
    .parse(req.body);
  const game = await prisma.game.findFirst({ where: { slug, ...liveGame } });
  if (!game) throw new HttpError(404, "Game not found");
  await prisma.gameReport.create({ data: { gameId: game.id, reason: body.reason, detail: body.detail } });
  res.status(201).json({ ok: true });
});

function mapPublicGameDetail(game: {
  slug: string;
  title: string;
  shortPitch: string;
  description: string;
  playUrl: string | null;
  embedUrl: string | null;
  publishedAt: Date | null;
  ageRating?: string | null;
  developer?: string | null;
  cacheBust?: number;
  screenOrientation?: "LANDSCAPE" | "PORTRAIT";
  category: { slug: string; name: string } | null;
  tags: Array<{ tag: { slug: string; name: string } }>;
  assets: Array<{ type: string; url: string; alt: string | null; sortOrder: number }>;
}) {
  const cover = game.assets.find((a) => a.type === "COVER")?.url ?? null;
  const banner = game.assets.find((a) => a.type === "BANNER")?.url ?? null;
  const iconAssets = game.assets
    .filter((a) => a.type === "COVER")
    .map((a) => ({ kind: "ICON" as const, url: a.url, alt: a.alt }));
  const bannerAssets = game.assets
    .filter((a) => a.type === "BANNER")
    .map((a) => ({ kind: "BANNER" as const, url: a.url, alt: a.alt }));
  const screenshotAssets = game.assets
    .filter((a) => a.type === "SCREENSHOT")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((a) => ({ kind: "SCREENSHOT" as const, url: a.url, alt: a.alt }));
  const screenshots = game.assets
    .filter((a) => a.type === "SCREENSHOT")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((a) => ({ url: a.url, alt: a.alt }));

  return {
    slug: game.slug,
    title: game.title,
    shortPitch: game.shortPitch,
    description: game.description,
    playUrl: normalizePlayableUrlForResponse(game.playUrl),
    embedUrl: game.embedUrl,
    coverUrl: cover,
    bannerUrl: banner,
    mediaAssets: [...iconAssets, ...bannerAssets, ...screenshotAssets],
    screenshots,
    category: game.category ? { slug: game.category.slug, name: game.category.name } : null,
    tags: game.tags.map((t) => ({ slug: t.tag.slug, name: t.tag.name })),
    publishedAt: game.publishedAt,
    ageRating: game.ageRating ?? "ALL",
    developer: game.developer ?? null,
    cacheBust: game.cacheBust ?? 0,
    screenOrientation: game.screenOrientation ?? "LANDSCAPE",
  };
}

type PublicGameCardSource = {
  slug: string;
  title: string;
  shortPitch: string;
  publishedAt: Date | null;
  category: { slug: string; name: string } | null;
  tags: Array<{ tag: { slug: string; name: string } }>;
  assets: Array<{ url: string }>;
};

function mapPublicGameCard(game: PublicGameCardSource) {
  const cover = game.assets[0]?.url ?? null;
  const tags = game.tags.map((t) => ({ slug: t.tag.slug, name: t.tag.name }));

  return {
    slug: game.slug,
    title: game.title,
    shortPitch: game.shortPitch,
    coverUrl: cover,
    category: game.category ? { slug: game.category.slug, name: game.category.name } : null,
    tags,
    publishedAt: game.publishedAt,
  };
}
