# Backend: filter and paginate tasks

**Time:** about 15–20 minutes
**Where:** `GET /api/tasks` in `backend/`
**Leave alone:** `/api/engineers`, `/api/projects`, `/api/activity`, and any database

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

Today, `GET /api/tasks` always returns every task as a JSON array, in seed order. Each task has `title`, `status` (`todo` | `in_progress` | `done`), and `priority` (`low` | `medium` | `high`).

Frontends and tools need a way to ask for a filtered slice without downloading the whole list. Extend this endpoint so callers can filter and paginate through query parameters.

## Requirements

Optional query parameters, any combination: `status`, `priority`, `search`, `page`, `limit`.

- `search` matches `title` case-insensitively.
- `status` and `priority` match exactly.
- A task is included only when it matches every parameter that was sent.
- Keep the current seed order.
- `page` is 1-based and defaults to `1`. `limit` defaults to `20`.
- `total` is the match count before pagination. `items` is that page only.
- A page past the end is valid: `items` is `[]` and `total` is still the match count.

When any of those parameters is present, respond with:

```json
{ "items": [], "page": 1, "limit": 5, "total": 10 }
```

`page` and `limit` in the body are the values you applied. `items` contains task objects.

When no query parameters are sent, keep returning the full JSON array so existing clients still work.

If `page` or `limit` is present but is not an integer `>= 1`, return HTTP 400 with a JSON error body.

Put filtering and pagination in the service layer behind the route. Do not hardcode a result.

```text
GET /api/tasks?status=todo&priority=high&search=payment&page=1&limit=5
```

## How to run

```bash
npm install
npm run dev
```

API: http://localhost:3001. Restarting the process reloads the seed data.

## Done when

- No query params → full array, same as today
- With filters/pagination → `{ items, page, limit, total }`
- Bad `page` or `limit` → HTTP 400 JSON error
