import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiJson, ApiError } from "../../api/client";

type Dashboard = {
  realtime: {
    todayStarts: number;
    totalUsers: number;
    totalGames: number;
    ratings: number;
    comments: number;
    estimatedAdRevenue: number;
  };
};

const ENTRIES: Array<{ to: string; title: string; desc: string }> = [
  { to: "/admin/games", title: "游戏管理", desc: "列表、筛选、上架/下架、软删、刷新缓存" },
  { to: "/admin/games/new", title: "新建游戏", desc: "创建草稿并编辑详情" },
  { to: "/admin/games/pending", title: "待审核 / 测试", desc: "审核中、测试中的游戏，试玩与发布" },
  { to: "/admin/game-reports", title: "游戏举报", desc: "用户举报的违规内容" },
  { to: "/admin/moderation", title: "评论审核", desc: "隐藏、置顶、删除" },
  { to: "/admin/users", title: "用户管理", desc: "封禁、积分、发消息" },
  { to: "/admin/risk", title: "风控列表", desc: "异常行为用户" },
  { to: "/admin/reports", title: "报表导出", desc: "CSV 数据导出" },
  { to: "/admin/ops", title: "运营配置", desc: "Banner、任务、公告" },
];

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("gp_admin_token")) {
      navigate("/admin/login", { replace: true });
      return;
    }
    (async () => {
      try {
        const json = await apiJson<Dashboard>("/api/stats/dashboard", { auth: true });
        setData(json);
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          localStorage.removeItem("gp_admin_token");
          navigate("/admin/login", { replace: true });
          return;
        }
        setError(e instanceof ApiError ? e.message : "加载失败");
      }
    })();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("gp_admin_token");
    localStorage.removeItem("gp_admin_refresh");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="stack">
      <div className="adminToolbar">
        <div>
          <div className="kicker">管理后台</div>
          <h1 className="h1">数据看板与功能入口</h1>
          <p className="lede">以下入口对应后台各模块；也可在顶部导航点「管理后台」进入本页（<code>/admin/dashboard</code>）。</p>
        </div>
        <div className="adminToolbarActions">
          <Link className="btn btn--ghost" to="/">
            回前台首页
          </Link>
          <button className="btn btn--ghost" type="button" onClick={logout}>
            退出登录
          </button>
        </div>
      </div>

      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">功能入口</h2>
        </div>
        <div className="adminEntryGrid">
          {ENTRIES.map((e) => (
            <Link key={e.to} to={e.to} className="adminEntryCard">
              <div className="adminEntryTitle">{e.title}</div>
              <div className="adminEntryDesc">{e.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {error ? <div className="banner banner--error">{error}</div> : null}
      {!data && !error ? (
        <div className="spinnerRow">
          <div className="spinner" />
          <div className="spinnerLabel">加载看板数据…</div>
        </div>
      ) : null}
      {data ? (
        <section className="section">
          <div className="sectionHeader">
            <h2 className="h2">核心指标</h2>
          </div>
          <div className="grid2">
            <div className="banner">今日启动次数：{data.realtime.todayStarts}</div>
            <div className="banner">用户总数：{data.realtime.totalUsers}</div>
            <div className="banner">在线游戏数：{data.realtime.totalGames}</div>
            <div className="banner">评分数：{data.realtime.ratings}</div>
            <div className="banner">评论数：{data.realtime.comments}</div>
            <div className="banner">预估广告收益：￥{data.realtime.estimatedAdRevenue}</div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
