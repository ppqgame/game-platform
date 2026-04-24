import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { apiJson, ApiError } from "../../api/client";

type Banner = { id: string; title: string; imageUrl: string | null; sortOrder: number };
type Task = { id: string; key: string; title: string; type: "DAILY" | "NEWBIE"; targetValue: number; rewardPoint: number };

export function AdminOpsPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("运营推荐位");
  const [imageUrl, setImageUrl] = useState("https://picsum.photos/seed/ops-banner/1200/420");
  const [notices, setNotices] = useState<string[]>([]);
  const [noticeDraft, setNoticeDraft] = useState("");

  const load = async () => {
    const [b, t, a] = await Promise.all([
      apiJson<{ banners: Banner[] }>("/api/ops/banners"),
      apiJson<{ tasks: Task[] }>("/api/ops/tasks"),
      apiJson<{ notices: string[] }>("/api/ops/announcements"),
    ]);
    setBanners(b.banners);
    setTasks(t.tasks);
    setNotices(a.notices ?? []);
  };

  useEffect(() => {
    load().catch((e) => setError(e instanceof ApiError ? e.message : "加载失败"));
  }, []);

  const onCreateBanner = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await apiJson("/api/ops/banners", {
        method: "POST",
        auth: true,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, imageUrl, sortOrder: 10, isActive: true }),
      });
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "创建失败");
    }
  };

  return (
    <div className="stack">
      {error ? <div className="banner banner--error">{error}</div> : null}
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">首页运营配置</h2>
        </div>
        <form className="form" onSubmit={onCreateBanner}>
          <label className="field">
            <div className="label">Banner 标题</div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="field">
            <div className="label">图片 URL</div>
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </label>
          <button className="btn btn--primary" type="submit">
            新增 Banner
          </button>
        </form>
        <div className="table">
          <div className="tableRow tableRow--head">
            <div>标题</div>
            <div>封面</div>
            <div>排序</div>
            <div>状态</div>
            <div>操作</div>
          </div>
          {banners.map((b) => (
            <div className="tableRow" key={b.id}>
              <div>{b.title}</div>
              <div className="mono">{b.imageUrl ?? "-"}</div>
              <div>{b.sortOrder}</div>
              <div>ACTIVE</div>
              <div className="rowActions">
                <button className="btn btn--ghost btn--sm" type="button">
                  编辑
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">站内公告（运营位文案）</h2>
        </div>
        <p className="lede muted">与搜索热词分开存储，不会覆盖热门搜索关键词。</p>
        <ul className="stack" style={{ marginTop: 8 }}>
          {notices.map((n) => (
            <li key={n} className="mono">
              {n}
            </li>
          ))}
        </ul>
        <form
          className="form"
          style={{ marginTop: 12 }}
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            const next = [...notices, noticeDraft.trim()].filter(Boolean);
            try {
              await apiJson("/api/ops/announcements", {
                method: "POST",
                auth: true,
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ notices: next.slice(0, 20) }),
              });
              setNoticeDraft("");
              await load();
            } catch (err) {
              setError(err instanceof ApiError ? err.message : "保存失败");
            }
          }}
        >
          <label className="field">
            <div className="label">新增一条公告</div>
            <input value={noticeDraft} onChange={(e) => setNoticeDraft(e.target.value)} placeholder="例如：春节活动开启" />
          </label>
          <button className="btn btn--primary" type="submit">
            保存公告列表
          </button>
        </form>
      </section>
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">任务模板配置</h2>
        </div>
        <div className="table">
          <div className="tableRow tableRow--head">
            <div>Key</div>
            <div>标题</div>
            <div>类型</div>
            <div>目标</div>
            <div>奖励</div>
          </div>
          {tasks.map((t) => (
            <div className="tableRow" key={t.id}>
              <div>{t.key}</div>
              <div>{t.title}</div>
              <div>{t.type}</div>
              <div>{t.targetValue}</div>
              <div>{t.rewardPoint} 积分</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

