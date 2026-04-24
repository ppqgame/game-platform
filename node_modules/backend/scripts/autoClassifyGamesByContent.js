import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FRONTEND_GAMES_DIR = path.join(process.cwd(), "..", "frontend", "games");
const BACKEND_GAMES_DIR = path.join(process.cwd(), "uploads", "games");

function readPlayableHtml(playUrl) {
  if (!playUrl) return "";
  const rel = playUrl.replace(/^\/+/, "");
  const localCandidates = [
    path.join(process.cwd(), "..", "frontend", rel),
    path.join(process.cwd(), rel),
    path.join(process.cwd(), "..", rel),
  ];
  for (const p of localCandidates) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return fs.readFileSync(p, "utf8");
  }
  const m = playUrl.match(/\/games\/([^/]+)\/index\.html?/i);
  if (!m) return "";
  const gameName = m[1];
  for (const p of [
    path.join(FRONTEND_GAMES_DIR, gameName, "index.html"),
    path.join(BACKEND_GAMES_DIR, gameName, "index.html"),
  ]) {
    if (fs.existsSync(p)) return fs.readFileSync(p, "utf8");
  }
  return "";
}

function scoreCategory(text) {
  const t = text.toLowerCase();
  const add = (arr, n = 1) => arr.reduce((s, k) => (t.includes(k) ? s + n : s), 0);
  const score = {
    adventure: add(["adventure", "rescue", "escape", "island", "wukong", "myth", "quest", "story"], 2),
    racing: add(["racing", "race", "moto", "bike", "boat", "traffic", "parking", "highway", "drive"], 2),
    puzzle: add(["puzzle", "match", "line", "word", "solve", "title", "cross"], 2),
    strategy: add(["strategy", "tower", "defense", "tactic", "merge", "plan"], 2),
    casual: add(["casual", "relax", "quick", "happy", "funny", "diy", "garden"], 1),
    education: add(["education", "learn", "teeth", "doctor", "clinic", "hospital"], 2),
    arcade: add(["arcade", "runner", "parkour", "stair", "goal", "jump", "3d"], 1),
    card: add(["card", "poker", "solitaire"], 2),
    simulation: add(["sim", "simulation", "simulator", "salon", "makeup", "beauty"], 2),
    music: add(["music", "piano", "rhythm", "beat"], 3),
    "role-playing": add(["rpg", "role", "character", "avatar"], 2),
    action: add(["action", "sniper", "hunter", "fight", "shoot", "gun", "mission", "tank"], 3),
    sports: add(["sports", "goal", "archery", "soccer", "basketball"], 2),
    board: add(["board", "chess", "mahjong"], 2),
    casino: add(["casino", "slot", "roulette"], 3),
    word: add(["word", "letter", "typing"], 3),
  };
  return score;
}

function pickSlug(score, available) {
  let best = null;
  for (const slug of available) {
    const s = score[slug] ?? 0;
    if (!best || s > best.s) best = { slug, s };
  }
  if (!best || best.s <= 0) return available.includes("casual") ? "casual" : available[0];
  return best.slug;
}

async function main() {
  const categories = await prisma.category.findMany({ select: { id: true, slug: true } });
  if (!categories.length) throw new Error("No categories found");
  const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.id]));
  const availableSlugs = categories.map((c) => c.slug);

  const games = await prisma.game.findMany({
    where: { deletedAt: null },
    select: { id: true, title: true, shortPitch: true, description: true, playUrl: true, categoryId: true },
  });

  let updated = 0;
  for (const g of games) {
    const html = readPlayableHtml(g.playUrl || "");
    const source = `${g.title}\n${g.shortPitch || ""}\n${g.description || ""}\n${html.slice(0, 40000)}`;
    const score = scoreCategory(source);
    const slug = pickSlug(score, availableSlugs);
    const categoryId = catBySlug[slug];
    if (!categoryId || categoryId === g.categoryId) continue;
    await prisma.game.update({ where: { id: g.id }, data: { categoryId } });
    updated += 1;
  }

  console.log(JSON.stringify({ total: games.length, updated }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

