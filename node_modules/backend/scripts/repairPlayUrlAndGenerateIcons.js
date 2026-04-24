import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ROOT = path.resolve(process.cwd(), "..");
const FRONTEND_GAMES_DIR = path.join(ROOT, "frontend", "games");
const BACKEND_UPLOAD_GAMES_DIR = path.join(process.cwd(), "uploads", "games");
const BACKEND_UPLOAD_IMAGES_DIR = path.join(process.cwd(), "uploads", "images");

if (!fs.existsSync(BACKEND_UPLOAD_IMAGES_DIR)) {
  fs.mkdirSync(BACKEND_UPLOAD_IMAGES_DIR, { recursive: true });
}

function slugifyLike(value) {
  return value
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[\/\\?%*:|"<>]/g, "")
    .replace(/-+/g, "-");
}

function existsFileSafe(p) {
  try {
    return fs.existsSync(p) && fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function resolvePlayUrlFile(playUrl) {
  if (!playUrl) return null;
  const rel = playUrl.replace(/^\/+/, "");
  const cands = [
    path.join(ROOT, "frontend", rel),
    path.join(ROOT, rel),
    path.join(process.cwd(), rel),
  ];
  for (const p of cands) {
    if (existsFileSafe(p)) return p;
  }
  return null;
}

function findPlayableByName(name) {
  const folder = slugifyLike(name);
  const cands = [
    path.join(FRONTEND_GAMES_DIR, folder, "index.html"),
    path.join(BACKEND_UPLOAD_GAMES_DIR, folder, "index.html"),
  ];
  for (const p of cands) {
    if (existsFileSafe(p)) return `/games/${folder}/index.html`;
  }
  return null;
}

function iconLocalPathFromUrl(url) {
  if (!url || !url.startsWith("/uploads/")) return null;
  const rel = url.replace(/^\/+uploads\//, "");
  return path.join(process.cwd(), "uploads", rel);
}

function buildSvg(title) {
  const text = (title || "GAME").trim().slice(0, 18);
  const initials = text
    .split(/[\s_-]+/g)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || "")
    .join("") || "G";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#FFD84D"/>
      <stop offset="100%" stop-color="#FF9F1A"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="88" fill="#111826"/>
  <rect x="24" y="24" width="464" height="464" rx="72" fill="url(#g)" opacity="0.18"/>
  <text x="256" y="286" text-anchor="middle" font-size="168" font-family="Arial, sans-serif" font-weight="800" fill="#FFECA8">${initials}</text>
  <text x="256" y="350" text-anchor="middle" font-size="30" font-family="Arial, sans-serif" fill="#F4D97C">${text.replace(/[<>&"]/g, "")}</text>
</svg>`;
}

async function main() {
  const games = await prisma.game.findMany({
    where: { deletedAt: null },
    include: { assets: true },
  });

  let playFixed = 0;
  let iconGenerated = 0;

  for (const g of games) {
    const updates = {};

    // Repair playUrl if broken.
    if (!resolvePlayUrlFile(g.playUrl)) {
      const recovered = findPlayableByName(g.title) || findPlayableByName(g.slug);
      if (recovered) {
        updates.playUrl = recovered;
        playFixed += 1;
      }
    }

    // Resolve current cover from asset table.
    const coverAsset = g.assets.find((a) => a.type === "COVER") || null;
    const bannerAsset = g.assets.find((a) => a.type === "BANNER") || null;
    let coverUrl = coverAsset?.url || null;
    let bannerUrl = bannerAsset?.url || null;

    const coverMissing =
      !coverUrl ||
      (coverUrl.startsWith("/uploads/") && !existsFileSafe(iconLocalPathFromUrl(coverUrl)));

    if (coverMissing) {
      const base = slugifyLike(g.title || g.slug || g.id) || g.id;
      const fileName = `${base}.svg`;
      const localPath = path.join(BACKEND_UPLOAD_IMAGES_DIR, fileName);
      fs.writeFileSync(localPath, buildSvg(g.title), "utf8");
      coverUrl = `/uploads/images/${fileName}`;
      if (!bannerUrl) bannerUrl = coverUrl;
      iconGenerated += 1;
    }

    if (Object.keys(updates).length) {
      await prisma.game.update({ where: { id: g.id }, data: updates });
    }

    // Update assets if icon/banner changed.
    if (coverUrl !== (coverAsset?.url || null) || bannerUrl !== (bannerAsset?.url || null)) {
      await prisma.gameAsset.deleteMany({
        where: { gameId: g.id, type: { in: ["COVER", "BANNER"] } },
      });
      const toCreate = [];
      if (coverUrl) toCreate.push({ gameId: g.id, type: "COVER", url: coverUrl, alt: "Cover", sortOrder: 0 });
      if (bannerUrl) toCreate.push({ gameId: g.id, type: "BANNER", url: bannerUrl, alt: "Banner", sortOrder: 0 });
      if (toCreate.length) await prisma.gameAsset.createMany({ data: toCreate });
    }
  }

  console.log(JSON.stringify({ total: games.length, playUrlFixed: playFixed, iconGenerated }, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

