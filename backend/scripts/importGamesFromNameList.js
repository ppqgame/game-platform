import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const LIST_FILE = "e:/work/tool/tool-提取文件名/a.txt";
const FRONTEND_GAMES_DIR = path.join(process.cwd(), "..", "frontend", "games");

function slugify(input) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function upsertAssets(gameId, coverUrl, bannerUrl) {
  await prisma.gameAsset.deleteMany({
    where: { gameId, type: { in: ["COVER", "BANNER"] } },
  });
  await prisma.gameAsset.createMany({
    data: [
      { gameId, type: "COVER", url: coverUrl, alt: "Cover", sortOrder: 0 },
      { gameId, type: "BANNER", url: bannerUrl, alt: "Banner", sortOrder: 0 },
    ],
  });
}

async function main() {
  const raw = fs.readFileSync(LIST_FILE, "utf8");
  const names = raw
    .split(/\r?\n/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const categories = await prisma.category.findMany({ select: { id: true } });
  if (!categories.length) throw new Error("No categories found");

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const gameName of names) {
    const indexPath = path.join(FRONTEND_GAMES_DIR, gameName, "index.html");
    if (!fs.existsSync(indexPath)) {
      skipped += 1;
      continue;
    }

    const indexHtml = fs.readFileSync(indexPath, "utf8");
    const screenOrientation = indexHtml.includes("show_banner:0") ? "LANDSCAPE" : "PORTRAIT";
    const playUrl = `/games/${gameName}/index.html`;
    const coverUrl = `/uploads/images/${gameName}.jpg`;
    const bannerUrl = coverUrl;
    const categoryId = pickRandom(categories).id;

    const baseSlug = slugify(gameName) || gameName.replace(/\s+/g, "-");
    let slug = baseSlug;
    let i = 2;
    // make slug unique for create
    while (true) {
      const found = await prisma.game.findUnique({ where: { slug } });
      if (!found) break;
      if (found.title === gameName) break;
      slug = `${baseSlug}-${i++}`;
    }

    const existing = await prisma.game.findFirst({
      where: { OR: [{ title: gameName }, { slug: baseSlug }, { slug }] },
      select: { id: true },
    });

    if (!existing) {
      const game = await prisma.game.create({
        data: {
          slug,
          title: gameName,
          shortPitch: gameName,
          description: `${gameName} 自动导入`,
          playUrl,
          embedUrl: null,
          status: "PUBLISHED",
          publishedAt: new Date(),
          developer: "Auto Import",
          ageRating: "ALL",
          screenOrientation,
          titleI18nJson: "{}",
          extConfigJson: "{}",
          isHot: true,
          isHomeRecommended: true,
          categoryId,
        },
      });
      await upsertAssets(game.id, coverUrl, bannerUrl);
      created += 1;
      continue;
    }

    await prisma.game.update({
      where: { id: existing.id },
      data: {
        title: gameName,
        playUrl,
        status: "PUBLISHED",
        publishedAt: new Date(),
        screenOrientation,
        isHot: true,
        isHomeRecommended: true,
        categoryId,
      },
    });
    await upsertAssets(existing.id, coverUrl, bannerUrl);
    updated += 1;
  }

  console.log(JSON.stringify({ totalInput: names.length, created, updated, skipped }, null, 2));
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

