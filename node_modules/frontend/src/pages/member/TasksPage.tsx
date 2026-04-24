import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiJson, ApiError } from "../../api/client";

type Task = { id: string; key: string; title: string; type: "DAILY" | "NEWBIE"; targetValue: number; rewardPoint: number };

export function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const json = await apiJson<{ tasks: Task[] }>("/api/ops/tasks", { auth: true });
        setTasks(json.tasks ?? []);
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
          navigate("/member/login", { replace: true });
          return;
        }
        setError(e instanceof ApiError ? e.message : "Failed to load tasks");
      }
    })();
  }, [navigate]);

  return (
    <div className="stack">
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">Task Center</h2>
        </div>
        {error ? <div className="banner banner--error">{error}</div> : null}
        <div className="table">
          <div className="tableRow tableRow--head">
            <div>Task</div>
            <div>Type</div>
            <div>Target</div>
            <div>Reward</div>
            <div>Action</div>
          </div>
          {tasks.map((t) => (
            <div className="tableRow" key={t.id}>
              <div>{t.title}</div>
              <div>{t.type}</div>
              <div>{t.targetValue}</div>
              <div>{t.rewardPoint} points</div>
              <div className="rowActions">
                <button className="btn btn--sm btn--primary" type="button">
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

