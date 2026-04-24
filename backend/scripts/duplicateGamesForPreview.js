import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function pick(arr, idx) {
  return arr[idx % arr.length];
}

async function main() {
  const sourceGames = await prisma.game.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "asc" },
    take: 2,
    include: {
      tags: true,
      assets: true,
    },
  });

  if (sourceGames.length < 2) {
    throw new Error("当前可用游戏不足 2 条，无法复制。");
  }

  let created = 0;
  for (let i = 1; i <= 50; i += 1) {
    const base = pick(sourceGames, i - 1);
    const suffix = String(i).padStart(2, "0");
    const slug = `${base.slug}-copy-${Date.now()}-${suffix}`;
    const title = `${base.title} 复制版 ${suffix}`;

    const game = await prisma.game.create({
      data: {
        slug,
        title,
        shortPitch: base.shortPitch,
        description: base.description,
        playUrl: base.playUrl,
        embedUrl: base.embedUrl,
        status: base.status,
        publishedAt: base.publishedAt,
        developer: base.developer,
        ageRating: base.ageRating,
        screenOrientation: base.screenOrientation,
        titleI18nJson: base.titleI18nJson,
        extConfigJson: base.extConfigJson,
        launchCount: 0,
        cacheBust: 0,
        categoryId: base.categoryId,
      },
    });

    if (base.tags.length) {
      await prisma.gameTag.createMany({
        data: base.tags.map((t) => ({ gameId: game.id, tagId: t.tagId })),
      });
    }

    if (base.assets.length) {
      await prisma.gameAsset.createMany({
        data: base.assets.map((a) => ({
          gameId: game.id,
          type: a.type,
          url: a.url,
          alt: a.alt,
          sortOrder: a.sortOrder,
        })),
      });
    }

    created += 1;
  }

  const total = await prisma.game.count({ where: { deletedAt: null } });
  console.log(`done: created ${created} copies, non-deleted total ${total}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
