# Game Platform（示例全栈工程）

这是一个用于学习/二次开发的**游戏门户 + 后台管理**示例工程：

- **后端**：`Node.js` + `Express` + `Prisma` + `SQLite`（本地零配置）
- **前端**：`TypeScript` + `Vite` + `React`

> 说明：这是原创示例项目，用于演示“首页模块、列表、详情、播放、后台录入/发布”的常见产品形态；不复制任何第三方站点的品牌与界面。

## 环境要求

- **Node.js**：建议 **22.12+** 或 **20.19+**（满足 Vite 8 的 engine 要求，避免安装/构建阶段出现 engine 警告或失败）
- **npm**：建议 **10+**

## 目录结构

- `backend/`：API 服务（默认端口 `4000`）
- `frontend/`：Web 前端（默认端口 `5173`）

## 第一次运行（Windows / PowerShell）

### 1) 进入项目

```powershell
cd E:\cursor\game-platform
```

### 2) 安装依赖

```powershell
npm install
```

### 3) 初始化数据库 + 写入示例数据

```powershell
npm run db:migrate
npm run db:seed
```

数据库文件会生成在：

- `backend/dev.db`（SQLite）

### 4) 启动（后端 + 前端同时启动）

```powershell
npm run dev
```

打开浏览器访问：

- 前端：`http://localhost:5173/`
- 后端健康检查：`http://localhost:4000/api/health`

前端通过 Vite 代理把 `/api` 转发到后端（见 `frontend/vite.config.ts`），因此前端页面里请求 **`/api/...`** 即可。

## 管理后台从哪里进？

1. **顶部导航**：点击 **「管理后台」**（或先打开 `http://localhost:5173/admin`）。
2. **页脚**：点击 **「管理后台」** 链接。
3. **直接地址**（本地开发）：
   - 入口跳转：`http://localhost:5173/admin`（已登录则进看板，未登录则进登录页）
   - 登录页：`http://localhost:5173/admin/login`
   - **登录成功后的总导航（推荐）**：`http://localhost:5173/admin/dashboard` — 页面上有各模块 **功能入口** 卡片

各模块路径一览：

| 功能 | 路径 |
|------|------|
| 数据看板（含全部入口） | `/admin/dashboard` |
| 游戏列表 | `/admin/games` |
| 新建游戏 | `/admin/games/new` |
| 编辑某游戏 | `/admin/games/<游戏ID>` |
| 待审核 / 测试 | `/admin/games/pending` |
| 游戏举报 | `/admin/game-reports` |
| 评论审核 | `/admin/moderation` |
| 用户管理 | `/admin/users` |
| 风控 | `/admin/risk` |
| 报表导出 | `/admin/reports` |
| 运营配置 | `/admin/ops` |

## 默认管理员账号（来自 seed）

账号信息在 `backend/.env` 中配置，并由 `backend/prisma/seed.ts` 写入数据库：

- 邮箱：`admin@example.com`
- 密码：`adminadmin`

## 常用脚本

在项目根目录 `game-platform/`：

- `npm run dev`：同时启动后端与前端
- `npm run dev:backend`：只启动后端
- `npm run dev:frontend`：只启动前端
- `npm run db:migrate`：执行 Prisma migrate（开发环境）
- `npm run db:seed`：执行 seed（会清空并重建演示数据）
- `npm run build`：构建后端 + 前端

## 常见问题

### 1) 前端构建报错：找不到 `@rolldown/binding-win32-x64-msvc`

在仓库根目录执行：

```powershell
npm install @rolldown/binding-win32-x64-msvc --workspace frontend
npm install
```

### 2) 大量 `EBADENGINE` 警告

这通常表示 **Node 版本低于依赖声明的最低版本**。请升级 Node 到建议版本区间后再执行 `npm install`。

### 3) Prisma Client 类型/生成问题

在 `backend/` 下执行：

```powershell
cd E:\cursor\game-platform\backend
npx prisma generate
```

## 后端 API（节选）

- `GET /api/health`
- `GET /api/home`
- `GET /api/games`
- `GET /api/games/:slug`
- `POST /api/admin/auth/login`
