import { useEffect, useState } from "react";
import { apiJson, ApiError } from "../../api/client";

type UserRow = {
  id: string;
  nickname: string;
  email: string | null;
  role: "USER" | "MODERATOR" | "ADMIN";
  totalPlayCnt: number;
  points: number;
  createdAt: string;
  lastActiveAt: string | null;
  bannedAt: string | null;
  lastMembershipExpiresAt: string | null;
};

export function AdminUsersPage() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [messageTitle, setMessageTitle] = useState("系统通知");
  const [messageContent, setMessageContent] = useState("您好，平台有新的活动上线，欢迎体验。");

  const load = async (q = "") => {
    const json = await apiJson<{ users: UserRow[] }>(`/api/admin/manage/users?page=1&pageSize=50${q ? `&search=${encodeURIComponent(q)}` : ""}`, {
      auth: true,
    });
    setRows(json.users ?? []);
  };

  useEffect(() => {
    load().catch((e) => setError(e instanceof ApiError ? e.message : "加载失败"));
  }, []);

  return (
    <div className="stack">
      {error ? <div className="banner banner--error">{error}</div> : null}
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">用户管理</h2>
        </div>
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            load(search).catch((err) => setError(err instanceof ApiError ? err.message : "筛选失败"));
          }}
        >
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="按昵称或邮箱搜索用户" />
          <button type="submit">搜索</button>
        </form>
        <div className="table tableScroll" style={{ overflowX: "auto" }}>
          <div className="tableRow tableRow--head" style={{ minWidth: 900, gridTemplateColumns: "0.8fr 1fr 0.4fr 0.5fr 0.5fr 0.5fr 1.4fr" }}>
            <div>昵称</div>
            <div>邮箱</div>
            <div>角色</div>
            <div>积分</div>
            <div>活跃</div>
            <div>状态</div>
            <div>操作</div>
          </div>
          {rows.map((r) => (
            <div
              className="tableRow"
              key={r.id}
              style={{ minWidth: 900, gridTemplateColumns: "0.8fr 1fr 0.4fr 0.5fr 0.5fr 0.5fr 1.4fr" }}
            >
              <div>{r.nickname}</div>
              <div className="mono">{r.email ?? "-"}</div>
              <div>{r.role}</div>
              <div>{r.points}</div>
              <div className="mono muted" style={{ fontSize: 12 }}>{r.lastActiveAt ? new Date(r.lastActiveAt).toLocaleString("zh-CN") : "—"}</div>
              <div>{r.bannedAt ? <span className="pill" style={{ borderColor: "rgba(255,90,122,0.5)" }}>封禁</span> : "正常"}</div>
              <div className="rowActions">
                <select
                  className="langSelect"
                  value={r.role}
                  onChange={async (e) => {
                    try {
                      await apiJson(`/api/admin/manage/users/${encodeURIComponent(r.id)}/role`, {
                        method: "POST",
                        auth: true,
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ role: e.target.value }),
                      });
                      await load(search);
                    } catch (err) {
                      setError(err instanceof ApiError ? err.message : "修改角色失败");
                    }
                  }}
                >
                  <option value="USER">USER</option>
                  <option value="MODERATOR">MODERATOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <button
                  className="btn btn--ghost btn--sm"
                  type="button"
                  onClick={async () => {
                    try {
                      await apiJson(`/api/admin/manage/users/${encodeURIComponent(r.id)}/message`, {
                        method: "POST",
                        auth: true,
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ title: messageTitle, content: messageContent }),
                      });
                    } catch (err) {
                      setError(err instanceof ApiError ? err.message : "发送失败");
                    }
                  }}
                >
                  发消息
                </button>
                {r.bannedAt ? (
                  <button
                    className="btn btn--primary btn--sm"
                    type="button"
                    onClick={async () => {
                      try {
                        await apiJson(`/api/admin/manage/users/${encodeURIComponent(r.id)}/unban`, { method: "POST", auth: true });
                        await load(search);
                      } catch (err) {
                        setError(err instanceof ApiError ? err.message : "解封失败");
                      }
                    }}
                  >
                    解封
                  </button>
                ) : (
                  <button
                    className="btn btn--ghost btn--sm"
                    type="button"
                    onClick={async () => {
                      if (!confirm("封禁后该用户无法登录、游玩。确定？")) return;
                      try {
                        await apiJson(`/api/admin/manage/users/${encodeURIComponent(r.id)}/ban`, { method: "POST", auth: true });
                        await load(search);
                      } catch (err) {
                        setError(err instanceof ApiError ? err.message : "封禁失败");
                      }
                    }}
                  >
                    封禁
                  </button>
                )}
                <button
                  className="btn btn--ghost btn--sm"
                  type="button"
                  onClick={async () => {
                    const v = window.prompt("新积分值（数字）", String(r.points));
                    if (v == null) return;
                    const n = parseInt(v, 10);
                    if (Number.isNaN(n)) return;
                    try {
                      await apiJson(`/api/admin/manage/users/${encodeURIComponent(r.id)}/points`, {
                        method: "POST",
                        auth: true,
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ points: n }),
                      });
                      await load(search);
                    } catch (err) {
                      setError(err instanceof ApiError ? err.message : "修改失败");
                    }
                  }}
                >
                  改积分
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="grid2" style={{ marginTop: 12 }}>
          <label className="field">
            <div className="label">消息标题</div>
            <input value={messageTitle} onChange={(e) => setMessageTitle(e.target.value)} />
          </label>
          <label className="field">
            <div className="label">消息内容</div>
            <input value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
          </label>
        </div>
      </section>
    </div>
  );
}

