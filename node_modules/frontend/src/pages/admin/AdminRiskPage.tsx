import { useEffect, useState } from "react";
import { apiJson, ApiError } from "../../api/client";

type RiskUser = { id: string; nickname: string; totalPlayCnt: number; totalPlaySecs: number; riskReason: string };

export function AdminRiskPage() {
  const [rows, setRows] = useState<RiskUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await apiJson<{ users: RiskUser[] }>("/api/admin/manage/risk/users", { auth: true });
        setRows(json.users ?? []);
      } catch (e) {
        setError(e instanceof ApiError ? e.message : "加载风控列表失败");
      }
    })();
  }, []);

  return (
    <div className="stack">
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">风控列表</h2>
        </div>
        {error ? <div className="banner banner--error">{error}</div> : null}
        <div className="table">
          <div className="tableRow tableRow--head">
            <div>用户</div>
            <div>总游玩次数</div>
            <div>总时长</div>
            <div>风险原因</div>
            <div>操作</div>
          </div>
          {rows.map((r) => (
            <div className="tableRow" key={r.id}>
              <div>{r.nickname}</div>
              <div>{r.totalPlayCnt}</div>
              <div>{r.totalPlaySecs}s</div>
              <div>{r.riskReason}</div>
              <div className="rowActions">
                <button className="btn btn--ghost btn--sm" type="button">
                  限制登录
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

