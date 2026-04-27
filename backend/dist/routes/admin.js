import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { Router } from "express";
import multer from "multer";
import AdmZip from "adm-zip";
import { z } from "zod";
import { prisma } from "../db.js";
import { issueAdminTokens, requireAdmin, rotateAccessTokenFromRefresh, verifyPassword } from "../auth.js";
import { HttpError } from "../http.js";
import { slugify } from "../slug.js";
export const adminRouter = Router();
const uploadImagesDir = path.join(process.cwd(), "uploads", "images");
const uploadGamesDir = path.join(process.cwd(), "uploads", "games");
const uploadTmpDir = path.join(process.cwd(), "uploads", "tmp");
const pendingUpdatesDir = path.join(process.cwd(), "uploads", "pending-updates");
if (!fs.existsSync(uploadImagesDir)) {
    fs.mkdirSync(uploadImagesDir, { recursive: true });
}
if (!fs.existsSync(uploadGamesDir)) {
    fs.mkdirSync(uploadGamesDir, { recursive: true });
}
if (!fs.existsSync(uploadTmpDir)) {
    fs.mkdirSync(uploadTmpDir, { recursive: true });
}
if (!fs.existsSync(pendingUpdatesDir)) {
    fs.mkdirSync(pendingUpdatesDir, { recursive: true });
}
const imageUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadTmpDir);
        },
        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname).toLowerCase();
            const safe = ext && [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext) ? ext : ".png";
            cb(null, `${randomUUID()}${safe}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (!/^image\/(jpeg|jpe|pjpeg|png|gif|webp)$/i.test(file.mimetype)) {
            cb(new Error("仅支持 JPEG、PNG、GIF、WebP 图片"));
            return;
        }
        cb(null, true);
    },
});
const gameZipUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadTmpDir);
        },
        filename: (_req, _file, cb) => {
            cb(null, `${randomUUID()}.zip`);
        },
    }),
    limits: { fileSize: 300 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const name = (file.originalname || "").toLowerCase();
        const type = (file.mimetype || "").toLowerCase();
        const looksZip = name.endsWith(".zip") ||
            type === "application/zip" ||
            type === "application/x-zip-compressed" ||
            type === "application/octet-stream";
        if (!looksZip) {
            cb(new Error("仅支持 ZIP 压缩包"));
            return;
        }
        cb(null, true);
    },
});
function normalizeEntryName(name) {
    return name.replace(/\\/g, "/").replace(/^\/+/, "");
}
function isSafeZipEntry(name) {
    const n = normalizeEntryName(name);
    if (!n)
        return false;
    if (n.includes(".."))
        return false;
    if (/^[a-zA-Z]:/.test(n))
        return false;
    return true;
}
function detectPlayableEntry(files) {
    const normalized = files.map((f) => normalizeEntryName(f)).filter(Boolean);
    const rootIndex = normalized.find((f) => /^index\.html?$/i.test(f));
    if (rootIndex)
        return rootIndex;
    const anyIndex = normalized.find((f) => /(^|\/)index\.html?$/i.test(f));
    return anyIndex ?? null;
}
/** 生成可用于目录名的字符串，保留大小写。 */
function toCasePreservingFolderName(input) {
    const trimmed = input.trim();
    if (!trimmed)
        return "";
    const dashed = trimmed.replace(/\s+/g, "-");
    const safe = dashed.replace(/[\/\\?%*:|"<>]/g, "");
    const normalized = safe.replace(/\.+/g, ".").replace(/^-+|-+$/g, "");
    return normalized;
}
function isHttpOrUploadPath(s) {
    if (s.startsWith("/uploads/"))
        return true;
    try {
        const u = new URL(s);
        return u.protocol === "http:" || u.protocol === "https:";
    }
    catch {
        return false;
    }
}
function toImageNamePart(input) {
    const s = input
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[\/\\?%*:|"<>]/g, "")
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g, "");
    return s;
}
function toUploadIndex(input, fallback = 1) {
    const n = Number(input);
    if (!Number.isFinite(n) || n < 1)
        return fallback;
    return Math.floor(n);
}
function toUploadKind(input) {
    const s = String(input ?? "").toLowerCase();
    if (s === "banner")
        return "banner";
    if (s === "screenshot")
        return "screenshot";
    return "icon";
}
/** http(s)、站内绝对路径 /… 或不含协议的相对路径（禁止 javascript: 等） */
function isAllowedPlayUrl(s) {
    const t = s.trim();
    if (!t)
        return false;
    if (t.length > 4096)
        return false;
    if (/[\r\n\u0000]/.test(t))
        return false;
    if (t.startsWith("//"))
        return false;
    if (/^https?:\/\//i.test(t)) {
        try {
            const u = new URL(t);
            return u.protocol === "http:" || u.protocol === "https:";
        }
        catch {
            return false;
        }
    }
    if (/^[a-z][\w+.-]*:/i.test(t))
        return false;
    if (/[<>"']/.test(t))
        return false;
    return true;
}
/** 存库前归一化：本站 /games/* 的绝对 URL 一律转相对路径。 */
function normalizePlayUrlForStorage(v) {
    if (v == null)
        return v;
    const t = v.trim();
    if (!t)
        return t;
    if (!/^https?:\/\//i.test(t))
        return t;
    try {
        const u = new URL(t);
        if (u.pathname.startsWith("/games/")) {
            return `${u.pathname}${u.search}${u.hash}`;
        }
        return t;
    }
    catch {
        return t;
    }
}
function pendingUpdateFile(gameId) {
    return path.join(pendingUpdatesDir, `${gameId}.json`);
}
function readPendingUpdate(gameId) {
    const file = pendingUpdateFile(gameId);
    if (!fs.existsSync(file))
        return null;
    try {
        const raw = JSON.parse(fs.readFileSync(file, "utf8"));
        if (!raw || (raw.reviewStatus !== "REVIEW" && raw.reviewStatus !== "TESTING") || !raw.payload)
            return null;
        return raw;
    }
    catch {
        return null;
    }
}
function writePendingUpdate(gameId, value) {
    fs.writeFileSync(pendingUpdateFile(gameId), JSON.stringify(value, null, 2), "utf8");
}
function clearPendingUpdate(gameId) {
    const file = pendingUpdateFile(gameId);
    if (fs.existsSync(file))
        fs.unlinkSync(file);
}
const playUrlField = z.preprocess((v) => {
    if (v === undefined)
        return undefined;
    if (v === null || v === "")
        return null;
    return v;
}, z
    .union([z.string(), z.null(), z.undefined()])
    .refine((v) => v === undefined || v === null || (typeof v === "string" && isAllowedPlayUrl(v)), { message: "须为 http(s)、以 / 开头的路径或相对路径" }));
/** 允许缺省（PATCH 不改）、空串/null（清空）或有效 URL/站内上传路径。 */
const mediaUrl = z.preprocess((v) => {
    if (v === undefined)
        return undefined;
    if (v === null || v === "")
        return null;
    return v;
}, z
    .union([z.string(), z.null(), z.undefined()])
    .refine((v) => v === undefined || v === null || isHttpOrUploadPath(v), { message: "须为 http(s) 或 /uploads/ 下的地址" }));
adminRouter.post("/upload", requireAdmin, (req, res, next) => {
    imageUpload.single("file")(req, res, (err) => {
        if (err) {
            const msg = err instanceof Error ? err.message : "Upload failed";
            next(new HttpError(400, msg));
            return;
        }
        next();
    });
}, (req, res) => {
    if (!req.file)
        throw new HttpError(400, "请选择要上传的文件");
    const gameNameRaw = typeof req.body?.gameName === "string" ? req.body.gameName : "";
    const gameName = toImageNamePart(gameNameRaw);
    if (!gameName) {
        try {
            fs.unlinkSync(req.file.path);
        }
        catch {
            // ignore temp file cleanup errors
        }
        throw new HttpError(400, "请先填写游戏名再上传图片");
    }
    const kind = toUploadKind(req.body?.kind);
    const index = toUploadIndex(req.body?.index, 1);
    const ext = path.extname(req.file.originalname).toLowerCase();
    const safeExt = ext && [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext) ? ext : ".png";
    const base = kind === "icon" ? gameName : kind === "banner" ? `banner_${gameName}_${index}` : `cut_${gameName}_${index}`;
    const targetName = `${base}${safeExt}`;
    const targetPath = path.join(uploadImagesDir, targetName);
    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { force: true });
    }
    fs.renameSync(req.file.path, targetPath);
    res.json({ url: `/uploads/images/${targetName}` });
});
adminRouter.post("/upload-game-zip", requireAdmin, (req, res, next) => {
    gameZipUpload.single("file")(req, res, (err) => {
        if (err) {
            const msg = err instanceof Error ? err.message : "Upload failed";
            next(new HttpError(400, msg));
            return;
        }
        next();
    });
}, async (req, res) => {
    if (!req.file)
        throw new HttpError(400, "请选择要上传的 ZIP 包");
    const gameName = z
        .string()
        .optional()
        .transform((s) => (s || "").trim())
        .parse(req.body?.gameName);
    const fromName = toCasePreservingFolderName(gameName);
    const fromZip = toCasePreservingFolderName(path.parse(req.file.originalname || "").name);
    const gameFolder = fromName || fromZip || randomUUID();
    if (!gameFolder)
        throw new HttpError(400, "无法生成游戏目录名");
    const extractDir = path.join(uploadGamesDir, gameFolder);
    if (fs.existsSync(extractDir)) {
        fs.rmSync(extractDir, { recursive: true, force: true });
    }
    fs.mkdirSync(extractDir, { recursive: true });
    try {
        const zip = new AdmZip(req.file.path);
        const entries = zip.getEntries();
        if (!entries.length)
            throw new HttpError(400, "ZIP 包为空");
        for (const entry of entries) {
            if (!isSafeZipEntry(entry.entryName)) {
                throw new HttpError(400, "ZIP 包包含非法路径");
            }
        }
        zip.extractAllTo(extractDir, true);
        const fileEntries = entries.filter((e) => !e.isDirectory).map((e) => e.entryName);
        const playable = detectPlayableEntry(fileEntries);
        if (!playable) {
            throw new HttpError(400, "ZIP 包中未找到 index.html");
        }
        if (!/^index\.html?$/i.test(playable)) {
            throw new HttpError(400, "ZIP 包需在根目录提供 index.html");
        }
        const playUrl = `/games/${gameFolder}/index.html`;
        const basePath = `/games/${gameFolder}/`;
        res.json({ playUrl, basePath });
    }
    finally {
        try {
            fs.unlinkSync(req.file.path);
        }
        catch {
            // ignore temp file cleanup errors
        }
    }
});
adminRouter.post("/auth/login", async (req, res) => {
    const body = z
        .object({
        email: z.string().email(),
        password: z.string().min(1),
    })
        .parse(req.body);
    const admin = await prisma.adminUser.findUnique({ where: { email: body.email } });
    if (!admin)
        throw new HttpError(401, "Invalid credentials");
    const ok = await verifyPassword(body.password, admin.passwordHash);
    if (!ok)
        throw new HttpError(401, "Invalid credentials");
    await prisma.endUser.upsert({
        where: { id: admin.id },
        create: { id: admin.id, email: admin.email, nickname: "Admin", role: "ADMIN" },
        update: { email: admin.email, role: "ADMIN" },
    });
    const issued = issueAdminTokens({ sub: admin.id, email: admin.email });
    await prisma.userSession.create({
        data: {
            userId: admin.id,
            refreshToken: issued.refreshToken,
            userAgent: req.header("user-agent") ?? null,
            ip: req.ip,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        },
    });
    res.json({
        token: issued.accessToken,
        refreshToken: issued.refreshToken,
        admin: { id: admin.id, email: admin.email },
    });
});
adminRouter.post("/auth/refresh", async (req, res) => {
    const body = z.object({ refreshToken: z.string().min(10) }).parse(req.body);
    const session = await prisma.userSession.findUnique({ where: { refreshToken: body.refreshToken } });
    if (!session || session.expiresAt.getTime() < Date.now())
        throw new HttpError(401, "Refresh token expired");
    const token = rotateAccessTokenFromRefresh(body.refreshToken);
    res.json({ token });
});
adminRouter.get("/me", requireAdmin, async (req, res) => {
    const admin = await prisma.adminUser.findUnique({ where: { id: req.admin.sub } });
    if (!admin)
        throw new HttpError(401, "Admin not found");
    res.json({ admin: { id: admin.id, email: admin.email } });
});
adminRouter.get("/games", requireAdmin, async (req, res) => {
    const query = z
        .object({
        page: z.coerce.number().int().positive().default(1),
        pageSize: z.coerce.number().int().positive().max(100).default(20),
        status: z.enum(["DRAFT", "REVIEW", "TESTING", "PUBLISHED", "ARCHIVED"]).optional(),
        q: z.string().optional(),
        category: z.string().optional(),
        updatedFrom: z.string().optional(),
        updatedTo: z.string().optional(),
        createdFrom: z.string().optional(),
        createdTo: z.string().optional(),
        includeDeleted: z.coerce.boolean().optional().default(false),
    })
        .parse(req.query);
    const where = {};
    if (!query.includeDeleted) {
        where.deletedAt = null;
    }
    if (query.status)
        where.status = query.status;
    if (query.category) {
        where.category = { slug: query.category };
    }
    if (query.q?.trim()) {
        const t = query.q.trim();
        const or = [
            { title: { contains: t } },
            { slug: { contains: t } },
            { developer: { contains: t } },
        ];
        or.push({ id: t });
        if (t.length >= 4) {
            or.push({ id: { startsWith: t } });
        }
        where.OR = or;
    }
    if (query.updatedFrom || query.updatedTo) {
        where.updatedAt = {};
        if (query.updatedFrom)
            where.updatedAt.gte = new Date(query.updatedFrom);
        if (query.updatedTo)
            where.updatedAt.lte = new Date(query.updatedTo);
    }
    if (query.createdFrom || query.createdTo) {
        where.createdAt = {};
        if (query.createdFrom)
            where.createdAt.gte = new Date(query.createdFrom);
        if (query.createdTo)
            where.createdAt.lte = new Date(query.createdTo);
    }
    const [total, games] = await prisma.$transaction([
        prisma.game.count({ where }),
        prisma.game.findMany({
            where,
            orderBy: { updatedAt: "desc" },
            skip: (query.page - 1) * query.pageSize,
            take: query.pageSize,
            include: { category: true },
        }),
    ]);
    res.json({
        page: query.page,
        pageSize: query.pageSize,
        total,
        games: games.map((g) => ({
            id: g.id,
            slug: g.slug,
            title: g.title,
            status: g.status,
            developer: g.developer,
            launchCount: g.launchCount,
            cacheBust: g.cacheBust,
            createdAt: g.createdAt,
            updatedAt: g.updatedAt,
            publishedAt: g.publishedAt,
            deletedAt: g.deletedAt,
            ageRating: g.ageRating,
            isHot: g.isHot,
            isHomeRecommended: g.isHomeRecommended,
            category: g.category ? { slug: g.category.slug, name: g.category.name } : null,
        })),
    });
});
const gameWriteSchema = z.object({
    title: z.string().min(1).max(120),
    shortPitch: z.string().min(1).max(200),
    description: z.string().min(1).max(500),
    categorySlug: z.string().min(1).optional(),
    tagSlugs: z.array(z.string().min(1)).default([]),
    playUrl: playUrlField,
    embedUrl: z.string().url().optional().nullable(),
    coverUrl: mediaUrl,
    bannerUrl: mediaUrl,
    screenshotUrls: z
        .array(z.string().refine((s) => isHttpOrUploadPath(s), { message: "须为有效图片地址" }))
        .max(5)
        .default([]),
    developer: z.string().max(120).optional().nullable(),
    ageRating: z.enum(["ALL", "P12", "P16", "P18"]).optional().nullable(),
    screenOrientation: z.enum(["LANDSCAPE", "PORTRAIT"]).optional(),
    isHot: z.boolean().optional(),
    isHomeRecommended: z.boolean().optional(),
    titleI18nJson: z.string().optional().nullable(),
    extConfigJson: z.string().optional().nullable(),
});
adminRouter.post("/games", requireAdmin, async (req, res) => {
    const body = gameWriteSchema.parse(req.body);
    const baseSlug = slugify(body.title);
    const slug = await uniqueSlug(baseSlug);
    const game = await prisma.$transaction(async (tx) => {
        const categoryId = body.categorySlug
            ? (await tx.category.upsert({
                where: { slug: body.categorySlug },
                create: { slug: body.categorySlug, name: titleCaseFromSlug(body.categorySlug) },
                update: {},
            })).id
            : null;
        const created = await tx.game.create({
            data: {
                slug,
                title: body.title,
                shortPitch: body.shortPitch,
                description: body.description,
                playUrl: normalizePlayUrlForStorage(body.playUrl) ?? null,
                embedUrl: body.embedUrl ?? null,
                status: "REVIEW",
                categoryId,
                developer: body.developer ?? null,
                ageRating: body.ageRating ?? "ALL",
                screenOrientation: body.screenOrientation ?? "LANDSCAPE",
                isHot: body.isHot ?? false,
                isHomeRecommended: body.isHomeRecommended ?? false,
                titleI18nJson: body.titleI18nJson && body.titleI18nJson.trim() ? body.titleI18nJson : "{}",
                extConfigJson: body.extConfigJson && body.extConfigJson.trim() ? body.extConfigJson : "{}",
            },
        });
        await syncTags(tx, created.id, body.tagSlugs);
        if (body.coverUrl || body.bannerUrl || body.screenshotUrls.length > 0) {
            await syncAssets(tx, created.id, body);
        }
        await tx.auditLog.create({
            data: {
                actorId: req.admin.sub,
                action: "CREATE_GAME",
                entity: "Game",
                entityId: created.id,
                details: JSON.stringify({ slug: created.slug }),
            },
        });
        return created;
    });
    res.status(201).json({ game: { id: game.id, slug: game.slug } });
});
adminRouter.post("/games/publish-ready", requireAdmin, async (req, res) => {
    const result = await prisma.$transaction(async (tx) => {
        const defaultSection = await tx.homeSection.findFirst({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        });
        const drafts = await tx.game.findMany({
            where: { status: "DRAFT" },
            include: { assets: true },
        });
        let published = 0;
        let skipped = 0;
        for (const g of drafts) {
            const hasCover = g.assets.some((a) => a.type === "COVER");
            if (!g.playUrl || !hasCover) {
                skipped += 1;
                continue;
            }
            await tx.game.update({
                where: { id: g.id },
                data: {
                    status: "PUBLISHED",
                    publishedAt: g.publishedAt ?? new Date(),
                },
            });
            if (defaultSection) {
                const existingHomeItem = await tx.homeSectionItem.findFirst({
                    where: { sectionId: defaultSection.id, gameId: g.id },
                });
                if (!existingHomeItem) {
                    const maxSortOrder = await tx.homeSectionItem.aggregate({
                        where: { sectionId: defaultSection.id },
                        _max: { sortOrder: true },
                    });
                    await tx.homeSectionItem.create({
                        data: {
                            sectionId: defaultSection.id,
                            gameId: g.id,
                            sortOrder: (maxSortOrder._max.sortOrder ?? -1) + 1,
                        },
                    });
                }
            }
            published += 1;
        }
        await tx.auditLog.create({
            data: {
                actorId: req.admin.sub,
                action: "BATCH_PUBLISH_READY",
                entity: "Game",
                details: JSON.stringify({ published, skipped }),
            },
        });
        return { published, skipped, totalDrafts: drafts.length };
    });
    res.json(result);
});
adminRouter.get("/games/:id", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const game = await prisma.game.findUnique({
        where: { id },
        include: {
            category: true,
            tags: { include: { tag: true } },
            assets: { orderBy: [{ type: "asc" }, { sortOrder: "asc" }] },
        },
    });
    if (!game)
        throw new HttpError(404, "Game not found");
    res.json({ game: mapAdminGame(game) });
});
adminRouter.patch("/games/:id", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const body = gameWriteSchema.partial().parse(req.body);
    // 已发布游戏：编辑仅保存为待审核版本，不影响线上运行版本。
    const existingGame = await prisma.game.findUnique({ where: { id } });
    if (!existingGame)
        throw new HttpError(404, "Game not found");
    if (existingGame.status === "PUBLISHED") {
        const current = readPendingUpdate(id);
        const currentPayload = current?.payload ?? {};
        const mergedPayload = {
            title: (body.title ?? currentPayload.title ?? existingGame.title),
            shortPitch: (body.shortPitch ?? currentPayload.shortPitch ?? existingGame.shortPitch),
            description: (body.description ?? currentPayload.description ?? existingGame.description),
            categorySlug: (body.categorySlug ?? currentPayload.categorySlug),
            tagSlugs: (body.tagSlugs ?? currentPayload.tagSlugs ?? []),
            playUrl: body.playUrl === undefined
                ? (currentPayload.playUrl ?? existingGame.playUrl ?? null)
                : (normalizePlayUrlForStorage(body.playUrl) ?? null),
            embedUrl: (body.embedUrl === undefined ? currentPayload.embedUrl ?? existingGame.embedUrl ?? null : body.embedUrl ?? null),
            coverUrl: (body.coverUrl === undefined ? (currentPayload.coverUrl ?? null) : body.coverUrl ?? null),
            bannerUrl: (body.bannerUrl === undefined ? (currentPayload.bannerUrl ?? null) : body.bannerUrl ?? null),
            screenshotUrls: (body.screenshotUrls ?? currentPayload.screenshotUrls ?? []),
            developer: (body.developer === undefined ? currentPayload.developer ?? existingGame.developer ?? null : body.developer ?? null),
            ageRating: (body.ageRating === undefined ? currentPayload.ageRating ?? existingGame.ageRating ?? "ALL" : body.ageRating ?? null),
            screenOrientation: (body.screenOrientation === undefined
                ? currentPayload.screenOrientation ?? existingGame.screenOrientation
                : body.screenOrientation) ?? "LANDSCAPE",
            isHot: body.isHot === undefined ? currentPayload.isHot ?? existingGame.isHot : body.isHot,
            isHomeRecommended: body.isHomeRecommended === undefined
                ? currentPayload.isHomeRecommended ?? existingGame.isHomeRecommended
                : body.isHomeRecommended,
            titleI18nJson: (body.titleI18nJson === undefined ? currentPayload.titleI18nJson ?? existingGame.titleI18nJson : body.titleI18nJson ?? "{}") ??
                "{}",
            extConfigJson: (body.extConfigJson === undefined ? currentPayload.extConfigJson ?? existingGame.extConfigJson : body.extConfigJson ?? "{}") ??
                "{}",
        };
        writePendingUpdate(id, {
            reviewStatus: "REVIEW",
            savedAt: new Date().toISOString(),
            payload: mergedPayload,
        });
        await prisma.auditLog.create({
            data: {
                actorId: req.admin.sub,
                action: "SAVE_PUBLISHED_GAME_PENDING_UPDATE",
                entity: "Game",
                entityId: id,
                details: JSON.stringify({ fields: Object.keys(body) }),
            },
        });
        res.json({ game: { id: existingGame.id, slug: existingGame.slug, status: "REVIEW" } });
        return;
    }
    const updated = await prisma.$transaction(async (tx) => {
        const existing = await tx.game.findUnique({ where: { id } });
        if (!existing)
            throw new HttpError(404, "Game not found");
        let categoryId = undefined;
        if (body.categorySlug !== undefined) {
            if (!body.categorySlug)
                categoryId = null;
            else {
                const cat = await tx.category.upsert({
                    where: { slug: body.categorySlug },
                    create: { slug: body.categorySlug, name: titleCaseFromSlug(body.categorySlug) },
                    update: {},
                });
                categoryId = cat.id;
            }
        }
        const next = await tx.game.update({
            where: { id },
            data: {
                title: body.title ?? undefined,
                shortPitch: body.shortPitch ?? undefined,
                description: body.description ?? undefined,
                playUrl: body.playUrl === undefined ? undefined : normalizePlayUrlForStorage(body.playUrl),
                embedUrl: body.embedUrl === undefined ? undefined : body.embedUrl,
                categoryId: categoryId === undefined ? undefined : categoryId,
                developer: body.developer === undefined ? undefined : body.developer,
                ageRating: body.ageRating === undefined ? undefined : body.ageRating,
                screenOrientation: body.screenOrientation === undefined ? undefined : body.screenOrientation,
                isHot: body.isHot === undefined ? undefined : body.isHot,
                isHomeRecommended: body.isHomeRecommended === undefined ? undefined : body.isHomeRecommended,
                titleI18nJson: body.titleI18nJson === undefined ? undefined : body.titleI18nJson || "{}",
                extConfigJson: body.extConfigJson === undefined ? undefined : body.extConfigJson || "{}",
                status: "REVIEW",
            },
        });
        if (body.tagSlugs)
            await syncTags(tx, id, body.tagSlugs);
        if (body.coverUrl !== undefined || body.bannerUrl !== undefined || body.screenshotUrls !== undefined) {
            const patch = {};
            if (body.coverUrl !== undefined)
                patch.coverUrl = body.coverUrl;
            if (body.bannerUrl !== undefined)
                patch.bannerUrl = body.bannerUrl;
            if (body.screenshotUrls !== undefined)
                patch.screenshotUrls = body.screenshotUrls;
            await syncAssets(tx, id, patch);
        }
        await tx.auditLog.create({
            data: {
                actorId: req.admin.sub,
                action: "UPDATE_GAME",
                entity: "Game",
                entityId: id,
                details: JSON.stringify({ fields: Object.keys(body) }),
            },
        });
        return next;
    });
    res.json({ game: { id: updated.id, slug: updated.slug, status: updated.status } });
});
adminRouter.post("/games/:id/publish", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const game = await prisma.$transaction(async (tx) => {
        const defaultSection = await tx.homeSection.findFirst({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        });
        const existing = await tx.game.findUnique({ where: { id }, include: { assets: true } });
        if (!existing)
            throw new HttpError(404, "Game not found");
        if (existing.deletedAt)
            throw new HttpError(400, "已软删的游戏需先恢复后再发布");
        if (existing.status === "PUBLISHED") {
            const pending = readPendingUpdate(id);
            if (!pending)
                throw new HttpError(400, "该游戏没有待发布修改");
            if (pending.reviewStatus !== "TESTING")
                throw new HttpError(400, "待修改版本需先进入测试状态");
            const p = pending.payload;
            let categoryId = null;
            if (p.categorySlug) {
                categoryId = (await tx.category.upsert({
                    where: { slug: p.categorySlug },
                    create: { slug: p.categorySlug, name: titleCaseFromSlug(p.categorySlug) },
                    update: {},
                })).id;
            }
            const updated = await tx.game.update({
                where: { id },
                data: {
                    title: p.title,
                    shortPitch: p.shortPitch,
                    description: p.description,
                    playUrl: normalizePlayUrlForStorage(p.playUrl) ?? null,
                    embedUrl: p.embedUrl ?? null,
                    categoryId,
                    developer: p.developer ?? null,
                    ageRating: p.ageRating ?? "ALL",
                    screenOrientation: p.screenOrientation ?? "LANDSCAPE",
                    isHot: p.isHot ?? existing.isHot,
                    isHomeRecommended: p.isHomeRecommended ?? existing.isHomeRecommended,
                    titleI18nJson: p.titleI18nJson && p.titleI18nJson.trim() ? p.titleI18nJson : "{}",
                    extConfigJson: p.extConfigJson && p.extConfigJson.trim() ? p.extConfigJson : "{}",
                    publishedAt: existing.publishedAt ?? new Date(),
                    status: "PUBLISHED",
                },
            });
            await syncTags(tx, id, p.tagSlugs ?? []);
            await syncAssets(tx, id, {
                coverUrl: p.coverUrl ?? null,
                bannerUrl: p.bannerUrl ?? null,
                screenshotUrls: p.screenshotUrls ?? [],
            });
            clearPendingUpdate(id);
            await tx.auditLog.create({
                data: {
                    actorId: req.admin.sub,
                    action: "PUBLISH_PUBLISHED_GAME_PENDING_UPDATE",
                    entity: "Game",
                    entityId: id,
                    details: JSON.stringify({ slug: updated.slug }),
                },
            });
            return updated;
        }
        if (existing.status !== "TESTING")
            throw new HttpError(400, "仅测试状态可发布，请先通过测试流程");
        if (!existing.playUrl)
            throw new HttpError(400, "playUrl is required to publish");
        const hasCover = existing.assets.some((a) => a.type === "COVER");
        if (!hasCover)
            throw new HttpError(400, "coverUrl is required to publish");
        const published = await tx.game.update({
            where: { id },
            data: {
                status: "PUBLISHED",
                publishedAt: existing.publishedAt ?? new Date(),
            },
        });
        if (defaultSection) {
            const existingHomeItem = await tx.homeSectionItem.findFirst({
                where: { sectionId: defaultSection.id, gameId: id },
            });
            if (!existingHomeItem) {
                const maxSortOrder = await tx.homeSectionItem.aggregate({
                    where: { sectionId: defaultSection.id },
                    _max: { sortOrder: true },
                });
                await tx.homeSectionItem.create({
                    data: {
                        sectionId: defaultSection.id,
                        gameId: id,
                        sortOrder: (maxSortOrder._max.sortOrder ?? -1) + 1,
                    },
                });
            }
        }
        await tx.auditLog.create({
            data: {
                actorId: req.admin.sub,
                action: "PUBLISH_GAME",
                entity: "Game",
                entityId: id,
                details: JSON.stringify({ slug: published.slug }),
            },
        });
        return published;
    });
    res.json({ game: { id: game.id, slug: game.slug, status: game.status, publishedAt: game.publishedAt } });
});
adminRouter.post("/games/:id/unpublish", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const game = await prisma.$transaction(async (tx) => {
        const existing = await tx.game.findUnique({ where: { id } });
        if (!existing)
            throw new HttpError(404, "Game not found");
        const updated = await tx.game.update({
            where: { id },
            data: { status: "ARCHIVED" },
        });
        await tx.auditLog.create({
            data: {
                actorId: req.admin.sub,
                action: "UNPUBLISH_GAME",
                entity: "Game",
                entityId: id,
                details: JSON.stringify({ slug: updated.slug, status: "ARCHIVED" }),
            },
        });
        return updated;
    });
    res.json({ game: { id: game.id, slug: game.slug, status: game.status } });
});
adminRouter.get("/games/pending/review", requireAdmin, async (_req, res) => {
    const games = await prisma.game.findMany({
        where: { deletedAt: null, status: { in: ["REVIEW", "TESTING"] } },
        orderBy: { updatedAt: "desc" },
        take: 200,
        include: {
            category: true,
            tags: { include: { tag: true } },
            assets: { orderBy: [{ type: "asc" }, { sortOrder: "asc" }] },
        },
    });
    const pendingPublished = await prisma.game.findMany({
        where: { deletedAt: null, status: "PUBLISHED" },
        orderBy: { updatedAt: "desc" },
        include: {
            category: true,
            tags: { include: { tag: true } },
            assets: { orderBy: [{ type: "asc" }, { sortOrder: "asc" }] },
        },
    });
    const rows = games.map((g) => mapAdminGame(g));
    for (const g of pendingPublished) {
        const p = readPendingUpdate(g.id);
        if (!p)
            continue;
        const mapped = mapAdminGame(g);
        rows.push({ ...mapped, status: p.reviewStatus });
    }
    res.json({ games: rows });
});
adminRouter.post("/games/:id/submit-review", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const g = await prisma.game.findUnique({ where: { id } });
    if (!g)
        throw new HttpError(404, "Game not found");
    if (g.deletedAt)
        throw new HttpError(400, "已删除");
    if (g.status === "PUBLISHED") {
        const pending = readPendingUpdate(id);
        if (!pending)
            throw new HttpError(400, "该已发布游戏没有待审核修改");
        writePendingUpdate(id, { ...pending, reviewStatus: "REVIEW", savedAt: new Date().toISOString() });
        await prisma.auditLog.create({
            data: { actorId: req.admin.sub, action: "SUBMIT_PUBLISHED_UPDATE_REVIEW", entity: "Game", entityId: id, details: "{}" },
        });
        res.json({ game: { id: g.id, status: "REVIEW" } });
        return;
    }
    if (g.status !== "DRAFT")
        throw new HttpError(400, "仅草稿可提交审核");
    const game = await prisma.game.update({ where: { id }, data: { status: "REVIEW" } });
    await prisma.auditLog.create({
        data: { actorId: req.admin.sub, action: "SUBMIT_REVIEW", entity: "Game", entityId: id, details: "{}" },
    });
    res.json({ game: { id: game.id, status: game.status } });
});
adminRouter.post("/games/:id/start-testing", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const g = await prisma.game.findUnique({ where: { id } });
    if (!g)
        throw new HttpError(404, "Game not found");
    if (g.deletedAt)
        throw new HttpError(400, "已删除");
    if (g.status === "PUBLISHED") {
        const pending = readPendingUpdate(id);
        if (!pending)
            throw new HttpError(400, "该已发布游戏没有待测试修改");
        writePendingUpdate(id, { ...pending, reviewStatus: "TESTING", savedAt: new Date().toISOString() });
        await prisma.auditLog.create({
            data: { actorId: req.admin.sub, action: "START_TESTING_PUBLISHED_UPDATE", entity: "Game", entityId: id, details: "{}" },
        });
        res.json({ game: { id: g.id, status: "TESTING" } });
        return;
    }
    if (g.status !== "REVIEW" && g.status !== "DRAFT")
        throw new HttpError(400, "需从草稿或待审核进入测试");
    const game = await prisma.game.update({ where: { id }, data: { status: "TESTING" } });
    await prisma.auditLog.create({
        data: { actorId: req.admin.sub, action: "START_TESTING", entity: "Game", entityId: id, details: "{}" },
    });
    res.json({ game: { id: game.id, status: game.status } });
});
adminRouter.post("/games/:id/reject", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const body = z.object({ note: z.string().min(1).max(2000) }).parse(req.body);
    const g = await prisma.game.findUnique({ where: { id } });
    if (!g)
        throw new HttpError(404, "Game not found");
    if (g.status === "PUBLISHED") {
        const pending = readPendingUpdate(id);
        if (!pending)
            throw new HttpError(400, "该已发布游戏没有待审核修改");
        clearPendingUpdate(id);
        const game = await prisma.game.update({ where: { id }, data: { lastReviewNote: body.note } });
        await prisma.auditLog.create({
            data: { actorId: req.admin.sub, action: "REJECT_PUBLISHED_UPDATE_REVIEW", entity: "Game", entityId: id, details: JSON.stringify({ note: body.note }) },
        });
        res.json({ game: { id: game.id, status: game.status } });
        return;
    }
    const game = await prisma.game.update({
        where: { id },
        data: { status: "DRAFT", lastReviewNote: body.note },
    });
    await prisma.auditLog.create({
        data: { actorId: req.admin.sub, action: "REJECT_REVIEW", entity: "Game", entityId: id, details: JSON.stringify({ note: body.note }) },
    });
    res.json({ game: { id: game.id, status: game.status } });
});
adminRouter.post("/games/:id/bust-cache", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const game = await prisma.game.update({ where: { id }, data: { cacheBust: { increment: 1 } } });
    await prisma.auditLog.create({
        data: { actorId: req.admin.sub, action: "BUST_CACHE", entity: "Game", entityId: id, details: JSON.stringify({ cacheBust: game.cacheBust }) },
    });
    res.json({ game: { id, cacheBust: game.cacheBust } });
});
adminRouter.post("/games/:id/soft-delete", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    await prisma.$transaction(async (tx) => {
        await tx.homeSectionItem.deleteMany({ where: { gameId: id } });
        await tx.game.update({ where: { id }, data: { deletedAt: new Date(), status: "ARCHIVED" } });
        await tx.auditLog.create({
            data: { actorId: req.admin.sub, action: "SOFT_DELETE_GAME", entity: "Game", entityId: id, details: "{}" },
        });
    });
    res.json({ ok: true });
});
adminRouter.post("/games/:id/restore", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const g = await prisma.game.findUnique({ where: { id } });
    if (!g)
        throw new HttpError(404, "Game not found");
    if (!g.deletedAt)
        throw new HttpError(400, "未在回收站中");
    const game = await prisma.game.update({ where: { id }, data: { deletedAt: null } });
    await prisma.auditLog.create({
        data: { actorId: req.admin.sub, action: "RESTORE_GAME", entity: "Game", entityId: id, details: "{}" },
    });
    res.json({ game: { id: game.id, deletedAt: game.deletedAt } });
});
adminRouter.get("/game-reports", requireAdmin, async (req, res) => {
    const q = z
        .object({ page: z.coerce.number().int().positive().default(1), pageSize: z.coerce.number().int().max(100).default(30) })
        .parse(req.query);
    const where = { status: "OPEN" };
    const [total, rows] = await prisma.$transaction([
        prisma.gameReport.count({ where }),
        prisma.gameReport.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (q.page - 1) * q.pageSize,
            take: q.pageSize,
            include: { game: { select: { id: true, title: true, slug: true } } },
        }),
    ]);
    res.json({
        page: q.page,
        pageSize: q.pageSize,
        total,
        reports: rows.map((r) => ({
            id: r.id,
            reason: r.reason,
            detail: r.detail,
            status: r.status,
            createdAt: r.createdAt,
            game: r.game,
        })),
    });
});
adminRouter.post("/game-reports/:id/resolve", requireAdmin, async (req, res) => {
    const id = z.string().min(1).parse(req.params.id);
    const body = z.object({ action: z.enum(["RESOLVED", "REJECTED"]) }).parse(req.body);
    const r = await prisma.gameReport.update({ where: { id }, data: { status: body.action } });
    await prisma.auditLog.create({
        data: { actorId: req.admin.sub, action: "RESOLVE_GAME_REPORT", entity: "GameReport", entityId: id, details: body.action },
    });
    res.json({ report: { id: r.id, status: r.status } });
});
adminRouter.get("/games/:id/builds", requireAdmin, async (req, res) => {
    const gameId = z.string().min(1).parse(req.params.id);
    const builds = await prisma.gameBuild.findMany({ where: { gameId }, orderBy: { createdAt: "desc" } });
    res.json({ builds });
});
adminRouter.post("/games/:id/builds", requireAdmin, async (req, res) => {
    const gameId = z.string().min(1).parse(req.params.id);
    const body = z
        .object({
        version: z.string().min(1).max(40),
        packageUrl: z.string().url().optional().nullable(),
        status: z.enum(["PENDING", "APPROVED", "LIVE", "SUPERSEDED"]).default("PENDING"),
        rolloutPercent: z.number().int().min(0).max(100).optional().nullable(),
    })
        .parse(req.body);
    const b = await prisma.gameBuild.create({
        data: { gameId, version: body.version, packageUrl: body.packageUrl, status: body.status, rolloutPercent: body.rolloutPercent },
    });
    res.status(201).json({ build: b });
});
async function uniqueSlug(base) {
    let slug = base;
    let i = 2;
    for (;;) {
        const exists = await prisma.game.findUnique({ where: { slug } });
        if (!exists)
            return slug;
        slug = `${base}-${i}`;
        i += 1;
    }
}
async function syncTags(tx, gameId, tagSlugs) {
    await tx.gameTag.deleteMany({ where: { gameId } });
    for (const raw of tagSlugs) {
        const slug = slugify(raw);
        const tag = await tx.tag.upsert({
            where: { slug },
            create: { slug, name: titleCaseFromSlug(slug) },
            update: {},
        });
        await tx.gameTag.create({ data: { gameId, tagId: tag.id } });
    }
}
async function syncAssets(tx, gameId, body) {
    if (body.coverUrl !== undefined) {
        await tx.gameAsset.deleteMany({ where: { gameId, type: "COVER" } });
        if (body.coverUrl) {
            await tx.gameAsset.create({
                data: { gameId, type: "COVER", url: body.coverUrl, alt: "Cover", sortOrder: 0 },
            });
        }
    }
    if (body.bannerUrl !== undefined) {
        await tx.gameAsset.deleteMany({ where: { gameId, type: "BANNER" } });
        if (body.bannerUrl) {
            await tx.gameAsset.create({
                data: { gameId, type: "BANNER", url: body.bannerUrl, alt: "Banner", sortOrder: 0 },
            });
        }
    }
    if (body.screenshotUrls !== undefined) {
        await tx.gameAsset.deleteMany({ where: { gameId, type: "SCREENSHOT" } });
        let order = 0;
        for (const url of body.screenshotUrls) {
            await tx.gameAsset.create({
                data: { gameId, type: "SCREENSHOT", url, alt: "Screenshot", sortOrder: order++ },
            });
        }
    }
}
function titleCaseFromSlug(slug) {
    return slug
        .split("-")
        .filter(Boolean)
        .map((p) => p.slice(0, 1).toUpperCase() + p.slice(1))
        .join(" ");
}
function mapAdminGame(game) {
    const cover = game.assets.find((a) => a.type === "COVER")?.url ?? null;
    const banner = game.assets.find((a) => a.type === "BANNER")?.url ?? null;
    const screenshots = game.assets
        .filter((a) => a.type === "SCREENSHOT")
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((a) => a.url);
    return {
        id: game.id,
        slug: game.slug,
        title: game.title,
        shortPitch: game.shortPitch,
        description: game.description,
        status: game.status,
        publishedAt: game.publishedAt,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        deletedAt: game.deletedAt,
        developer: game.developer,
        ageRating: game.ageRating,
        screenOrientation: game.screenOrientation,
        isHot: game.isHot,
        isHomeRecommended: game.isHomeRecommended,
        titleI18nJson: game.titleI18nJson,
        extConfigJson: game.extConfigJson,
        launchCount: game.launchCount,
        cacheBust: game.cacheBust,
        lastReviewNote: game.lastReviewNote,
        playUrl: game.playUrl,
        embedUrl: game.embedUrl,
        categorySlug: game.category?.slug ?? null,
        tagSlugs: game.tags.map((t) => t.tag.slug),
        coverUrl: cover,
        bannerUrl: banner,
        screenshotUrls: screenshots,
    };
}
//# sourceMappingURL=admin.js.map