import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiJson, ApiError, setTokens } from "../../api/client";

export function MemberLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("player@example.com");
  const [password, setPassword] = useState("player1234");
  const [nickname, setNickname] = useState("Player");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === "register") {
        const res = await apiJson<{ token: string; refreshToken: string }>(`/api/user/auth/register`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, password, nickname }),
        });
        setTokens({ token: res.token, refreshToken: res.refreshToken });
      } else {
        const res = await apiJson<{ token: string; refreshToken: string }>(`/api/user/auth/login`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        setTokens({ token: res.token, refreshToken: res.refreshToken });
      }
      navigate("/member", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    }
  };

  return (
    <div className="adminCard">
      <div className="kicker">Member Center</div>
      <h1 className="h1">{mode === "login" ? "Login" : "Register"}</h1>
      {error ? <div className="banner banner--error">{error}</div> : null}
      <form className="form" onSubmit={onSubmit}>
        <label className="field">
          <div className="label">Email</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {mode === "register" ? (
          <label className="field">
            <div className="label">Nickname</div>
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </label>
        ) : null}
        <label className="field">
          <div className="label">Password</div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </label>
        <button className="btn btn--primary" type="submit">
          {mode === "login" ? "Login" : "Register & Login"}
        </button>
        <button className="btn btn--ghost" type="button" onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}>
          {mode === "login" ? "No account? Register" : "Have an account? Login"}
        </button>
      </form>
    </div>
  );
}

