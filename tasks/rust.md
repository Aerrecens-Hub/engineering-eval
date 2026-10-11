# Rust: task statistics

**Time:** about 15–20 minutes
**Where:** `statistics` in `services/rust`
**Leave alone:** the existing crates and the Node dashboard API

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

`POST /statistics` already accepts JSON and has the structs in place. You need to implement the statistics function that turns a task list into a small summary.

Rules of thumb:

- A task is completed when `status` is `done`
- A task is high priority when `priority` is `high`, even if it is not done

## Requirements

`POST /statistics` accepts and returns JSON. Use the existing structs.

Request:

```json
{
  "tasks": [
    { "status": "todo", "priority": "high" },
    { "status": "done", "priority": "high" },
    { "status": "done", "priority": "low" }
  ]
}
```

Response:

```json
{
  "total": 3,
  "completed": 2,
  "highPriority": 2,
  "completionRate": 0.6667
}
```

- `total` is the task count
- `completed` counts status `done`
- `highPriority` counts priority `high`
- `completionRate` is `completed / total`, rounded to 4 decimal places
- When `total` is `0`, `completionRate` is `0` (do not divide by zero)

`{ "tasks": [] }` returns all zeros. Malformed JSON returns HTTP 400.

## How to run

```bash
cd services/rust
cargo run
```

Service: http://localhost:8082

## Done when

A valid POST returns the four fields above, empty tasks return zeros, and bad JSON returns 400.
