import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiJson, ApiError } from "../../api/client";
import { ErrorBanner, Spinner } from "../../components/Ui";

type Row = {
  id: string;
  reason: string;
  detail: string;
  status: string;
  createdAt: string;
  game: { id: string; title: string; slug: string } | null;
};

export function AdminGameReportsPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("gp_admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }
    (async () => {
      try {
        const json = await apiJson<{ reports: Row[] }>("/api/admin/game-reports", { auth: true });
        setRows(json.reports ?? []);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : "加载失败");
      } finally {
        setLoading(false);
      }
    })();
  }, [token, navigate]);

  const resolve = async (id: string, action: "RESOLVED" | "REJECTED") => {
    setError(null);
    try {
      await apiJson(`/api/admin/game-reports/${encodeURIComponent(id)}/resolve`, {
        method: "POST",
        auth: true,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action }),
      });
      setRows((r) => r.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "操作失败");
    }
  };

  if (!token) return null;
  if (loading) return <Spinner label="加载举报…" />;

  return (
    <div className="stack">
      <div className="adminToolbar">
        <div>
          <div className="kicker">内容安全</div>
          <h1 className="h1">游戏举报</h1>
        </div>
        <Link className="btn btn--ghost" to="/admin/games">
          返回
        </Link>
      </div>
      {error ? <ErrorBanner message={error} /> : null}
      <div className="table">
        <div className="tableRow tableRow--head">
          <div>游戏</div>
          <div>原因</div>
          <div>说明</div>
          <div>操作</div>
        </div>
        {rows.map((r) => (
          <div className="tableRow" key={r.id} style={{ gridTemplateColumns: "1fr 0.4fr 1fr 0.7fr" }}>
            <div>
              {r.game ? (
                <>
                  <div className="tableStrong">{r.game.title}</div>
                  <div className="mono">{r.game.slug}</div>
                </>
              ) : (
                "—"
              )}
            </div>
            <div>{r.reason}</div>
            <div className="muted">{r.detail || "—"}</div>
            <div className="rowActions">
              <button type="button" className="btn btn--primary btn--sm" onClick={() => void resolve(r.id, "RESOLVED")}>
                已处理
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => void resolve(r.id, "REJECTED")}>
                驳回
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 ? <div className="muted" style={{ padding: 16 }}>暂无待处理举报。</div> : null}
      </div>
    </div>
  );
}
