# Frontend: task search and filters

**Time:** about 15–20 minutes
**Where:** Tasks page in `frontend/`
**Leave alone:** the backend API and other pages

## Before you start

Create a new git branch from `main`, then do all of your work on that branch.

Use your name and birthday in the branch name, lowercase, with hyphens:

```bash
git checkout main
git pull
git checkout -b alex-chen-19900315
```

Example pattern: `<first>-<last>-<YYYYMMDD>`

## What you are building

The Tasks page already loads every task from `GET /api/tasks` and shows them in a table. Product wants people to find work quickly without another round trip to the server.

Add search and filters on the client. Keep the current filters in the URL so a refresh opens the same view.

```text
/tasks?search=payment&status=in_progress&priority=high
```

## Requirements

Optional query parameters: `search`, `status`, `priority`.

- `search` matches `title` case-insensitively (substring is fine).
- `status` is one of `todo`, `in_progress`, `done`.
- `priority` is one of `low`, `medium`, `high`.
- When more than one parameter is set, a task must match all of them.
- An omitted parameter does not filter that field.
- Provide one clear action that removes all three parameters and shows the full list again.
- Filter the tasks you already loaded from the API. Do not hardcode a result list.
- With no parameters, the table should look and behave as it does today.

## How to run

```bash
npm install
npm run dev
```

Open http://localhost:5173/tasks. Vite proxies `/api` to http://localhost:3001.

## Done when

You can type a search, pick a status and priority, see the table update, refresh and keep the same filters, then clear everything and see the full list again.
