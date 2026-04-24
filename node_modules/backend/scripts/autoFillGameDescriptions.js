import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FRONTEND_GAMES_DIR = path.join(process.cwd(), "..", "frontend", "games");
const BACKEND_GAMES_DIR = path.join(process.cwd(), "uploads", "games");

function hasCjk(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

function cleanName(title) {
  return title.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function toSlugWords(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter(Boolean);
}

function readPlayableHtml(playUrl) {
  if (!playUrl) return "";
  const rel = playUrl.replace(/^\/+/, "");
  const localCandidates = [
    path.join(process.cwd(), "..", "frontend", rel),
    path.join(process.cwd(), rel),
    path.join(process.cwd(), "..", rel),
  ];
  for (const p of localCandidates) {
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      return fs.readFileSync(p, "utf8");
    }
  }

  // fallback by game folder name convention /games/<name>/index.html
  const m = playUrl.match(/\/games\/([^/]+)\/index\.html?/i);
  if (!m) return "";
  const gameName = m[1];
  const cands = [
    path.join(FRONTEND_GAMES_DIR, gameName, "index.html"),
    path.join(BACKEND_GAMES_DIR, gameName, "index.html"),
  ];
  for (const p of cands) {
    if (fs.existsSync(p)) return fs.readFileSync(p, "utf8");
  }
  return "";
}

function inferGenre(words, html) {
  const text = `${words.join(" ")} ${(html || "").toLowerCase()}`;
  if (/sniper|hunter|shoot|gun/.test(text)) return "射击狙击";
  if (/racing|bike|moto|drive|parking|traffic|road|boat/.test(text)) return "竞速驾驶";
  if (/doctor|hospital|clinic|surgery|teeth|nail|makeup|beauty|dress|hair/.test(text)) return "装扮模拟";
  if (/piano|music/.test(text)) return "音乐节奏";
  if (/puzzle|match|rescue|word|line/.test(text)) return "益智闯关";
  if (/fight|prison|escape|parkour|stickman/.test(text)) return "动作冒险";
  return "休闲闯关";
}

function inferHighlights(words, html) {
  const text = `${words.join(" ")} ${(html || "").toLowerCase()}`;
  const arr = [];
  if (/3d/.test(text)) arr.push("3D 画面");
  if (/sniper|hunter|shoot|gun/.test(text)) arr.push("瞄准射击");
  if (/racing|bike|moto|drive|traffic|road|boat/.test(text)) arr.push("速度挑战");
  if (/dress|beauty|makeup|hair|nail/.test(text)) arr.push("个性装扮");
  if (/doctor|hospital|clinic|surgery|teeth/.test(text)) arr.push("轻松模拟");
  if (/puzzle|match|word|line|rescue/.test(text)) arr.push("解谜闯关");
  if (!arr.length) arr.push("操作简单", "节奏明快");
  return arr.slice(0, 2);
}

function buildCopy(title, html) {
  const name = cleanName(title);
  const words = toSlugWords(name);
  const genre = inferGenre(words, html);
  const [h1, h2] = inferHighlights(words, html);

  const shortPitch = `一款${genre}游戏，主打${h1}与${h2}。`;
  const description = `${name} 是一款${genre}作品。你可以在浏览器中快速开始，体验${h1}、${h2}与逐步升级的关卡节奏。适合碎片时间游玩，操作门槛低，上手后能持续挑战更高分与更快通关。`;
  return { shortPitch, description };
}

function shouldUpdate(game) {
  const sp = (game.shortPitch || "").trim();
  const desc = (game.description || "").trim();
  return (
    !sp ||
    sp === game.title ||
    sp.length < 6 ||
    /自动导入|copy|复制版/i.test(sp) ||
    !desc ||
    desc.length < 12 ||
    /自动导入/i.test(desc)
  );
}

async function main() {
  const games = await prisma.game.findMany({
    where: { deletedAt: null },
    select: { id: true, title: true, shortPitch: true, description: true, playUrl: true },
  });

  let updated = 0;
  let skipped = 0;
  for (const g of games) {
    if (!shouldUpdate(g)) {
      skipped += 1;
      continue;
    }
    const html = readPlayableHtml(g.playUrl || "");
    const { shortPitch, description } = buildCopy(g.title, html);
    await prisma.game.update({
      where: { id: g.id },
      data: { shortPitch, description },
    });
    updated += 1;
  }

  console.log(JSON.stringify({ total: games.length, updated, skipped }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

