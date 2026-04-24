import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Ui";

/** 访问 `/admin` 时：已登录后台则进看板，否则进登录页 */
export function AdminEntryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("gp_admin_token")) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return <Spinner label="正在进入管理后台…" />;
}
