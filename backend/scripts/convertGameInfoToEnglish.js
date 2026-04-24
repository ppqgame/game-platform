import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function titleCaseFromSlug(slug) {
  return (slug || "")
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function inferGenre(text) {
  const t = (text || "").toLowerCase();
  if (/sniper|hunter|shoot|gun|mission|tank/.test(t)) return "action shooter";
  if (/racing|bike|moto|drive|parking|traffic|highway|boat/.test(t)) return "racing";
  if (/puzzle|match|word|line|rescue/.test(t)) return "puzzle";
  if (/doctor|hospital|clinic|teeth|nail|makeup|beauty|dress|hair/.test(t)) return "simulation";
  if (/piano|music|rhythm/.test(t)) return "music rhythm";
  if (/parkour|runner|jump|stair/.test(t)) return "arcade runner";
  return "casual";
}

function buildEnglishCopy(title, slug) {
  const base = title || titleCaseFromSlug(slug) || "Arcade Game";
  const key = `${base} ${slug}`;
  const genre = inferGenre(key);
  const shortPitch = `A browser-based ${genre} game with quick sessions and easy controls.`;
  const description = `${base} is a browser ${genre} game. Jump in instantly, enjoy responsive controls, and challenge yourself through progressively harder levels. It is designed for short play sessions while still offering replayability and score-chasing fun.`;
  return { title: base, shortPitch, description };
}

async function main() {
  const categories = await prisma.category.findMany({ select: { id: true, slug: true, name: true } });
  const tags = await prisma.tag.findMany({ select: { id: true, slug: true, name: true } });
  const games = await prisma.game.findMany({
    where: { deletedAt: null },
    select: { id: true, slug: true, title: true },
  });

  for (const c of categories) {
    await prisma.category.update({
      where: { id: c.id },
      data: { name: titleCaseFromSlug(c.slug) || c.name },
    });
  }

  for (const t of tags) {
    await prisma.tag.update({
      where: { id: t.id },
      data: { name: titleCaseFromSlug(t.slug) || t.name },
    });
  }

  for (const g of games) {
    const normalizedTitle = titleCaseFromSlug(g.slug) || g.title;
    const copy = buildEnglishCopy(normalizedTitle, g.slug);
    await prisma.game.update({
      where: { id: g.id },
      data: {
        title: copy.title,
        shortPitch: copy.shortPitch,
        description: copy.description,
        titleI18nJson: JSON.stringify({ en: copy.title }),
      },
    });
  }

  console.log(
    JSON.stringify(
      {
        categoriesUpdated: categories.length,
        tagsUpdated: tags.length,
        gamesUpdated: games.length,
      },
      null,
      2
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

