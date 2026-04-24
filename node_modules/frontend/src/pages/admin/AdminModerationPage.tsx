import { useEffect, useState } from "react";
import { apiJson, ApiError } from "../../api/client";

type Row = {
  id: string;
  content: string;
  stars: number | null;
  usefulCnt: number;
  abuseReportCount: number;
  isHidden: boolean;
  isPinned: boolean;
  user: { id: string; nickname: string };
  game: { id: string; slug: string; title: string };
  createdAt: string;
};

export function AdminModerationPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<"helpful" | "latest" | "reports">("reports");

  const load = async (kw = "") => {
    const url = `/api/admin/manage/comments?page=1&pageSize=40&sort=${sort}${kw ? `&keyword=${encodeURIComponent(kw)}` : ""}`;
    const json = await apiJson<{ comments: Row[] }>(url, { auth: true });
    setRows(json.comments ?? []);
  };

  useEffect(() => {
    load().catch((e) => setError(e instanceof ApiError ? e.message : "加载失败"));
  }, [sort]);

  return (
    <div className="stack">
      {error ? <div className="banner banner--error">{error}</div> : null}
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">评论审核</h2>
        </div>
        <div className="chipRow" style={{ marginBottom: 10 }}>
          {(
            [
              ["reports", "按举报数"],
              ["helpful", "按有用"],
              ["latest", "最新"],
            ] as const
          ).map(([k, lab]) => (
            <button key={k} type="button" className={`chip ${sort === k ? "chip--active" : ""}`} onClick={() => setSort(k)}>
              {lab}
            </button>
          ))}
        </div>
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            load(keyword).catch((err) => setError(err instanceof ApiError ? err.message : "检索失败"));
          }}
        >
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="关键词过滤" />
          <button type="submit">筛选</button>
        </form>
        <div className="table">
          <div className="tableRow tableRow--head">
            <div>用户/游戏</div>
            <div>评论</div>
            <div>评星</div>
            <div>举报数</div>
            <div>有用</div>
            <div>操作</div>
          </div>
          {rows.map((r) => (
            <div className="tableRow" key={r.id}>
              <div>
                <div>{r.user.nickname}</div>
                <div className="muted">{r.game.title}</div>
              </div>
              <div>{r.content}</div>
              <div>{r.stars ?? "-"}</div>
              <div>{r.abuseReportCount ?? 0}</div>
              <div>{r.usefulCnt}</div>
              <div className="rowActions">
                <button
                  className="btn btn--ghost btn--sm"
                  type="button"
                  onClick={async () => {
                    try {
                      await apiJson(`/api/admin/manage/comments/${encodeURIComponent(r.id)}/hide`, {
                        method: "POST",
                        auth: true,
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ hidden: !r.isHidden }),
                      });
                      await load(keyword);
                    } catch (e) {
                      setError(e instanceof ApiError ? e.message : "操作失败");
                    }
                  }}
                >
                  {r.isHidden ? "取消隐藏" : "隐藏"}
                </button>
                <button
                  className="btn btn--sm btn--primary"
                  type="button"
                  onClick={async () => {
                    try {
                      await apiJson(`/api/admin/manage/comments/${encodeURIComponent(r.id)}/pin`, {
                        method: "POST",
                        auth: true,
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ pinned: !r.isPinned }),
                      });
                      await load(keyword);
                    } catch (e) {
                      setError(e instanceof ApiError ? e.message : "操作失败");
                    }
                  }}
                >
                  {r.isPinned ? "取消置顶" : "置顶"}
                </button>
                <button
                  className="btn btn--ghost btn--sm"
                  type="button"
                  onClick={async () => {
                    if (!confirm("确定删除该评论？（不可恢复）")) return;
                    try {
                      await apiJson(`/api/admin/manage/comments/${encodeURIComponent(r.id)}`, { method: "DELETE", auth: true });
                      await load(keyword);
                    } catch (e) {
                      setError(e instanceof ApiError ? e.message : "删除失败");
                    }
                  }}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

