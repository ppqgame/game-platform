import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/auth.js";
import { env } from "../src/env.js";

const prisma = new PrismaClient();

const GAME_TYPES = [
  { type_id: 1, type_name: "竞速", english: "Racing", slug: "racing" },
  { type_id: 2, type_name: "休闲", english: "Casual", slug: "casual" },
  { type_id: 3, type_name: "文字", english: "Word", slug: "word" },
  { type_id: 5, type_name: "街机", english: "Arcade", slug: "arcade" },
  { type_id: 6, type_name: "桌面和棋类", english: "Board", slug: "board" },
  { type_id: 7, type_name: "冒险", english: "Adventure", slug: "adventure" },
  { type_id: 8, type_name: "动作", english: "Action", slug: "action" },
  { type_id: 9, type_name: "策略", english: "Strategy", slug: "strategy" },
  { type_id: 10, type_name: "体育", english: "Sports", slug: "sports" },
  { type_id: 11, type_name: "角色扮演", english: "Role Playing", slug: "role-playing" },
  { type_id: 13, type_name: "益智", english: "Puzzle", slug: "puzzle" },
  { type_id: 15, type_name: "音乐", english: "Music", slug: "music" },
  { type_id: 16, type_name: "模拟", english: "Simulation", slug: "simulation" },
  { type_id: 17, type_name: "教育", english: "Education", slug: "education" },
  { type_id: 18, type_name: "卡牌", english: "Card", slug: "card" },
  { type_id: 20, type_name: "赌场", english: "Casino", slug: "casino" },
] as const;

