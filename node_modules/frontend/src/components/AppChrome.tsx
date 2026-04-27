import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { apiJson } from "../api/client";
import type { CategoriesResponse, SearchSuggestResponse } from "../types";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function AppChrome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState("");
  const [categories, setCategories] = useState<CategoriesResponse["categories"]>([]);
  const [suggestions, setSuggestions] = useState<Array<{ slug: string; title: string }>>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [authed, setAuthed] = useState(Boolean(localStorage.getItem("gp_token") || localStorage.getItem("gp_admin_token")));
  const [isCompactSidebar, setIsCompactSidebar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : "/games");
  };

  const linkClass = useMemo(() => {
    return ({ isActive }: { isActive: boolean }) =>
      cx("navLink", isActive && "navLink--active");
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const json = await apiJson<CategoriesResponse>("/api/categories");
        if (!cancelled) setCategories(json.categories ?? []);
      } catch {
        if (!cancelled) setCategories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!q.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = window.setTimeout(async () => {
      try {
        const json = await apiJson<SearchSuggestResponse>(`/api/search/suggest?q=${encodeURIComponent(q.trim())}`);
        setSuggestions(json.suggestions ?? []);
      } catch {
        setSuggestions([]);
      }
    }, 180);
    return () => window.clearTimeout(timer);
  }, [q]);

  useEffect(() => {
    const sync = () => {
      const compact = window.innerWidth <= 980;
      setIsCompactSidebar(compact);
      setSidebarCollapsed(compact);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    setAuthed(Boolean(localStorage.getItem("gp_token") || localStorage.getItem("gp_admin_token")));
  }, [location.pathname]);

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand" onClick={() => navigate("/")} role="button" tabIndex={0}>
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <div className="brandTitle">PlayZone</div>
            <div className="brandSub">Instant Browser Games</div>
          </div>
        </div>

        <form className="search" onSubmit={onSearch}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setShowSuggest(true)}
            onBlur={() => window.setTimeout(() => setShowSuggest(false), 120)}
            placeholder="Search games..."
            aria-label="Search games"
          />
          <button type="submit">Search</button>
          {showSuggest && suggestions.length ? (
            <div className="searchSuggest">
              {suggestions.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  className="searchSuggestItem"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => navigate(`/games/${encodeURIComponent(s.slug)}`)}
                >
                  {s.title}
                </button>
              ))}
            </div>
          ) : null}
        </form>

        <nav className="nav">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/games" className={linkClass}>
            Games
          </NavLink>
          <NavLink to="/admin" className={linkClass} title="Admin console">
            Admin
          </NavLink>
          {authed ? (
            <NavLink to="/member" className={linkClass}>
              My
            </NavLink>
          ) : null}
          {!authed ? (
            <button className="navLink" type="button" onClick={() => navigate("/member/login")}>
              LOGIN
            </button>
          ) : null}
        </nav>
      </header>

      <main className="mainLayout">
        {isCompactSidebar && !sidebarCollapsed ? (
          <button
            type="button"
            className="sidebarBackdrop"
            aria-label="Close category panel"
            onClick={() => setSidebarCollapsed(true)}
          />
        ) : null}
        <aside
          className={cx(
            "sidebar",
            isCompactSidebar && "sidebar--floating",
            isCompactSidebar && sidebarCollapsed && "sidebar--collapsed"
          )}
        >
          {isCompactSidebar ? (
            <button
              type="button"
              className="sidebarFab"
              onClick={() => setSidebarCollapsed((v) => !v)}
              aria-label={sidebarCollapsed ? "Open categories" : "Close categories"}
              aria-expanded={!sidebarCollapsed}
              aria-controls="app-sidebar-categories"
            >
              <span className={cx("sidebarFabIcon", !sidebarCollapsed && "sidebarFabIcon--open")} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          ) : null}

          {!isCompactSidebar || !sidebarCollapsed ? (
            <div className="sidebarPanel">
              <div className="sidebarTitleRow">
                <div className="sidebarTitle">Categories</div>
              </div>
              <nav className="sideNav" id="app-sidebar-categories">
                <NavLink to="/games" className={linkClass}>
                  All games
                </NavLink>
                {categories.map((c) => (
                  <NavLink key={c.slug} to={`/games?category=${encodeURIComponent(c.slug)}`} className="sideLink">
                    {c.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          ) : null}
        </aside>
        <section className="contentMain">
          <Outlet />
        </section>
      </main>

      <footer className="footer">
        <div>Play instantly in browser. No install required.</div>
        <div className="footerMuted">
          Built with local API at <code>/api</code> ·{" "}
          <button type="button" className="footerLink" onClick={() => navigate("/admin")}>
            Admin
          </button>
        </div>
      </footer>
    </div>
  );
}
