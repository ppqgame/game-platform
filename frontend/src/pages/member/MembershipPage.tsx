import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiJson, ApiError } from "../../api/client";

type Plan = { id: string; code: string; title: string; months: number; priceCents: number };

export function MembershipPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await apiJson<{ plans: Plan[] }>("/api/monetization/plans", { auth: true });
        setPlans(json.plans ?? []);
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          navigate("/member/login", { replace: true });
          return;
        }
        setError(e instanceof ApiError ? e.message : "Failed to load memberships");
      }
    })();
  }, [navigate]);

  return (
    <div className="stack">
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Membership Plans</h2>
        </div>
        {error ? <div className="banner banner--error">{error}</div> : null}
        <div className="gameGrid">
          {plans.map((p) => (
            <div className="gameCard" key={p.id}>
              <div className="gameCardBody">
                <div className="gameCardTitle">{p.title}</div>
                <div className="gameCardPitch">{p.months} month(s) · CNY {(p.priceCents / 100).toFixed(2)}</div>
                <div className="formActions">
                  <button className="btn btn--primary btn--sm" type="button">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

