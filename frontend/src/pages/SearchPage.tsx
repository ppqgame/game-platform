import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiJson, ApiError } from "../api/client";
import { GameCard } from "../components/GameCard";
import type { DiscoverResponse } from "../types";

export function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = params.get("sort") ?? "default";
  const [data, setData] = useState<DiscoverResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  const qs = useMemo(() => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (sort) sp.set("sort", sort);
    sp.set("page", "1");
    sp.set("pageSize", "30");
    return sp.toString();
  }, [q, sort]);

  useEffect(() => {
    const begin = performance.now();
    (async () => {
      try {
        setError(null);
        const json = await apiJson<DiscoverResponse>(`/api/discover?${qs}`);
        setData(json);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : "Search failed");
      } finally {
        setElapsedMs(Math.round(performance.now() - begin));
      }
    })();
  }, [qs]);

  return (
    <div className="stack">
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Search Results</h2>
          <div className="muted">
            Query: {q || "-"} · Time: {elapsedMs}ms · Total: {data?.total ?? 0}
          </div>
        </div>
        <div className="chipRow">
          {["default", "new", "rating", "plays"].map((s) => (
            <Link key={s} className={`chip ${sort === s ? "chip--active" : ""}`} to={`/search?q=${encodeURIComponent(q)}&sort=${s}`}>
              {s}
            </Link>
          ))}
        </div>
      </section>
      {error ? <div className="banner banner--error">{error}</div> : null}
      {!error && data && data.games.length === 0 ? (
        <section className="section">
          <h2 className="h2">No games found</h2>
          <p className="lede">Try another keyword or browse popular categories.</p>
          <Link className="btn btn--primary" to="/games?sort=plays">
            Browse Popular Games
          </Link>
        </section>
      ) : null}
      <div className="gameGrid">
        {(data?.games ?? []).map((g) => (
          <GameCard key={g.slug} game={g} />
        ))}
      </div>
    </div>
  );
}

