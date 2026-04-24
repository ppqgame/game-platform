import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiJson, ApiError } from "../../api/client";
import { ErrorBanner } from "../../components/Ui";
import type { AdminLoginResponse } from "../../types";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("adminadmin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const json = await apiJson<AdminLoginResponse>("/api/admin/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("gp_admin_token", json.token);
      if (json.refreshToken) localStorage.setItem("gp_admin_refresh", json.refreshToken);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminCard">
      <div className="kicker">后台</div>
      <h1 className="h1">管理员登录</h1>
      <p className="lede">登录后可创建/编辑游戏并发布到前台。</p>

      {error ? <ErrorBanner message={error} /> : null}

      <form className="form" onSubmit={onSubmit}>
        <label className="field">
          <div className="label">邮箱</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
        </label>
        <label className="field">
          <div className="label">密码</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
          />
        </label>
        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? "登录中…" : "登录"}
        </button>
      </form>
    </div>
  );
}
