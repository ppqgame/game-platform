import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiJson, ApiError } from "../api/client";
import { ErrorBanner, Spinner } from "../components/Ui";
import { resolvePlayUrl } from "../playUrl";
import type { CommentsResponse, GameDetailResponse } from "../types";

const SCREEN_ORIENTATION_LABEL: Record<"LANDSCAPE" | "PORTRAIT", string> = {
  LANDSCAPE: "Landscape",
  PORTRAIT: "Portrait",
};

export function GameDetailPage() {
  const { slug } = useParams();
  const [data, setData] = useState<GameDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentsResponse | null>(null);
  const [commentText, setCommentText] = useState("");
  const [stars, setStars] = useState(5);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const json = await apiJson<GameDetailResponse>(`/api/games/${encodeURIComponent(slug)}`);
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e instanceof ApiError ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const c = await apiJson<CommentsResponse>(`/api/interaction/games/${encodeURIComponent(slug)}/comments?page=1&pageSize=20&sort=latest`);
        setComments(c);
      } catch {
        setComments(null);
      }
    })();
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!slug) return <ErrorBanner message="Missing slug" />;
  if (loading) return <Spinner label="Loading game details..." />;
  if (error) return <ErrorBanner message={error} />;
  if (!data) return <ErrorBanner message="No data" />;

  const g = data.game;
  const banner = g.bannerUrl ?? g.coverUrl ?? "https://picsum.photos/seed/banner/1200/420";
  const assetCountByType = g.mediaAssets.reduce<Record<string, number>>((acc, it) => {
    acc[it.kind] = (acc[it.kind] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="stack">
      <div className="detailHero" style={{ backgroundImage: `url(${banner})` }}>
        <div className="detailHeroInner">
          <div className="detailTop">
            <Link className="crumb" to="/games">
              ← Back to Library
            </Link>
          </div>

          <div className="detailHead">
            <img className="detailCover" src={g.coverUrl ?? banner} alt="" />
            <div className="detailHeadText">
              <div className="kicker">{g.category?.name ?? "Uncategorized"}</div>
              <h1 className="h1 detailTitle">{g.title}</h1>
              <p className="lede">{g.shortPitch}</p>
              <div className="tagRow">
                {g.tags.map((t) => (
                  <Link key={t.slug} className="pill" to={`/games?tag=${encodeURIComponent(t.slug)}`}>
                    {t.name}
                  </Link>
                ))}
                <span className="pill pill--ghost" title="Screen orientation">
                  Orientation: {SCREEN_ORIENTATION_LABEL[(g.screenOrientation ?? "LANDSCAPE") as "LANDSCAPE" | "PORTRAIT"]}
                </span>
              </div>

              <div className="detailActions">
                <Link className="btn btn--primary" to={`/play/${encodeURIComponent(g.slug)}`}>
                  Play
                </Link>
                <button className="btn btn--ghost" type="button">
                  Favorite
                </button>
                <button className="btn btn--ghost" type="button">
                  Share
                </button>
                {g.playUrl ? (
                  <a className="btn btn--ghost" href={resolvePlayUrl(g.playUrl)} target="_blank" rel="noreferrer">
                    Open in New Tab
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">About This Game</h2>
        </div>
        <div className="prose">{g.description}</div>
      </section>

      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Asset Types</h2>
        </div>
        <div className="tagRow">
          <span className="pill">ICON: {assetCountByType.ICON ?? 0}</span>
          <span className="pill">BANNER: {assetCountByType.BANNER ?? 0}</span>
          <span className="pill">SCREENSHOT: {assetCountByType.SCREENSHOT ?? 0}</span>
        </div>
      </section>

      {g.mediaAssets.length ? (
        <section className="section">
          <div className="sectionHeader">
          <h2 className="h2">Media Gallery</h2>
          </div>
          <div className="assetGrid">
            {g.mediaAssets.map((s, idx) => (
              <div key={`${s.url}-${idx}`} className="assetCard">
                <img src={s.url} alt={s.alt ?? ""} loading="lazy" />
                <div className="assetCardMeta">
                  <span className="pill pill--ghost">{s.kind}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Ratings & Comments</h2>
        </div>
        <div className="tagRow" style={{ marginTop: 0 }}>
          {[1, 2, 3, 4, 5].map((x) => (
            <button key={x} type="button" className={`chip ${stars === x ? "chip--active" : ""}`} onClick={() => setStars(x)}>
              {x} Star
            </button>
          ))}
        </div>
        <textarea
          className="fieldTextarea"
          style={{ marginTop: 10 }}
          rows={4}
          placeholder="Share your thoughts about this game (max 500 chars)"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <div className="formActions">
          <button
            className="btn btn--primary"
            type="button"
            onClick={async () => {
              if (!slug || !commentText.trim()) return;
              try {
                await apiJson(`/api/interaction/games/${encodeURIComponent(slug)}/comments`, {
                  method: "POST",
                  auth: true,
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ stars, content: commentText.trim() }),
                });
                setCommentText("");
                const c = await apiJson<CommentsResponse>(`/api/interaction/games/${encodeURIComponent(slug)}/comments?page=1&pageSize=20&sort=latest`);
                setComments(c);
              } catch (e) {
                setError(e instanceof ApiError ? e.message : "Failed to submit comment");
              }
            }}
          >
            Post Comment
          </button>
        </div>
        <div className="stack" style={{ marginTop: 10 }}>
          {(comments?.comments ?? []).map((c) => (
            <div key={c.id} className="banner">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <strong>{c.user.nickname}</strong>
                <span className="muted">{new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <div className="muted">Rating: {c.stars ?? "-"} Star</div>
              <div style={{ marginTop: 6 }}>{c.content}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
