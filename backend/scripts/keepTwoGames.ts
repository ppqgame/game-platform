import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Prefer these two (original seed games). Fallback: any two oldest by createdAt. */
const PREFERRED_SLUGS = ["neon-drift-runner", "tile-garden-solver"] as const;

async function main() {
  const preferred = await prisma.game.findMany({
    where: { slug: { in: [...PREFERRED_SLUGS] } },
  });

  let keepIds: string[];

  if (preferred.length >= 2) {
    const bySlug = new Map(preferred.map((g) => [g.slug, g]));
    keepIds = PREFERRED_SLUGS.map((slug) => bySlug.get(slug)?.id).filter((id): id is string => Boolean(id));
    if (keepIds.length < 2) {
      const two = await prisma.game.findMany({ take: 2, orderBy: { createdAt: "asc" } });
      keepIds = two.map((g) => g.id);
    }
  } else if (preferred.length === 1) {
    const other = await prisma.game.findFirst({
      where: { id: { not: preferred[0].id } },
      orderBy: { createdAt: "asc" },
    });
    keepIds = other ? [preferred[0].id, other.id] : [preferred[0].id];
  } else {
    const two = await prisma.game.findMany({ take: 2, orderBy: { createdAt: "asc" } });
    keepIds = two.map((g) => g.id);
  }

  if (keepIds.length === 0) {
    // eslint-disable-next-line no-console
    console.log("No games in database.");
    return;
  }

  const kept = await prisma.game.findMany({
    where: { id: { in: keepIds } },
    select: { slug: true, title: true },
  });

  const result = await prisma.game.deleteMany({
    where: { id: { notIn: keepIds } },
  });

  // eslint-disable-next-line no-console
  console.log("Done:", { kept: kept.map((g) => g.slug), deletedCount: result.count });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
