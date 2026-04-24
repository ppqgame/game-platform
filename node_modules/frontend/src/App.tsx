import { Navigate, Route, Routes } from "react-router-dom";
import { AppChrome } from "./components/AppChrome";
import { HomePage } from "./pages/HomePage";
import { GamesPage } from "./pages/GamesPage";
import { GameDetailPage } from "./pages/GameDetailPage";
import { PlayPage } from "./pages/PlayPage";
import { SearchPage } from "./pages/SearchPage";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminGamesPage } from "./pages/admin/AdminGamesPage";
import { AdminGameEditorPage } from "./pages/admin/AdminGameEditorPage";
import { AdminOpsPage } from "./pages/admin/AdminOpsPage";
import { MemberLoginPage } from "./pages/member/MemberLoginPage";
import { MemberCenterPage } from "./pages/member/MemberCenterPage";
import { TasksPage } from "./pages/member/TasksPage";
import { MembershipPage } from "./pages/member/MembershipPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminModerationPage } from "./pages/admin/AdminModerationPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminRiskPage } from "./pages/admin/AdminRiskPage";
import { AdminReportsPage } from "./pages/admin/AdminReportsPage";
import { AdminPendingReviewPage } from "./pages/admin/AdminPendingReviewPage";
import { AdminGameReportsPage } from "./pages/admin/AdminGameReportsPage";
import { AdminEntryPage } from "./pages/admin/AdminEntryPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppChrome />}>
        <Route index element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/games/:slug" element={<GameDetailPage />} />
        <Route path="/play/:slug" element={<PlayPage />} />

        <Route path="/admin" element={<AdminEntryPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/ops" element={<AdminOpsPage />} />
        <Route path="/admin/games/pending" element={<AdminPendingReviewPage />} />
        <Route path="/admin/game-reports" element={<AdminGameReportsPage />} />
        <Route path="/admin/moderation" element={<AdminModerationPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/risk" element={<AdminRiskPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/games" element={<AdminGamesPage />} />
        <Route path="/admin/games/new" element={<AdminGameEditorPage />} />
        <Route path="/admin/games/:id" element={<AdminGameEditorPage />} />

        <Route path="/member/login" element={<MemberLoginPage />} />
        <Route path="/member" element={<MemberCenterPage />} />
        <Route path="/member/tasks" element={<TasksPage />} />
        <Route path="/member/membership" element={<MembershipPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
