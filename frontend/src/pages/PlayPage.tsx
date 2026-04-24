import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiJson, ApiError } from "../api/client";
import { ErrorBanner, Spinner } from "../components/Ui";
import { resolvePlayUrl } from "../playUrl";
import type { GameDetailResponse } from "../types";

export function PlayPage() {
  const { slug } = useParams();
  const [data, setData] = useState<GameDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
    const sync = () => setIsMobile(window.innerWidth <= 980);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const src = useMemo(() => {
    const g = data?.game;
    if (!g) return null;
    return resolvePlayUrl(g.embedUrl || g.playUrl || "");
  }, [data]);

  if (!slug) return <ErrorBanner message="Missing slug" />;
  if (loading) return <Spinner label="Preparing player..." />;
  if (error) return <ErrorBanner message={error} />;
  if (!data) return <ErrorBanner message="No data" />;
  const orientation = data.game.screenOrientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE";
  const frameAspectRatio = orientation === "PORTRAIT" ? "9 / 16" : "16 / 9";
  const frameMaxWidth = orientation === "PORTRAIT" ? "min(100%, 460px)" : "min(100%, 1280px)";
  if (isMobile && src) {
    return (
      <div className="playMobileFullscreen">
        <iframe className="playFrame playFrame--mobile" title="game" src={src} allow="fullscreen; autoplay; gamepad" />
        <Link className="playMobileBack" to={`/games/${encodeURIComponent(data.game.slug)}`}>
          ← Back
        </Link>
      </div>
    );
  }

  return (
    <div className="playWrap">
      <div className="playTop">
        <Link className="crumb" to={`/games/${encodeURIComponent(data.game.slug)}`}>
          ← Back to Details
        </Link>
        <div className="playTitle">{data.game.title}</div>
      </div>

      {!src ? (
        <ErrorBanner message="This game has no playUrl/embedUrl and cannot be embedded." />
      ) : (
        <div className="playFrameViewport" style={{ aspectRatio: frameAspectRatio, maxWidth: frameMaxWidth }}>
          <iframe className="playFrame" title="game" src={src} allow="fullscreen; autoplay; gamepad" />
        </div>
      )}
    </div>
  );
}
