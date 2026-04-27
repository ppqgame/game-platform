import path from "node:path";
import express from "express";
import cors from "cors";
import { env } from "./env.js";
import { errorHandler, notFoundHandler } from "./http.js";
import { publicRouter } from "./routes/public.js";
import { adminRouter } from "./routes/admin.js";
import { userRouter } from "./routes/user.js";
import { interactionRouter } from "./routes/interaction.js";
import { opsRouter } from "./routes/ops.js";
import { monetizationRouter } from "./routes/monetization.js";
import { statsRouter } from "./routes/stats.js";
import { managementRouter } from "./routes/management.js";
const app = express();
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/play", express.static(path.join(process.cwd(), "uploads", "games")));
app.get("/", (_req, res) => {
    res.json({ name: "game-platform-api", ok: true });
});
app.use("/api", publicRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/interaction", interactionRouter);
app.use("/api/ops", opsRouter);
app.use("/api/monetization", monetizationRouter);
app.use("/api/stats", statsRouter);
app.use("/api/admin/manage", managementRouter);
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${env.PORT}`);
});
//# sourceMappingURL=index.js.map