import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiJson, ApiError } from "../../api/client";
import { ErrorBanner, Spinner } from "../../components/Ui";
import type { AdminGamesResponse, CategoriesResponse, GameAdminStatus } from "../../types";

const STATUS_LABEL: Record<GameAdminStatus, string> = {
  DRAFT: "草稿",
  REVIEW: "审核中",
  TESTING: "测试中",
  PUBLISHED: "已上线",
  ARCHIVED: "已下架",
};

function formatDt(iso: string) {
  try {
    return new Date(iso).toLocaleString("zh-CN", { hour12: false });
  } catch {
    return iso;
  }
}

export function AdminGamesPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<AdminGamesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [status, setStatus] = useState<"ALL" | GameAdminStatus>("ALL");
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdTo, setCreatedTo] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [categories, setCategories] = useState<CategoriesResponse["categories"]>([]);

  const token = localStorage.getItem("gp_admin_token");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const sp = new URLSearchParams();
      sp.set("page", "1");
      sp.set("pageSize", "50");
      if (status !== "ALL") sp.set("status", status);
      if (q.trim()) sp.set("q", q.trim());
      if (category) sp.set("category", category);
      if (createdFrom) sp.set("createdFrom", new Date(createdFrom).toISOString());
      if (createdTo) sp.set("createdTo", new Date(createdTo).toISOString());
      if (includeDeleted) sp.set("includeDeleted", "true");
      const json = await apiJson<AdminGamesResponse>(`/api/admin/games?${sp.toString()}`, { auth: true });
      setData(json);
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
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }
    void (async () => {
      try {
        const c = await apiJson<CategoriesResponse>("/api/categories");
        setCategories(c.categories ?? []);
      } catch {
        setCategories([]);
      }
    })();
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    void load();
  }, [status, q, category, createdFrom, createdTo, includeDeleted]);

  const logout = () => {
    localStorage.removeItem("gp_admin_token");
    navigate("/admin/login", { replace: true });
  };

  const withBusy = async (id: string, fn: () => Promise<void>) => {
    setBusyId(id);
    setError(null);
    try {
      await fn();
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "操作失败");
    } finally {
      setBusyId(null);
    }
  };

  if (!token) return null;
  if (loading && !data) return <Spinner label="正在加载游戏列表…" />;

  return (
    <div className="stack">
      <div className="adminToolbar">
        <div>
          <div className="kicker">后台</div>
          <h1 className="h1">游戏管理</h1>
          <p className="lede">创建 / 编辑游戏，走「草稿 → 审核 → 测试 → 发布」，支持软删除与缓存刷新。</p>
        </div>
        <div className="adminToolbarActions">
          <Link className="btn btn--ghost" to="/admin/dashboard">
            数据看板
          </Link>
          <Link className="btn btn--ghost" to="/admin/games/pending">
            待审核/测试
          </Link>
          <Link className="btn btn--ghost" to="/admin/game-reports">
            游戏举报
          </Link>
          <Link className="btn btn--ghost" to="/admin/reports">
            报表导出
          </Link>
          <Link className="btn btn--ghost" to="/admin/users">
            用户管理
          </Link>
          <Link className="btn btn--ghost" to="/admin/moderation">
            评论审核
          </Link>
          <Link className="btn btn--ghost" to="/admin/ops">
            运营配置
          </Link>
          <Link className="btn btn--primary" to="/admin/games/new">
            新建游戏
          </Link>
          <button className="btn btn--ghost" type="button" onClick={logout}>
            退出
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filterBlock">
          <div className="filterTitle">状态</div>
          <div className="chipRow">
            {(["ALL", "DRAFT", "REVIEW", "TESTING", "PUBLISHED", "ARCHIVED"] as const).map((s) => (
              <button
                key={s}
                className={`chip ${status === s ? "chip--active" : ""}`}
                type="button"
                onClick={() => setStatus(s)}
              >
                {s === "ALL" ? "全部" : STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
        <div className="filterBlock">
          <div className="filterTitle">分类</div>
          <select className="langSelect" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">全部</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filterBlock">
          <div className="filterTitle">创建时间起</div>
          <input type="datetime-local" value={createdFrom} onChange={(e) => setCreatedFrom(e.target.value)} />
        </div>
        <div className="filterBlock">
          <div className="filterTitle">创建时间止</div>
          <input type="datetime-local" value={createdTo} onChange={(e) => setCreatedTo(e.target.value)} />
        </div>
        <div className="filterBlock">
          <label className="mono" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" checked={includeDeleted} onChange={(e) => setIncludeDeleted(e.target.checked)} />
            显示已软删
          </label>
        </div>
        <div className="filterBlock" style={{ gridColumn: "1 / -1" }}>
          <div className="filterTitle">搜索（ID / 标题 / slug / 开发商）</div>
          <form
            className="search"
            onSubmit={(e) => {
              e.preventDefault();
              setQ(qInput);
            }}
          >
            <input value={qInput} onChange={(e) => setQInput(e.target.value)} placeholder="支持完整 ID" />
            <button type="submit">搜索</button>
          </form>
        </div>
      </div>

      {error ? <ErrorBanner message={error} /> : null}

      <div className="tableScroll">
        <div className="table table--wide">
          <div className="tableRow tableRow--head">
            <div>ID</div>
            <div>标题</div>
            <div>开发商</div>
            <div>状态</div>
            <div>分类</div>
            <div>HOT</div>
            <div>推荐</div>
            <div>启动量</div>
            <div>创建时间</div>
            <div>更新时间</div>
            <div style={{ justifySelf: "end" }}>操作</div>
          </div>

          {(data?.games ?? []).map((g) => (
            <div key={g.id} className="tableRow">
              <div className="mono" title={g.id}>
                {g.id.slice(0, 8)}…
              </div>
              <div className="tableStrong">
                {g.title}
                {g.deletedAt ? <span className="pill pill--ghost" style={{ marginLeft: 8 }}>已软删</span> : null}
              </div>
              <div>{g.developer || "—"}</div>
              <div>
                <span className="pill pill--ghost">{STATUS_LABEL[g.status]}</span>
              </div>
              <div>{g.category?.name ?? "—"}</div>
              <div>{g.isHot ? "是" : "否"}</div>
              <div>{g.isHomeRecommended ? "是" : "否"}</div>
              <div>{g.launchCount}</div>
              <div className="mono muted">{formatDt(g.createdAt)}</div>
              <div className="mono muted">{formatDt(g.updatedAt)}</div>
              <div className="rowActions" style={{ flexWrap: "wrap" }}>
                <Link className="btn btn--ghost btn--sm" to={`/admin/games/${encodeURIComponent(g.id)}`}>
                  编辑
                </Link>
                {g.status === "PUBLISHED" ? (
                  <button
                    className="btn btn--ghost btn--sm"
                    type="button"
                    disabled={busyId === g.id}
                    onClick={() => void withBusy(g.id, () => apiJson(`/api/admin/games/${g.id}/unpublish`, { method: "POST", auth: true }))}
                  >
                    下架
                  </button>
                ) : g.status !== "ARCHIVED" && !g.deletedAt ? (
                  <button
                    className="btn btn--primary btn--sm"
                    type="button"
                    disabled={busyId === g.id}
                    onClick={() => void withBusy(g.id, () => apiJson(`/api/admin/games/${g.id}/publish`, { method: "POST", auth: true }))}
                  >
                    上架
                  </button>
                ) : null}
                <button
                  className="btn btn--ghost btn--sm"
                  type="button"
                  disabled={busyId === g.id}
                  onClick={() => void withBusy(g.id, () => apiJson(`/api/admin/games/${g.id}/bust-cache`, { method: "POST", auth: true }))}
                >
                  刷新缓存
                </button>
                {!g.deletedAt ? (
                  <button
                    className="btn btn--ghost btn--sm"
                    type="button"
                    disabled={busyId === g.id}
                    onClick={() => {
                      if (!confirm("确定软删除？前台将不可见，可从「显示已软删」中恢复。")) return;
                      void withBusy(g.id, () => apiJson(`/api/admin/games/${g.id}/soft-delete`, { method: "POST", auth: true }));
                    }}
                  >
                    软删
                  </button>
                ) : (
                  <button
                    className="btn btn--ghost btn--sm"
                    type="button"
                    disabled={busyId === g.id}
                    onClick={() => void withBusy(g.id, () => apiJson(`/api/admin/games/${g.id}/restore`, { method: "POST", auth: true }))}
                  >
                    恢复
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