async function main() {
  await prisma.$transaction([
    prisma.auditLog.deleteMany(),
    prisma.homeSectionItem.deleteMany(),
    prisma.homeSection.deleteMany(),
    prisma.gameTag.deleteMany(),
    prisma.gameAsset.deleteMany(),
    prisma.game.deleteMany(),
    prisma.tag.deleteMany(),
    prisma.category.deleteMany(),
    prisma.eventLog.deleteMany(),
    prisma.commentVote.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.userRating.deleteMany(),
    prisma.userPlayHistory.deleteMany(),
    prisma.userFavorite.deleteMany(),
    prisma.userTaskProgress.deleteMany(),
    prisma.userCheckin.deleteMany(),
    prisma.pointLedger.deleteMany(),
    prisma.userMembership.deleteMany(),
    prisma.membershipPlan.deleteMany(),
    prisma.taskDefinition.deleteMany(),
    prisma.searchConfig.deleteMany(),
    prisma.bannerConfig.deleteMany(),
    prisma.userSession.deleteMany(),
    prisma.endUser.deleteMany(),
    prisma.adminUser.deleteMany(),
  ]);

  const passwordHash = await hashPassword(env.ADMIN_SEED_PASSWORD);
  const admin = await prisma.adminUser.create({
    data: { email: env.ADMIN_SEED_EMAIL, passwordHash },
  });

  const categories = await Promise.all(
    GAME_TYPES.map((c) =>
      prisma.category.create({
        data: {
          slug: c.slug,
          name: `${c.type_name} (${c.english})`,
        },
      })
    )
  );
  const categoriesBySlug = new Map(categories.map((c) => [c.slug, c]));

  const tagQuick = await prisma.tag.create({ data: { slug: "quick-play", name: "Quick play" } });
  const tagCoop = await prisma.tag.create({ data: { slug: "co-op", name: "Co-op" } });
  const tagRelax = await prisma.tag.create({ data: { slug: "relaxing", name: "Relaxing" } });

  const gameA = await prisma.game.create({
    data: {
      slug: "neon-drift-runner",
      title: "Neon Drift Runner",
      shortPitch: "Dodge, drift, and chase high scores in a synthwave city.",
      description:
        "A fast arcade runner built for short sessions. Collect boosts, avoid hazards, and climb the leaderboard.",
      playUrl: "https://example.com/games/neon-drift-runner",
      embedUrl: null,
      status: "PUBLISHED",
      publishedAt: new Date(),
      categoryId: categoriesBySlug.get("arcade")!.id,
      tags: { create: [{ tagId: tagQuick.id }] },
      assets: {
        create: [
          { type: "COVER", url: "https://picsum.photos/seed/neon-cover/640/360", alt: "Cover", sortOrder: 0 },
          { type: "BANNER", url: "https://picsum.photos/seed/neon-banner/1200/420", alt: "Banner", sortOrder: 0 },
          {
            type: "SCREENSHOT",
            url: "https://picsum.photos/seed/neon-shot-1/960/540",
            alt: "Screenshot",
            sortOrder: 0,
          },
          {
            type: "SCREENSHOT",
            url: "https://picsum.photos/seed/neon-shot-2/960/540",
            alt: "Screenshot",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  const gameB = await prisma.game.create({
    data: {
      slug: "tile-garden-solver",
      title: "Tile Garden Solver",
      shortPitch: "Calm puzzles with clever tile mechanics and cozy art.",
      description:
        "Plan your moves, clear the board, and unlock new garden themes. Designed for relaxed play on mobile.",
      playUrl: "https://example.com/games/tile-garden-solver",
      embedUrl: null,
      status: "PUBLISHED",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      categoryId: categoriesBySlug.get("puzzle")!.id,
      tags: { create: [{ tagId: tagRelax.id }, { tagId: tagCoop.id }] },
      assets: {
        create: [
          { type: "COVER", url: "https://picsum.photos/seed/tile-cover/640/360", alt: "Cover", sortOrder: 0 },
          { type: "BANNER", url: "https://picsum.photos/seed/tile-banner/1200/420", alt: "Banner", sortOrder: 0 },
        ],
      },
    },
  });

  const trending = await prisma.homeSection.create({
    data: { key: "trending", title: "Trending now", kind: "GRID", sortOrder: 10, maxItems: 12, isActive: true },
  });

  const fresh = await prisma.homeSection.create({
    data: { key: "fresh", title: "Fresh picks", kind: "LIST", sortOrder: 20, maxItems: 12, isActive: true },
  });

  await prisma.homeSectionItem.createMany({
    data: [
      { sectionId: trending.id, gameId: gameA.id, sortOrder: 0 },
      { sectionId: trending.id, gameId: gameB.id, sortOrder: 1 },
      { sectionId: fresh.id, gameId: gameB.id, sortOrder: 0 },
      { sectionId: fresh.id, gameId: gameA.id, sortOrder: 1 },
    ],
  });

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "SEED",
      entity: "Database",
      details: JSON.stringify({ games: [gameA.slug, gameB.slug] }),
    },
  });

  await prisma.searchConfig.create({
    data: {
      hotKeywords: JSON.stringify({
        hotKeywords: ["racing", "puzzle", "multiplayer", "strategy"],
        notices: [],
      }),
    },
  });

  await prisma.taskDefinition.createMany({
    data: [
      { key: "daily_play_3", title: "每日游玩3场", type: "DAILY", targetValue: 3, rewardPoint: 30 },
      { key: "newbie_rate_once", title: "首次评分", type: "NEWBIE", targetValue: 1, rewardPoint: 20 },
    ],
  });

  await prisma.membershipPlan.createMany({
    data: [
      { code: "vip_month", title: "月卡会员", months: 1, priceCents: 1900, benefits: JSON.stringify({ noAds: true, doublePoints: true }) },
      { code: "vip_year", title: "年卡会员", months: 12, priceCents: 16800, benefits: JSON.stringify({ noAds: true, doublePoints: true, dailyGift: true }) },
    ],
  });

  await prisma.bannerConfig.create({
    data: {
      title: "Top picks this week",
      imageUrl: "https://picsum.photos/seed/banner-main/1200/420",
      gameId: gameA.id,
      sortOrder: 1,
      isActive: true,
    },
  });

  // eslint-disable-next-line no-console
  console.log("Seed complete:", {
    admin: admin.email,
    categoryCount: categories.length,
    games: [gameA.slug, gameB.slug],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
