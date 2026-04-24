import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ROOT = path.resolve(process.cwd(), "..");
const FRONTEND_GAMES_DIR = path.join(ROOT, "frontend", "games");
const BACKEND_GAMES_DIR = path.join(process.cwd(), "uploads", "games");

function existsFile(p) {
  try {
    return fs.existsSync(p) && fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function existsDir(p) {
  try {
    return fs.existsSync(p) && fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dst, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else if (ent.isFile()) fs.copyFileSync(s, d);
  }
}

function normalizeName(s) {
  return (s || "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[\/\\?%*:|"<>]/g, "");
}

function candidateFolders(game) {
  const arr = [];
  if (game.playUrl?.startsWith("/games/")) {
    const m = game.playUrl.match(/^\/games\/([^/]+)\/index\.html?$/i);
    if (m?.[1]) arr.push(m[1]);
  }
  arr.push(normalizeName(game.title));
  arr.push(normalizeName(game.slug));
  return [...new Set(arr.filter(Boolean))];
}

async function main() {
  const games = await prisma.game.findMany({
    where: { deletedAt: null },
    select: { id: true, title: true, slug: true, playUrl: true },
  });

  let fixed = 0;
  let syncedFolders = 0;
  let unresolved = 0;

  for (const g of games) {
    const cands = candidateFolders(g);
    let picked = null;
    for (const c of cands) {
      const frontendIndex = path.join(FRONTEND_GAMES_DIR, c, "index.html");
      const backendIndex = path.join(BACKEND_GAMES_DIR, c, "index.html");

      if (!existsFile(backendIndex) && existsFile(frontendIndex)) {
        copyDir(path.join(FRONTEND_GAMES_DIR, c), path.join(BACKEND_GAMES_DIR, c));
        syncedFolders += 1;
      }
      if (existsFile(path.join(BACKEND_GAMES_DIR, c, "index.html"))) {
        picked = c;
        break;
      }
    }

    if (!picked) {
      unresolved += 1;
      continue;
    }

    const nextPlayUrl = `/games/${picked}/index.html`;
    if (g.playUrl !== nextPlayUrl) {
      await prisma.game.update({ where: { id: g.id }, data: { playUrl: nextPlayUrl } });
      fixed += 1;
    }
  }

  console.log(JSON.stringify({ total: games.length, fixed, syncedFolders, unresolved }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

