import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const titles = ["Tile Garden Solver", "Neon Drift Runner"];
  const games = await prisma.game.findMany({
    where: { title: { in: titles }, deletedAt: null },
    select: { id: true, title: true },
  });

  for (const g of games) {
    await prisma.$transaction([
      prisma.homeSectionItem.deleteMany({ where: { gameId: g.id } }),
      prisma.game.update({
        where: { id: g.id },
        data: { deletedAt: new Date(), status: "ARCHIVED" },
      }),
    ]);
  }

  console.log(JSON.stringify({ requested: titles, matched: games.map((g) => g.title), deleted: games.length }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

