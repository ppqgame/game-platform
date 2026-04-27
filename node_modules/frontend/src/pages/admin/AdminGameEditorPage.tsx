import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { apiJson, apiUploadFile, apiUploadGameZip, ApiError } from "../../api/client";
import { ErrorBanner, Spinner } from "../../components/Ui";
import { resolvePlayUrl } from "../../playUrl";
import type { AdminGameDTO, AdminGameResponse, CategoriesResponse } from "../../types";

function parseList(input: string) {
  return input
    .split(/[\n,，]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidImageUrl(value: string) {
  if (value.startsWith("/uploads/")) return true;
  return isValidUrl(value);
}

const MAX_SCREENSHOTS = 5;

/** 与后端 `isAllowedPlayUrl` 一致：http(s)、/… 或相对路径 */
function isValidPlayUrl(value: string): boolean {
  const t = value.trim();
  if (!t) return false;
  if (t.length > 4096) return false;
  if (/[\r\n\u0000]/.test(t)) return false;
  if (t.startsWith("//")) return false;
  if (/^https?:\/\//i.test(t)) return isValidUrl(t);
  if (/^[a-z][\w+.-]*:/i.test(t)) return false;
  if (/[<>"']/.test(t)) return false;
  return true;
}

/** 图片上传入口（仅图形，配合 aria-label） */
function ImageUploadGlyph() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

export function AdminGameEditorPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isNew = location.pathname.endsWith("/admin/games/new");

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<CategoriesResponse["categories"]>([]);

  const [gameId, setGameId] = useState<string | null>(isNew ? null : (id ?? null));

  const [title, setTitle] = useState("");
  const [shortPitch, setShortPitch] = useState("");
  const [description, setDescription] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [tagSlugsText, setTagSlugsText] = useState("quick-play");
  const [playUrl, setPlayUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [screenshotUrls, setScreenshotUrls] = useState<string[]>([]);
  const [screenshotUploading, setScreenshotUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [playZipUploading, setPlayZipUploading] = useState(false);
  const [developer, setDeveloper] = useState("");
  const [ageRating, setAgeRating] = useState<"ALL" | "P12" | "P16" | "P18">("ALL");
  const [screenOrientation, setScreenOrientation] = useState<"LANDSCAPE" | "PORTRAIT">("LANDSCAPE");
  const [isHot, setIsHot] = useState(false);
  const [isHomeRecommended, setIsHomeRecommended] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [lastReviewNote, setLastReviewNote] = useState<string | null>(null);
  const [gameSlug, setGameSlug] = useState<string>("");

  const header = useMemo(() => (isNew ? "新建游戏" : "编辑游戏"), [isNew]);
  const currentGameName = useMemo(() => title.trim(), [title]);

  const loadGame = useCallback(
    async (gameIdToLoad: string) => {
      setLoading(true);
      setError(null);
      try {
        const json = await apiJson<AdminGameResponse>(`/api/admin/games/${encodeURIComponent(gameIdToLoad)}`, {
          auth: true,
        });
        const g: AdminGameDTO = json.game;
        setGameId(g.id);
        setTitle(g.title);
        setShortPitch(g.shortPitch);
        setDescription(g.description);
        setCategorySlug(g.categorySlug ?? "");
        setTagSlugsText(g.tagSlugs.join("\n"));
        setPlayUrl(g.playUrl ?? "");
        setCoverUrl(g.coverUrl ?? "");
        setBannerUrl(g.bannerUrl ?? "");
        setScreenshotUrls(g.screenshotUrls.slice(0, MAX_SCREENSHOTS));
        setDeveloper(g.developer ?? "");
        setAgeRating((g.ageRating as "ALL" | "P12" | "P16" | "P18") || "ALL");
        setScreenOrientation(g.screenOrientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
        setIsHot(!!g.isHot);
        setIsHomeRecommended(!!g.isHomeRecommended);
        setStatus(g.status);
        setLastReviewNote(g.lastReviewNote);
        setGameSlug(g.slug);
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          localStorage.removeItem("gp_admin_token");
          navigate("/admin/login", { replace: true });
          return;
        }
        setError(e instanceof ApiError ? e.message : "加载失败");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!localStorage.getItem("gp_admin_token")) {
      navigate("/admin/login", { replace: true });
      return;
    }

    void (async () => {
      try {
        const json = await apiJson<CategoriesResponse>("/api/categories");
        setCategories(json.categories ?? []);
      } catch {
        setCategories([]);
      }
    })();

    if (isNew) {
      setLoading(false);
      return;
    }
    if (!id) return;

    void loadGame(id);
  }, [id, isNew, loadGame]);

  const buildSaveBody = (forCreate: boolean) => {
    const tagSlugs = parseList(tagSlugsText);
    const shots = screenshotUrls.slice(0, MAX_SCREENSHOTS).filter((u) => isValidImageUrl(u));

    const body: Record<string, unknown> = {
      title,
      shortPitch,
      description,
      categorySlug: categorySlug.trim() ? categorySlug.trim() : undefined,
      tagSlugs,
      playUrl: playUrl.trim() ? playUrl.trim() : null,
      coverUrl: coverUrl.trim() ? coverUrl.trim() : null,
      bannerUrl: bannerUrl.trim() ? bannerUrl.trim() : null,
      screenshotUrls: shots,
      developer: developer.trim() ? developer.trim() : null,
      ageRating,
      screenOrientation,
      isHot,
      isHomeRecommended,
    };

    if (forCreate) {
      body.titleI18nJson = "{}";
      body.extConfigJson = "{}";
    }
    return body;
  };

  const validateForm = () => {
    const next: Record<string, string> = {};
    const shots = screenshotUrls.slice(0, MAX_SCREENSHOTS);

    if (!title.trim()) next.title = "请输入标题";
    else if (title.trim().length > 120) next.title = "标题不能超过 120 字";

    if (!shortPitch.trim()) next.shortPitch = "请输入一句话卖点";
    else if (shortPitch.trim().length > 200) next.shortPitch = "一句话卖点不能超过 200 字";

    if (!description.trim()) next.description = "请输入详细介绍";
    else if (description.trim().length > 500) next.description = "详细介绍不能超过 500 字";

    if (playUrl.trim() && !isValidPlayUrl(playUrl.trim())) {
      next.playUrl = "须为 http(s)、以 / 开头的绝对路径或相对路径";
    }
    if (coverUrl.trim() && !isValidImageUrl(coverUrl.trim())) next.coverUrl = "请上传或填写合法 ICON 地址（http(s) 或 /uploads/）";
    if (bannerUrl.trim() && !isValidImageUrl(bannerUrl.trim())) next.bannerUrl = "请填写合法 http(s) 或 /uploads/ 地址，或留空";

    if (shots.some((u) => !u || !isValidImageUrl(u))) {
      next.screenshots = "每条须为有效 http(s) 或 /uploads/ 下的图片地址";
    }

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    if (!validateForm()) return;
    setSaving(true);
    setError(null);
    try {
      if (isNew) {
        const json = await apiJson<{ game: { id: string; slug: string } }>(`/api/admin/games`, {
          method: "POST",
          auth: true,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(buildSaveBody(true)),
        });
        setSuccess("创建成功，已进入待审核队列。");
        navigate(`/admin/games/${encodeURIComponent(json.game.id)}`, { replace: true });
        return;
      }

      if (!gameId) throw new Error("missing game id");

      await apiJson(`/api/admin/games/${encodeURIComponent(gameId)}`, {
        method: "PATCH",
        auth: true,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildSaveBody(false)),
      });

      await loadGame(gameId);
      setSuccess("保存成功，已提交待审核。");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner label="正在加载编辑表单…" />;

  return (
    <div className="stack">
      <div className="adminToolbar">
        <div>
          <div className="kicker">后台</div>
          <h1 className="h1">{header}</h1>
          <p className="lede">
            发布规则：必须有 <code>playUrl</code>，并且必须上传或填写 ICON（对应封面 <code>coverUrl</code>）。
          </p>
        </div>
        <div className="adminToolbarActions">
          <Link className="btn btn--ghost" to="/admin/games">
            返回列表
          </Link>
        </div>
      </div>

      {error ? <ErrorBanner message={error} /> : null}
      {success ? <div className="banner banner--success">{success}</div> : null}
      {!isNew && status ? (
        <div className="section" style={{ padding: 12 }}>
          <div className="sectionHeader">
            <h2 className="h2">审核流程</h2>
            <span className="pill pill--ghost">当前：{status}</span>
          </div>
          {lastReviewNote ? <p className="lede muted">上次批注：{lastReviewNote}</p> : null}
          <div className="rowActions" style={{ justifyContent: "flex-start" }}>
            {status === "DRAFT" ? (
              <button
                type="button"
                className="btn btn--primary btn--sm"
                disabled={saving}
                onClick={async () => {
                  if (!gameId) return;
                  setError(null);
                  try {
                    await apiJson(`/api/admin/games/${encodeURIComponent(gameId)}/submit-review`, { method: "POST", auth: true });
                    if (gameId) await loadGame(gameId);
                    setSuccess("已提交审核");
                  } catch (e) {
                    setError(e instanceof ApiError ? e.message : "失败");
                  }
                }}
              >
                提交审核
              </button>
            ) : null}
            {status === "REVIEW" || status === "DRAFT" ? (
              <button
                type="button"
                className="btn btn--primary btn--sm"
                disabled={saving}
                onClick={async () => {
                  if (!gameId) return;
                  setError(null);
                  try {
                    await apiJson(`/api/admin/games/${encodeURIComponent(gameId)}/start-testing`, { method: "POST", auth: true });
                    if (gameId) await loadGame(gameId);
                    setSuccess("已进入测试状态");
                  } catch (e) {
                    setError(e instanceof ApiError ? e.message : "失败");
                  }
                }}
              >
                启动沙箱测试
              </button>
            ) : null}
            {playUrl.trim() ? (
              <a className="btn btn--ghost btn--sm" href={resolvePlayUrl(playUrl.trim())} target="_blank" rel="noreferrer">
                试玩地址
              </a>
            ) : gameSlug ? (
              <Link className="btn btn--ghost btn--sm" to={`/play/${encodeURIComponent(gameSlug)}`} target="_blank" rel="noreferrer">
                站内试玩
              </Link>
            ) : null}
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              disabled={!gameId}
              onClick={async () => {
                if (!gameId) return;
                setError(null);
                try {
                  await apiJson(`/api/admin/games/${encodeURIComponent(gameId)}/bust-cache`, { method: "POST", auth: true });
                  setSuccess("已增加缓存版本号，客户端可强制刷新。");
                } catch (e) {
                  setError(e instanceof ApiError ? e.message : "失败");
                }
              }}
            >
              强制刷新缓存
            </button>
          </div>
        </div>
      ) : null}

      <form className="adminForm" onSubmit={onSave}>
        <label className="field">
          <div className="label">标题</div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          {fieldErrors.title ? <div className="fieldError">{fieldErrors.title}</div> : null}
        </label>

        <label className="field">
          <div className="label">一句话卖点（≤200 字）</div>
          <input value={shortPitch} onChange={(e) => setShortPitch(e.target.value)} required />
          {fieldErrors.shortPitch ? <div className="fieldError">{fieldErrors.shortPitch}</div> : null}
        </label>

        <div className="grid2">
          <label className="field">
            <div className="label">开发商</div>
            <input value={developer} onChange={(e) => setDeveloper(e.target.value)} placeholder="可选" />
          </label>
          <label className="field">
            <div className="label">适龄分级</div>
            <select value={ageRating} onChange={(e) => setAgeRating(e.target.value as "ALL" | "P12" | "P16" | "P18")}>
              <option value="ALL">全年龄</option>
              <option value="P12">12+</option>
              <option value="P16">16+</option>
              <option value="P18">18+</option>
            </select>
          </label>
        </div>

        <label className="field">
          <div className="label">画面方向</div>
          <select
            value={screenOrientation}
            onChange={(e) => setScreenOrientation(e.target.value as "LANDSCAPE" | "PORTRAIT")}
          >
            <option value="LANDSCAPE">横屏</option>
            <option value="PORTRAIT">竖屏</option>
          </select>
        </label>

        <div className="grid2">
          <label className="field">
            <div className="label">首页 HOT</div>
            <select value={isHot ? "yes" : "no"} onChange={(e) => setIsHot(e.target.value === "yes")}>
              <option value="no">否</option>
              <option value="yes">是</option>
            </select>
          </label>
          <label className="field">
            <div className="label">首页推荐</div>
            <select value={isHomeRecommended ? "yes" : "no"} onChange={(e) => setIsHomeRecommended(e.target.value === "yes")}>
              <option value="no">否</option>
              <option value="yes">是</option>
            </select>
          </label>
        </div>

        <label className="field">
          <div className="label">游戏分类（可选）</div>
          <select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
            <option value="">未选择</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <div className="label">标签 slug（每行一个）</div>
          <textarea value={tagSlugsText} onChange={(e) => setTagSlugsText(e.target.value)} rows={4} />
        </label>

        <label className="field">
          <div className="label">详细介绍（不超过 500 字）</div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            maxLength={500}
            required
          />
          <div className="lede muted" style={{ marginTop: 6 }}>
            {description.trim().length}/500
          </div>
          {fieldErrors.description ? <div className="fieldError">{fieldErrors.description}</div> : null}
        </label>

        <label className="field">
          <div className="label">playUrl（支持 https 绝对地址、以 / 开头的站内路径或相对路径）</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
            <input
              id="admin-game-play-zip-file"
              type="file"
              accept=".zip,application/zip,application/x-zip-compressed"
              disabled={playZipUploading}
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (!f) return;
                setError(null);
                setPlayZipUploading(true);
                void (async () => {
                  try {
                      const { playUrl: generatedPlayUrl } = await apiUploadGameZip(
                        "/api/admin/upload-game-zip",
                        f,
                        title.trim()
                      );
                    setPlayUrl(generatedPlayUrl);
                    setSuccess("ZIP 上传并解压成功，已自动填入 playUrl。");
                  } catch (err) {
                    setError(err instanceof ApiError ? err.message : "ZIP 上传失败");
                  } finally {
                    setPlayZipUploading(false);
                  }
                })();
              }}
            />
            <label
              htmlFor="admin-game-play-zip-file"
              className="btn btn--ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 40,
                cursor: playZipUploading ? "not-allowed" : "pointer",
                opacity: playZipUploading ? 0.55 : 1,
              }}
              aria-label="上传游戏 ZIP 包"
            >
              上传 ZIP 并生成路径
            </label>
            {playZipUploading ? <span className="lede muted">正在上传并解压…</span> : null}
          </div>
          <input
            value={playUrl}
            onChange={(e) => setPlayUrl(e.target.value)}
            placeholder="https://… /play/<游戏名>/index.html（兼容旧 /games/...）"
          />
          {fieldErrors.playUrl ? <div className="fieldError">{fieldErrors.playUrl}</div> : null}
        </label>

        <div className="grid2">
          <div className="field">
            <div className="label">ICON</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
              <input
                id="admin-game-icon-file"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                disabled={coverUploading}
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (!f) return;
                  if (!currentGameName) {
                    setError("请先填写游戏名，再上传 ICON");
                    return;
                  }
                  setError(null);
                  setCoverUploading(true);
                  void (async () => {
                    try {
                      const { url } = await apiUploadFile("/api/admin/upload", f, "file", {
                        gameName: currentGameName,
                        kind: "icon",
                      });
                      setCoverUrl(url);
                    } catch (err) {
                      setError(err instanceof ApiError ? err.message : "ICON 上传失败");
                    } finally {
                      setCoverUploading(false);
                    }
                  })();
                }}
              />
              <label
                htmlFor="admin-game-icon-file"
                className="btn btn--ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 44,
                  minHeight: 44,
                  padding: 8,
                  cursor: coverUploading ? "not-allowed" : "pointer",
                  opacity: coverUploading ? 0.55 : 1,
                }}
                aria-label="上传 ICON 图片"
              >
                <ImageUploadGlyph />
              </label>
              {coverUploading ? <span className="lede muted">正在上传…</span> : null}
            </div>
            <input
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="/uploads/images/… 或 https://…"
            />
            {fieldErrors.coverUrl ? <div className="fieldError">{fieldErrors.coverUrl}</div> : null}
            {coverUrl.trim() ? (
              <img
                src={coverUrl}
                alt="ICON 预览"
                style={{ marginTop: 8, maxWidth: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 8 }}
              />
            ) : null}
          </div>
          <div className="field">
            <div className="label">横幅（可选）</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
              <input
                id="admin-game-banner-file"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                disabled={bannerUploading}
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (!f) return;
                  if (!currentGameName) {
                    setError("请先填写游戏名，再上传横幅");
                    return;
                  }
                  setError(null);
                  setBannerUploading(true);
                  void (async () => {
                    try {
                      const { url } = await apiUploadFile("/api/admin/upload", f, "file", {
                        gameName: currentGameName,
                        kind: "banner",
                        index: 1,
                      });
                      setBannerUrl(url);
                    } catch (err) {
                      setError(err instanceof ApiError ? err.message : "横幅上传失败");
                    } finally {
                      setBannerUploading(false);
                    }
                  })();
                }}
              />
              <label
                htmlFor="admin-game-banner-file"
                className="btn btn--ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 44,
                  minHeight: 44,
                  padding: 8,
                  cursor: bannerUploading ? "not-allowed" : "pointer",
                  opacity: bannerUploading ? 0.55 : 1,
                }}
                aria-label="上传横幅图片"
              >
                <ImageUploadGlyph />
              </label>
              {bannerUploading ? <span className="lede muted">正在上传…</span> : null}
            </div>
            <input
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              placeholder="可留空，或 https://…、/uploads/…"
            />
            {fieldErrors.bannerUrl ? <div className="fieldError">{fieldErrors.bannerUrl}</div> : null}
            {bannerUrl.trim() ? (
              <img
                src={bannerUrl}
                alt="横幅预览"
                style={{ marginTop: 8, maxWidth: "100%", maxHeight: 120, objectFit: "contain", borderRadius: 8 }}
              />
            ) : null}
          </div>
        </div>

        <div className="field">
          <div className="label">截图（0–5 张，可上传或多行手动路径）</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
            <input
              id="admin-game-screenshots-files"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              multiple
              disabled={screenshotUploading}
              style={{ display: "none" }}
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                e.target.value = "";
                if (!files.length) return;
                  if (!currentGameName) {
                    setError("请先填写游戏名，再上传截图");
                    return;
                  }
                setError(null);
                setScreenshotUploading(true);
                void (async () => {
                  try {
                      let nextIndex = screenshotUrls.length + 1;
                    for (const f of files) {
                        const { url } = await apiUploadFile("/api/admin/upload", f, "file", {
                          gameName: currentGameName,
                          kind: "screenshot",
                          index: nextIndex++,
                        });
                      setScreenshotUrls((prev) => (prev.length >= MAX_SCREENSHOTS ? prev : [...prev, url]));
                    }
                  } catch (err) {
                    setError(err instanceof ApiError ? err.message : "截图上传失败");
                  } finally {
                    setScreenshotUploading(false);
                  }
                })();
              }}
            />
            <label
              htmlFor="admin-game-screenshots-files"
              className="btn btn--ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 44,
                minHeight: 44,
                padding: 8,
                cursor: screenshotUploading || screenshotUrls.length >= MAX_SCREENSHOTS ? "not-allowed" : "pointer",
                opacity: screenshotUploading || screenshotUrls.length >= MAX_SCREENSHOTS ? 0.55 : 1,
              }}
              aria-label="上传截图图片，可多选"
            >
              <ImageUploadGlyph />
            </label>
            {screenshotUploading ? <span className="lede muted">正在上传…</span> : null}
            <span className="lede muted">
              {screenshotUrls.length}/{MAX_SCREENSHOTS}
            </span>
          </div>
          {screenshotUrls.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
              {screenshotUrls.map((url, i) => (
                <div key={`${i}-${url.slice(-24)}`} style={{ position: "relative", width: 96 }}>
                  <img
                    src={url}
                    alt={`截图 ${i + 1}`}
                    style={{ width: "100%", height: 56, objectFit: "cover", borderRadius: 6, display: "block" }}
                  />
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    style={{ marginTop: 4, width: "100%", padding: "2px 4px", fontSize: 12 }}
                    onClick={() => setScreenshotUrls((prev) => prev.filter((_, j) => j !== i))}
                  >
                    移除
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          <textarea
            value={screenshotUrls.join("\n")}
            onChange={(e) => {
              const lines = parseList(e.target.value).slice(0, MAX_SCREENSHOTS);
              setScreenshotUrls(lines);
            }}
            rows={5}
            placeholder={"每行一条图片地址，最多 5 行\n例如 https://… 或 /uploads/images/…"}
          />
          {fieldErrors.screenshots ? <div className="fieldError">{fieldErrors.screenshots}</div> : null}
        </div>

        <div className="formActions">
          <button className="btn btn--primary" type="submit" disabled={saving}>
            {saving ? "保存中…" : "保存"}
          </button>
        </div>
      </form>
    </div>
  );
}
