import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiJson, ApiError } from "../../api/client";
import type { UserCenterResponse, UserProfileResponse } from "../../types";

export function MemberCenterPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileResponse["user"] | null>(null);
  const [center, setCenter] = useState<UserCenterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [p, c] = await Promise.all([apiJson<UserProfileResponse>("/api/user/me", { auth: true }), apiJson<UserCenterResponse>("/api/user/center", { auth: true })]);
        setProfile(p.user);
        setCenter(c);
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          navigate("/member/login", { replace: true });
          return;
        }
        setError(e instanceof ApiError ? e.message : "Failed to load");
      }
    })();
  }, [navigate]);

  if (error) return <div className="banner banner--error">{error}</div>;

  return (
    <div className="stack">
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Profile</h2>
          <div className="chipRow">
            <Link className="chip" to="/member/tasks">
              Tasks
            </Link>
            <Link className="chip" to="/member/membership">
              Membership
            </Link>
          </div>
        </div>
        <div className="grid2">
          <div className="banner">Nickname: {profile?.nickname ?? "-"}</div>
          <div className="banner">Days Joined: {profile?.joinDays ?? 0}</div>
          <div className="banner">Total Sessions: {profile?.totalPlayCnt ?? 0}</div>
          <div className="banner">Total Play Time: {profile?.totalPlaySecs ?? 0}s</div>
          <div className="banner">Points: {profile?.points ?? 0}</div>
        </div>
      </section>
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Recently Played</h2>
        </div>
        <div className="gameGrid">
          {(center?.recent ?? []).map((r) => (
            <Link key={r.gameId} to={`/games/${encodeURIComponent(r.slug)}`} className="gameCard">
              <div className="gameCardCover">
                <img src={r.coverUrl ?? "https://picsum.photos/seed/recent/640/360"} alt="" />
              </div>
              <div className="gameCardBody">
                <div className="gameCardTitle">{r.title}</div>
                <div className="gameCardPitch">Progress {r.progress}% · Best Score {r.bestScore ?? "-"}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">My Favorites</h2>
        </div>
        <div className="gameGrid">
          {(center?.favorites ?? []).map((r) => (
            <Link key={r.gameId} to={`/games/${encodeURIComponent(r.slug)}`} className="gameCard">
              <div className="gameCardCover">
                <img src={r.coverUrl ?? "https://picsum.photos/seed/fav/640/360"} alt="" />
              </div>
              <div className="gameCardBody">
                <div className="gameCardTitle">{r.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="formActions" style={{ justifyContent: "flex-end" }}>
          <button
            className="btn btn--ghost"
            type="button"
            onClick={() => {
              localStorage.removeItem("gp_token");
              localStorage.removeItem("gp_refresh");
              localStorage.removeItem("gp_admin_token");
              localStorage.removeItem("gp_admin_refresh");
              navigate("/member/login", { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

