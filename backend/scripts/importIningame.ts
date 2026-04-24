import { readFile } from "node:fs/promises";
import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/slug.js";

type RawItem = {
  gt: string;
  gn: string;
  ih?: number;
  so?: number;
};

const prisma = new PrismaClient();

function parseData(jsText: string): RawItem[] {
  const start = jsText.indexOf("[");
  const end = jsText.lastIndexOf("]");
  if (start < 0 || end < 0 || end <= start) throw new Error("Could not find array data in JS file");
  const json = jsText.slice(start, end + 1);
  const parsed = JSON.parse(json) as RawItem[];
  return parsed.filter((it) => it && typeof it.gt === "string" && typeof it.gn === "string");
}

function displayNameFromGn(gn: string) {
  return gn
    .replaceAll(/_/g, " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function gamePathNameFromGn(gn: string) {
  return gn.trim().replaceAll(/\s+/g, "_");
}

async function main() {
  const inputPath = process.argv[2];
  if (!inputPath) {
    throw new Error("Usage: npm run import:iningame -- <path-to-app_game.js>");
  }

  const text = await readFile(inputPath, "utf8");
  const items = parseData(text);
  if (!items.length) throw new Error("No game items found");

  const mainSection = await prisma.homeSection.upsert({
    where: { key: "trending" },
    create: { key: "trending", title: "Trending now", kind: "GRID", sortOrder: 10, maxItems: 48, isActive: true },
    update: {},
  });

  const hotSection = await prisma.homeSection.upsert({
    where: { key: "hot-now" },
    create: { key: "hot-now", title: "Hot now", kind: "GRID", sortOrder: 5, maxItems: 48, isActive: true },
    update: {},
  });

  const hotTag = await prisma.tag.upsert({
    where: { slug: "hot" },
    create: { slug: "hot", name: "Hot" },
    update: { name: "Hot" },
  });

  let upserted = 0;
  let hotCount = 0;

  const sorted = [...items].sort((a, b) => (b.so ?? 0) - (a.so ?? 0));

  for (let index = 0; index < sorted.length; index += 1) {
    const row = sorted[index];
    const categorySlug = slugify(row.gt);
    const gameSlug = slugify(row.gn);
    const gamePathName = gamePathNameFromGn(row.gn);
    const title = displayNameFromGn(row.gn);
    const isHot = row.ih === 1;
    const rank = index;
    const sectionSortOrder = -100000 + rank;
    const playUrl = `https://www.iningame.com/cy/gamebox/${gamePathName}/index.html`;
    const coverUrl = `https://www.iningame.com/cy/sdk/icon/${gamePathName}.jpg`;

    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      create: { slug: categorySlug, name: row.gt.trim() || "Other" },
      update: { name: row.gt.trim() || "Other" },
    });

    const game = await prisma.game.upsert({
      where: { slug: gameSlug },
      create: {
        slug: gameSlug,
        title,
        shortPitch: `${title} - ${row.gt}`,
        description: `${title} imported from app_game.js`,
        playUrl,
        status: "PUBLISHED",
        publishedAt: new Date(),
        categoryId: category.id,
      },
      update: {
        title,
        shortPitch: `${title} - ${row.gt}`,
        description: `${title} imported from app_game.js`,
        playUrl,
        status: "PUBLISHED",
        publishedAt: new Date(),
        categoryId: category.id,
      },
    });

    await prisma.gameTag.deleteMany({ where: { gameId: game.id, tagId: hotTag.id } });
    if (isHot) {
      await prisma.gameTag.create({ data: { gameId: game.id, tagId: hotTag.id } });
      hotCount += 1;
    }

    const existingCover = await prisma.gameAsset.findFirst({
      where: { gameId: game.id, type: "COVER" },
    });
    if (!existingCover) {
      await prisma.gameAsset.create({
        data: { gameId: game.id, type: "COVER", url: coverUrl, alt: "Cover", sortOrder: 0 },
      });
    } else {
      await prisma.gameAsset.update({
        where: { id: existingCover.id },
        data: { url: coverUrl, alt: "Cover", sortOrder: 0 },
      });
    }

    const mainItem = await prisma.homeSectionItem.findFirst({
      where: { sectionId: mainSection.id, gameId: game.id },
    });
    if (!mainItem) {
      await prisma.homeSectionItem.create({
        data: {
          sectionId: mainSection.id,
          gameId: game.id,
          sortOrder: sectionSortOrder,
        },
      });
    } else {
      await prisma.homeSectionItem.update({
        where: { id: mainItem.id },
        data: { sortOrder: sectionSortOrder },
      });
    }

    const hotItem = await prisma.homeSectionItem.findFirst({
      where: { sectionId: hotSection.id, gameId: game.id },
    });
    if (isHot) {
      if (!hotItem) {
        await prisma.homeSectionItem.create({
          data: {
            sectionId: hotSection.id,
            gameId: game.id,
            sortOrder: sectionSortOrder,
          },
        });
      } else {
        await prisma.homeSectionItem.update({
          where: { id: hotItem.id },
          data: { sortOrder: sectionSortOrder },
        });
      }
    } else if (hotItem) {
      await prisma.homeSectionItem.delete({ where: { id: hotItem.id } });
    }

    upserted += 1;
  }

  // eslint-disable-next-line no-console
  console.log("Import complete:", { total: items.length, upserted, hotCount });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
