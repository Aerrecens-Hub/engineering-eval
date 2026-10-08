# Go: aggregate activity

**Time:** about 15–20 minutes
**Where:** `aggregate` in `services/go`
**Leave alone:** the Node dashboard API, and do not add dependencies

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

The Go service already listens for `POST /aggregate` and decodes JSON. The missing piece is the aggregation logic itself.

You will turn a list of activity events into per-engineer counts. Activity types you may see: `commit`, `review`, `deployment`, `task_completed`.

Use only the Go standard library.

## Requirements

`POST /aggregate` accepts and returns JSON.

Request:

```json
{
  "activities": [
    { "engineerId": "e1", "type": "commit" },
    { "engineerId": "e1", "type": "commit" },
    { "engineerId": "e2", "type": "review" }
  ]
}
```

Response:

```json
{
  "e1": { "commit": 2, "review": 0 },
  "e2": { "commit": 0, "review": 1 }
}
```

Count by `engineerId`, then by activity type.

- Include every type that appears at least once anywhere in the request.
- Use `0` when an engineer has none of that type.
- Omit types that never appear in the request.
- `{ "activities": [] }` returns `{}`.
- Malformed JSON returns HTTP 400.

## How to run

Go 1.22 or newer.

```bash
cd services/go
go run .
```

Service: http://localhost:8080

## Done when

A valid POST returns the nested count map above, empty input returns `{}`, and bad JSON returns 400.
