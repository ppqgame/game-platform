import { useState } from "react";

export function AdminReportsPage() {
  const [downloading, setDownloading] = useState(false);

  return (
    <div className="stack">
      <section className="section">
        <div className="sectionHeader">
          <h2 className="h2">报表导出</h2>
        </div>
        <p className="lede">导出游戏启动与时长汇总 CSV。</p>
        <button
          className="btn btn--primary"
          type="button"
          disabled={downloading}
          onClick={async () => {
            setDownloading(true);
            try {
              const token = localStorage.getItem("gp_admin_token") || localStorage.getItem("gp_token");
              const res = await fetch("/api/admin/manage/reports/games.csv", {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
              });
              const blob = await res.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "game-report.csv";
              a.click();
              URL.revokeObjectURL(url);
            } finally {
              setDownloading(false);
            }
          }}
        >
          {downloading ? "导出中..." : "导出 CSV"}
        </button>
      </section>
    </div>
  );
}

