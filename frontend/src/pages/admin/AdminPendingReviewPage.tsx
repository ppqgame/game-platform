import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiJson, ApiError } from "../../api/client";
import { ErrorBanner, Spinner } from "../../components/Ui";
import { resolvePlayUrl } from "../../playUrl";
import type { AdminGameDTO } from "../../types";

const STATUS: Record<string, string> = {
  REVIEW: "审核中",
  TESTING: "测试中",
};

export function AdminPendingReviewPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<AdminGameDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [batchBusy, setBatchBusy] = useState<"testing" | "publish" | null>(null);
  const token = localStorage.getItem("gp_admin_token");

  const load = async () => {
    setLoading(true);
    try {
      const json = await apiJson<{ games: AdminGameDTO[] }>("/api/admin/games/pending/review", { auth: true });
      setRows(json.games ?? []);
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
    void load();
  }, [token, navigate]);

  const act = async (id: string, path: string, method: "POST" = "POST", body?: object) => {
    setBusy(id);
    setError(null);
    setSuccess(null);
    try {
      await apiJson(path, { method, auth: true, headers: body ? { "content-type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "操作失败");
    } finally {
      setBusy(null);
    }
  };

  const batchStartTesting = async () => {
    const targets = rows.filter((g) => g.status === "REVIEW");
    if (!targets.length) {
      setSuccess("当前没有待审核项。");
      return;
    }
    setBatchBusy("testing");
    setError(null);
    setSuccess(null);
    try {
      const results = await Promise.allSettled(
        targets.map((g) => apiJson(`/api/admin/games/${encodeURIComponent(g.id)}/start-testing`, { method: "POST", auth: true }))
      );
      const ok = results.filter((r) => r.status === "fulfilled").length;
      const fail = results.length - ok;
      await load();
      setSuccess(`一键通过测试完成：成功 ${ok} 项${fail ? `，失败 ${fail} 项` : ""}。`);
    } catch {
      setError("批量通过测试失败");
    } finally {
      setBatchBusy(null);
    }
  };

  const batchPublish = async () => {
    const targets = rows.filter((g) => g.status === "TESTING");
    if (!targets.length) {
      setSuccess("当前没有测试中项。");
      return;
    }
    setBatchBusy("publish");
    setError(null);
    setSuccess(null);
    try {
      const results = await Promise.allSettled(
        targets.map((g) => apiJson(`/api/admin/games/${encodeURIComponent(g.id)}/publish`, { method: "POST", auth: true }))
      );
      const ok = results.filter((r) => r.status === "fulfilled").length;
      const fail = results.length - ok;
      await load();
      setSuccess(`一键发布完成：成功 ${ok} 项${fail ? `，失败 ${fail} 项` : ""}。`);
    } catch {
      setError("批量发布失败");
    } finally {
      setBatchBusy(null);
    }
  };

  if (!token) return null;
  if (loading) return <Spinner label="加载待审核游戏…" />;

  return (
    <div className="stack">
      <div className="adminToolbar">
        <div>
          <div className="kicker">内容审核</div>
          <h1 className="h1">待审核 / 测试中</h1>
          <p className="lede">启动测试后可在前台用 slug 走测试流程；确认无问题后发布上线。</p>
        </div>
        <div className="adminToolbarActions">
          <button
            type="button"
            className="btn btn--primary"
            disabled={loading || !!batchBusy}
            onClick={() => void batchStartTesting()}
          >
            {batchBusy === "testing" ? "处理中…" : "一键通过测试"}
          </button>
          <button
            type="button"
            className="btn btn--primary"
            disabled={loading || !!batchBusy}
            onClick={() => void batchPublish()}
          >
            {batchBusy === "publish" ? "处理中…" : "一键发布上线"}
          </button>
          <Link className="btn btn--ghost" to="/admin/games">
            返回游戏管理
          </Link>
        </div>
      </div>
      {error ? <ErrorBanner message={error} /> : null}
      {success ? <div className="banner banner--success">{success}</div> : null}
      <div className="table">
        <div className="tableRow tableRow--head">
          <div>游戏</div>
          <div>状态</div>
          <div>操作</div>
        </div>
        {rows.map((g) => (
          <div className="tableRow" key={g.id} style={{ gridTemplateColumns: "1.2fr 0.5fr 1.2fr" }}>
            <div>
              <div className="tableStrong">{g.title}</div>
              <div className="mono muted">{g.slug}</div>
            </div>
            <div>
              <span className="pill pill--ghost">{STATUS[g.status] ?? g.status}</span>
            </div>
            <div className="rowActions" style={{ justifyContent: "flex-start" }}>
              {g.playUrl ? (
                <a className="btn btn--ghost btn--sm" href={resolvePlayUrl(g.playUrl)} target="_blank" rel="noreferrer">
                  直链试玩
                </a>
              ) : null}
              {g.status === "REVIEW" ? (
                <button type="button" className="btn btn--primary btn--sm" disabled={busy === g.id} onClick={() => void act(g.id, `/api/admin/games/${g.id}/start-testing`)}>
                  开始测试
                </button>
              ) : null}
              <button
                type="button"
                className="btn btn--primary btn--sm"
                disabled={busy === g.id}
                onClick={() => void act(g.id, `/api/admin/games/${g.id}/publish`)}
              >
                发布上线
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                disabled={busy === g.id}
                onClick={() => {
                  const note = window.prompt("拒绝原因（会写回批注）");
                  if (note) void act(g.id, `/api/admin/games/${g.id}/reject`, "POST", { note });
                }}
              >
                拒绝
              </button>
              <Link className="btn btn--ghost btn--sm" to={`/admin/games/${g.id}`}>
                编辑
              </Link>
            </div>
          </div>
        ))}
        {rows.length === 0 ? <div className="muted" style={{ padding: 16 }}>暂无待处理游戏。</div> : null}
      </div>
    </div>
  );
}
