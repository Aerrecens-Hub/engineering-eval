# Timed Coding Skill Test

A local, in-memory engineering operations dashboard used as a timed coding skill test. Candidates work against the same seed data for engineers, projects, tasks, and activity, with the solution left intentionally unfinished.

Each role gets one 15–20 minute contract. Setup is already done, so time goes into the work.

Results are comparable. Two candidates in the same role face the same incomplete code, the same rules, and the same way to verify the outcome in the running app, API response, or local test.

## Skill tests

Read only your file in `tasks/`. Do not implement other roles.

Before coding, create a branch from `main` using your name and birthday, for example `alex-chen-19900315`, and work only on that branch. Each task file repeats this step.

| Role | Spec | Workspace |
| --- | --- | --- |
| Frontend | `tasks/frontend.md` | Tasks page, `frontend/` |
| Backend | `tasks/backend.md` | `GET /api/tasks`, `backend/` |
| Go | `tasks/go.md` | `services/go`, `POST /aggregate` |
| Java | `tasks/java.md` | `services/java`, `POST /metrics` |
| Rust | `tasks/rust.md` | `services/rust`, `POST /statistics` |
| Blockchain | `tasks/blockchain.md` | `services/blockchain`, `TaskVerification` |

## Quick start

Requires Node.js 20+ and npm 10+.

```bash
npm install
npm run dev
```

| Process | URL | Also |
| --- | --- | --- |
| Vite | http://localhost:5173 | `npm run dev:frontend` |
| Express | http://localhost:3001 | `npm run dev:backend` |

Vite proxies `/api` to Express. `npm run build` builds the frontend and checks the API. `npm start` runs `backend/src/server.js`.

Pages: `/`, `/projects`, `/tasks`, `/engineers`, `/activity`, `/settings`.

### API

Every route is `GET` and returns a JSON array. Unknown routes return `404` with `{ "error": "Not found" }`. `GET /api/activity` is newest first. `GET /api/tasks` returns every task.

```json
{ "id": "eng_01", "name": "Maya Chen", "role": "Frontend Engineer", "status": "active" }
```

`status`: `active` | `inactive`

```json
{ "id": "prj_01", "name": "Customer Portal Refresh", "status": "active", "ownerId": "eng_01" }
```

`status`: `active` | `completed` | `paused`

```json
{ "id": "tsk_01", "title": "Redesign the account settings layout", "status": "in_progress", "priority": "high", "assigneeId": "eng_01", "projectId": "prj_01" }
```

`status`: `todo` | `in_progress` | `done` · `priority`: `low` | `medium` | `high`

```json
{ "id": "act_01", "type": "deployment", "message": "Deployed the settlement indexer to staging.", "createdAt": "2026-10-01T16:40:00.000Z", "engineerId": "eng_06" }
```

`type`: `commit` | `review` | `deployment` | `task_completed`

### Layout

```text
frontend/src    components, layouts, pages, hooks, services, utils
backend/src     server, routes, controllers, services, repositories, middleware, data
services/       go, java, rust, blockchain placeholders
tasks/          role specifications
```

## Other services

These processes are local. They do not use credentials, wallets, an external RPC, or a database. Each HTTP placeholder returns `501` until its task is implemented. Start them only for that role.

Go 1.22+ · http://localhost:8080

```bash
cd services/go
go run .
```

Java 21+ · http://localhost:8081

```bash
cd services/java
javac -encoding UTF-8 -d out src/main/java/App.java
java -cp out App
```

Rust with Cargo · http://localhost:8082

```bash
cd services/rust
cargo run
```

Foundry · Anvil on http://127.0.0.1:8545

```bash
cd services/blockchain
forge build
forge test
anvil
```

```bash
cd services/blockchain
forge script script/Deploy.sol --rpc-url local --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast
```

The private key above is Anvil account 0, published for local development only.
