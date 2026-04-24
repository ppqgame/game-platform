import { useEffect, useState } from "react";
import { apiJson, ApiError } from "../api/client";
import { GameCard } from "../components/GameCard";
import { ErrorBanner, Spinner } from "../components/Ui";
import type { HomeResponse } from "../types";

function toEnglishSectionTitle(section: HomeResponse["sections"][number]) {
  const key = String(section.key || "").toUpperCase();
  const kind = String(section.kind || "").toUpperCase();
  if (key.includes("HOT") || kind.includes("HOT")) return "Hot";
  if (key.includes("NEW") || kind.includes("NEW")) return "New";
  if (key.includes("RECOMMEND") || kind.includes("RECOMMEND")) return "Recommended";
  return section.title;
}

export function HomePage() {
  const [data, setData] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const json = await apiJson<HomeResponse>("/api/home");
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
  }, []);

  if (loading) return <Spinner label="Loading home sections..." />;
  if (error) return <ErrorBanner message={error} />;
  if (!data) return <ErrorBanner message="No data" />;

  return (
    <div className="stack">
      {data.sections.map((s) => (
        <section key={s.key} className="section">
          <div className="sectionHeader">
            <h2 className="h2">{toEnglishSectionTitle(s)}</h2>
            <div className="sectionMeta">
              <span className="pill pill--ghost">{s.kind}</span>
              <span className="muted">{s.games.length} games</span>
            </div>
          </div>

          <div className="gameGrid">
            {s.games.map((g) => (
              <GameCard key={g.slug} game={g} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
