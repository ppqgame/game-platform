import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiJson, ApiError } from "../api/client";
import { GameCard } from "../components/GameCard";
import { ErrorBanner, Spinner } from "../components/Ui";
import type { CategoriesResponse, DiscoverResponse } from "../types";

export function GamesPage() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const tags = params.get("tags") ?? "";
  const age = params.get("age") ?? "all";
  const sort = params.get("sort") ?? "default";

  const [cats, setCats] = useState<CategoriesResponse | null>(null);
  const [data, setData] = useState<DiscoverResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [categoryCollapsed, setCategoryCollapsed] = useState(true);

  const qs = useMemo(() => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (category) sp.set("category", category);
    if (tags) sp.set("tags", tags);
    if (age && age !== "all") sp.set("age", age);
    if (sort) sp.set("sort", sort);
    sp.set("page", "1");
    sp.set("pageSize", "24");
    const s = sp.toString();
    return s ? `?${s}` : "";
  }, [q, category, tags, age, sort]);

  const buildGamesLink = (next: Partial<{ q: string; category: string; tags: string; sort: string; age: string }>) => {
    const sp = new URLSearchParams();
    const qv = next.q ?? q;
    const cv = next.category ?? category;
    const tv = next.tags ?? tags;
    const sv = next.sort ?? sort;
    const av = next.age ?? age;
    if (qv) sp.set("q", qv);
    if (cv) sp.set("category", cv);
    if (tv) sp.set("tags", tv);
    if (sv) sp.set("sort", sv);
    if (av && av !== "all") sp.set("age", av);
    return `/games${sp.toString() ? `?${sp.toString()}` : ""}`;
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const [c, g] = await Promise.all([
          apiJson<CategoriesResponse>("/api/categories"),
          apiJson<DiscoverResponse>(`/api/discover${qs}`),
        ]);
        if (!cancelled) {
          setCats(c);
          setData(g);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof ApiError ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [qs]);

  useEffect(() => {
    const sync = () => {
      const mobile = window.innerWidth <= 980;
      setIsMobile(mobile);
      setCategoryCollapsed(mobile);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (loading) return <Spinner label="Loading games..." />;
  if (error) return <ErrorBanner message={error} />;
  if (!data) return <ErrorBanner message="No data" />;

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <div className="kicker">Game Library</div>
          <h1 className="h1">All Games</h1>
          <p className="lede">
            Current filters:
            <span className="mono">
              q={q || "-"} · category={category || "-"} · tags={tags || "-"} · age={age} · sort={sort}
            </span>
          </p>
        </div>
      </div>

      <div className="sortBar">
        <div className="filterTitle">Sort</div>
        <div className="chipRow">
          <Link
            className={`chip ${sort === "default" ? "chip--active" : ""}`}
            to={buildGamesLink({ sort: "default" })}
          >
            Default
          </Link>
          <Link className={`chip ${sort === "plays" ? "chip--active" : ""}`} to={buildGamesLink({ sort: "plays" })}>
            Most Played
          </Link>
          <Link className={`chip ${sort === "rating" ? "chip--active" : ""}`} to={buildGamesLink({ sort: "rating" })}>
            Top Rated
          </Link>
          <Link className={`chip ${sort === "new" ? "chip--active" : ""}`} to={buildGamesLink({ sort: "new" })}>
            Newest
          </Link>
        </div>
      </div>

      <div className="filters">
        <div className="filterBlock">
          <div className="filterTitleRow">
            <div className="filterTitle">Categories</div>
            {isMobile ? (
              <button
                type="button"
                className="chip"
                onClick={() => setCategoryCollapsed((v) => !v)}
                aria-expanded={!categoryCollapsed}
                aria-controls="games-category-filter"
              >
                {categoryCollapsed ? "Expand" : "Collapse"}
              </button>
            ) : null}
          </div>
          {!isMobile || !categoryCollapsed ? (
            <div className="chipRow" id="games-category-filter">
              <Link className={`chip ${!category ? "chip--active" : ""}`} to={buildGamesLink({ category: "", tags: "" })}>
                All
              </Link>
              {(cats?.categories ?? []).map((c) => (
                <Link
                  key={c.slug}
                  className={`chip ${category === c.slug ? "chip--active" : ""}`}
                  to={buildGamesLink({ category: c.slug, tags: "" })}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="filterBlock">
          <div className="filterTitle">Tags (comma separated)</div>
          <div className="chipRow">
            <Link
              className={`chip ${tags === "action" ? "chip--active" : ""}`}
              to={buildGamesLink({ tags: "action", category: "" })}
            >
              Action
            </Link>
            <Link
              className={`chip ${tags === "strategy" ? "chip--active" : ""}`}
              to={buildGamesLink({ tags: "strategy", category: "" })}
            >
              Strategy
            </Link>
            <Link
              className={`chip ${tags === "multiplayer,io" ? "chip--active" : ""}`}
              to={buildGamesLink({ tags: "multiplayer,io", category: "" })}
            >
              Multiplayer + IO
            </Link>
          </div>
        </div>
      </div>
      <div className="chipRow" style={{ marginTop: -6 }}>
        {["all", "12+", "16+", "18+"].map((x) => (
          <Link key={x} className={`chip ${age === x ? "chip--active" : ""}`} to={buildGamesLink({ age: x })}>
            {x}
          </Link>
        ))}
      </div>

      <div className="muted" style={{ marginTop: -6 }}>
        Total {data.total} games ({data.games.length} shown on this page)
      </div>

      <div className="gameGrid">
        {data.games.map((g) => (
          <GameCard key={g.slug} game={g} />
        ))}
      </div>
    </div>
  );
}
